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
        public int paymentTypeID;
        public string internalPaymentDescription;

        public internalPayment():base(){}

        public override void pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                base.pay(payerEntityID, payeeEntityID, amount, currencyID);

                var _internalPayment = new Accounting.Models.internalPayment()
                 {
                     paymentID = base.paymentID,
                     paymentTypeID = this.PAYMENTTYPEID
                 };
                ctx.internalPayment.AddObject(_internalPayment);
                ctx.SaveChanges();

                ts.Complete();

                this.mapData(_internalPayment);

            }
        }
        /// <summary>
        /// convert payment record from model to class data and renew class stat
        /// </summary>
        /// <param name="payment"></param>

        /// <summary>
        /// convert payment record from model to class data and renew class stat
        /// </summary>
        /// <param name="payment"></param>
        private void mapData(Accounting.Models.internalPayment internalPayment)
        {
            this.internalPaymentID = internalPayment.ID;
            this.paymentID = (int)internalPayment.paymentID;
            this.paymentTypeID = (int)internalPayment.paymentTypeID;
            this.internalPaymentDescription = (string)internalPayment.description;
        }
    }
}
