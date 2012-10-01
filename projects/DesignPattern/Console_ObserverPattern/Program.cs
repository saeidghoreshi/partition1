using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_ObserverPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            //Observer
            //new observer.ObserverPatternManager().run();

            //Observer Using Events
            //new observerUsingEvents.ObserverByEventsManager().run();

            //UsingIObserver
            new UsingIObserver.ObserverUsingIObserver().run();

            Console.WriteLine("Press ener to quit");
            Console.ReadLine();
        }
    }
    

}
