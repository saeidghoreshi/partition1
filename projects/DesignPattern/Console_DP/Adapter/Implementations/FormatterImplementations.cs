using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Console_DP.AdapterDP.Interfaces;

namespace Console_DP.AdapterDP.Implementations
{
    public class FormatterImplementationsV1:Iformatter
    {
        public string print(string key,string value)
        {
            return string.Format("{0}  --  {1}",key,value);
        }
    }
}
