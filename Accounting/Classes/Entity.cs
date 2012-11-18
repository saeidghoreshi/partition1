using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting;
using Accounting.Models;
using accounting.classes.enums;
using System.Transactions;

namespace accounting.classes
{
    public abstract class Entity
    {
        private int entityID;
        public int ENTITYID { get { return entityID; } }
        public List<Accounting.Models.card> cards;

        public void create()
        {
            using (var ctx = new AccContext())
            {
                var newEntity = new Accounting.Models.entity() { };
                ctx.entity.AddObject(newEntity);
                ctx.SaveChanges();

                this.entityID = newEntity.ID;
            }
        }
        
        public  void addCard(int cardID)
        {
            int entityID = (int)this.ENTITYID;

            using (var ctx = new AccContext())
            {
                var person = ctx.person.Where(x => x.entityID == entityID).SingleOrDefault();
                var newEntityCard = new Accounting.Models.entityCard()
                {
                    entityID = this.ENTITYID,
                    CardID = cardID
                };
                ctx.entityCard.AddObject(newEntityCard);
                ctx.SaveChanges();

            }
        }

        public List<Accounting.Models.card> fetchCards()
        {
            using (var ctx = new AccContext())
            {
                var cardsList = ctx.entityCard
                    .Where(x => x.entityID == this.ENTITYID)
                    .Select(x => x.card).ToList();

                this.cards = cardsList;

                return cardsList;
            }
        }

        public void addWalletMoney(decimal amount, string title, int currencyID) 
        {
            using(var ts=new TransactionScope())
            using(var ctx=new Accounting.Models.AccContext())
            {
                //Record related transctions
                List<Accounting.Models.transaction> transactions = new List<transaction>();
                var trans1 = Transaction.createNew(this.ENTITYID, (int)AssetCategories.W, +1 * (decimal)amount, currencyID);
                transactions.Add(trans1);
                var trans2 = Transaction.createNew(this.ENTITYID, (int)AssetCategories.CCCASH, -1 * (decimal)amount, currencyID);
                transactions.Add(trans2);

                //Record Wallet entity and walletEntityTransaction
                var entityWallet = new Accounting.Models.entityWallet() 
                {
                    entityID=this.ENTITYID,
                    amount=amount,
                    title=title,
                    currencyID=currencyID
                };
                ctx.entityWallet.AddObject(entityWallet);
                ctx.SaveChanges();

                foreach(var txn in transactions)
                {
                    var entityWalletTxn = new Accounting.Models.entityWalletTransaction()
                    {
                        entityWalletID = entityWallet.ID,
                        transactionID = txn.ID
                    };
                    ctx.entityWalletTransaction.AddObject(entityWalletTxn);
                    ctx.SaveChanges();
                }
                
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
        public virtual void payInvoiceByCC(classes.Invoice inv, decimal amount, int cardID, enums.ccCardType cardType)
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
        public virtual void payInvoiceByInterac(classes.Invoice inv, decimal amount, int cardID)
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
        public virtual void payInvoiceByInternal(classes.Invoice inv, decimal amount)
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
