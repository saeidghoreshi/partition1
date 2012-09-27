using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Console_DP.AdapterDP.Interfaces;

namespace Console_DP.AdapterDP.Implementations
{
    public class adapterImplementationV1 : Iadapter
    {
        public Iformatter selectedFormatter;
        public adapterImplementationV1(Iformatter formatter) 
        {
            this.selectedFormatter = formatter;
        }
        public void connect()
        {
            Console.WriteLine(this.selectedFormatter.print("Adapter v1", "Connected"));
        }

        public void disconnect()
        {
            Console.WriteLine(this.selectedFormatter.print("Adapter v1", "DISConnected"));
        }
    }
    public class adapterImplementationV2 : Iadapter
    {
        public Iformatter selectedFormatter;
        public adapterImplementationV2(Iformatter formatter) 
        {
            this.selectedFormatter = formatter;
        }

        virtual public void connect()
        {
            Console.WriteLine(this.selectedFormatter.print("Adapter v2", "Connected"));
        }

        virtual public void disconnect()
        {
            Console.WriteLine(this.selectedFormatter.print("Adapter v2", "DISConnected"));
        }
    }
    public class adapterImplementationV3 : adapterImplementationV2
    {
        public adapterImplementationV3(Iformatter formatter) :base(formatter){}

        override public void connect()
        {
            Console.WriteLine(this.selectedFormatter.print("Adapter v3", "Connected"));
        }

        new public void disconnect()
        {
            Console.WriteLine(this.selectedFormatter.print("Adapter v3", "DISConnected"));
        }
    }
    
}
