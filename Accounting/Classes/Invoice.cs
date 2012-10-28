using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting.Models;

namespace Accounting.Classes
{
    public class Invoice:IInvoice
    {
        protected int sender_id { set; get; }
        protected int receiver_id { set; get; }
        protected decimal amount { set; get; }
        protected int currency_id { set; get; }
        protected string timestamp { set; get; }
        protected int service_id { set; get; }

        public void createNewByExistingPersons(int senderId, int receiverId, int serviceId, decimal amount, int currencyId)
        {
            using (var ctx = new AccContext()) 
            {
                var newIncoice=new Models.invoice()
                {
                    receiver_id=receiverId,
                    sender_id=senderId,
                    timestamp=DateTime.Now.Ticks.ToString(),
                    amount=amount,
                    currency_id=currencyId
                };
                ctx.invoice.AddObject(newIncoice);
                ctx.SaveChanges();

            }
        }

        public invoiceOperationStatus Create(int sender_id, int receiver_id, decimal amount, int currency_id, string timestamp, int service_id)
        {
            using (var ctx = new AccContext())
            {
                var newAPAccount = new invoice()
                {
                    receiver_id = receiver_id,
                    sender_id = sender_id,
                    amount = amount,
                    currency_id = currency_id,
                    timestamp = timestamp,
                    service_id = service_id
                };

                return accountOperationStatus.Approved;
            }
        }

        public void createNewDraft()
        {
            throw new NotImplementedException();
        }

        public void createNewFromDraft(IInvoice Draft)
        {
            throw new NotImplementedException();
        }

        public void Finalize()
        {
            throw new NotImplementedException();
        }

        public void PayByCard()
        {
            throw new NotImplementedException();
        }

        public void PayInternally()
        {
            throw new NotImplementedException();
        }

        public void setCurrency(ICurrency currency)
        {
            throw new NotImplementedException();
        }

        
    }
}
