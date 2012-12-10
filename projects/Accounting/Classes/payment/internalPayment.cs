using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.enums;
using Accounting.Models;
using System.Transactions;

namespace accounting.classes
{
    
    public class internalPayment : Payment
    {
        public readonly int PAYMENTTYPEID = (int)enums.paymentType.Internal;

        public int internalPaymentID;
        public string internalPaymentDescription;

        public internalPayment() { }
        public internalPayment(int paymentID): base(paymentID)
        {
            this.loadByPaymentID(paymentID);
        }

        public void createNew(int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {
                base.createNew(payerEntityID, payeeEntityID, amount, currencyID, (int)enums.paymentType.Internal);

                var _internalPayment = new Accounting.Models.internalPayment()
                 {
                     paymentID = base.paymentID
                 };
                ctx.internalPayment.AddObject(_internalPayment);
                ctx.SaveChanges();

                this.loadByPaymentID((int)_internalPayment.paymentID);

                ts.Complete();

            }
        }
        public new void loadByPaymentID(int paymentID)
        {
            using (var ctx = new AccContexts())
            {
                base.loadByPaymentID(paymentID);

                var internalPaymentRecord = ctx.internalPayment
                    .Where(x => x.paymentID == paymentID)
                    .SingleOrDefault();

                if (internalPaymentRecord == null)
                    throw new Exception("no such a EXT Payment Exists");

                this.internalPaymentID = internalPaymentRecord.ID;
                this.internalPaymentDescription = internalPaymentRecord.description;
            }
        }
        
    }
}
