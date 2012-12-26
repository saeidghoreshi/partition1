using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApplication1._Monitor
{
    class CollectionManager <T>:IEnumerable<T>
    {
        Queue<T> collection = new Queue<T>() { };

        public T getOneFromCollection() 
        {
            lock(collection)
            {
                while(collection.Count==0)
                    Monitor.Wait(collection);

                return collection.Dequeue();
            }
        }
        public void refill(T[] inputs)
        {
            lock(collection)
            {
                foreach(var item in inputs)
                    collection.Enqueue(item);

                Monitor.PulseAll(collection);
            }
        }

        public IEnumerator<T> GetEnumerator()
        {
            return collection as IEnumerator <T>;

        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }
    }
    public class consumer 
    {
        public void run() 
        {
            Random rng=new Random();
            List<Task> tasks = new List<Task>() { };
            CollectionManager<int> cm = new CollectionManager<int>();

            for (int i = 0; i < 10; i++)//Delay in task generation
            {
                Task T=Task.Factory.StartNew((arg) =>
                {
                    int taskIndex = (int)arg;

                    //Random Simulated Operation over collection
                    for (int k = 0; k < 5; k++)
                        cm.refill(new int[] { rng.Next(1, 10), rng.Next(1, 10), rng.Next(1, 10), rng.Next(1, 10) });

                    for(int k=0;k<5;k++)
                        cm.getOneFromCollection();
                },
                i,
                TaskCreationOptions.None);

                tasks.Add(T);
            }

            Task.WaitAll();

            
        }
    }
}
