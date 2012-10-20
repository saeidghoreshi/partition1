using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;

namespace Accounting.Classes
{
    public class Transaction:ITransactionType
    {
        TransType transType;
        
        public TransType getStatus()
        {
            return this.transType;
        }

        
        public IOperationStat setStatus(TransType transType)
        {
            this.transType = transType;
            var status=new TransactionOpertationStat();
            status.setStat(Status.Approved);
            return status;
        }
    }
    public class TransactionOpertationStat : IOperationStat
    {
        Status stat;
        public void setStat(Status status)
        {
            stat = status;
        }

        public Status getStat()
        {
            return stat;
        }
    }

}
