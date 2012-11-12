﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting;
using Accounting.Models;
using Accounting.Classes.Enums;
using System.Transactions;

namespace Accounting.Classes
{
    public class Invoice
    {
        public Models.invoice createInvoice(int payerEntityID,int payeeEntityID,int currencyID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope()) 
            {
                var newInvoice = new Models.invoice()
                {
                    payeeEntityID=payeeEntityID,
                    payerEntityID=payerEntityID,
                    currencyID=currencyID
                };
                ctx.invoice.AddObject(newInvoice);
                ctx.SaveChanges();

                //create invoice Action
                var invAction = new Models.invoiceAction()
                {
                    invoiceID = newInvoice.ID,
                    invoiceStatID = (int)Enums.invoiceStat.Generated
                };
                ctx.invoiceAction.AddObject(invAction);
                ctx.SaveChanges();

                ts.Complete();
                return newInvoice;
            }
        }

        /// <summary>
        /// //Get Sum of Invoice Services added 
        /// </summary>
        /// <param name="invoiceID"></param>
        /// <returns></returns>
        public decimal getInvoiceServicesSumAmt(int invoiceID) 
        {
            using (var ctx = new AccContext())
            {
                var invoice = ctx.invoice.Where(x => x.ID == invoiceID).SingleOrDefault();
                if (invoice == null)
                    throw new Exception();
                var invoiceServicesAmt = ctx.invoiceService.Where(x => x.invoiceID == invoiceID).Sum(x => x.amount);
                return (decimal)invoiceServicesAmt;
            }
        }

        /// <summary>
        /// 1-Records related transactions
        /// 2-record Invoice Tranactions
        /// </summary>
        /// <param name="invoiceID"></param>
        public void finalizeInvoice(int invoiceID)
        {
            using (var ctx = new AccContext())
            using (var ts =new TransactionScope())
            {
                var invoice = ctx.invoice.Where(x=>x.ID==invoiceID).SingleOrDefault();
                if(invoice==null)
                    throw  new Exception();

                //Get Sum of Invoice Services added
                decimal invoiceServicesAmt = this.getInvoiceServicesSumAmt(invoiceID);
                
                //Record related transctions
                List<Models.transaction> transactions = new List<transaction>();
                var trans1 = Transaction.createNew((int)invoice.payerEntityID, (int)LibCategories.AP, (decimal)invoiceServicesAmt);
                transactions.Add(trans1);
                var trans2 = Transaction.createNew((int)invoice.payerEntityID, (int)AssetCategories.AR, (decimal)invoiceServicesAmt);
                transactions.Add(trans2);

                /*Record Invoice Transaction*/
                this.recordInvoiceTransaction(invoiceID, transactions,Enums.invoiceStat.Finalized);

                ts.Complete();
            }
        }
        public invoiceService addService(int serviceID,int invoiceID,int currencyID,decimal amount) 
        {
            using (var ctx = new AccContext())
            {
                var newInvoiceService= new Models.invoiceService()
                {
                    invoiceID=invoiceID,
                    serviceID=serviceID,
                    currencyID=currencyID,
                    amount=amount
                };
                ctx.invoiceService.AddObject(newInvoiceService);
                ctx.SaveChanges();
                return newInvoiceService;
            }
        }

        /// <summary>
        /// this function records INVOICEACTION and INVOICEACTIONTRANSACTIONS
        /// </summary>
        /// <param name="invoiceID"></param>
        /// <param name="transactions"></param>
        private void recordInvoiceTransaction(int invoiceID,List<Models.transaction> transactions , Enums.invoiceStat invoiceStat)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                //create invoice Action
                var invAction= new Models.invoiceAction()
                {
                    invoiceID = invoiceID,
                    invoiceStatID=(int)invoiceStat
                };
                ctx.invoiceAction.AddObject(invAction);
                ctx.SaveChanges();


                //create invoice Transactions and invoice action Transactions
                foreach (var item in transactions) 
                {
                    var invActionTrans = new Models.invoiceActionTransaction()
                    {
                        invoiceActionID = invAction.ID,
                        transactionID = item.ID
                    };
                    ctx.invoiceActionTransaction.AddObject(invActionTrans);

                    ctx.SaveChanges();
                }

                ts.Complete();

            }
        }

        /// <summary>
        /// this function records PAYMENTACTION and PAYMENTACTIONTRANSACTIONS
        /// </summary>
        /// <param name="invoiceID"></param>
        /// <param name="transactions"></param>
        private void recordInvoicePaymentTransaction(int invoiceID,int paymentID,List<Models.transaction> transactions,Enums.paymentStat paymentStat)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                //Record Payment Action
                var paymentAction = new Models.paymentAction()
                {
                    paymentID = paymentID,
                    paymentStatID = (int)paymentStat
                };
                ctx.paymentAction.AddObject(paymentAction);
                ctx.SaveChanges();



                //create invoice Transactions and invoice action Transactions
                foreach (var item in transactions) 
                {
                    var paymentActionTrans = new Models.paymentActionTransaction()
                    {
                        paymentActionID = paymentAction.ID,
                        transactionID = item.ID
                    };
                    ctx.paymentActionTransaction.AddObject(paymentActionTrans);

                    ctx.SaveChanges();
                }

                ts.Complete();

            }
        }
        

        /*Payment for Invoice*/
        public void doINTERNALTransfer(int invoiceID, int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            try
            {
                using (var ctx = new AccContext())
                using (var ts = new TransactionScope())
                {
                    Classes.internalPayment internalPayment = new internalPayment();
                    var donePayment = internalPayment.pay(payerEntityID, payeeEntityID, amount, currencyID);

                    /*Record New Invoice Payment*/
                    var NewInvoicePayment = new Models.invoicePayment()
                    {
                        invoiceID = invoiceID,
                        paymentID = donePayment.ID
                    };
                    ctx.invoicePayment.AddObject(NewInvoicePayment);
                    ctx.SaveChanges();

                    //Record related transctions [for invoice payment]
                    List<Models.transaction> transactions = new List<transaction>();

                    transactions.Add(Transaction.createNew(payerEntityID, (int)AssetCategories.W, -1 * amount));
                    transactions.Add(Transaction.createNew(payerEntityID, (int)LibCategories.AP, +1 * amount));
                    transactions.Add(Transaction.createNew(payeeEntityID, (int)AssetCategories.W, +1 * amount));
                    transactions.Add(Transaction.createNew(payeeEntityID, (int)AssetCategories.AR, -1 * amount));

                    /*Record Invoice Transaction*/
                    this.recordInvoiceTransaction(invoiceID, transactions, Enums.invoiceStat.internalPaymant);
                    this.recordInvoicePaymentTransaction(invoiceID, (int)internalPayment.paymentID, transactions, Enums.paymentStat.Payment);

                    ts.Complete();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
        public void doCCExtPayment(int invoiceID, int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int cardID) 
        {
            try {
                using (var ctx = new AccContext())
                using (var ts = new TransactionScope())
                {
                    Classes.ccPayment creditCardPayment = new ccPayment();
                    var donePayment=creditCardPayment.pay(payerEntityID, payeeEntityID, amount, currencyID,cardID);

                    /*Record New Invoice Payment*/
                    var NewInvoicePayment = new Models.invoicePayment()
                    {
                        invoiceID = invoiceID,
                        paymentID = creditCardPayment.paymentID

                    };
                    ctx.invoicePayment.AddObject(NewInvoicePayment);
                    ctx.SaveChanges();

                    //Record related transctions [for invoice payment]
                    List<Models.transaction> transactions = new List<transaction>();

                    transactions.Add(Transaction.createNew(payerEntityID, (int)AssetCategories.CCCASH, -1*amount));
                    transactions.Add(Transaction.createNew(payerEntityID, (int)LibCategories.AP, +1*amount));
                    transactions.Add(Transaction.createNew(payeeEntityID, (int)AssetCategories.W, +1*amount));
                    transactions.Add(Transaction.createNew(payeeEntityID, (int)AssetCategories.AR, -1*amount));

                    /*Record Invoice Transaction*/
                    this.recordInvoiceTransaction(invoiceID, transactions, Enums.invoiceStat.creditCardPaymant);
                    this.recordInvoicePaymentTransaction(invoiceID, (int)creditCardPayment.paymentID, transactions, Enums.paymentStat.Payment);

                    ts.Complete();
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
        }
        public void doINTERACPayment(int invoiceID, int payerEntityID, int payeeEntityID, decimal amount, int currencyID, int cardID)
        {
            try
            {
                using (var ctx = new AccContext())
                using (var ts = new TransactionScope())
                {
                    Classes.dbPayment debitCardPayment = new dbPayment();
                    var donePayment=debitCardPayment.pay(payerEntityID, payeeEntityID, amount, currencyID, cardID);

                    /*Record New Invoice Payment*/
                    var NewInvoicePayment = new Models.invoicePayment()
                    {
                        invoiceID = invoiceID,
                        paymentID = donePayment.ID
                    };
                    ctx.invoicePayment.AddObject(NewInvoicePayment);
                    ctx.SaveChanges();

                    //Record related transctions [for invoice payment]
                    List<Models.transaction> transactions = new List<transaction>();

                    transactions.Add(Transaction.createNew(payerEntityID, (int)AssetCategories.DBCASH, -1 * amount));
                    transactions.Add(Transaction.createNew(payerEntityID, (int)LibCategories.AP, +1 * amount));
                    transactions.Add(Transaction.createNew(payeeEntityID, (int)AssetCategories.W, +1 * amount));
                    transactions.Add(Transaction.createNew(payeeEntityID, (int)AssetCategories.AR, -1 * amount));

                    /*Record Invoice Transaction*/
                    this.recordInvoiceTransaction(invoiceID, transactions,Enums.invoiceStat.interacPaymant);
                    this.recordInvoicePaymentTransaction(invoiceID, (int)debitCardPayment.paymentID, transactions, Enums.paymentStat.Payment);

                    ts.Complete();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
        
    }
}
