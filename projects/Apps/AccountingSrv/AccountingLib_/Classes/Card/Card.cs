using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using System.Transactions;
using dbLayer;
using System.Data;

namespace accounting.classes
{
    public abstract class Card
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

            
            using (var ts = new TransactionScope())
            {
                sqlServer db = new sqlServer();
                List<sqlServerPar> pars = new List<sqlServerPar>();
                sqlServerPar ctID = new sqlServerPar() { dbType = SqlDbType.Int, name = "cardTypeID", value = cardTypeID }; pars.Add(ctID);
                sqlServerPar cnID = new sqlServerPar() { dbType = SqlDbType.Int, name = "cardNumber", value = this.cardNumber }; pars.Add(cnID);
                sqlServerPar edID = new sqlServerPar() { dbType = SqlDbType.Int, name = "expiryDate", value = this.expiryDate}; pars.Add(edID);


                var result = db.storedProc("Accounting.addCard", pars).Tables[0];
                var cardID = Convert.ToInt32(result.Rows[0][0]);
                
                /*Reload object Props*/
                this.loadByCardID(cardID);

                ts.Complete();
            }
        }
        public Bank getCardBank()
        {
            sqlServer db = new sqlServer();
            
            var result=db.query("select ID from accounting.bankCard where cardID="+this.cardID).Tables[0]
                .AsEnumerable().Select(x=>new
                {
                    
                });
            var bankID = Convert.ToInt32(result.Rows[0][0]);

        }

        public void loadByCardID(int cardID)
        {
            sqlServer db = new sqlServer();
            List<sqlServerPar> pars = new List<sqlServerPar>();
            sqlServerPar cID = new sqlServerPar() { dbType = SqlDbType.Int, name = "cardID", value = cardTypeID }; pars.Add(cID);
            db.storedProc("Accounting.getCard", pars);
        }
    }
}
