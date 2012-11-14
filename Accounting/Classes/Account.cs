using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using accounting.classes;
using accounting.classes.enums;
using Accounting.Models;

namespace accounting.classes
{   
    public abstract class Account
    {
        public static Accounting.Models.account getAccount(int entityID,int catTypeID)
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
