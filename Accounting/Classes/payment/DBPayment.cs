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


        public override void NewPayment(int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int cardID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                base.NewPayment(payerEntityID, payeeEntityID, amount, currencyID, cardID);

                var _dbPayment = new Accounting.Models.dbPayment()
                {
                    extPaymentID = base.extPaymentID,
                    extPaymentTypeID = this.EXTPAYMENTTYPEID
                };
                ctx.dbPayment.AddObject(_dbPayment);
                ctx.SaveChanges();

                this.loadByPaymentID((int)_dbPayment.externalPayment.paymentID);
                ts.Complete();

            }
        }

        public  void loadByPaymentID(int paymentID)
        {
            using (var ctx = new AccContext())
            {
                base.loadByPaymentID(paymentID);

                var dbPaymentrecord = ctx.dbPayment
                    .Where(x => x.externalPayment.paymentID == paymentID)
                    .Select(x => new
                    {
                        ccPaymentID = x.ID,
                        description = x.description
                    })
                    .SingleOrDefault();

                if (dbPaymentrecord == null)
                    throw new Exception("no such a cc DB Payment Exists");

                this.dbPaymentID = dbPaymentrecord.ccPaymentID;
                this.dbPaymentDescription = dbPaymentrecord.description;
            }
        }
    }

}
