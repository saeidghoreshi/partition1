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


namespace Accounting.Classes.Card.CreditCard.VisaCard
{
    public class VisaCard : CreditCard
    {
        public readonly int ccCardTypeID = (int)Enums.ccCardType.Visa;

        
        public new Models.visaCard create(string cardNumber, DateTime expiryDate)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                ///
                /// create New Credit Card at first
                ///
                var CCCARD=base.create(cardNumber, expiryDate);

                ///
                /// create new Visa Card at second
                ///

                var newvisaCard = new visaCard()
                {
                    ccCardID = CCCARD.ID,
                    ccCardTypeID = this.ccCardTypeID
                };

                ctx.visaCard.AddObject(newvisaCard);
                ctx.SaveChanges();

                ts.Complete();
                return newvisaCard;
            }
        }
    }
    
}
