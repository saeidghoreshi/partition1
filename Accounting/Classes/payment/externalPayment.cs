using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.enums;
using Accounting.Models;
using System.Transactions;

namespace accounting.classes
{
    
    public abstract class externalPayment : Payment
    {
        public readonly int PAYMENTTYPEID = (int)enums.paymentType.External;

        public int extPaymentID;
        public string extPaymentDescription;
        public int cardID;

        public externalPayment() { }
        public externalPayment(int paymentID): base(paymentID)
        {
            this.loadByPaymentID(paymentID);
        }

        public void loadByPaymentID(int paymentID) 
        {
            using (var ctx = new AccContext())
            {
                base.loadByPaymentID(paymentID);

                var extPaymentRecord = ctx.externalPayment
                    .Where(x => x.paymentID == paymentID)
                    .Select(x => new
                    {
                        extPaymentID = x.ID,
                        description = x.description,
                        cardID = (decimal)x.payment.amount
                    })
                    .SingleOrDefault();

                if (extPaymentRecord == null)
                    throw new Exception("no such a EXT Payment Exists");

                this.extPaymentID = extPaymentRecord.extPaymentID;
                this.extPaymentDescription = extPaymentRecord.description;
                this.cardID = (int)extPaymentRecord.cardID;
            }
        }

        public virtual void NewPayment(int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int cardID)
        {
            using (var ctx = new AccContext())
            using (var ts=new TransactionScope())
            {
                base.New(payerEntityID, payeeEntityID, amount, currencyID);

                var _extPayment= new Accounting.Models.externalPayment()
                {
                    paymentID=base.paymentID,
                    paymentTypeID = this.PAYMENTTYPEID,
                    cardID=cardID
                };
                ctx.externalPayment.AddObject(_extPayment);
                ctx.SaveChanges();

                this.loadByPaymentID((int)_extPayment.paymentID);

                ts.Complete();
            }
        }

    }

   
}
