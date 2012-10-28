using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public enum accountStatus{initiated=1,suspended=2,closed=2}
    public enum accountOperationStatus { Approved = 1, NotApproved = 2}
    
    public interface IAccount
    {
        accountOperationStatus Create();
        accountOperationStatus Suspend();
        accountOperationStatus Close();
        accountStatus getStatus();
        dynamic getAccountInfo();
    }
}
