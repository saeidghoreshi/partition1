using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using AccountingLib;
using AccountingLib.Models;
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

        public void New() 
        {
            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {
                base.createNew((int)enums.cardType.DebitCard);

                var newDBCard = new AccountingLib.Models.dbCard()
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
