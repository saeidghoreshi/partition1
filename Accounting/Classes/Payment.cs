using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Classes.Enums;
using Accounting.Models;
using System.Transactions;

namespace Accounting.Classes
{
    public class Payment
    {
        private Models.payment doPayment(int payerEntityID,int payeeEntityID,decimal amount,int currencyID,int paymentTypeID) {

            using (var ctx = new AccContext())
            {
                var _payment = new Models.payment()
                {
                    payerTypeID=payerEntityID,
                    payeeTypeID=payeeEntityID,
                    amount=amount,
                    currencyID=currencyID,
                    paymentTypeID=paymentTypeID
                };
                ctx.payment.AddObject(_payment);
                ctx.SaveChanges();
                return _payment;
            }
        }
        public virtual Models.invoicePayment payInvoice(int invoiceID, int payerEntityID, int payeeEntityID, decimal amount, int currencyID,int paymentTypeID)
        {
            using (var ctx = new AccContext())
            using (var ts=new TransactionScope())
            {
                var payment=this.doPayment(payerEntityID,payeeEntityID,amount,currencyID,paymentTypeID);

                var invoicePay= new Models.invoicePayment()
                {
                    invoiceID = invoiceID,
                    paymentID = payment.ID
                };
                ctx.invoicePayment.AddObject(invoicePay);
                ctx.SaveChanges();
                return invoicePay;
            }
            
        }
    }
    public class internalPayment : Payment
    {
        public override Models.invoicePayment payInvoice(int invoiceID, int payerEntityID, int payeeEntityID, decimal amount, int currencyID, int paymentTypeID)
        {
            return base.payInvoice(invoiceID, payerEntityID, payeeEntityID, amount, currencyID,paymentTypeID);
        }
    }
    public class externalPayment : Payment
    {
        public readonly int paymentTypeId = (int)Enums.paymentType.External;
        //public static 
        public override paymentOperationStatus payInvoice(int invoiceID, int payerEntityID, int payeeEntityID, decimal amount, int currencyID, int paymentTypeID)
        {
            using (var ctx = new AccContext())
            using (var ts=new TransactionScope())
            {
                Models.invoicePayment invoiePayment = base.payInvoice(invoiceID, payerEntityID, payeeEntityID, amount, currencyID, paymentTypeID);
                
                var extPay= new Models.externalPayment()
                {
                    paymentID = paymentID
                };
                ctx.invoicePayment.AddObject(invoicePay);
                ctx.SaveChanges();
            }
            return paymentOperationStatus.Approved;
        }
    }
}
