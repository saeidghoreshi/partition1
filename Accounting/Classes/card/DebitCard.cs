using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Accounting;
using Accounting.Models;
using System.Transactions;

using accounting.classes;
using accounting.classes.card;


namespace accounting.classes.card
{
    public class DebitCard : Card
    {
        public readonly int cardTypeID = (int)enums.cardType.DebitCard;

        public override void create()
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {

                ///
                /// create New Card at first
                ///
                base.create();

                ///
                /// create new Debit card at second
                ///
                var newDBCard = new Accounting.Models.dbCard()
                {
                    cardID = base.cardID,
                    cardTypeID = this.cardTypeID
                };
                ctx.dbCard.AddObject(newDBCard);
                ctx.SaveChanges();

                ts.Complete();
            }
        }
    }
    
}
