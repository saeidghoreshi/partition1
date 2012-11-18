using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.enums;
using Accounting.Models;
using System.Transactions;

namespace accounting.classes
{
    public class ccPayment : externalPayment
    {
        public readonly int EXTPAYMENTTYPEID= (int)enums.extPaymentType.CreditPayment;

        public int ccPaymentID;
        public int extPaymentTypeID;
        public string ccPaymentDescription;

        public ccPayment() { }
        public ccPayment(int paymentID): base(paymentID)
        {
            this.loadByPaymentID(paymentID);
        }

        public  void loadByPaymentID(int paymentID) 
        {
            using (var ctx = new AccContext())
            {
               base.loadByPaymentID(paymentID);

                var ccPaymentrecord = ctx.ccPayment
                    .Where(x => x.externalPayment.paymentID == paymentID)
                    .Select(x => new
                    {
                        ccPaymentID = x.ID,
                        description = x.description
                    })
                    .SingleOrDefault();

                if (ccPaymentrecord == null)
                    throw new Exception("no such a cc Payment Exists");

                this.ccPaymentID = ccPaymentrecord.ccPaymentID;
                this.ccPaymentDescription = ccPaymentrecord.description;
            }
        }

        public override void NewPayment(int payerEntityID, int payeeEntityID, decimal amount, int currencyID, int cardID)
        {
            
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                base.NewPayment(payerEntityID, payeeEntityID, amount, currencyID,cardID);
                
                var _ccPayment = new Accounting.Models.ccPayment()
                {
                    extPaymentID=base.extPaymentID,
                    extPaymentTypeID=this.EXTPAYMENTTYPEID
                };
                ctx.ccPayment.AddObject(_ccPayment);
                ctx.SaveChanges();

                this.loadByPaymentID((int)_ccPayment.externalPayment.paymentID);
                ts.Complete();

                
            }
        }
    }
  
}
