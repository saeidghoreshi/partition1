using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using System.Diagnostics;

namespace Accounting.Classes
{
    public class CurrencyException:ApplicationException
    {
        public  CurrencyException(string message)
        {
            newExp(message);
        }
        public void newExp(string message)
        {
            Debug.WriteLine(message);
            Console.WriteLine(message);
        }

        public void LogIt()
        {
            throw new NotImplementedException();
        }

        public void ReportIt()
        {
            throw new NotImplementedException();
        }
    }
}
