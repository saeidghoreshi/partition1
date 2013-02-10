using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.enums;
using AccountingLib.Models;
using System.Transactions;

namespace accounting.classes
{
    public class ccPayment : externalPayment
    {
        public readonly int EXTPAYMENTTYPEID= (int)enums.extPaymentType.CreditPayment;

        public int ccPaymentID;
        public string ccPaymentDescription;

        public ccPayment() { }
        public ccPayment(int paymentID): base(paymentID)
        {
            this.loadByPaymentID(paymentID);
        }

        public new void createNew(int payerEntityID, int payeeEntityID, decimal amount, int currencyID, int cardID)
        {
            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {
                base.createNew(payerEntityID, payeeEntityID, amount, currencyID, cardID, (int)enums.extPaymentType.CreditPayment);

                var _ccPayment = new AccountingLib.Models.ccPayment()
                {
                    extPaymentID=base.extPaymentID
                };
                ctx.ccPayment.AddObject(_ccPayment);
                ctx.SaveChanges();

                this.loadByPaymentID((int)_ccPayment.externalPayment.paymentID);

                ts.Complete();
            }
        }

        public new void loadByPaymentID(int paymentID)
        {
            using (var ctx = new AccContexts())
            {
                var ccPaymentrecord = ctx.ccPayment
                    .Where(x => x.externalPayment.paymentID == paymentID)
                    .SingleOrDefault();

                if (ccPaymentrecord == null)
                    throw new Exception("no such a cc Payment Exists");

                this.ccPaymentID = ccPaymentrecord.ID;
                this.extPaymentID = (int)ccPaymentrecord.extPaymentID;
                this.ccPaymentDescription = ccPaymentrecord.description;

                /*base.paymentID = (int)ccPaymentrecord.externalPayment.paymentID;
                base. = (int)ccPaymentrecord.externalPayment;
                base. = (int)ccPaymentrecord.externalPayment;
                */

            }
        }
    }
  
}
