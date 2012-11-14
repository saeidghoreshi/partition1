using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Accounting;
using Accounting.Models;
using System.Transactions;

using accounting.classes;

namespace accounting.classes.card
{
    public abstract class CreditCard : Card
    {
        public readonly int CARDTYPEID = (int)enums.cardType.CreditCard;

        public int ccCardId;


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
                /// create new Credit card at second
                ///

                var newCCCard = new Accounting.Models.ccCard()
                {
                    cardID=base.cardID,
                    cardTypeID=this.CARDTYPEID
                };
                ctx.ccCard.AddObject(newCCCard);
                ctx.SaveChanges();

                this.ccCardId = newCCCard.ID;

                ts.Complete();
            }
        }
        
        
    }
}
