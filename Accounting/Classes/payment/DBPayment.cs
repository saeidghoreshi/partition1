using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.enums;
using Accounting.Models;
using System.Transactions;

namespace accounting.classes
{

    public class dbPayment : externalPayment
    {
        protected readonly int EXTPAYMENTTYPEID = (int)enums.extPaymentType.InteracPayment;

        public int dbPaymentID;
        public int extPaymentTypeID;
        public string dbPaymentDescription;

        public dbPayment(int cardID) : base(cardID) { }


        public override void pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                base.pay(payerEntityID, payeeEntityID, amount, currencyID);

                var _dbPayment = new Accounting.Models.dbPayment()
                {
                    extPaymentID = base.extPaymentID,
                    extPaymentTypeID = this.EXTPAYMENTTYPEID
                };
                ctx.dbPayment.AddObject(_dbPayment);
                ctx.SaveChanges();

                ts.Complete();

                this.mapData(_dbPayment);

            }
        }

        /// <summary>
        /// convert payment record from model to class data and renew class stat
        /// </summary>
        /// <param name="payment"></param>
        private void mapData(Accounting.Models.dbPayment dbPayment)
        {
            this.dbPaymentID= dbPayment.ID;
            this.extPaymentID = (int)dbPayment.extPaymentID;
            this.extPaymentTypeID = (int)dbPayment.extPaymentTypeID;
            this.extPaymentDescription = (string)dbPayment.description;
        }
    }

}
