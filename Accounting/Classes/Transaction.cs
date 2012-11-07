using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;

using Accounting.Models;

namespace Accounting.Classes
{
    public class Transaction
    {
        public static Models.transaction createNew(int entityID,int catTypeID,decimal amount)
        {
            using (var ctx = new AccContext())
            {
                var newTrans = new Models.transaction()
                {
                    accountID = Account.getAccount(entityID,catTypeID).ID,
                    amount = amount
                };
                ctx.transaction.AddObject(newTrans);
                ctx.SaveChanges();
                return newTrans;
            }
        }    
    }
    
}
