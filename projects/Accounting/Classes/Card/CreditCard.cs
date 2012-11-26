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
    public class CreditCard : Card
    {
        public readonly int CARDTYPEID = (int)enums.cardType.CreditCard;

        public int ccCardID;
        
        public CreditCard(): base(){}

        public new void createNew(int ccCardTypeID)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                base.createNew((int)enums.cardType.CreditCard);

                var newCCCard = new Accounting.Models.ccCard()
                {
                    cardID = base.cardID,
                    ccCardTypeID = ccCardTypeID
                };
                ctx.ccCard.AddObject(newCCCard);
                ctx.SaveChanges();

                /*Reload the object props*/
                this.cardID = (int)newCCCard.cardID;
                this.ccCardID = newCCCard.ID;

                ts.Complete();
            }
        }
    }
}
