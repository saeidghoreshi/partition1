using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ParallelAsync;

namespace RaceConditionConcurrency.Syncronization
{
    //Note #1
    /*
    before tasks get the chance to run, 
    loop gets over and if passing reference ro the task , last reference will be processed
    then reference it by value
    */

    //Note #2
    /*
    in c# value-type variables like string,int,double will be passed by value except using out or ref
    but ref-type variables like array,[],user-defined class automatically by ref
    but for use-type objects we can implement clone  func that returns this.MemberwiseClone();
    */
    class dataClass
    {
        public string field1;
        public object clone() { return this.MemberwiseClone(); }
    }
    public class Lock
    {
        //Senario >> Same operation in different sources

        public static void Run()
        {
            int[] sampleHits = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

            //Shared Variable
            int hits = 0;

            Task<int> sideTask = Task.Factory.StartNew<int>(() =>
            {
                List<Task> tasks = new List<Task>();
                object Lock = new object();

                for (int i = 0; i < 1000; i++) //fire 10 parallel thread to update hits
                {
                    var data = new dataClass() { field1 = sampleHits[i % 10].ToString() };
                    Task t = Task.Factory.StartNew((arg1) =>
                    {
                        dataClass localdata = (dataClass)arg1;

                        for (int j = 0; j < 10000; j++)
                        {
                            //Critical Section
                            lock (Lock)
                            {
                                hits += Convert.ToInt32(localdata.field1);
                                //Note : ++ is not an atomic operation
                            }
                        }
                    },
                    data.clone()
                    );

                    tasks.Add(t);
                }

                Task.WaitAll(tasks.ToArray());
                return hits;
            });//Side Task End

            Task updateUI = sideTask.ContinueWith(ft =>
            {
                try
                {
                    int allHits = ft.Result;
                    Program.mainform.Controls["lbl_ConcurrencyResult"].Text = allHits.ToString();
                }
                catch (AggregateException ae)
                {
                    ae = ae.Flatten();
                    foreach (Exception ex in ae.InnerExceptions)
                    {
                        Program.mainform.Controls["lbl_ConcurrencyResult"].Text += ex.Message;
                    }
                }
            },
            TaskScheduler.FromCurrentSynchronizationContext()//Must run on current UI Thread
            );
        }
    }
}
