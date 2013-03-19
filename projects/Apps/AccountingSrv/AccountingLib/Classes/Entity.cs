using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AccountingLib;
using AccountingLib.Models;
using accounting.classes.enums;
using System.Transactions;

namespace accounting.classes
{
    public abstract class Entity
    {

        public int ENTITYID { get; set; }

        public int entityTypeID;
        public List<AccountingLib.Models.card> cards;

        protected void New(int entityTypeID)
        {
            using (var ctx = new AccContexts())
            {
                var newEntity = new AccountingLib.Models.entity() 
                {
                    entityTypeID = entityTypeID
                };
                ctx.entity.AddObject(newEntity);
                ctx.SaveChanges();

                /*reload entity*/
                this.ENTITYID = newEntity.ID;
            }
        }
        public Bank getBankByCard(int cardID)
        {
            using (var ctx = new AccountingLib.Models.AccContexts())
            {
                var theBank = ctx.entityCard
                    .Where(x => x.CardID == cardID)
                    .Where(x=>x.entity.entityTypeID==(int)enums.entityType.bank)
                    .SingleOrDefault();

                Bank b = new Bank();
                b.loadBankByEntityID((int)theBank.entityID);
                return b;
            }
        }

        public void addCard(int cardID)
        {
            int entityID = (int)this.ENTITYID;

            using (var ctx = new AccContexts())
            {
                var person = ctx.person.Where(x => x.entityID == entityID).SingleOrDefault();
                var newEntityCard = new AccountingLib.Models.entityCard()
                {
                    entityID = this.ENTITYID,
                    CardID = cardID
                };
                ctx.entityCard.AddObject(newEntityCard);
                ctx.SaveChanges();

            }
        }

        public List<AccountingLib.Models.card> fetchCards()
        {
            using (var ctx = new AccContexts())
            {
                var cardsList = ctx.entityCard
                    .Where(x => x.entityID == this.ENTITYID)
                    .Select(x => x.card).ToList();

                this.cards = cardsList;

                return cardsList;
            }
        }

        protected void addWalletMoney(decimal amount, string title, int currencyID) 
        {
            using(var ts=new TransactionScope())
            using(var ctx=new AccountingLib.Models.AccContexts())
            {
                //Record related transctions
                List<int> transactions = new List<int>();
                var trans1 = Transaction.createNew(this.ENTITYID, (int)AssetCategories.W, +1 * (decimal)amount, currencyID);
                transactions.Add(trans1);
                var trans2 = Transaction.createNew(this.ENTITYID, (int)AssetCategories.CCCASH, -1 * (decimal)amount, currencyID);
                transactions.Add(trans2);

                //Record Wallet entity and walletEntityTransaction
                var entityWallet = new AccountingLib.Models.entityWallet() 
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
                    var entityWalletTxn = new AccountingLib.Models.entityWalletTransaction()
                    {
                        entityWalletID = entityWallet.ID,
                        transactionID = txn
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
            inv.New(this.ENTITYID, receiverEntityID, currencyID);

            foreach (var item in servicesAmt)
                inv.addService((item.Key as classes.Service).serviceID,item.Value);

            inv.finalizeInvoice();

            return inv;
        }
        
    }
}
