using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ParallelAsync;

namespace RaceConditionConcurrency
{
    class dataClass
    {
        public string field1;
        public object clone() { return this.MemberwiseClone(); }
    }
    public static class LockFree
    {
        public static void Run()
        {
            int[] sampleHits = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

            Task<int> sideTask = Task.Factory.StartNew<int>(() =>
            {
                List<Task<int>> tasks = new List<Task<int>>();

                for (int i = 0; i < 10000; i++) 
                {
                    var data = new dataClass() { field1 = sampleHits[i % 10].ToString() };
                    Task<int> t = Task.Factory.StartNew<int>((arg1) =>
                    {
                        //local variable instead of shared one
                        int localHit = 0;
                        dataClass localdata = (dataClass)arg1;

                        for (int j = 0; j < 1000; j++)
                        {
                            localHit += Convert.ToInt32(localdata.field1);
                        }
                        return localHit;
                    },
                    data.clone()
                    , TaskCreationOptions.PreferFairness);

                    tasks.Add(t);
                }

                //Tisme to Harvest the result
                return ParallelDesignPattern.HarvestingPatterns.WaitAllPattern(tasks);
                //OR
                //return ParallelDesignPattern.HarvestingPatterns.WaitAllOneByOnePattern(tasks);

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
                        Program.mainform.Controls["lbl_ConcurrencyResult"].Text += ae.Message;
                    }
                }
            },
            TaskScheduler.FromCurrentSynchronizationContext()//Must run on current UI Thread
            );
        }
    }
}
