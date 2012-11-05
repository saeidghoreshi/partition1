using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting;
using Accounting.Models;
using Accounting.Classes.Enums;

namespace Accounting.Classes
{
    public class Invoice
    {
        public Models.invoice createInvoice(int payerEntityID,int payeeEntityID,int currencyID)
        {
            using (var ctx = new AccContext()) 
            {
                var newInvoice = new Models.invoice()
                {
                    payeeEntityID=payeeEntityID,
                    payerEntityID=payerEntityID,
                    currencyID=currencyID
                };
                ctx.invoice.AddObject(newInvoice);
                ctx.SaveChanges();
                return newInvoice;
            }
        }
        public invoiceService addService(int serviceID,int invoiceID,int currencyID,decimal amount) 
        {
            using (var ctx = new AccContext())
            {
                var newInvoiceService= new Models.invoiceService()
                {
                    invoiceID=invoiceID,
                    serviceID=serviceID,
                    currencyID=currencyID,
                    amount=amount
                };
                ctx.invoiceService.AddObject(newInvoiceService);
                ctx.SaveChanges();
                return newInvoiceService;
            }
        }
    }
}
