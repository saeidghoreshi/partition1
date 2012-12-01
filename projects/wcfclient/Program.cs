using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace wcfclient
{
    class Program
    {
        static void Main(string[] args)
        {
            sr.HelloClient client = new sr.HelloClient("WSHttpBinding_IHello");
            sr.spec s = new sr.spec();
            Console.WriteLine(client.addSpec(s));
        }
    }
}
