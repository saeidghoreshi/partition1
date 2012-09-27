using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_DP.AdapterDP
{
   public class client
   {
        public void Run()
        {
            var _component=new component<Iadapter>();
            Iadapter ada = _component.passAdapter();
            ada.connect();
            ada.disconnect();
        }
   }
}
