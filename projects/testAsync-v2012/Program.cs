using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            async.testAsync ins = new async.testAsync();
            ins.runAsyncModern2();


            Console.WriteLine("Press any key to exit");
            Console.ReadLine();
        }
    }

    
}
