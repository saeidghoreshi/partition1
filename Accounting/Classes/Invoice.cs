using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting;
using Accounting.Models;
using accounting.classes.enums;
using System.Transactions;

namespace accounting.classes
{
    public class Invoice
    {
        //properties
        public int invoiceID;
        public int issuerEntityID;
        public int receiverEntityID;
        public int currencyID;

        //Constructors
        public Invoice() { }
        public Invoice(int invoiceID)
        {
            this.invoiceID = invoiceID;
        }

        public void OpenNew(int issuerEntityID,int receiverEntityID, int currencyID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope()) 
            {
                var newInvoice = new Accounting.Models.invoice()
                {
                    issuerEntityID = issuerEntityID,
                    receiverEntityID = receiverEntityID,
                    currencyID=currencyID
                };
                ctx.invoice.AddObject(newInvoice);
                ctx.SaveChanges();

                //create invoice Action
                var invAction = new Accounting.Models.invoiceAction()
                {
                    invoiceID = newInvoice.ID,
                    invoiceStatID = (int)enums.invoiceStat.Generated
                };
                ctx.invoiceAction.AddObject(invAction);
                ctx.SaveChanges();

                this.loadInvoiceByInvoiceID(newInvoice.ID);

                ts.Complete();
            }
        }
        private void loadInvoiceByInvoiceID(int invoiceID) 
        {
            using(var ctx=new AccContext())
            {
                var inv = ctx.invoice
                    .Where(x => x.ID == invoiceID).SingleOrDefault();

                this.invoiceID = inv.ID;
                this.issuerEntityID = (int)inv.issuerEntityID;
                this.receiverEntityID = (int)inv.receiverEntityID;
                this.currencyID = (int)inv.currencyID;   
            }
        }

        /// <summary>
        /// //Get Sum of Invoice Services added 
        /// </summary>
        /// <param name="invoiceID"></param>
        /// <returns></returns>
        public decimal getInvoiceServicesSumAmt()
        {
            using (var ctx = new AccContext())
            {
                var invoice = ctx.invoice.Where(x => x.ID == this.invoiceID).SingleOrDefault();
                if (invoice == null)
                    throw new Exception();
                var invoiceServicesAmt = ctx.invoiceService.Where(x => x.invoiceID == this.invoiceID).Sum(x => x.amount);
                return (decimal)invoiceServicesAmt;
            }
        }

        /// <summary>
        /// 1-Records related transactions
        /// 2-record Invoice Tranactions
        /// </summary>
        /// <param name="invoiceID"></param>
        public void finalizeInvoice()
        {
            using (var ctx = new AccContext())
            using (var ts =new TransactionScope())
            {
                var invoice = ctx.invoice.Where(x=>x.ID==this.invoiceID).SingleOrDefault();
                if(invoice==null)
                    throw  new Exception();

                //Get Sum of Invoice Services added
                decimal invoiceServicesAmt = this.getInvoiceServicesSumAmt();
                
                //Record related transctions
                List <Accounting.Models.transaction> transactions = new List<transaction>();
                var trans1 = Transaction.createNew((int)invoice.receiverEntityID, (int)LibCategories.AP, -1*(decimal)invoiceServicesAmt,(int)invoice.currencyID);
                transactions.Add(trans1);
                var trans2 = Transaction.createNew((int)invoice.issuerEntityID, (int)AssetCategories.AR, +1 * (decimal)invoiceServicesAmt, (int)invoice.currencyID);
                transactions.Add(trans2);

                /*Record Invoice Transaction*/
                this.recordInvoiceTransaction( transactions,enums.invoiceStat.Finalized);

                ts.Complete();
            }
        }

        public invoiceService addService(int serviceID,decimal amount) 
        {
            using (var ctx = new AccContext())
            {
                var newInvoiceService= new Accounting.Models.invoiceService()
                {
                    invoiceID=this.invoiceID,
                    serviceID=serviceID,
                    currencyID=this.currencyID,
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
        


        /*Payment for Invoice*/
        public void doINTERNALTransfer(decimal amount)
        {
            try
            {
                using (var ctx = new AccContext())
                using (var ts = new TransactionScope())
                {
                    classes.internalPayment internalPayment = new classes.internalPayment();
                    internalPayment.NewPayment(this.receiverEntityID, this.issuerEntityID, amount, this.currencyID);

                    /*Record New Invoice Payment*/
                    var NewInvoicePayment = new Accounting.Models.invoicePayment()
                    {
                        invoiceID = this.invoiceID,
                        paymentID = internalPayment.paymentID
                    };
                    ctx.invoicePayment.AddObject(NewInvoicePayment);
                    ctx.SaveChanges();

                    //Record related transctions [for invoice payment]
                    List <Accounting.Models.transaction> transactions = new List<transaction>();

                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.W, -1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(receiverEntityID, (int)LibCategories.AP, +1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(receiverEntityID, (int)AssetCategories.W, +1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.AR, -1 * amount, this.currencyID));

                    /*Record Invoice Payment transactions*/
                    this.RecordInvoicePaymentTransactions(transactions, internalPayment.paymentID, enums.paymentStat.PaidApproved);

                    /*Record Invoice Transaction*/
                    this.recordInvoiceTransaction( transactions, enums.invoiceStat.internalPaymant);
                    
                    ts.Complete();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }
        public void doCCExtPayment(decimal amount,int cardID,enums.ccCardType ccCardType) 
        {
           
                using (var ctx = new AccContext())
                using (var ts = new TransactionScope())
                {
                    classes.ccPayment creditCardPayment = new ccPayment();
                    creditCardPayment.NewPayment(this.receiverEntityID, this.issuerEntityID, amount, this.currencyID, cardID);
                    
                    /*Record New Invoice Payment*/
                    var NewInvoicePayment = new Accounting.Models.invoicePayment()
                    {
                        invoiceID = invoiceID,
                        paymentID = creditCardPayment.paymentID

                    };
                    ctx.invoicePayment.AddObject(NewInvoicePayment);
                    ctx.SaveChanges();

                    //Record related transctions [for invoice payment]
                    List <Accounting.Models.transaction> transactions = new List<transaction>();

                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.CCCASH, -1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(receiverEntityID, (int)LibCategories.AP, +1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(receiverEntityID, (int)AssetCategories.W, +1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.AR, -1 * amount, this.currencyID));

                    /*Record Invoice Payment transactions*/
                    this.RecordInvoicePaymentTransactions(transactions, creditCardPayment.paymentID, enums.paymentStat.PaidApproved);

                    /*Record Invoice Transaction*/
                    enums.invoiceStat? invoicestat=null;
                    switch(ccCardType)
                    {
                        case enums.ccCardType.MASTERCARD:
                            invoicestat=enums.invoiceStat.masterCardPaymant;
                            break;
                        case enums.ccCardType.VISACARD:
                            invoicestat=enums.invoiceStat.visaCardPaymant;
                            break;
                    }
                    this.recordInvoiceTransaction(transactions, (enums.invoiceStat)invoicestat);
                    

                    ts.Complete();
                }
            
            
        }
        public void doINTERACPayment(decimal amount,  int cardID)
        {
                using (var ctx = new AccContext())
                using (var ts = new TransactionScope())
                {
                    classes.dbPayment debitCardPayment = new dbPayment();
                    debitCardPayment.NewPayment(this.receiverEntityID, this.issuerEntityID, amount, this.currencyID,cardID);
                    
                    /*Record New Invoice Payment*/
                    var NewInvoicePayment = new Accounting.Models.invoicePayment()
                    {
                        invoiceID = this.invoiceID,
                        paymentID = debitCardPayment.paymentID
                    };
                    ctx.invoicePayment.AddObject(NewInvoicePayment);
                    ctx.SaveChanges();

                    //Record related transctions [for invoice payment]
                    List <Accounting.Models.transaction> transactions = new List<transaction>();

                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.DBCASH, -1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(receiverEntityID, (int)LibCategories.AP, +1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(receiverEntityID, (int)AssetCategories.W, +1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.AR, -1 * amount, this.currencyID));

                    /*Record Invoice Payment transactions*/
                    this.RecordInvoicePaymentTransactions(transactions, debitCardPayment.paymentID, enums.paymentStat.PaidApproved);

                    /*Record Invoice Transaction*/
                    this.recordInvoiceTransaction( transactions,enums.invoiceStat.interacPaymant);
                    

                    ts.Complete();
                }
            

        }


        public void cancelInvoicePaymentCC(int paymentID) 
        {   
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                accounting.classes.ccPayment payment = new accounting.classes.ccPayment();
                payment.loadByPaymentID(paymentID);

                List<Accounting.Models.transaction> transactions = payment.cancelPayment();

                /*Record Invoice Payment transactions*/
                this.RecordInvoicePaymentTransactions(transactions, paymentID, enums.paymentStat.VoidApproved);
                /*Record Invoice Transaction*/
                this.recordInvoiceTransaction(transactions, enums.invoiceStat.partialPaymentCancelled);
                
                ts.Complete();
            }
        }
        public void cancelInvoicePaymentDB(int paymentID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                accounting.classes.dbPayment payment = new accounting.classes.dbPayment();
                payment.loadByPaymentID(paymentID);

                List<Accounting.Models.transaction> transactions = payment.cancelPayment();

                /*Record Invoice Payment transactions*/
                this.RecordInvoicePaymentTransactions(transactions, paymentID, enums.paymentStat.VoidApproved);
                /*Record Invoice Transaction*/
                this.recordInvoiceTransaction(transactions, enums.invoiceStat.partialPaymentCancelled);

                ts.Complete();
            }
        }
        public void cancelInvoicePaymentINTERNAL(int paymentID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                accounting.classes.internalPayment payment = new accounting.classes.internalPayment();
                payment.loadByPaymentID(paymentID);

                List<Accounting.Models.transaction> transactions = payment.cancelPayment();
                /*Record Invoice Payment transactions*/
                this.RecordInvoicePaymentTransactions(transactions, paymentID, enums.paymentStat.VoidApproved);
                /*Record Invoice Transaction*/
                this.recordInvoiceTransaction(transactions, enums.invoiceStat.partialPaymentCancelled);

                ts.Complete();
            }
        }




        private void recordInvoiceTransaction(List<Accounting.Models.transaction> transactions, enums.invoiceStat invoiceStat)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                //create invoice Action
                var invAction = new Accounting.Models.invoiceAction()
                {
                    invoiceID = this.invoiceID,
                    invoiceStatID = (int)invoiceStat
                };
                ctx.invoiceAction.AddObject(invAction);
                ctx.SaveChanges();


                //create invoice Transactions and invoice action Transactions
                foreach (var item in transactions)
                {
                    var invActionTrans = new Accounting.Models.invoiceActionTransaction()
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
        private void RecordInvoicePaymentTransactions(List<Accounting.Models.transaction> txns, int paymentID , enums.paymentStat payStat)
        {
            using (var ctx = new Accounting.Models.AccContext())
            {
                //create payment Action
                var payAction = new Accounting.Models.paymentAction()
                {
                    paymentID = paymentID,
                    paymentStatID = (int)payStat
                };
                ctx.paymentAction.AddObject(payAction);
                ctx.SaveChanges();

                //Record Pyament Action TXNS

                foreach (var txn in txns)
                {
                    var newPayActionTxn = new paymentActionTransaction()
                    {
                        paymentActionID = payAction.ID,
                        transactionID = txn.ID
                    };
                    ctx.paymentActionTransaction.AddObject(newPayActionTxn);
                    ctx.SaveChanges();
                }
            }
        }
    }
}
