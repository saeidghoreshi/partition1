using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface IAddress
    {
        IOperationStat setAddress(string aptNo,string streetNo,ICity city,ICountry country);
        dynamic getAddress();
    }

}
