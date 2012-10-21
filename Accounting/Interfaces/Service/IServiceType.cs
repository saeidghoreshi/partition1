using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces.Service
{
    public enum ServiceavalibilityType { Available=1,Unavailable=2,Unknown=3 }
    public interface IServiceType
    {
        IOperationStat CreateNew(string ServiceName);
        IOperationStat SetAvailibility(ServiceavalibilityType srvAvailType);
        IOperationStat getAvailibility();
    }
}
