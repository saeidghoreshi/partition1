using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public enum accountStatus{initiated=1,suspended=2,closed=2}
    
    public interface IAccount
    {
        IOperationStat initiate();
        IOperationStat suspend();
        IOperationStat close();
        accountStatus getStatus();
        dynamic getAccountInfo();
    }
}
