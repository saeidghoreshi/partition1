using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;

namespace accounting.classes
{
    public class Transaction
    {
        public int ID;
        public int accountID;
        public decimal amouint;

        public static Transaction createNew(int entityID,int catTypeID,decimal amount,int currencyID)
        {
                var newTrans = new AccountingLib.Models.transaction()
                {
                    accountID = Account.getAccount(entityID, catTypeID, currencyID).ID,
                    amount = amount
                };
                ctx.transaction.AddObject(newTrans);
                ctx.SaveChanges();
                return newTrans;
            
        }    
    }
    
}
