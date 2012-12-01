using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using client.ServiceReference1;

namespace client
{
    class Program
    {
        static void Main(string[] args)
        {
            ServiceClient client = new ServiceClient("BasicHttpBinding_IService");
            Data d = new Data();
            d.name = "welcome";
            Console.WriteLine(client.getName(d));
        }
    }
}
