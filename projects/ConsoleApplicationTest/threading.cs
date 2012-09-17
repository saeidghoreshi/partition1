using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading;
using System.Transactions;

namespace ConsoleApplication1
{
    class threading1
    {
        private void runTestfunction(object y)//args must be passing on object type
        {
            //use lock if critical section variables might be changes by other threads
            lock (this)//This thread
            {
                Console.WriteLine("Tread method is running " + y);
            }
        }
        private void callThreads()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                Random r = new Random(1000);

                Thread[] threads = new Thread[10];
                for (int i = 0; i < 10; i++)
                    threads[i] = new Thread(this.runTestfunction);

                for (int i = 0; i < 10; i++)
                    threads[i].Start(r.Next());

                scope.Complete();
            }
        }
    }
}
