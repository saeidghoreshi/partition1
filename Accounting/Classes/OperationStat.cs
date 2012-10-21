using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;

namespace Accounting.Classes
{
    public class OperationStat:IOperationStat
    {
        Status status;
        public void setStat(Status status)
        {
            this.status = status;
        }

        public Status getStat()
        {
            return status;
        }
    }
}
