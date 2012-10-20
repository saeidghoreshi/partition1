using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public enum TransType { Credit =1 , Debit=2}
    public interface ITransactionType
    {
        TransType getStatus();
        IOperationStat setStatus(TransType transType);
    }
}
