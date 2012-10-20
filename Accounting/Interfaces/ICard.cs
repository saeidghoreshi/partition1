using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface ICard
    {
        IOperationStat Initiate(string CardNumber,DateTime expiryDate);
        IOperationStat setFee(IFee fee);
    }
    
}
