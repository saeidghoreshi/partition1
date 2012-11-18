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

        public override void loadByPaymentID(int paymentID) 
        {
            using (var ctx = new AccContext())
            {
                base.loadByPaymentID(paymentID);

                var internalPaymentRecord = ctx.internalPayment
                    .Where(x => x.paymentID == paymentID)
                    .Select(x => new
                    {
                        internalPaymentID = x.ID,
                        description = x.description
                    })
                    .SingleOrDefault();

                if (internalPaymentRecord == null)
                    throw new Exception("no such a EXT Payment Exists");

                this.internalPaymentID = internalPaymentRecord.internalPaymentID;
                this.internalPaymentDescription = internalPaymentRecord.description;
            }
        }


        public override void New(int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                base.New(payerEntityID, payeeEntityID, amount, currencyID);

                var _internalPayment = new Accounting.Models.internalPayment()
                 {
                     paymentID = base.paymentID,
                     paymentTypeID = this.PAYMENTTYPEID
                 };
                ctx.internalPayment.AddObject(_internalPayment);
                ctx.SaveChanges();

                ts.Complete();

                this.loadByPaymentID((int)_internalPayment.paymentID);

            }
        }
        
    }
}
