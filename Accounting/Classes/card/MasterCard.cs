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


namespace Accounting.Classes.Card.CreditCard.MasterCard
{
    
    public class MasterCard : CreditCard 
    {
        public readonly int ccCardTypeID= (int)Enums.ccCardType.MC;

        public new Models.mcCard create(string cardNumber, DateTime expiryDate) 
        {
            using(var ctx=new AccContext())
            using (var ts= new TransactionScope())
            {
                ///
                /// create New Credit Card at first
                ///
                var CCCARD=base.create(cardNumber, expiryDate);

                ///
                /// create new Master Card at second
                ///

                var newmcCard=new mcCard()
                {
                    ccCardID=CCCARD.ID,
                    ccCardTypeID=this.ccCardTypeID
                };

                ctx.mcCard.AddObject(newmcCard);
                ctx.SaveChanges();

                ts.Complete();
                return newmcCard;
            }
        }
    }
    
}
