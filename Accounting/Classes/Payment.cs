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
        private Models.payment pay(int payerEntityID,int payeeEntityID,decimal amount,int currencyID) {

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
                return _payment;
            }
        }
    }
    
    public class externalPayment : Payment
    {
        public readonly int paymentTypeId = (int)Enums.paymentType.External;
        
        public override Models.payment pay(int invoiceID, int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
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

    public class internalPayment : Payment
    {
        public readonly int paymentTypeId = (int)Enums.paymentType.Internal;

        public override Models.payment pay(int invoiceID, int payerEntityID, int payeeEntityID, decimal amount, int currencyID)
        {
            return base.pay(invoiceID, payerEntityID, payeeEntityID, amount, currencyID, this.paymentTypeId);
        }
    }
}
