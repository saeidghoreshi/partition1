using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using AccountingLib;
using System.Transactions;
using AccountingLib.Models;

namespace accounting.classes
{
    public abstract class Card:Entity
    {
        public int cardID;
        public string cardNumber;
        public int cardTypeID;
        public DateTime expiryDate;

        public Card(){}

        public void createNew(int cardTypeID)
        {
            if (this.cardNumber == null)
                throw new Exception("No Card Number Entered");
            if (this.expiryDate == null)
                throw new Exception("No Expiy Date Entered");

            using (var ctx = new AccContexts())
            using (var ts = new TransactionScope())
            {
                var newCard = new AccountingLib.Models.card()
                {
                    cardTypeID = cardTypeID,
                    cardNumber = this.cardNumber,
                    expiryDate = this.expiryDate
                };
                ctx.card.AddObject(newCard);
                ctx.SaveChanges();

                /*Reload object Props*/
                this.loadByCardID(newCard.ID);

                ts.Complete();
            }
        }
       

        public void loadByCardID(int cardID)
        {
            using (var ctx = new AccContexts())
            {
                var paymentRecord = ctx.card
                    .Where(x => x.ID == cardID)
                    .Select(x => new
                    {
                        cardID = x.ID,
                        cardNumber = x.cardNumber,
                        cardTypeID = x.cardTypeID,
                        expiryDate= (DateTime)x.expiryDate,
                    })
                    .SingleOrDefault();

                if (paymentRecord == null)
                    throw new Exception("no such a Card Exists");

                this.cardID = paymentRecord.cardID;
                this.cardTypeID = (int)paymentRecord.cardTypeID;
                this.cardNumber = paymentRecord.cardNumber;
                this.expiryDate = (DateTime)paymentRecord.expiryDate;
            }
        }
    }
}
