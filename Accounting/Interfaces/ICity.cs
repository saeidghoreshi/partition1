using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface ICity
    {
        IOperationStat createNewCity(string Name);
    }
}
