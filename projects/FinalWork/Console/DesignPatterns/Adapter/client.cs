using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Console_DP.AdapterDP.Interfaces;
using Console_DP.AdapterDP.Implementations;

namespace Console_DP.AdapterDP
{
   public class client
   {
        public void Run()
        {
            Iformatter chosenFormatter= new FormatterImplementationsV1();
            var _component = new component<Iadapter>(chosenFormatter);
            
            Iadapter ada = _component.passAdapter();
            
            ada.connect();
            ada.disconnect();
        }
   }
}
