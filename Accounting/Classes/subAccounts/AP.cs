using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Classes;
using Accounting.Models;
using Accounting.Classes.Enums;

namespace Accounting.Interfaces.subAccounts
{
    public class APAccount : LibAccount
    {
        private int catType = LIB.Value;
        public int CATTYPE { get { return catType; } }


        public accountOperationStatus Create(int ownerEntityId,int currencyID,decimal balance=0)
        {
            using(var ctx=new  AccContext())
            {
                var newAccount = new account()
                {
                    catTypeID=CATTYPE,
                    ownerEntityID=ownerEntityId,
                    currencyID=currencyID,
                    balance=balance
                };
                ctx.account.AddObject(newAccount);
                ctx.SaveChanges();
                return accountOperationStatus.Approved;
            }
        }
    }
}
