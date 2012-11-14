using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using Accounting;
using Accounting.Models;
using System.Transactions;

namespace accounting.classes
{
    public abstract class Card
    {
        public int cardID;
        public string cardNumber;
        public DateTime expiryDate;

        public virtual void create()
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                var newCard = new Accounting.Models.card()
                {
                    cardNumber = this.cardNumber,
                    expiryDate = this.expiryDate
                };
                ctx.card.AddObject(newCard);
                ctx.SaveChanges();

                this.cardID = newCard.ID;
                this.cardNumber = newCard.cardNumber;
                this.expiryDate = (DateTime)newCard.expiryDate;

                ts.Complete();
            }
        }
    }
}
