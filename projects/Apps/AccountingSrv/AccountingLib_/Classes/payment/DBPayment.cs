using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.enums;
using AccountingLib.Models;
using System.Transactions;

namespace accounting.classes
{

    public class dbPayment : externalPayment
    {
        public readonly int EXTPAYMENTTYPEID = (int)enums.extPaymentType.InteracPayment;

        public int dbPaymentID;
        public string dbPaymentDescription;

        public dbPayment() { }
        public dbPayment(int paymentID): base(paymentID)
        {
            this.loadByPaymentID(paymentID);
        }

        public new void createNew(int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int cardID)
        {
            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {
                base.createNew(payerEntityID, payeeEntityID, amount, currencyID, cardID, (int)enums.extPaymentType.InteracPayment);

                var _dbPayment = new AccountingLib.Models.dbPayment()
                {
                    extPaymentID = base.extPaymentID
                };
                ctx.dbPayment.AddObject(_dbPayment);
                ctx.SaveChanges();

                this.loadByPaymentID((int)_dbPayment.externalPayment.paymentID);

                ts.Complete();
            }
        }

        public new void loadByPaymentID(int paymentID)
        {
            using (var ctx = new AccContexts())
            {
                base.loadByPaymentID(paymentID);

                var dbPaymentrecord = ctx.dbPayment
                    .Where(x => x.externalPayment.paymentID == paymentID)
                    .SingleOrDefault();

                if (dbPaymentrecord == null)
                    throw new Exception("no such a cc DB Payment Exists");

                this.dbPaymentID = dbPaymentrecord.ID;
                this.dbPaymentDescription = dbPaymentrecord.description;
            }
        }
    }

}
