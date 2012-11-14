using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using Accounting;
using Accounting.Models;
using System.Transactions;

using Accounting;
using accounting.classes;

namespace accounting.classes.card.creditcard
{
    
    public class MasterCard : CreditCard
    {
        public readonly int CCCARDTYPEID= (int)enums.ccCardType.MC;

        public override void create() 
        {
            using(var ctx=new AccContext())
            using (var ts = new TransactionScope())
            {
                ///
                /// create New Credit Card at first
                ///
                base.create();

                ///
                /// create new Master Card at second
                ///

                var newmcCard = new mcCard()
                {
                    ccCardID = base.ccCardId,
                    ccCardTypeID = this.CCCARDTYPEID
                };

                ctx.mcCard.AddObject(newmcCard);
                ctx.SaveChanges();

                ts.Complete();
            }
        }
    }
    
}
