using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.enums;
using System.Transactions;
using System.Data;
using dbLayer;

namespace accounting.classes
{
    public abstract class Entity
    {
        private int entityID;
        public int ENTITYID { get { return entityID; } }

        public int entityTypeID;
        public List<Card> cards;

        protected void createNew(int entityTypeID)
        {
            sqlServer db = new sqlServer();
            List<sqlServerPar>pars=new List<sqlServerPar>();
            sqlServerPar eTypeID=new sqlServerPar()
            {
                dbType=SqlDbType.Int,
                name="entityTypeID",
                value=entityID
            };
            pars.Add(eTypeID);
            var result=db.runSP("Accounting.createEntity", pars).Tables[0];
            var ID=Convert.ToInt32(result.Rows[0][0].ToString());
                
            /*reload entity*/
            this.entityID = ID;
            
        }
        
        public void assignCard(int cardID)
        {
            int entityID = (int)this.ENTITYID;

            sqlServer db = new sqlServer();
            List<sqlServerPar> pars = new List<sqlServerPar>();
            sqlServerPar cID = new sqlServerPar() { dbType = SqlDbType.Int, name = "cardID", value = cardID }; pars.Add(cID);
            sqlServerPar eID = new sqlServerPar() { dbType = SqlDbType.Int, name = "entityID", value = entityID }; pars.Add(eID);
            
            db.runSP("Accounting.assignCard", pars);
            
        }

        public List<Card> fetchCards()
        {
            sqlServer db = new sqlServer();
            List<sqlServerPar> pars = new List<sqlServerPar>();
            sqlServerPar eID = new sqlServerPar()
            {
                dbType = SqlDbType.Int,
                name = "entityID",
                value = this.ENTITYID
            };
            pars.Add(eID);
            var result=db.runSP("Accounting.addCard",pars).Tables[0];
            
            //convert ot list<Card>
            var cardsList = new List<Card>();
            foreach (dynamic item in result.Rows) 
            {
                cardsList.Add(new Card()
                {
                    cardID=item["cardID"] ,
                    cardNumber = item["cardNumber"] ,
                    cardTypeID=item["cardType"],
                    expiryDate=item["expiryDate"]

                });
            }
            this.cards = cardsList;
            return cardsList;
        }

        protected void addWalletMoney(decimal amount, string title, int currencyID) 
        {
            using(var ts=new TransactionScope())
            
            {
                //Record related transctions
                List<Transaction> transactions = new List<Transaction>();

                var trans1 = Transaction.createNew(this.ENTITYID, (int)AssetCategories.W, +1 * (decimal)amount, currencyID);
                transactions.Add(trans1);
                var trans2 = Transaction.createNew(this.ENTITYID, (int)AssetCategories.CCCASH, -1 * (decimal)amount, currencyID);
                transactions.Add(trans2);

                //Record Wallet entity and walletEntityTransaction
                sqlServer db = new sqlServer();
                List<sqlServerPar> pars = new List<sqlServerPar>();
                sqlServerPar eID = new sqlServerPar() { dbType = SqlDbType.Int, name = "entityID", value = this.ENTITYID }; pars.Add(eID);
                sqlServerPar amt = new sqlServerPar() { dbType = SqlDbType.Decimal, name = "amount", value = amount }; pars.Add(amt);
                sqlServerPar ttl = new sqlServerPar() { dbType = SqlDbType.VarChar, name = "title", value = title }; pars.Add(ttl);
                sqlServerPar cID = new sqlServerPar() { dbType = SqlDbType.Int, name = "currencyID", value = currencyID }; pars.Add(cID);
                var result = db.runSP("Accounting.addEntityWallet", pars).Tables[0];
                var ewID = Convert.ToInt32(result.Rows[0][0]) ;
                
                //manipulate entityWalletTransactions
                List<int>txns=new List<int>();
                foreach(var txn in transactions)
                    txns.Add(txn.ID);
                var txns_Commabased= "";
                foreach(var item in txns.ToArray())
                    txns_Commabased+=item+",";
                if (txns_Commabased != "") 
                    txns_Commabased.Substring(0, txns_Commabased.Length - 1);

                List<sqlServerPar> par = new List<sqlServerPar>();
                sqlServerPar txnspar = new sqlServerPar() { dbType = SqlDbType.VarChar, name = "txns", value = txns_Commabased}; pars.Add(txnspar);
                sqlServerPar ewpar = new sqlServerPar() { dbType = SqlDbType.Int, name = "entityWalletID", value = ewID}; pars.Add(ewpar);
                db.runSP("Accounting.addEntityWalletTxns", par);

                ts.Complete();
            }
        }

        /// <summary>
        /// Just for entittyType {person,Organization}
        /// </summary>
        /// <param name="inv"></param>
        /// <param name="amount"></param>
        /// <param name="cardID"></param>
        /// <param name="cardType"></param>
        protected void payInvoiceByCC(classes.Invoice inv, decimal amount, int cardID, enums.ccCardType cardType)
        {
            inv.doCCExtPayment(amount, cardID, cardType);
        }

        /// <summary>
        /// Just for entittyType {person,Organization}
        /// </summary>
        /// <param name="inv"></param>
        /// <param name="amount"></param>
        /// <param name="cardID"></param>
        /// <param name="cardType"></param>
        protected void payInvoiceByInterac(classes.Invoice inv, decimal amount, int cardID)
        {
            inv.doINTERACPayment(amount, cardID);
        }

        /// <summary>
        /// Just for entittyType {person,Organization}
        /// </summary>
        /// <param name="inv"></param>
        /// <param name="amount"></param>
        /// <param name="cardID"></param>
        /// <param name="cardType"></param>
        protected void payInvoiceByInternal(classes.Invoice inv, decimal amount)
        {
            inv.doINTERNALTransfer(amount);
        }

        /// <summary>
        /// create invoice with services/amount dectionary
        /// </summary>
        /// <param name="receiverEntityID"></param>
        /// <param name="currencyID"></param>
        /// <param name="servicesAmt"></param>
        public classes.Invoice createInvoice(int receiverEntityID,int currencyID,Dictionary<classes.Service,decimal> servicesAmt) 
        {
            var inv = new accounting.classes.Invoice();
            inv.OpenNew(this.ENTITYID, receiverEntityID, currencyID);

            foreach (var item in servicesAmt)
                inv.addService((item.Key as classes.Service).serviceID,item.Value);

            inv.finalizeInvoice();

            return inv;
        }
        
    }
}
