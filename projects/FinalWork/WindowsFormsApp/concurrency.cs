using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

using System.Threading;
using System.Threading.Tasks;

namespace WindowsFormsApp
{
    public partial class concurrency : Form
    {
       
        public concurrency()
        {
            InitializeComponent();
        }

        class dataClass
        {
            public string field1;
            public object clone() { return this.MemberwiseClone(); }
        }
        private void button1_Click(object sender, EventArgs e)
        {
            //Note  [Check Thread Safe]
            //check any built in function to be thread safe , if not sure then make a LOCAL instantiation and use it

            //Note  
            //IO is not usually parallized unless HW supports it

            //Note
            //is a huge difference in performance in using LOCAL variables instead of Shared ones

            //Note
            //tasks must handle at least 200-300 cpu cycle unless worse than sequential

            //Note
            //all tasks first queued then task scheduler will assign them to thred pool and possible to override task scheduler action

            //Note
            //number of threads can be unlimited but can decide based on the cores available, but can cause more context switching tome
            //program use thread-pool which contains multiple [non]worker threads each per task .
            //the term "worker" means non-dedicated and can be shared between tasks children tasks in local queue
            //longRunning[costly] option assigns non-worker(dedicated) thread-pool thread and assigned it to task and system will be over-subscribed
            
            //Solution : 1 Task/Core then using waitAllOneByOne pattern and no context switching

            //IO ops
            //in case of IO processing [file download], number of running task doesnot mastter
            //possible to mix FromSync +APM [fecad task]

            //threading even in one code machines let smaller tasks to be finished faster and make use of CPU maximum power

            //Note
            //Parallelism types:
            //data > one operation on multiple data like calculating sqrt(2D array) >> Parallel.For(0,N,(i)=>{DO(i);}) & Parallel.For(ds,(e)=>{DO(e);})
            //Task >multiple operation on multiple data   >>  Parallel.Invoke( ()=>Task1(),()=>Task2(),()=>Task3() )
            //dataflow > operationd depend on another
            //embarresing  > independetnts of another >>Parallel.for and foreach  > Like huge image loading


            //useLocking();
            //useLockFree();
            
            //longRunningTask();
            //longRunningTaskOptimized();

            EmbaressinglyParallelism();
        }


        //Lock Solution to overcome race condition
        private void useLocking()
        {
            label1.Text = "Processing...";
            int hits = 0;
            Task<int> firstTask = Task.Factory.StartNew<int>(() =>
            {
                List<Task> tasks = new List<Task>();

                //Note 
                //before tasks get the chance to run, 
                //loop gets over and if passing reference ro the task , last reference will be processed
                //then reference it by value

                //Note2
                //in c# value-type variables like string,int,double will be passed by value except using out or ref
                //but ref-type variables like array,[],user-defined class automatically by ref
                //but for use-type objects we cann implement clone  func that returns this.MemberwiseClone();


                int[] sampleHits = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
                object Lock = new object();

                for (int i = 0; i < 1000; i++) //fire 10 parallel thread to update hits
                {
                    var data = new dataClass() { field1 = sampleHits[i % 10].ToString() };
                    Task t = Task.Factory.StartNew((arg1) =>
                    {
                        //work with local copy
                        dataClass localdata = (dataClass)arg1;

                        //Critical Section
                        for (int j = 0; j < 1000; j++)
                        {
                            lock (Lock)
                            {
                                hits += Convert.ToInt32(localdata.field1);//Not an atomic ops
                            }
                        }

                        //Critical Section End    
                    },
                    data.clone());

                    tasks.Add(t);
                }


                Task.WaitAll(tasks.ToArray());
                //Must be WaitAllonebyone pattern
                return hits;
            });

            Task updateUI = firstTask.ContinueWith(ft =>
            {
                try
                {
                    int allHits = ft.Result;
                    label1.Text = allHits.ToString();
                }
                catch (AggregateException ae)
                {
                    ae = ae.Flatten();
                    foreach (Exception ex in ae.InnerExceptions)
                    {
                    }
                }
            },
            TaskScheduler.FromCurrentSynchronizationContext()//Must run on current UI Thread
            );
        }

        //Lock-Free Solution to overcome race condition  [Move shared to local and merge them later]
        private void useLockFree()
        {
            label1.Text = "Processing...";
            
            Task<int> firstTask = Task.Factory.StartNew<int>(() =>
            {
                List<Task<int>> tasks = new List<Task<int>>();

                int[] sampleHits = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
             
                for (int i = 0; i < 10000; i++) //fire 10 parallel thread to update hits
                {
                    var data = new dataClass() { field1 = sampleHits[i % 10].ToString() };
                    Task<int> t =   Task.Factory.StartNew<int>((arg1) =>
                    {
                        int localHit = 0;
                        //work with local copy
                        dataClass localdata = (dataClass)arg1;



                        for (int j = 0; j < 1000; j++)
                        {
                                localHit += Convert.ToInt32(localdata.field1);
                        }
                        return localHit;
                    },
                    data.clone()
                    ,TaskCreationOptions.LongRunning);


                    tasks.Add(t);
                }


                return WaitAllPattern(tasks);
                //OR
                //return WaitAllOneByOnePattern(tasks);
               
            });

            Task updateUI = firstTask.ContinueWith(ft =>
            {
                try
                {
                    int allHits = ft.Result;
                    label1.Text = allHits.ToString();
                }
                catch (AggregateException ae)
                {
                    ae = ae.Flatten();
                    foreach (Exception ex in ae.InnerExceptions)
                    {
                    }
                }
            },
            TaskScheduler.FromCurrentSynchronizationContext()//Must run on current UI Thread
            );
        }

        //Note : while using shared  bilt-in objects or functions wo/ locking, check them wherther or not its thread safe or not
        //because while using them might be usinf 

        //Patterns for result thread Handling
        private int WaitAllPattern(List<Task<int>> tasks)
        {
            Task.WaitAll(tasks.ToArray());
            int totalHits = 0;
            foreach (var t in tasks)
                totalHits += t.Result;

            return totalHits;
        }

        private int WaitAllOneByOnePattern(List<Task<int>> tasks)
        {
            List<int> results = new List<int>() { };

            while(tasks.Count>0)
            {
                int i = Task.WaitAny(tasks.ToArray());
                if(tasks[i].Exception==null)
                    results.Add(tasks[i].Result);
                tasks.RemoveAt(i);
            }

            return results.Sum();
        }




        //Till Here


        //Long Running Task
        private void longRunningTask()
        {
            label1.Text = string.Empty;
            Task firstTask = Task.Factory.StartNew(() =>
            {
                List<Task> tasks = new List<Task>();

                int durationInMilliSecond = 10000;

                for (var i = 0; i < 10; i++)
                {
                    Task t = CreateLongRunningThread(durationInMilliSecond, TaskCreationOptions.LongRunning);
                        /*
                         * if not controlling by processing count and use onebyone pattern
                         * sucks up threads and memory > push all the task to threads and CPU intensive
                         
                         */
                    tasks.Add(t);
                }

                Task.WaitAll(tasks.ToArray());
                label1.Text += "Done";
            });

            Task updateUI = firstTask.ContinueWith(ft =>
            {},
            TaskScheduler.FromCurrentSynchronizationContext()//Must run on current UI Thread
            );

        }
        private Task CreateLongRunningThread(int durationInMilliSecond, TaskCreationOptions taskCreationOptions)
        {
            Task t = Task.Factory.StartNew(() => 
            {
                label1.Text+=("task Started ...\n");

                var sw = System.Diagnostics.Stopwatch.StartNew();

                while (sw.ElapsedMilliseconds < durationInMilliSecond) ;
                label1.Text+=("Task Finished\n");
            },
            taskCreationOptions);

            return t;

        }

        //Long Running Task Optimized
        private void longRunningTaskOptimized()
        {
            label1.Text = string.Empty;
            Task firstTask = Task.Factory.StartNew(() =>
            {
                List<Task> tasks = new List<Task>();

                int durationInMilliSecond = 10000;
                int N=10;

                int numCores = System.Environment.ProcessorCount;
                for (var i = 0; i < numCores; i++)
                {
                    Task t = CreateLongRunningThreadOptimized(durationInMilliSecond, TaskCreationOptions.None);
                    tasks.Add(t);
                }

                while(tasks.Count>0)
                {
                    int index = Task.WaitAny(tasks.ToArray());
                    tasks.RemoveAt(index);
                    N--;

                    if(N>0)
                    {
                        Task t = CreateLongRunningThreadOptimized(durationInMilliSecond, TaskCreationOptions.None);
                        tasks.Add(t);
                    }
                }
                Task.WaitAll(tasks.ToArray());
                label1.Text += "Done";
            });

            Task updateUI = firstTask.ContinueWith(ft =>
            { },
            TaskScheduler.FromCurrentSynchronizationContext()//Must run on current UI Thread
            );

        }
        private Task CreateLongRunningThreadOptimized(int durationInMilliSecond, TaskCreationOptions taskCreationOptions)
        {
            Task t = Task.Factory.StartNew(() =>
            {
                label1.Text += ("task Started ...\n");

                

                var sw = System.Diagnostics.Stopwatch.StartNew();

                while (sw.ElapsedMilliseconds < durationInMilliSecond) ;
                label1.Text += ("Task Finished\n");
            },
            taskCreationOptions);

            return t;

        }

        //Even Better Solution >>>> parallel.for

        //Embaressingly parallelism
        private void EmbaressinglyParallelism()
        {
            int[,] result = new int[10, 10];
            //scenario that can formulate the problem to n-D array and all of them are independent from each other 
            //by using parallel we FORK multiple tasks concurently and JOIN to sequential execution

            ParallelOptions option = EnableEmbaressinglyParallelismCancel();

            try
            {
                Parallel.For(1, 10,option, (i) =>//IMPLICIT START QUEUE
                {
                    Parallel.For(1, 10,option, (j) =>//IMPLICIT START QUEUE
                    {
                        //Calculation
                        label1.Text += i.ToString() + "-" + j.ToString() + "\n";
                        //result[i, j] = i * j;

                    });//IMPLICIT WAIT
                });//IMPLICIT WAIT
            }
            catch (OperationCanceledException ex) { /*No need to be handeled*/}
        }

        private CancellationTokenSource cts;
        private dynamic EnableEmbaressinglyParallelismCancel()
        {
            cts = new CancellationTokenSource();
            var option = new ParallelOptions();
            option.CancellationToken = cts.Token;
            return option;
        }
        private void fireCancellation()
        {
            cts.Cancel();
        }

        private void concurrency_Load(object sender, EventArgs e)
        {

        }

    }
}
