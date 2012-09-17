using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WindowsFormsApp
{
    /*
     object.ReferenceEquals()
     Debug.writeLine()
     * 
     1-structs are implicitly sealed and cant be inherited from other struct
     use them if dont want to have obkject allocation oveehead
     
     3-val-types[struct/enum] will be passed by value unless using ref/out  and ref-types[class/interface/delegate/array] passed by reference unless using clone
     4-in assigning an object to an interface or degrading to a class, first opens doors to specific functioality 
     * second, in case of degrading, degraded implementation will be used unless override has been used
     * 
     5-boxing means , converting val-type to object type using ()
     */

    class fundamental
    {
        public fundamental()
        {
            
        }
    }
}
