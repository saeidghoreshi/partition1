using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Classes;
using Accounting.Models;
using Accounting.Classes.Enums;

namespace Accounting.Interfaces.subAccounts
{
    public class CCCASHAccount : AssetAccount
    {
        public readonly int CATTYPE = AssetCategories.CCCASH;

        public accountOperationStatus Create(int ownerEntityId,int currencyID,decimal balance=0)
        {
            using(var ctx=new  AccContext())
            {
                var duplicate = ctx.account
                    .Where(x => x.ownerEntityID == ownerEntityId && x.currencyID == currencyID && x.catTypeID ==CATTYPE)
                    .SingleOrDefault();
                if (duplicate != null)
                    ctx.DeleteObject(duplicate);
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
