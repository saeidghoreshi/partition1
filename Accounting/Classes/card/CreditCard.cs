using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting;
using Accounting.Models;
using System.Transactions;

using Accounting;
using Accounting.Classes;
using Accounting.Classes.Card;

namespace Accounting.Classes.Card.CreditCard
{
    public abstract class CreditCard : Card
    {
        public readonly int cardTypeID = (int)Enums.cardType.CreditCard;

        protected Models.ccCard create(string cardNumber, DateTime expiryDate)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                ///
                /// create New Card at first
                ///
                base.create(cardNumber, expiryDate);

                ///
                /// create new Credit card at second
                ///

                var newCCCard = new Models.ccCard()
                {
                    cardID=base.CARD.ID,
                    cardTypeID=this.cardTypeID
                };
                ctx.ccCard.AddObject(newCCCard);
                ctx.SaveChanges();

                ts.Complete();
                return newCCCard;
            }
        }
        
    }
}
