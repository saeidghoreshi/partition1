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
        void createNewCurrency(string CurrencyName , int currencyType);
        void setStatus(currencyStatus status);
    }
    
}
