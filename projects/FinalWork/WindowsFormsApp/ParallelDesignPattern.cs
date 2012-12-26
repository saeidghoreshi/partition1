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
using System.Collections.Concurrent;

using System.Collections;
using System.IO;
using System.Diagnostics;


namespace WindowsFormsApp
{
    public partial class ParallelDesignPattern : Form
    {
        /*
         Note on crearting Tasks in for loop
         * there is delay between task created and started then pass params in arg section by value
         */
        /*
         Patterns: as go down gets better
         * pipeline > linear
         * dataflow > dependency   using continuewhenAll<otherTasksReturnType,thisTaskReturnType>
         * concurrent data structure >
         * Notes: by itselves are thread safe but be  cautious not use check condition whule using irt  [not good]
         * producer-consumer  > uses blocking Collection wait P if full and C if empty and wakeup P if not-full and C if Not-empty
         * map-reduce  > reduces shared resources contention
         * parallel linq
         * speculative exec
         * APM using fecad tasks fromAsync begin/end
         */
        public ParallelDesignPattern()
        {
            InitializeComponent();
            
        }

        //Consumer/Producer   w/ blockingCollection
        void concurrent() 
        {
            
            var sw = System.Diagnostics.Stopwatch.StartNew();

            int max = 10000;
            string[]records=new string[]{"1","2","3","4","5","6","7","8","9","10"};

            sw.Restart();

            BlockingCollection<string> work = new BlockingCollection<string>(max);

            var tf = new TaskFactory(TaskCreationOptions.LongRunning,TaskContinuationOptions.None);

            Task producer = tf.StartNew(() => 
            {
                //read file each line and add to the collection

                for(int i=0;i<10;i++)
                    work.Add(records[i]);

                //producer signals its done
                work.CompleteAdding();
            });

            Dictionary<int,int> RESULTLIST=new Dictionary<int,int>();

            int numCores=System.Environment.ProcessorCount;

            Task<Dictionary<int,int>>[] consumers=new Task<Dictionary<int,int>>[numCores];
            for(int i=0;i<numCores;i++)
            {
                consumers[i]=tf.StartNew<Dictionary<int,int>>(()=>
                {
                    Dictionary<int,int> localD=new Dictionary<int,int>();
                    while(!work.IsCompleted)
                    {
                        try
                        {
                            string line=work.Take();
                            //do operation ...
                            //update local Dictionary
                            localD.Add(1, 1);
                        }
                        catch(ObjectDisposedException){/*ignore*/}
                        catch(InvalidOperationException){/*ignore*/}
                    }

                    return localD;
                });
            }


            //main Thread to harvest Results
            int completed=0;
            while(completed<numCores){

                //WaitAllOneByOne Pattern
                int taskIndex=Task.WaitAny(consumers);

                Dictionary<int,int> localD=consumers[taskIndex].Result;

                //Process the local Dictionary into RESULTLIST


                completed++;
                consumers=consumers.Where(t=>t!=consumers[taskIndex]).ToArray();
            }


            var sort = RESULTLIST
                .OrderByDescending(r => r.Value)
                .OrderBy(r => r.Key).ToList();

            //Pring results

            long timems = sw.ElapsedMilliseconds;

            //check for Aggregated Exceptions
            try {
                producer.Wait();
            }
            catch(AggregateException ae)
            {
                ae = ae.Flatten();
                foreach (var e in ae.InnerExceptions) { }
            }
            catch(Exception){}
        
        }

        //Famous solution for embarresigly parallel search data mining apps
        void mapReduce(CancellationToken ct)
        {
            label1.Text = string.Empty;
            /*
             * google search engine
             * data will be mapped to parallel maps to produce set of local results
             * reduce combines to generate 1 set of result set
             * 2 stategies
             * 1-fire off N task and do waitallonebyone harvest pattern
             * 2-parallel.for/foreach w/ TLS task local storage
             */
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
                        () => { return new Dictionary<string, int>(); },//localInit for local Dictionary

                        //Task Body
                        (line, loopControl, localDic) =>//WORK W/ LOCAL STORAGE
                        {
                            (localDic as Dictionary<string, int>).Add(line, line.Length);
                            Thread.Sleep(3000);
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
            /*
            Task.Factory.ContinueWhenAll(new[] { t1, t2 },
                (Task<string>[]tasks) => 
                {
                    foreach (var t in tasks) { }
                }
                );
             * //.wait()  >> optioanl
            */
            Task T2 = T.ContinueWith((lastTask) =>
            {
                
                Dictionary<string, int> result;
                try
                {
                    result = lastTask.Result;
                    foreach (var key in result.OrderBy(x => x.Key).Select(x => x.Key))
                        label1.Text += key + " >> " + result[key].ToString() + "\n";
                }
                catch (AggregateException ae)
                {
                    ae = ae.Flatten();
                    foreach (Exception e in ae.InnerExceptions)
                    {
                        Debug.WriteLine(e.Message);
                        label1.Text += "\n" + e.Message;
                    }
                }
            }, TaskScheduler.FromCurrentSynchronizationContext());

        }

        public CancellationTokenSource cts = new CancellationTokenSource();
        private void runBtn_Click(object sender, EventArgs e)
        {
            //in this case all tasks will be cancelled not all
            cts = new CancellationTokenSource();
            CancellationToken ct = cts.Token;
            mapReduce(ct);
            //concurrent();
        }

        private void cancelBtn_Click(object sender, EventArgs e)
        {
            //possible to cancel task connected with the token by calling CTS.Cancel
            cts.Cancel();
            cts = new CancellationTokenSource();

            label1.Text = "Task Cancelled";
            //in this scenarion all tasks will be \cancelled but can change it to make only one be canceled
        }

    }
}
