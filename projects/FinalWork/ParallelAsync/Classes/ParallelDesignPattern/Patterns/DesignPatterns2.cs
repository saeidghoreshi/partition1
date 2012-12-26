using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ParallelDesignPattern
{
    public class DesignPatterns2
    {
        /*
        longRunning[costly] option assigns non-worker(dedicated) thread in thread-pool and assigned it to task and system will be over-subscribed
        *** Solution : 1 Task/Core then using waitAllOneByOne pattern and no context switching
        */

        //Long Running Task
        private void longRunningTask()
        {
            
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
                //"Done";
            });

            Task updateUI = firstTask.ContinueWith(ft =>
            { },
            TaskScheduler.FromCurrentSynchronizationContext()//Must run on current UI Thread
            );

        }
        private Task CreateLongRunningThread(int durationInMilliSecond, TaskCreationOptions taskCreationOptions)
        {
            Task t = Task.Factory.StartNew(() =>
            {
                //("task Started ...\n");

                var sw = System.Diagnostics.Stopwatch.StartNew();

                while (sw.ElapsedMilliseconds < durationInMilliSecond) ;
                //("Task Finished\n");
            },
            taskCreationOptions);

            return t;

        }

        //Long Running Task Optimized
        private void longRunningTaskOptimized()
        {
           
            Task firstTask = Task.Factory.StartNew(() =>
            {
                List<Task> tasks = new List<Task>();

                int durationInMilliSecond = 10000;
                int N = 10;

                int numCores = System.Environment.ProcessorCount;
                for (var i = 0; i < numCores; i++)
                {
                    Task t = CreateLongRunningThreadOptimized(durationInMilliSecond, TaskCreationOptions.None);
                    tasks.Add(t);
                }

                while (tasks.Count > 0)
                {
                    int index = Task.WaitAny(tasks.ToArray());
                    tasks.RemoveAt(index);
                    N--;

                    if (N > 0)
                    {
                        Task t = CreateLongRunningThreadOptimized(durationInMilliSecond, TaskCreationOptions.None);
                        tasks.Add(t);
                    }
                }
                Task.WaitAll(tasks.ToArray());
                //"Done";
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
                //("task Started ...\n");



                var sw = System.Diagnostics.Stopwatch.StartNew();

                while (sw.ElapsedMilliseconds < durationInMilliSecond) ;
                //("Task Finished\n");
            },
            taskCreationOptions);

            return t;

        }

        
        //Embaressingly parallelism
        private void EmbaressinglyParallelism()
        {
            int[,] result = new int[10, 10];
            //scenario that can formulate the problem to n-D array and all of them are independent from each other 
            //by using parallel we FORK multiple tasks concurently and JOIN to sequential execution   

            ParallelOptions option = EnableEmbaressinglyParallelismCancel();

            try
            {
                Parallel.For(1, 10, option, (i) =>//IMPLICIT START QUEUE
                {
                    Parallel.For(1, 10, option, (j) =>//IMPLICIT START QUEUE
                    {
                        //Calculation

                        //PRINT += i.ToString() + "-" + j.ToString() + "\n";

                        //result[i, j] = i * j;

                    });//IMPLICIT WAITALL
                });//IMPLICIT WAITALL
            }
            catch (OperationCanceledException ex)
            {
                /*No need to be handeled*/
                Console.WriteLine("operation Cancelled");
            }
            catch (AggregateException e1)
            {
            }
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
    }
}
