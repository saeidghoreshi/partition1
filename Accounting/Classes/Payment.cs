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


        protected Models.payment pay(int payerEntityID,int payeeEntityID,decimal amount,int currencyID) 
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

                this.pushClassData(_payment);

                return _payment;
            }
        }
        /// <summary>
        /// convert payment record from model to class data and renew class stat
        /// </summary>
        /// <param name="payment"></param>
        private void pushClassData(Models.payment payment) 
        {
            this.paymentID = payment.ID;
            this.payerEntityID = (int)payment.payerEntityID;
            this.payeeEntityID = (int)payment.payeeEntityID;
            this.amount = (decimal)payment.amount;
            this.currencyID = (int)payment.currencyID;
        }
    }
    
    public abstract class externalPayment : Payment
    {
        public readonly int PAYMENTTYPEID = (int)Enums.paymentType.External;

        public int extPaymentID;
        public int paymentID;
        public int paymentTypeID;
        public string extPaymentDescription;
        public int cardID;

        protected Models.externalPayment pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int cardID)
        {
            using (var ctx = new AccContext())
            using (var ts=new TransactionScope())
            {
                var _payment= base.pay(payerEntityID, payeeEntityID, amount, currencyID);
                
                var _extPayment= new Models.externalPayment()
                {
                    paymentID=_payment.ID,
                    paymentTypeID = this.PAYMENTTYPEID,
                    cardID=cardID
                };
                ctx.externalPayment.AddObject(_extPayment);
                ctx.SaveChanges();

                ts.Complete();
                this.pushClassData(_extPayment);

                return _extPayment;
            }
        }
        /// <summary>
        /// convert payment record from model to class data and renew class stat
        /// </summary>
        /// <param name="payment"></param>
        private void pushClassData(Models.externalPayment extPayment)
        {
            this.extPaymentID= extPayment.ID;
            this.paymentID = (int)extPayment.paymentID;
            this.paymentTypeID = (int)extPayment.paymentTypeID;
            this.extPaymentDescription = (string)extPayment.description;
            this.cardID = (int)extPayment.cardID;
        }
    }

    public class ccPayment : externalPayment
    {
        public readonly int EXTPAYMENTTYPEID= (int)Enums.extPaymentType.CreditPayment;

        
        public int ccPaymentID;
        public int extPaymentID;
        public int extPaymentTypeID;
        public string ccPaymentDescription;
        
        public new Models.ccPayment pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int cardID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                var extPayment=base.pay(payerEntityID, payeeEntityID, amount, currencyID,cardID);

                var _ccPayment = new Models.ccPayment()
                {
                    extPaymentID=extPayment.ID,
                    extPaymentTypeID=this.EXTPAYMENTTYPEID
                };
                ctx.ccPayment.AddObject(_ccPayment);
                ctx.SaveChanges();

                ts.Complete();

                this.pushClassData(_ccPayment);

                return _ccPayment;
            }
        }
        /// <summary>
        /// convert payment record from model to class data and renew class stat
        /// </summary>
        /// <param name="payment"></param>
        private void pushClassData(Models.ccPayment ccPayment)
        {
            this.ccPaymentID = ccPayment.ID;
            this.extPaymentID = (int)ccPayment.extPaymentID;
            this.extPaymentTypeID = (int)ccPayment.extPaymentTypeID;
            this.ccPaymentDescription = (string)ccPayment.description;
        }
    }
    public class dbPayment : externalPayment
    {
        protected readonly int EXTPAYMENTTYPEID = (int)Enums.extPaymentType.InteracPayment;

        public int dbPaymentID;
        public int extPaymentID;
        public int extPaymentTypeID;
        public string dbPaymentDescription;

        public new Models.dbPayment pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID, int cardID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                var extPayment= base.pay(payerEntityID, payeeEntityID, amount, currencyID, cardID);

                var _dbPayment = new Models.dbPayment()
                {
                    extPaymentID = extPayment.ID,
                    extPaymentTypeID = this.EXTPAYMENTTYPEID
                };
                ctx.dbPayment.AddObject(_dbPayment);
                ctx.SaveChanges();

                ts.Complete();

                this.pushClassData(_dbPayment);

                return _dbPayment;
            }
        }

        /// <summary>
        /// convert payment record from model to class data and renew class stat
        /// </summary>
        /// <param name="payment"></param>
        private void pushClassData(Models.dbPayment dbPayment)
        {
            this.dbPaymentID= dbPayment.ID;
            this.extPaymentID = (int)dbPayment.extPaymentID;
            this.extPaymentTypeID = (int)dbPayment.extPaymentTypeID;
            this.extPaymentDescription = (string)dbPayment.description;
        }
    }



    public class internalPayment : Payment
    {
        public readonly int PAYMENTTYPEID = (int)Enums.paymentType.Internal;

        public int internalPaymentID;
        public int paymentID;
        public int paymentTypeID;
        public string internalPaymentDescription;

        public new  Models.internalPayment pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                var _payment = base.pay(payerEntityID, payeeEntityID, amount, currencyID);

                var _internalPayment = new Models.internalPayment()
                 {
                     paymentID = _payment.ID,
                     paymentTypeID = this.PAYMENTTYPEID
                 };
                ctx.internalPayment.AddObject(_internalPayment);
                ctx.SaveChanges();

                ts.Complete();
                this.pushClassData(_internalPayment);

                return _internalPayment;
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
        private void pushClassData(Models.internalPayment internalPayment)
        {
            this.internalPaymentID = internalPayment.ID;
            this.paymentID = (int)internalPayment.paymentID;
            this.paymentTypeID = (int)internalPayment.paymentTypeID;
            this.internalPaymentDescription = (string)internalPayment.description;
        }
    }
}
