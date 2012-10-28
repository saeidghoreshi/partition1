using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface ICustomException
    {
        void newExp(string message);
        void LogIt();
        void ReportIt();
    }
}
