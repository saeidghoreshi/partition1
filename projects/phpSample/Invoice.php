<?php

namespace Accounting;

class Invoice
{
    //properties
    public $invoiceID;
    public $issuerEntityID;
    public $receiverEntityID;
    public $currencyID;

    //Constructors
    function __constructor() { }
    function __constructor($invoiceID)
    {
        //loadInvoiceByInvoiceID(invoiceID);
    }

    public function createNew($issuerEntityID,$receiverEntityID, $currencyID)
    {
        /*
            var newInvoice = new AccountingLib.Models.invoice()
            {
                issuerEntityID = issuerEntityID,
                receiverEntityID = receiverEntityID,
                currencyID=currencyID
            };
            ctx.invoice.AddObject(newInvoice);
            ctx.SaveChanges();

            //create invoice Action
            var invAction = new AccountingLib.Models.invoiceAction()
            {
                invoiceID = newInvoice.ID,
                invoiceStatID = (int)enums.invoiceStat.Generated
            };
            ctx.invoiceAction.AddObject(invAction);
            ctx.SaveChanges();

            this.loadInvoiceByInvoiceID(newInvoice.ID);
        */
    }
    private function loadInvoiceByInvoiceID($invoiceID) 
    {
        /*
            var inv = ctx.invoice
                .Where(x => x.ID == invoiceID).SingleOrDefault();
            if (inv == null)
                throw new Exception("Invoice does not exists");

            this.invoiceID = inv.ID;
            this.issuerEntityID = (int)inv.issuerEntityID;
            this.receiverEntityID = (int)inv.receiverEntityID;
            this.currencyID = (int)inv.currencyID;   
            */
    }
    
    public function getInvoiceServicesSumAmt()
    {
        /*
            var invoice = ctx.invoice.Where(x => x.ID == this.invoiceID).SingleOrDefault();
            if (invoice == null)
                throw new Exception();
            var invoiceServicesAmt = ctx.invoiceService.Where(x => x.invoiceID == this.invoiceID).Sum(x => x.amount);
            return (decimal)invoiceServicesAmt;                                      
        */
    }
    
    public function finalizeInvoice()
    {
        /*    
            //Get Sum of Invoice Services added
            decimal invoiceServicesAmt = this.getInvoiceServicesSumAmt();
            
            //Record related transctions
            List <AccountingLib.Models.transaction> transactions = new List<transaction>();
            var trans1 = Transaction.createNew((int)this.receiverEntityID, (int)LibCategories.AP, -1 * (decimal)invoiceServicesAmt, (int)this.currencyID);
            transactions.Add(trans1);
            var trans2 = Transaction.createNew((int)this.issuerEntityID, (int)AssetCategories.AR, +1 * (decimal)invoiceServicesAmt, (int)this.currencyID);
            transactions.Add(trans2);

            //Record Invoice Transaction
            this.RecordInvoiceTransaction( transactions,enums.invoiceStat.Finalized);

           */
    }

    public function addService($serviceID,$amount) 
    {
        /*
            var newInvoiceService= new AccountingLib.Models.invoiceService()
            {
                invoiceID=this.invoiceID,
                serviceID=serviceID,
                currencyID=this.currencyID,
                amount=amount
            };
            ctx.invoiceService.AddObject(newInvoiceService);
            ctx.SaveChanges();

            return newInvoiceService;
            */
    }

    
    /*Payment for Invoice*/
    public function doINTERNALTransfer($amount)
    {
        /*
        try
        {
                classes.internalPayment internalPayment = new classes.internalPayment();
                internalPayment.createNew(this.receiverEntityID, this.issuerEntityID, amount, this.currencyID);

                //Record New Invoice Payment
                var NewInvoicePayment = new AccountingLib.Models.invoicePayment()
                {
                    invoiceID = this.invoiceID,
                    paymentID = internalPayment.paymentID
                };
                ctx.invoicePayment.AddObject(NewInvoicePayment);
                ctx.SaveChanges();

                //Record related transctions [for invoice payment]
                List <AccountingLib.Models.transaction> transactions = new List<transaction>();
                transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.W, -1 * amount, this.currencyID));
                transactions.Add(Transaction.createNew(receiverEntityID, (int)LibCategories.AP, +1 * amount, this.currencyID));
                transactions.Add(Transaction.createNew(receiverEntityID, (int)AssetCategories.W, +1 * amount, this.currencyID));
                transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.AR, -1 * amount, this.currencyID));

                //Record Invoice Payment transactions
                this.RecordInvoicePaymentTransactions(transactions, internalPayment.paymentID, enums.paymentStat.PaidApproved);

                //Record Invoice Transaction
                this.RecordInvoiceTransaction( transactions, enums.invoiceStat.internalPaymant);
                                                                                             
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        */

    }
    public function doCCExtPayment($amount,$cardID,$ccCardType) 
    {          /*
                classes.ccPayment creditCardPayment = new ccPayment();
                creditCardPayment.createNew(this.receiverEntityID, this.issuerEntityID, amount, this.currencyID, cardID);

                
                //Record New Invoice Payment
                var NewInvoicePayment = new AccountingLib.Models.invoicePayment()
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
                ccfee.loadccFeeByBankCardTypeID((int)ccCardType, (card as Entity).getBankByCard(card.cardID).bankID);
                
                //Record related transctions [for invoice payment]
                List <AccountingLib.Models.transaction> transactions = new List<transaction>();

                transactions.Add(Transaction.createNew(receiverEntityID, (int)AssetCategories.CCCASH, -1 * amount, this.currencyID));
                transactions.Add(Transaction.createNew(receiverEntityID, (int)LibCategories.AP, +1 * amount, this.currencyID));

                transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.W, +1 * amount - (decimal)ccfee.amount, this.currencyID));
                transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.AR, -1 * amount, this.currencyID));
                transactions.Add(Transaction.createNew(issuerEntityID, (int)OECategories.EXP,  (decimal)ccfee.amount, this.currencyID));

                //Record Invoice Payment transactions
                this.RecordInvoicePaymentTransactions(transactions, creditCardPayment.paymentID, enums.paymentStat.PaidApproved);

                //Record Invoice Transaction
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
                
               */
        
    }
    public function doINTERACPayment($amount, $cardID)
    {
        /*
                classes.dbPayment debitCardPayment = new dbPayment();
                debitCardPayment.createNew(this.receiverEntityID, this.issuerEntityID, amount, this.currencyID,cardID);
                
                /Record New Invoice Payment
                var NewInvoicePayment = new AccountingLib.Models.invoicePayment()
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
                fee.loadFeeByBankCardTypeID(card.cardTypeID, ((Entity)card).getBankByCard(cardID).bankID);
                
                //Record related transctions [for invoice payment]
                List <AccountingLib.Models.transaction> transactions = new List<transaction>();
                transactions.Add(Transaction.createNew(receiverEntityID, (int)AssetCategories.DBCASH, -1 * amount, this.currencyID));
                transactions.Add(Transaction.createNew(receiverEntityID, (int)LibCategories.AP, +1 * amount, this.currencyID));

                transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.W, +1 * amount-(decimal)fee.amount, this.currencyID));
                transactions.Add(Transaction.createNew(issuerEntityID, (int)AssetCategories.AR, -1 * amount, this.currencyID));
                transactions.Add(Transaction.createNew(issuerEntityID, (int)OECategories.EXP, (decimal)fee.amount, this.currencyID));

                //Record Invoice Payment transactions
                this.RecordInvoicePaymentTransactions(transactions, debitCardPayment.paymentID, enums.paymentStat.PaidApproved);

                //Record Invoice Transaction
                this.RecordInvoiceTransaction( transactions,enums.invoiceStat.interacPaymant);
                                            
                                            */
    }

    /*cancelling one payment od invoice at the time*/
    public function cancelInvoicePaymentEXT($paymentID)
    {
        /*
           accounting.classes.externalPayment payment = new accounting.classes.externalPayment();
            payment.loadByPaymentID(paymentID);

            List<AccountingLib.Models.transaction> transactions = payment.cancelPayment(enums.paymentAction.Void);

            //Record Invoice Payment transactions
            this.RecordInvoicePaymentTransactions(transactions, paymentID, enums.paymentStat.VoidApproved);

            //Record Invoice Transaction
            if(payment.extPaymentTypeID==(int)enums.extPaymentType.CreditPayment)
                this.RecordInvoiceTransaction(transactions, enums.invoiceStat.partialCreditCardPaymantCancelled);

            if (payment.extPaymentTypeID == (int)enums.extPaymentType.InteracPayment)
                this.RecordInvoiceTransaction(transactions, enums.invoiceStat.partialInteracPaymantCancelled);
                                        
                                        */
    }
    public function cancelInvoicePaymentINTERNAL($paymentID)
    {
     /*       accounting.classes.internalPayment payment = new accounting.classes.internalPayment();
            payment.loadByPaymentID(paymentID);

            List<AccountingLib.Models.transaction> transactions = payment.cancelPayment(enums.paymentAction.Void);
            //Record Invoice Payment transactions
            this.RecordInvoicePaymentTransactions(transactions, paymentID, enums.paymentStat.VoidApproved);

            //Record Invoice Transaction
            this.RecordInvoiceTransaction(transactions, enums.invoiceStat.partialInternalPaymantCancelled);
                                                 
                                                 */
    }

    /*cancel invoice all payments*/
    public function cancelInvoice() 
    {
    /*
            //get all invoice payments
            List<AccountingLib.Models.payment> payments = this.getAllPayments();

            //cancel payments one by one
            foreach (var item in payments)
            { 
                if(item.paymentTypeID==(int)enums.paymentType.Internal)
                    cancelInvoicePaymentINTERNAL(item.ID);
                if(item.paymentTypeID==(int)enums.paymentType.External)
                    cancelInvoicePaymentEXT(item.ID);
            }

            //Cancel invoice
                this.loadInvoiceByInvoiceID(invoiceID);
            
                //Get Sum of Invoice Services added
                decimal invoiceServicesAmt = this.getInvoiceServicesSumAmt();

                //Record related transctions
                List<AccountingLib.Models.transaction> transactions = new List<transaction>();
                var trans1 = Transaction.createNew((int)this.receiverEntityID, (int)LibCategories.AP, +1 * (decimal)invoiceServicesAmt, (int)this.currencyID);
                transactions.Add(trans1);
                var trans2 = Transaction.createNew((int)this.issuerEntityID, (int)AssetCategories.AR, -1 * (decimal)invoiceServicesAmt, (int)this.currencyID);
                transactions.Add(trans2);

                //Record Invoice Transaction
                this.RecordInvoiceTransaction(transactions, enums.invoiceStat.Cancelled);
                */
    }

    public function getAllPayments() 
    {
        /*
            var payments = ctx.invoicePayment
                .Where(z => (int)z.invoiceID == this.invoiceID)
                //.Where(z=>z.invoice.in)
                .Select(x => x.payment)
                .ToList();

            return payments;
            */
    }

    private function RecordInvoiceTransaction($transactions, $invoiceStat)
    {
        /*
            //create invoice Action
            var invAction = new AccountingLib.Models.invoiceAction()
            {
                invoiceID = this.invoiceID,
                invoiceStatID = (int)invoiceStat
            };
                
            //create invoice Transactions and invoice action Transactions
            foreach (var item in transactions)
            {
                var invActionTrans = new AccountingLib.Models.invoiceActionTransaction()
                {
                    invoiceActionID = invAction.ID,
                    transactionID = item.ID
                };
                ctx.invoiceActionTransaction.AddObject(invActionTrans);

                ctx.SaveChanges();
            }                                          
            */
    }

    private function RecordInvoicePaymentTransactions($txns, $paymentID , $payStat)
    {
        /*    //Create Payment Action
            var payAction = new AccountingLib.Models.paymentAction()
            {
                paymentID = paymentID,
                paymentStatID = (int)payStat
            }; 
            
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
            */
    }
}  
