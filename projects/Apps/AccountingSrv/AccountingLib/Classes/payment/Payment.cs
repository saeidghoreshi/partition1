using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.enums;
using AccountingLib.Models;
using System.Transactions;

namespace accounting.classes
{
    public abstract class Payment
    {
        public int paymentID;
        public int payerEntityID;
        public int payeeEntityID;
        public decimal amount;
        public int currencyID;
        public int paymentTypeID;

        public Payment() { }
        public Payment(int paymentID)
        {
            this.loadByPaymentID(paymentID);
        }

        protected void createNew(int payerEntityID,int payeeEntityID,decimal amount,int currencyID,int paymentTypeID) 
        {
            using (var ctx = new AccContexts())
            {
                var _payment = new AccountingLib.Models.payment()
                {
                    payerEntityID=payerEntityID,
                    payeeEntityID=payeeEntityID,
                    amount=amount,
                    currencyID=currencyID,
                    paymentTypeID=paymentTypeID
                };
                ctx.payment.AddObject(_payment);
                ctx.SaveChanges();

                loadByPaymentID(_payment.ID);
            }
        }

        public List<AccountingLib.Models.transaction> cancelPayment(enums.paymentAction _paymentAction)
        {   
            //First check this payment is able to be cancelled  ************

            //get Related transacions and input reveres ones
            using (var ctx = new AccContexts())
            {
                //get Payment details
                var payment = ctx.payment
                    .Where(x => x.ID == paymentID).SingleOrDefault();

                if (payment == null)
                    throw new Exception("Payment Could not be found");

                this.paymentID=(int)payment.ID;
                this.payerEntityID=(int)payment.payerEntityID;
                this.payeeEntityID=(int)payment.payeeEntityID;
                this.amount=(decimal)payment.amount;
                this.currencyID=(int)payment.currencyID;

                //get payment Transactions
                var paymentTransactions = ctx.paymentAction
                    .Where(x => x.paymentID == this.paymentID)
                    .Single()
                    .paymentActionTransaction
                    .Select(x => new 
                    {
                        ownerEntityID=x.transaction.account.ownerEntityID,
                        catTypeID = x.transaction.account.catTypeID,
                        amount = x.transaction.amount,
                        currencyID = x.transaction.account.currencyID
                    })
                    .ToList();

                //enter and save revered Transactions
                List<AccountingLib.Models.transaction> reveresedTransactions = new List<transaction>();
                foreach (var txn in paymentTransactions)
                    reveresedTransactions.Add(Transaction.createNew((int)txn.ownerEntityID, (int)txn.catTypeID, -1 * (decimal)txn.amount, (int)txn.currencyID));

                //IF PAYMENT ACTION IS REFUND, NEW FEE HANDLING TRANSACTIONS WOULD BE NEEDED
                


                return reveresedTransactions;
            }
        }

        protected void loadByPaymentID(int paymentID)
        {
            using (var ctx = new AccContexts())
            {
                var paymentRecord = ctx.payment
                    .Where(x => x.ID == paymentID)
                    .Select(x => new
                    {
                        paymentID = x.ID,
                        payerEntityID = (int)x.payerEntityID,
                        payeeEntityID = (int)x.payeeEntityID,
                        amount = (decimal)x.amount,
                        paymentTypeID = (int)x.paymentTypeID,
                        currencyID = (int)x.currencyID
                    })
                    .SingleOrDefault();

                if (paymentRecord == null)
                    throw new Exception("no such a Payment Exists");

                this.paymentID = paymentRecord.paymentID;
                this.paymentTypeID = (int)paymentRecord.paymentTypeID;
                this.payerEntityID = (int)paymentRecord.payerEntityID;
                this.payeeEntityID = (int)paymentRecord.payeeEntityID;
                this.amount = (decimal)paymentRecord.amount;
                this.currencyID = (int)paymentRecord.currencyID;
            }
        }

    }

}
