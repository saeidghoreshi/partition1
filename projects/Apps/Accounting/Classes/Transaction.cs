﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;

using Accounting.Models;

namespace accounting.classes
{
    public class Transaction
    {
        public static Accounting.Models.transaction createNew(int entityID,int catTypeID,decimal amount,int currencyID)
        {
            using (var ctx = new AccContexts())
            {
                var newTrans = new Accounting.Models.transaction()
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
    
}