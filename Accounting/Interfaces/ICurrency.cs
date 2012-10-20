using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;

namespace Accounting.Interfaces
{
    public enum currencyType { Real=1,UnReal=2 }
    public enum currencyStatus { Active = 1, Inactive = 2 }
    public interface ICurrency 
    {
        IOperationStat crateNew(string CurrencyName , currencyType currencyType);
        IOperationStat setStatus(currencyStatus status);
    }
    public class Currency:ICurrency
    {
        public IOperationStat crateNew(string CurrencyName, currencyType currencyType)
        {
            throw new NotImplementedException();
        }

        public IOperationStat setStatus(currencyStatus status)
        {
            throw new NotImplementedException();
        }
    }
}
