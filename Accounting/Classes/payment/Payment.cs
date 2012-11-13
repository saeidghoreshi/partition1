using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Classes.Enums;
using Accounting.Models;
using System.Transactions;

namespace Accounting.Classes
{
    public abstract class Payment
    {
        public int paymentID;
        public int payerEntityID;
        public int payeeEntityID;
        public decimal amount;
        public int currencyID;

        protected Payment() { } 

        public virtual void pay(int payerEntityID,int payeeEntityID,decimal amount,int currencyID) 
        {
            using (var ctx = new AccContext())
            {
                var _payment = new Models.payment()
                {
                    payerEntityID=payerEntityID,
                    payeeEntityID=payeeEntityID,
                    amount=amount,
                    currencyID=currencyID
                };
                ctx.payment.AddObject(_payment);
                ctx.SaveChanges();

                this.mapData(_payment);
            }
        }

        /// <summary>
        /// convert payment record from model to class data and renew class stat
        /// </summary>
        /// <param name="payment"></param>
        private void mapData(Models.payment payment) 
        {
            this.paymentID = payment.ID;
            this.payerEntityID = (int)payment.payerEntityID;
            this.payeeEntityID = (int)payment.payeeEntityID;
            this.amount = (decimal)payment.amount;
            this.currencyID = (int)payment.currencyID;
        }
    }

}
