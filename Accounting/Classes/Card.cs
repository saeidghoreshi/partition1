using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting;
using Accounting.Models;
using System.Transactions;

namespace Accounting.Classes
{
    public abstract class Card
    {
        protected Models.card card;

        public void create(string cardNumber, DateTime expiryDate)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                //create Card
                var newCard = new Models.card()
                {
                    cardNumber = cardNumber,
                    expiryDate = expiryDate
                };
                ctx.card.AddObject(newCard);
                ctx.SaveChanges();

                ts.Complete();
                this.card = newCard;
            }
        }
    }
    
    public abstract class CreditCard : Card
    {
        public readonly int cardType = (int)Enums.cardType.CreditCard;

        private Models.card ccCard;
        public Models.card CCCARD { get { return ccCard; } }


        
    }

    public class MasterCard : CreditCard 
    {
        public readonly int CCCARDTYPE = (int)Enums.ccCardType.MC;

        public Models.mcCard create(string cardNumber, DateTime expiryDate) 
        {
            using(var ctx=new AccContext())
            using (var ts= new TransactionScope())
            {
                //create Card
                var newCard = new Models.card()
                {
                    cardNumber = cardNumber,
                    expiryDate = expiryDate
                };
                ctx.card.AddObject(newCard);
                ctx.SaveChanges();

                //create credit card
                var newCCCard = new Models.ccCard()
                {
                    cardID=newCard.ID,
                    ccCardTypeID=CCCARDTYPE
                };
                ctx.ccCard.AddObject(newCCCard);
                ctx.SaveChanges();
                
                //create Master Card
                var newmcCard=new mcCard()
                {
                    ccCardID=newCCCard.ID
                };

                ctx.mcCard.AddObject(newmcCard);
                ctx.SaveChanges();

                ts.Complete();
                return newmcCard;
            }
        }
    }
    public class VisaCard : CreditCard
    {
        public readonly int CCCARDTYPE = (int)Enums.ccCardType.Visa;

        public Models.visaCard create(string cardNumber, DateTime expiryDate)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                //create Card
                var newCard = new Models.card()
                {
                    cardTypeID = CARDTYPE,
                    cardNumber = cardNumber,
                    expiryDate = expiryDate
                };
                ctx.card.AddObject(newCard);
                ctx.SaveChanges();

                //create credit card
                var newCCCard = new Models.ccCard()
                {
                    cardID = newCard.ID,
                    ccCardTypeID = CCCARDTYPE
                };
                ctx.ccCard.AddObject(newCCCard);
                ctx.SaveChanges();

                //create Master Card
                var newvisaCard = new visaCard()
                {
                    ccCardID = newCCCard.ID
                };

                ctx.visaCard.AddObject(newvisaCard);
                ctx.SaveChanges();

                ts.Complete();
                return newvisaCard;
            }
        }
    }

    public class DebitCard : Card
    {
        public readonly int CARDTYPE = (int)Enums.cardType.DebitCard;

        public Models.dbCard create(string cardNumber, DateTime expiryDate)
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                //create Card
                var newCard = new Models.card()
                {
                    cardTypeID = CARDTYPE,
                    cardNumber = cardNumber,
                    expiryDate = expiryDate
                };
                ctx.card.AddObject(newCard);
                ctx.SaveChanges();

                //create debit card
                var newdbCard = new Models.dbCard()
                {
                    cardID = newCard.ID
                };
                ctx.dbCard.AddObject(newdbCard);
                ctx.SaveChanges();

                
                ts.Complete();
                return newdbCard;
            }
        }
    }
    
}
