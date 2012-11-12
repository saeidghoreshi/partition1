using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting;
using Accounting.Models;
using System.Transactions;

namespace Accounting.Classes.Card
{
    public abstract class Card
    {
        
        protected Models.card create(string cardNumber, DateTime expiryDate)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                var newCard = new Models.card()
                {
                    cardNumber = cardNumber,
                    expiryDate = expiryDate
                };
                ctx.card.AddObject(newCard);
                ctx.SaveChanges();

                ts.Complete();
                return newCard;
            }
        }
    }
}
