using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace Console_Singleton
{
    class Program
    {
        static void Main(string[] args)
        {
            object x = new object();
            int N = 100000;
            List<Task> tasks = new List<Task>();
            List<Singleton> objs=new List<Singleton>();

            for (int i = 0; i < N; i++)
            {
                Task T = Task.Factory.StartNew(() =>
                {
                    lock (x)
                    {
                        objs.Add(Singleton.Instance);
                    }
                    
                });

                tasks.Add(T);
            }
            Task.WaitAll(tasks.ToArray());

            for (int i = 0; i < N;i++ )
                for (int j = 0; j < N; j++)
                    if(i!=j)
                        if(!object.ReferenceEquals(objs[i] , objs[j]))
                            Console.WriteLine("False");

            Console.WriteLine("Enter to quit");
            Console.ReadLine();
        }
    }
    public class Singleton 
    {
        static Singleton _instance;
        static object Lock = new object();

        public static Singleton Instance 
        {
            get
            {
                lock (Lock)
                {
                    if (_instance == null)
                        _instance = new Singleton();

                    return _instance;
                }
            }
        }
    }
}
