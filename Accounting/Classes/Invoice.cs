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
        public void createNewByExistingPersons(int senderId, int receiverId, int serviceId, decimal amount, int currencyId)
        {
            using (var ctx = new AccContext()) 
            {
                var newIncoice=new Models.Invoice()
                {
                    receiverId=receiverId,
                    senderId=senderId,
                    date=DateTime.Now,
                    amount=amount,
                    currency=currencyId
                };
                ctx.Invoice.AddObject(newIncoice);
                ctx.SaveChanges();

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
