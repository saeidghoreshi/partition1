using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using AccountingLib;
using AccountingLib.Models;
using System.Transactions;


namespace accounting.classes.card.creditcard
{   
    public class MasterCard : CreditCard
    {
        public readonly int CCCARDTYPEID= (int)enums.ccCardType.MASTERCARD;

        public int mcCardID;

        public MasterCard(): base(){}

        public void createNew() 
        {
            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {
                base.createNew((int)enums.ccCardType.MASTERCARD);

                var newmcCard = new mcCard()
                {
                    ccCardID = base.ccCardID
                };

                ctx.mcCard.AddObject(newmcCard);
                ctx.SaveChanges();

                /*Reload object Props*/
                this.mcCardID = newmcCard.ID;
                this.ccCardID = (int)newmcCard.ccCardID;

                ts.Complete();
            }
        }
    }
    
}
