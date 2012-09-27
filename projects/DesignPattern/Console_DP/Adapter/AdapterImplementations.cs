using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_DP.AdapterDP.implementations
{
    public class adapterImplementationV1 : Iadapter
    {
        public void connect()
        {
            Console.WriteLine("Adapter v1 Connected");
        }

        public void disconnect()
        {
            Console.WriteLine("Adapter v1 Disconnected");
        }
    }
    public class adapterImplementationV2 : Iadapter
    {
        public virtual void connect()
        {
            Console.WriteLine("Adapter V2 Connected");
        }

        public virtual void disconnect()
        {
            Console.WriteLine("Adapter V2 Disconnected");
        }
    }
    public class adapterImplementationV3 : adapterImplementationV2
    {
        public override void connect()
        {
            Console.WriteLine("Adapter V3 Connected");
        }

        public new void disconnect()
        {
            Console.WriteLine("Adapter V3 Disconnected");
        }
    }
    
}
