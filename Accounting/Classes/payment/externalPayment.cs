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
        public int paymentID;
        public int paymentTypeID;
        public string extPaymentDescription;
        public int cardID;

        public externalPayment(int cardID):base() 
        {
            this.cardID = cardID;
        } 

        public override void pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            using (var ctx = new AccContext())
            using (var ts=new TransactionScope())
            {
                base.pay(payerEntityID, payeeEntityID, amount, currencyID);

                var _extPayment= new Accounting.Models.externalPayment()
                {
                    paymentID=base.paymentID,
                    paymentTypeID = this.PAYMENTTYPEID,
                    cardID=cardID
                };
                ctx.externalPayment.AddObject(_extPayment);
                ctx.SaveChanges();

                ts.Complete();

                this.mapData(_extPayment);

            }
        }

        /// <summary>
        /// convert payment record from model to class data and renew class stat
        /// </summary>
        /// <param name="payment"></param>
        /// 
        private void mapData(Accounting.Models.externalPayment extPayment)
        {
            this.extPaymentID= extPayment.ID;
            this.paymentID = (int)extPayment.paymentID;
            this.paymentTypeID = (int)extPayment.paymentTypeID;
            this.extPaymentDescription = (string)extPayment.description;
            this.cardID = (int)extPayment.cardID;
        }
    }

   
}
