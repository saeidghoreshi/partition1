using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Accounting.Interfaces;

namespace Accounting.Classes
{
    public enum GLTYPE { Asset=1,OE=2,Lib=3}
    public enum CATEGORYTYPE { Inc=1,Exp=2,AR=3,AP=4,Wal=5,Dep=6,TA=7,DBCash=8,CCCash=9,PP=10,EE=11}


    public abstract class AssetAccount
    {
        GLTYPE AccountTYPE = GLTYPE.Asset;
        GLTYPE TYPE{get{return AccountTYPE;}}
    }
    public abstract class OEAccount
    {
        GLTYPE AccountTYPE = GLTYPE.OE;
        GLTYPE TYPE{get{return AccountTYPE;}}
    }
    public abstract class LibAccount
    {
        GLTYPE AccountTYPE = GLTYPE.Lib;
        GLTYPE TYPE{get{return AccountTYPE;}}
    }

    //Specific Account Definition

    public class IncAccount:OEAccount, IAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.Inc;
        CATEGORYTYPE TYPE{ get { return CatTYPE; } }

        public IOperationStat initiate()
        {
            throw new NotImplementedException();
        }

        public IOperationStat suspend()
        {
            throw new NotImplementedException();
        }

        public IOperationStat close()
        {
            throw new NotImplementedException();
        }

        public accountStatus getStatus()
        {
            throw new NotImplementedException();
        }

        public dynamic getAccountInfo()
        {
            throw new NotImplementedException();
        }
    }
    public class ExpAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.Exp;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }
    public abstract class ARAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.AR;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }
    public abstract class APAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.AP;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }
    public abstract class WalAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.Wal;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }
    public abstract class DepAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.Dep;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }
    public abstract class TAAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.TA;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }
    public abstract class DBCashAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.DBCash;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }
    public abstract class CCCashAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.CCCash;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }
    public abstract class PPAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.PP;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }
    public abstract class EEAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.EE;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }
    }


    

}
