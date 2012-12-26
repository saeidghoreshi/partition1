using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using ParallelAsync;

namespace ParallelDesignPattern
{
    public static class DesignPatterns1
    {
        //DATAFLOW many to one composition
        public static void DataFlow()
        {
            Task T1 = Task.Factory.StartNew(() => { });
            Task T2 = Task.Factory.StartNew(() => { });
            Task T3 = Task.Factory.StartNew(() => { });
            Task[] tasks = new Task[] { T1, T2, T3 };

            Task.Factory.ContinueWhenAll(tasks, (args /*Task<string>[]tasks*/) => { });
            //OR
            Task.Factory.ContinueWhenAny(tasks, (args) => { });
        }

        //Consumer/Producer w/ blockingCollection
        public static void consumerProducerWithBlockingCollection()
        {
            

            int numCores = System.Environment.ProcessorCount;
            int max = 10000;
            string[] records = new string[] { "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" };

            var sw = System.Diagnostics.Stopwatch.StartNew();
            sw.Restart();

            //shared thred-safe collection
            BlockingCollection<string> work = new BlockingCollection<string>(max);

            var tf = new TaskFactory(TaskCreationOptions.LongRunning, TaskContinuationOptions.None);

            Task producer = tf.StartNew(() =>
            {
                //read file each line and add to the collection

                for (int i = 0; i < 10; i++)
                    work.Add(records[i]);

                //producer signals its done
                work.CompleteAdding();
            });



            Dictionary<int, int> RESULTLIST = new Dictionary<int, int>();
            Task<Dictionary<int, int>>[] consumers = new Task<Dictionary<int, int>>[numCores];

            for (int i = 0; i < numCores; i++)
            {
                consumers[i] = tf.StartNew<Dictionary<int, int>>(() =>
                {
                    Dictionary<int, int> localD = new Dictionary<int, int>();
                    while (!work.IsCompleted)
                    {
                        try
                        {
                            string line = work.Take();
                            //do operation ...
                            //update local Dictionary
                            localD.Add(1, 1);
                        }
                        catch (ObjectDisposedException) {/*ignore*/}
                        catch (InvalidOperationException) {/*ignore*/}
                    }

                    return localD;
                });
            }


            //main Thread to harvest Results
            int completed = 0;
            while (completed < numCores)
            {

                //WaitAllOneByOne Pattern
                int taskIndex = Task.WaitAny(consumers);

                Dictionary<int, int> localD = consumers[taskIndex].Result;
                //Process the local Dictionary into RESULTLIST


                completed++;
                consumers = consumers.Where(t => t != consumers[taskIndex]).ToArray();
            }


            var sort = RESULTLIST
                .OrderByDescending(r => r.Value)
                .OrderBy(r => r.Key).ToList();

            //Print results

            long timems = sw.ElapsedMilliseconds;

            //check for Aggregated Exceptions
            try
            {
                producer.Wait();
            }
            catch (AggregateException ae)
            {
                ae = ae.Flatten();
                foreach (var e in ae.InnerExceptions) { }
            }
            catch (Exception) { }

        }
        /*
            * Famous solution for embarresigly parallel search data mining apps 
            * google search engine
            * data will be mapped to parallel maps to produce set of local results
            * reduce combines to generate 1 set of result set
            * ::2 stategies::
            * 1-fire off N task and do waitallonebyone harvest pattern
            * 2-parallel.for/foreach w/ TLS task local storage
        */
        public static void mapReduce(CancellationToken ct)
        {
            Program.mainform.Controls["lbl_ConcurrencyResult"].Text = string.Empty;
            
            Task<Dictionary<string, int>> T = Task.Factory.StartNew(() =>
            {

                var sw = System.Diagnostics.Stopwatch.StartNew();
                sw.Restart();

                //simulation of file lines
                List<string> source = new List<string> { "A", "AA", "AAA", "AAAA", "AAAAA", "AAAAAA", "AAAAAAA", "AAAAAAAA", "AAAAAAAAA", "AAAAAAAAAAAA" };

                Dictionary<string, int> result = new Dictionary<string, int>();
                Parallel.ForEach
                    (
                        source,

                        //Initializer   [initialize the TLS task local storage]
                        //localInit for local Dictionary
                        () => { return new Dictionary<string, int>(); },

                        //Task Body
                        (line, loopControl, localDic) =>//WORK W/ LOCAL STORAGE
                        {
                            (localDic as Dictionary<string, int>).Add(line, line.Length);
                            Thread.Sleep(2000);
                            if (ct.IsCancellationRequested)
                            {
                                //cleanup
                                ct.ThrowIfCancellationRequested();
                            }
                            return localDic;
                        },

                        //Finalizer  happens just before the task exit
                        (localDic) =>
                        {
                            //initializer and finalizer may execute concurrently and need to be handled in a thread safe manner
                            lock (result)
                            {
                                //merge(result,localDic)
                                foreach (var k in localDic)
                                    result.Add(k.Key, k.Value);
                            }
                        }
                    );
                return result;

            },
            ct);

            
            Task T2 = T.ContinueWith((lastTask) =>
            {

                Dictionary<string, int> result;
                try
                {
                    result = lastTask.Result;
                    foreach (var key in result.OrderBy(x => x.Key).Select(x => x.Key))
                        Program.mainform.Controls["lbl_ConcurrencyResult"].Text += key + " >> " + result[key].ToString() + "\n";
                }
                catch (AggregateException ae)
                {
                    ae = ae.Flatten();
                    foreach (Exception e in ae.InnerExceptions)
                    {
                        Program.mainform.Controls["lbl_ConcurrencyResult"].Text += "\n" + e.Message;
                    }
                }
            }, TaskScheduler.FromCurrentSynchronizationContext());

        }
        
    }
}
