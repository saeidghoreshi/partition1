using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using AccountingLib;
using AccountingLib.Models;
using System.Transactions;

using accounting.classes.card;


namespace accounting.classes.card.creditcard
{
    public class VisaCard : CreditCard
    {
        public readonly int CCCARDTYPEID = (int)enums.ccCardType.VISACARD;

        public int visaCardID;

        public VisaCard(): base(){}

        public void New()
        {
            base.createNew((int)enums.ccCardType.VISACARD);

            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {

                var newvisaCard = new visaCard()
                {
                    ccCardID = base.ccCardID
                };

                ctx.visaCard.AddObject(newvisaCard);
                ctx.SaveChanges();

                /*Reload object Props*/
                this.visaCardID = newvisaCard.ID;

                ts.Complete();
            }
        }
    }
}
