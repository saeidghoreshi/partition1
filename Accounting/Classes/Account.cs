using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Accounting.Interfaces;

namespace Accounting.Classes
{
    public enum GLTYPE { Asset=1,OE=2,Lib=3}
    public enum CATEGORYTYPE { Inc=1,Exp=2,AR=3,AP=4,Wal=5,Dep=6,TA=7,DBCash=8,CCCash=9,PP=10,EE=11}

    public abstract class Account
    {
        
    }
    public abstract class AssetAccount:Account
    {
        GLTYPE AccountTYPE = GLTYPE.Asset;
        GLTYPE TYPE{get{return AccountTYPE;}}
    }
    public abstract class OEAccount:Account
    {
        GLTYPE AccountTYPE = GLTYPE.OE;
        GLTYPE TYPE{get{return AccountTYPE;}}
    }
    public abstract class LibAccount:Account
    {
        GLTYPE AccountTYPE = GLTYPE.Lib;
        GLTYPE TYPE{get{return AccountTYPE;}}
    }

}
