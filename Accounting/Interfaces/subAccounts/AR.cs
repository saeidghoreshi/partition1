using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Classes;

namespace Accounting.Interfaces.subAccounts
{
    public class ARAccount : OEAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.Inc;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }

        
    }
}
