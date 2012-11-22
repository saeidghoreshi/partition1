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
        public readonly int CARDTYPEID = (int)enums.cardType.DebitCard;

        public int dbCardID;

        public DebitCard(): base(){}

        public void createNew() 
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                base.createNew((int)enums.cardType.DebitCard);

                var newDBCard = new Accounting.Models.dbCard()
                {
                    cardID = base.cardID,
                    cardTypeID = this.CARDTYPEID
                };
                ctx.dbCard.AddObject(newDBCard);
                ctx.SaveChanges();

                /*reload object props*/
                this.dbCardID = newDBCard.ID;

                ts.Complete();
            }
        }
    }
    
}
