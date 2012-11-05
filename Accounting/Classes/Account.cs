using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Accounting.Interfaces;
using Accounting.Classes.Enums;

namespace Accounting.Classes
{   
    public abstract class Account
    {
        protected int ID;
        protected int catTypeID;
        protected int ownerEntityID;
        protected int currencyID;
        protected decimal balance;
    }
    public abstract class AssetAccount:Account
    {
        private int accountTYPE = ASSET.Value;
        public  int ACCOUNTTYPE { get { return accountTYPE; } }
    }
    public abstract class OEAccount : Account
    {
        private int accountTYPE = OE.Value;
        public int ACCOUNTTYPE { get { return accountTYPE; } }
    }
    public abstract class LibAccount : Account
    {
        private int accountTYPE = LIB.Value;
        public int ACCOUNTTYPE { get { return accountTYPE; } }
    }


}
