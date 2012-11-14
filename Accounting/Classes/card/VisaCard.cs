using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using Accounting;
using Accounting.Models;
using System.Transactions;

using accounting.classes;
using accounting.classes.card;


namespace accounting.classes.card.creditcard
{
    public class VisaCard : CreditCard
    {
        public readonly int CCCARDTYPEID = (int)enums.ccCardType.Visa;

        
        public override void create()
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                ///
                /// create New Credit Card at first
                ///
                base.create();

                ///
                /// create new Visa Card at second
                ///

                var newvisaCard = new visaCard()
                {
                    ccCardID = base.ccCardId,
                    ccCardTypeID = this.CCCARDTYPEID
                };

                ctx.visaCard.AddObject(newvisaCard);
                ctx.SaveChanges();

                
                ts.Complete();
                
            }
        }
    }
    
}
