using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Accounting.Interfaces;
using Accounting.Classes.Enums;
using Accounting.Models;

namespace Accounting.Classes
{   
    public abstract class Account
    {
        public static Models.account getAccount(int entityID,int catTypeID)
        {
            using(var ctx=new AccContext())
            {
                var account=ctx.account.Where(x=>x.catTypeID==catTypeID && x.ownerEntityID==entityID).SingleOrDefault();
                return account;
            }
        }   
    }
    public abstract class AssetAccount:Account
    {
        public readonly int accountTYPE = ASSET.Value;
    }
    public abstract class OEAccount : Account
    {
        public readonly int accountTYPE = OE.Value;
    }
    public abstract class LibAccount : Account
    {
        public readonly int accountTYPE = LIB.Value;
    }


}
