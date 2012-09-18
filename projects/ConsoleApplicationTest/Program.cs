using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {

            //test Delegates
            //fundamental ins = new fundamental();

            //user event2
            //event2.consumer cons = new event2.consumer();

            //Test Traditional Thareding
            Th1.threading1 ins= new Th1.threading1();
            ins.callThreads();



            
            Console.WriteLine("Enter Key to Exit");
            Console.ReadLine();
        }
    }
}
