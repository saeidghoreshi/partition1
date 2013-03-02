<?php     

namespace Accounting;

class Transaction
{
        public static function createNew($entityID, $catTypeID, $amount, $currencyID)
        {
            /*
                var newTrans = new AccountingLib.Models.transaction()
                {
                    accountID = Account.getAccount(entityID, catTypeID, currencyID).ID,
                    amount = amount
                };
                ctx.transaction.AddObject(newTrans);
                ctx.SaveChanges();
                return newTrans;                   
                */
        }    
}
