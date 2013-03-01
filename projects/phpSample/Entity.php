<?php
namespace Accounting;
         
abstract class Entity
{          
    public $ENTITYID ;
    public $entityTypeID;
    public $cards=array();
    

    protected function createNew($entityTypeID)
    {
        //create new entity with entityType and assign it back to this.ENTITYID
    }
    public function getBankByCard($cardID)
    {
        //load the bank
        /*
                .Where(x => x.CardID == cardID)
                .Where(x=>x.entity.entityTypeID==(int)enums.entityType.bank)                                         
        */
            /*
            $b = new \Accounting\Bank();
            $b.loadBankByEntityID(entityID);
            return $b;
            */
    }

    public function addCard($cardID)
    {
        $entityID = $this->ENTITYID;

        //var person = ctx.person.Where(x => x.entityID == entityID).SingleOrDefault();
        //create new rntut card  entityID = this.ENTITYID,CardID = cardID
            
    }

    public function fetchCards()
    {
        /*    var cardsList = ctx.entityCard
                .Where(x => x.entityID == this.ENTITYID)
                .Select(x => x.card).ToList();

            this.cards = cardsList;

            return cardsList;
            */
    }

    protected function addWalletMoney($amount, $title, $currencyID) 
    {          
    /*   
            //Record related transctions
            $transactions = new array();
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
                    transactionID = txn.ID
                };
                ctx.entityWalletTransaction.AddObject(entityWalletTxn);
                ctx.SaveChanges();
            }
                 */
    }
    
    protected function payInvoiceByCC($inv, $amount, $cardID, $cardType)
    {
        //inv.doCCExtPayment(amount, cardID, cardType);
    }
          
    protected function payInvoiceByInterac($inv, $amount, $cardID)
    {
        //inv.doINTERACPayment(amount, cardID);
    }
          
    protected function payInvoiceByInternal($inv, $amount)
    {
        //inv.doINTERNALTransfer(amount);
    }     
    public function createInvoice($receiverEntityID,$currencyID,$servicesAmt) 
    {
        /*
        var inv = new accounting.classes.Invoice();
        inv.New(this.ENTITYID, receiverEntityID, currencyID);

        foreach (var item in servicesAmt)
            inv.addService((item.Key as classes.Service).serviceID,item.Value);

        inv.finalizeInvoice();

        return inv;
        */
    }  
}