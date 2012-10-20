using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public enum Status { Rejected = 0, Approved = 1, Unknown = 2 ,Redundant=3,NoAllowed=4 };
    public interface IOperationStat
    {
        void setStat(Status status);
        Status getStat();
    }
}
