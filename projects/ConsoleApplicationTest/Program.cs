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
            //Th1.threading1 ins= new Th1.threading1();
            //ins.callThreads();

            //Test Excel
            //Office.excel ins = new Office.excel();

            //test Enumarator
            //Enumerator.testIEnumerator ins= new Enumerator.testIEnumerator();
            //ins.showFilterResultExtended();


            //traditional IAsync
            //TraditionalAsync.asyncTradPattern1 ins = new TraditionalAsync.asyncTradPattern1();
            //ins.run();

            //reflection DLR
            //DLR.reflection ins = new DLR.reflection();

            //test linq XML
            //linqXML.LinqXml ins = new linqXML.LinqXml();
            //ins.run();
            

            //test Monitor
            new _Monitor.consumer().run();
            

            
            Console.WriteLine("Enter Key to Exit");
            Console.ReadLine();
        }
    }
}
