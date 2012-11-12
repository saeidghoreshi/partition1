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
        protected Models.payment payment;
        public Models.payment PAYMENTRECORD { get { return payment; } }

        protected void pay(int payerEntityID,int payeeEntityID,decimal amount,int currencyID) {

            using (var ctx = new AccContext())
            {
                var _payment = new Models.payment()
                {
                    payerTypeID=payerEntityID,
                    payeeTypeID=payeeEntityID,
                    amount=amount,
                    currencyID=currencyID
                };
                ctx.payment.AddObject(_payment);
                ctx.SaveChanges();
                this.payment=_payment;
            }
        }
    }
    
    public abstract class externalPayment : Payment
    {
        protected readonly int paymentTypeId = (int)Enums.paymentType.External;

        protected Models.externalPayment extPayment;
        public Models.externalPayment EXTPAYMENTRECORD { get{return extPayment;} }

        protected void pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int cardID)
        {
            using (var ctx = new AccContext())
            using (var ts=new TransactionScope())
            {
                base.pay(payerEntityID, payeeEntityID, amount, currencyID);
                
                var _extPay= new Models.externalPayment()
                {
                    paymentID=base.payment.ID,
                    paymentTypeID=this.paymentTypeId,
                    cardID=cardID
                };
                ctx.externalPayment.AddObject(_extPay);
                ctx.SaveChanges();
                this.extPayment=_extPay;
            }
        }
    }
    public class ccExtPayment : externalPayment
    {
        protected readonly int extPaymentTypeId = (int)Enums.extPaymentType.CreditPayment;


        protected Models.ccPayment ccextPayment;
        public Models.ccPayment CCEXTPAYMENTRECORD { get { return ccextPayment; } }

        public new void pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int cardID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                base.pay(payerEntityID, payeeEntityID, amount, currencyID,cardID);

                var ccExtPay = new Models.ccPayment()
                {
                    extPaymentID=base.extPayment.ID,
                    extPaymentTypeID=this.extPaymentTypeId
                };
                ctx.ccPayment.AddObject(ccExtPay);
                ctx.SaveChanges();
                this.ccextPayment=ccExtPay;
            }
        }
    }
    public class dbExtPayment : externalPayment
    {
        protected readonly int extPaymentTypeId = (int)Enums.extPaymentType.InteracPayment;


        protected Models.ccPayment dbextPayment;
        public Models.ccPayment DBEXTPAYMENTRECORD { get { return dbextPayment; } }

        public new void pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID, int cardID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                base.pay(payerEntityID, payeeEntityID, amount, currencyID, cardID);

                var dbExtPay = new Models.ccPayment()
                {
                    extPaymentID = base.extPayment.ID,
                    extPaymentTypeID = this.extPaymentTypeId
                };
                ctx.ccPayment.AddObject(ccExtPay);
                ctx.SaveChanges();
                this.dbextPayment = dbExtPay;
            }
        }
    }










    public class internalPayment : Payment
    {
        public readonly int paymentTypeId = (int)Enums.paymentType.Internal;

        public Models.payment Pay(int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            base.pay( payerEntityID, payeeEntityID, amount, currencyID);
            return base.payment;
        }
        
    }
}
