using System;
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


                ts.Complete();
                return newInvoice;
            }
        }
        public void finalizeInvoice(int invoiceID)
        {
            using (var ctx = new AccContext())
            using (var ts =new TransactionScope())
            {
                var invoice = ctx.invoice.Where(x=>x.ID==invoiceID).SingleOrDefault();
                if(invoice==null)
                    throw  new Exception();
                var invoiceServices = ctx.invoiceService.Where(x=>x.invoiceID==invoiceID).Sum(x=>x.amount);
                
                //Record related transctions
                List<Models.transaction> transactions = new List<transaction>();
                var trans1=Transaction.createNew((int)invoice.payerEntityID,(int)LibCategories.AP,(decimal)invoiceServices);
                transactions.Add(trans1);
                var trans2 = Transaction.createNew((int)invoice.payerEntityID, (int)AssetCategories.AR, (decimal)invoiceServices);
                transactions.Add(trans2);

                /*Record Invoice Transaction*/
                this.recordInvoiceTransaction(invoiceID, transactions);

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
        private void recordInvoiceTransaction(int invoiceID,List<Models.transaction> transactions)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                //create invoice Action
                var invAction= new Models.invoiceAction()
                {
                    invoiceID = invoiceID,
                    invoiceStatID=(int)Enums.invoiceStat.Generated
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



        /*Payment for Invoice*/
        public void doINTERNALTransfer(int invoiceID, int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            try
            {
                using (var ctx = new AccContext())
                using (var ts = new TransactionScope())
                {
                    Classes.internalPayment internalPayment = new internalPayment();
                    internalPayment.Pay(payerEntityID, payeeEntityID, amount, currencyID);
                    var donePayment = internalPayment.PAYMENTRECORD;

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
                    this.recordInvoiceTransaction(invoiceID, transactions);

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
                    Classes.ccExtPayment creditCardPayment = new ccExtPayment();
                    creditCardPayment.pay(payerEntityID, payeeEntityID, amount, currencyID,cardID);
                    var donePayment = creditCardPayment.PAYMENTRECORD;

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

                    transactions.Add(Transaction.createNew(payerEntityID, (int)AssetCategories.CCCASH, -1*amount));
                    transactions.Add(Transaction.createNew(payerEntityID, (int)LibCategories.AP, +1*amount));
                    transactions.Add(Transaction.createNew(payeeEntityID, (int)AssetCategories.W, +1*amount));
                    transactions.Add(Transaction.createNew(payeeEntityID, (int)AssetCategories.AR, -1*amount));

                    /*Record Invoice Transaction*/
                    this.recordInvoiceTransaction(invoiceID, transactions);

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
                    Classes.dbExtPayment debitCardPayment = new dbExtPayment();
                    debitCardPayment.pay(payerEntityID, payeeEntityID, amount, currencyID, cardID);
                    var donePayment = debitCardPayment.PAYMENTRECORD;

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
                    this.recordInvoiceTransaction(invoiceID, transactions);

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
