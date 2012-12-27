using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.enums;
using AccountingLib.Models;
using System.Transactions;

namespace accounting.classes
{
    
    public class externalPayment : Payment
    {
        public readonly int PAYMENTTYPEID = (int)enums.paymentType.External;

        public int extPaymentID;
        public string extPaymentDescription;
        public int cardID;
        public int extPaymentTypeID;

        public externalPayment() { }
        public externalPayment(int paymentID): base(paymentID)
        {
            this.loadByPaymentID(paymentID);
        }


        protected void createNew(int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int cardID,int extPaymentTypeID)
        {
            using (var ctx = new AccContexts())
            using (var ts=new TransactionScope())
            {
                base.createNew(payerEntityID, payeeEntityID, amount, currencyID, (int)enums.paymentType.External);

                var _extPayment= new AccountingLib.Models.externalPayment()
                {
                    paymentID=base.paymentID,
                    extPaymentTypeID = extPaymentTypeID,
                    cardID=cardID
                };
                ctx.externalPayment.AddObject(_extPayment);
                ctx.SaveChanges();

                this.loadByPaymentID((int)_extPayment.paymentID);

                ts.Complete();
            }
        }

        public new void loadByPaymentID(int paymentID)
        {
            using (var ctx = new AccContexts())
            {
                base.loadByPaymentID(paymentID);

                var extPaymentRecord = ctx.externalPayment
                    .Where(x => x.paymentID == paymentID)
                    .Select(x => x)
                    .SingleOrDefault();

                if (extPaymentRecord == null)
                    throw new Exception("no such a EXT Payment Exists");

                this.extPaymentID = extPaymentRecord.ID;
                this.extPaymentDescription = extPaymentRecord.description;
                this.cardID = (int)extPaymentRecord.cardID;
                this.extPaymentTypeID = (int)extPaymentRecord.extPaymentTypeID;
            }
        }

    }

   
}
