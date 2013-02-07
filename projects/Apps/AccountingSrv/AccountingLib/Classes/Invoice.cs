using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting;
using Accounting.Models;
using accounting.classes.enums;
using System.Transactions;
using System.Runtime.Serialization;

namespace accounting.classes
{
    [DataContract(Namespace = "http://domain/testData")]
    public class Invoice
    {
        //properties
        [DataMember]
        public int invoiceID;
        [DataMember]
        public int issuerEntityID;
        [DataMember]
        public int receiverEntityID;
        [DataMember]
        public int currencyID;

        //Constructors
        public Invoice() { }
        public Invoice(int invoiceID)
        {
            this.invoiceID = invoiceID;
        }

        public void OpenNew(int issuerEntityID,int receiverEntityID, int currencyID)
        {
            using (var ctx = new AccContexts())
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
            using (var ctx = new AccContexts())
            {
                var inv = ctx.invoice
                    .Where(x => x.ID == invoiceID).SingleOrDefault();
                if (inv == null)
                    throw new Exception("Invoice does not exists");

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
            using (var ctx = new AccContexts())
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
            using (var ctx = new AccContexts())
            using (var ts =new TransactionScope())
            {
                this.loadInvoiceByInvoiceID(this.invoiceID);
                
                //Get Sum of Invoice Services added
                decimal invoiceServicesAmt = this.getInvoiceServicesSumAmt();
                
                //Record related transctions
                List <Accounting.Models.transaction> transactions = new List<transaction>();
                var trans1 = Transaction.createNew((int)this.receiverEntityID, (int)LibCategories.AP, -1 * (decimal)invoiceServicesAmt, (int)this.currencyID);
                transactions.Add(trans1);
                var trans2 = Transaction.createNew((int)this.issuerEntityID, (int)AssetCategories.AR, +1 * (decimal)invoiceServicesAmt, (int)this.currencyID);
                transactions.Add(trans2);

                /*Record Invoice Transaction*/
                this.RecordInvoiceTransaction( transactions,enums.invoiceStat.Finalized);

                ts.Complete();
            }
        }

        public invoiceService addService(int serviceID,decimal amount) 
        {
            using (var ctx = new AccContexts())
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
                using (var ctx = new AccContexts())
                using (var ts = new TransactionScope())
                {
                    classes.internalPayment internalPayment = new classes.internalPayment();
                    internalPayment.createNew(this.receiverEntityID, this.issuerEntityID, amount, this.currencyID);

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
                    this.RecordInvoiceTransaction( transactions, enums.invoiceStat.internalPaymant);
                    
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
            //var ccFeeFor

            using (var ctx = new AccContexts())
                using (var ts = new TransactionScope())
                {
                    classes.ccPayment creditCardPayment = new ccPayment();
                    creditCardPayment.createNew(this.receiverEntityID, this.issuerEntityID, amount, this.currencyID, cardID);

                    
                    /*Record New Invoice Payment*/
                    var NewInvoicePayment = new Accounting.Models.invoicePayment()
                    {
                        invoiceID = invoiceID,
                        paymentID = creditCardPayment.paymentID
                    };
                    ctx.invoicePayment.AddObject(NewInvoicePayment);
                    ctx.SaveChanges();

                    //get Fee bank cardType
                    var card = new classes.card.CreditCard();
                    card.loadByCardID(cardID);

                   
                    ccFee ccfee = new ccFee();
                    ccfee.loadccFeeByBankCardTypeID((int)ccCardType, card.getBank().ID);
                    
                    //Record related transctions [for invoice payment]
                    List <Accounting.Models.transaction> transactions = new List<transaction>();

                    transactions.Add(Transaction.createNew(receiverEntityID, (int)AssetCategories.CCCASH, -1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(receiverEntityID, (int)LibCategories.AP, +1 * amount, this.currencyID));

                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.W, +1 * amount - (decimal)ccfee.amount, this.currencyID));
                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.AR, -1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(issuerEntityID, (int)OECategories.EXP,  (decimal)ccfee.amount, this.currencyID));

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
                    this.RecordInvoiceTransaction(transactions, (enums.invoiceStat)invoicestat);
                    

                    ts.Complete();
                }
            
            
        }
        public void doINTERACPayment(decimal amount,  int cardID)
        {
            using (var ctx = new AccContexts())
                using (var ts = new TransactionScope())
                {
                    classes.dbPayment debitCardPayment = new dbPayment();
                    debitCardPayment.createNew(this.receiverEntityID, this.issuerEntityID, amount, this.currencyID,cardID);
                    
                    /*Record New Invoice Payment*/
                    var NewInvoicePayment = new Accounting.Models.invoicePayment()
                    {
                        invoiceID = this.invoiceID,
                        paymentID = debitCardPayment.paymentID
                    };
                    ctx.invoicePayment.AddObject(NewInvoicePayment);
                    ctx.SaveChanges();


                    //get Fee bank cardType
                    var card=new classes.card.DebitCard();
                    card.loadByCardID(cardID);

                   
                    Fee fee = new Fee();
                    fee.loadFeeByBankCardTypeID(card.cardTypeID, card.getBank().ID);
                    
                    //Record related transctions [for invoice payment]
                    List <Accounting.Models.transaction> transactions = new List<transaction>();
                    transactions.Add(Transaction.createNew(receiverEntityID, (int)AssetCategories.DBCASH, -1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(receiverEntityID, (int)LibCategories.AP, +1 * amount, this.currencyID));

                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.W, +1 * amount-(decimal)fee.amount, this.currencyID));
                    transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.AR, -1 * amount, this.currencyID));
                    transactions.Add(Transaction.createNew(issuerEntityID, (int)OECategories.EXP, (decimal)fee.amount, this.currencyID));

                    /*Record Invoice Payment transactions*/
                    this.RecordInvoicePaymentTransactions(transactions, debitCardPayment.paymentID, enums.paymentStat.PaidApproved);

                    /*Record Invoice Transaction*/
                    this.RecordInvoiceTransaction( transactions,enums.invoiceStat.interacPaymant);
                    

                    ts.Complete();
                }
            

        }

        /*cancelling one payment od invoice at the time*/
        public void cancelInvoicePaymentEXT(int paymentID)
        {
            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {
                accounting.classes.externalPayment payment = new accounting.classes.externalPayment();
                payment.loadByPaymentID(paymentID);

                List<Accounting.Models.transaction> transactions = payment.cancelPayment(enums.paymentAction.Void);

                /*Record Invoice Payment transactions*/
                this.RecordInvoicePaymentTransactions(transactions, paymentID, enums.paymentStat.VoidApproved);

                /*Record Invoice Transaction*/
                if(payment.extPaymentTypeID==(int)enums.extPaymentType.CreditPayment)
                    this.RecordInvoiceTransaction(transactions, enums.invoiceStat.partialCreditCardPaymantCancelled);

                if (payment.extPaymentTypeID == (int)enums.extPaymentType.InteracPayment)
                    this.RecordInvoiceTransaction(transactions, enums.invoiceStat.partialInteracPaymantCancelled);

                ts.Complete();
            }
        }
        public void cancelInvoicePaymentINTERNAL(int paymentID)
        {
            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {
                accounting.classes.internalPayment payment = new accounting.classes.internalPayment();
                payment.loadByPaymentID(paymentID);

                List<Accounting.Models.transaction> transactions = payment.cancelPayment(enums.paymentAction.Void);
                /*Record Invoice Payment transactions*/
                this.RecordInvoicePaymentTransactions(transactions, paymentID, enums.paymentStat.VoidApproved);

                /*Record Invoice Transaction*/
                this.RecordInvoiceTransaction(transactions, enums.invoiceStat.partialInternalPaymantCancelled);

                ts.Complete();
            }
        }

        /*cancel invoice all payments*/
        public void cancelInvocice() 
        {
            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {
                /*get all invoice payments*/
                List<Accounting.Models.payment> payments = this.getAllPayments();

                /*cancel payments one by one*/
                foreach (var item in payments)
                { 
                    if(item.paymentTypeID==(int)enums.paymentType.Internal)
                        cancelInvoicePaymentINTERNAL(item.ID);
                    if(item.paymentTypeID==(int)enums.paymentType.External)
                        cancelInvoicePaymentEXT(item.ID);
                }

                /*Cancel invoice*/
                    this.loadInvoiceByInvoiceID(invoiceID);
                
                    //Get Sum of Invoice Services added
                    decimal invoiceServicesAmt = this.getInvoiceServicesSumAmt();

                    //Record related transctions
                    List<Accounting.Models.transaction> transactions = new List<transaction>();
                    var trans1 = Transaction.createNew((int)this.receiverEntityID, (int)LibCategories.AP, +1 * (decimal)invoiceServicesAmt, (int)this.currencyID);
                    transactions.Add(trans1);
                    var trans2 = Transaction.createNew((int)this.issuerEntityID, (int)AssetCategories.AR, -1 * (decimal)invoiceServicesAmt, (int)this.currencyID);
                    transactions.Add(trans2);

                    /*Record Invoice Transaction*/
                    this.RecordInvoiceTransaction(transactions, enums.invoiceStat.Cancelled);

                    ts.Complete();
                
            }
        }

        public List<Accounting.Models.payment> getAllPayments() 
        {
            using (var ctx = new AccContexts())
            {
                var payments = ctx.invoicePayment
                    .Where(z => (int)z.invoiceID == this.invoiceID)
                    //.Where(z=>z.invoice.in)
                    .Select(x => x.payment)
                    .ToList();

                return payments;
            }
        }

        private void RecordInvoiceTransaction(List<Accounting.Models.transaction> transactions, enums.invoiceStat invoiceStat)
        {
            using (var ctx = new AccContexts())
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
            using (var ctx = new Accounting.Models.AccContexts())
            {
                //Create Payment Action
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
