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


namespace Accounting.Classes.Card.DebitCard
{
    public abstract class DebitCard : Card
    {
        public readonly int cardTypeID = (int)Enums.cardType.DebitCard;

        
        protected Models.dbCard create(string cardNumber, DateTime expiryDate)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {

                ///
                /// create New Card at first
                ///
                base.create(cardNumber, expiryDate);

                ///
                /// create new Debit card at second
                ///
                var newDBCard = new Models.dbCard()
                {
                    cardID = base.CARD.ID,
                    cardTypeID = this.cardTypeID
                };
                ctx.dbCard.AddObject(newDBCard);
                ctx.SaveChanges();

                ts.Complete();
                return newDBCard;
            }
        }
    }
    
}
