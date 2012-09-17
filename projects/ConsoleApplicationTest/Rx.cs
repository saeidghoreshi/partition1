using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Reactive;
using System.Reactive.Linq;


using System.Threading;
using System.Reactive.Concurrency;

//add system.reactive.linq extension


namespace ConsoleApplication1
{
    public class Rx
    {
        public void firstSample() 
        {
            //******************************
            //****************NOTE**********
            //******************************
            //Not completed
            Console.WriteLine("Thread : {0}" , Thread.CurrentThread.ManagedThreadId);
            var q = Enumerable.Range(1, 3).Select(t=>t);
            
            foreach(var item in q)
            {
                Console.WriteLine(item);
            }
            IMDONE();

            var observableQ = q.ToObservable();
            observableQ.Subscribe(Console.WriteLine, IMDONE);

            observableQ = q.ToObservable(Scheduler.NewThread);
            observableQ.Subscribe(ProcessNumber, IMDONE);

            
            
        }

        private void IMDONE()
        {
            Console.WriteLine("I m Done");
        }
        private void ProcessNumber(int number)
        {
            Console.WriteLine("{0} Thread {1}",number,Thread.CurrentThread.ManagedThreadId);
        }
    }
}
