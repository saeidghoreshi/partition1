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

namespace WindowsFormsApp
{
    public partial class ParallelDesignPattern : Form
    {
        /*
         Patterns:
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

                //producer signals
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
                            //do parsing ...
                            //update local Dictionary
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
        void mapReduce() 
        {
            /*
             * google search engine
             * data will be mapped to parallel maps to produce set of local results
             * reduce combines to generate 1 set of result set
             * 2 stategies
             * 1-fire off N task and do waitallonebyone harvest pattern
             * 2-parallel.for/foreach w/ TSL task local storage
             */ 
             
        
        }

        private void ParallelDesignPattern_Load(object sender, EventArgs e)
        {

        }
    }
}
