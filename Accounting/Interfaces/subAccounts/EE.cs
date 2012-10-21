using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Classes;

namespace Accounting.Interfaces.subAccounts
{
    public class EEAccount : OEAccount, IAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.Inc;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }

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
}
