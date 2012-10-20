using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface ICountry
    {
        IOperationStat createNewContry(string countryName);
    }
}
