using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading;
using System.Transactions;
using System.IO;
using System.Threading.Tasks;
using System.Net;

namespace ConsoleApplication1.Th1
{
    class threading1
    {
        public void callThreads()
        {
            using (TransactionScope scope = new TransactionScope())
            {
                string[] urls =
                {
                    "http://twitter.com/odetocode",
                    "http://microsoft.com/en/us/default.aspx"
                } ;

                Thread[] threads = new Thread[10];
                
                for (int i = 0; i < 10; i++)
                {
                    threads[i] = new Thread(this.runTestfunction);
                    threads[i].Start(urls);
                    
                }

                //the whole expression below acting like tasks.WaitAll();
                foreach (Thread t in threads)
                    t.Join();
                
                Console.WriteLine( "wait ALL");
                scope.Complete();
            }
        }
        class data { 
            public int threadno;
            public string url;
        }
        
        object Lock = new object();
        private void runTestfunction(object urls /*Must be Object*/)
        {
            lock (Lock) 
            {
                Console.WriteLine(Thread.CurrentThread.ManagedThreadId + " Running");
                

                //Async opS
                foreach (var url in urls as string[])
                {
                    var client = new WebClient();
                    client.DownloadStringCompleted += new DownloadStringCompletedEventHandler(client_DownloadStringCompleted);
                    client.DownloadStringAsync(new Uri(url.ToString()),
                        new data()
                        {
                            threadno = Thread.CurrentThread.ManagedThreadId,
                            url = url
                        }
                        );
                }
                Console.WriteLine(Thread.CurrentThread.ManagedThreadId + " Terminated");
            }
        }

        void client_DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e)
        {
            var html = e.Result;
            var stat = e.UserState;
            Console.WriteLine("ThreadNo= "+(stat as data).threadno + " Url=" +(stat as data).url + " "+html.Length +"Bytes" );
        }
    }
}

namespace ConsoleApplication1.Th2
{
    class threading1
    {
        public threading1()
        {
            Queue<Job> jobs = new Queue<Job>();
            for (int i = 0; i < 200000; i++)
                jobs.Enqueue(new Job(i));

            Thread[] threads = new Thread[50];
            int[] threadRes = new int[50];

            Stream s = File.Create(DateTime.Now.Ticks + ".txt");
            StreamWriter sr = new StreamWriter(s, Encoding.UTF8);

            Console.WriteLine(Environment.ProcessorCount);

            ParameterizedThreadStart runJobs = delegate(object param)
            {
                //local per thread and no need to be protected
                int counter = 0;

                while (true)//point that allow race happens
                {
                    lock (this)  ///protecting shared resources (1)collection  (2)counter
                    {
                        //Note: Jobs is a shared resource not a local one
                        param _params = (param)param;

                        if (jobs.Count == 0)
                        {
                            threadRes[_params.processId] = counter;
                            return;
                        }

                        Job j = jobs.Dequeue();
                        counter++;
                        //Console.WriteLine(_params.processId + "       >>  " + j.jobId + ">>other param  :  " + _params.other +"  Counter:"+counter);

                        sr.WriteLine(_params.processId);

                    }
                }


            };


            //activate threads
            for (int i = 0; i < threads.Length; i++)
            {
                //threads[i]=new Thread(runJobs);
                //threads[i].Start(new param{processId=i,other=1});
                Task t = Task.Factory.StartNew(() => { });

            }
            //TaskScheduler ts=new TaskScheduler();
            //TaskFactory tf = new TaskFactory(ts);

            //wait till all threads are joint
            foreach (Thread t in threads)
                t.Join();
            for (int i = 0; i < threadRes.Length; i++)
                Console.WriteLine("Thread : " + i + "  counter : " + threadRes[i]);

        }
    }
    public class param
    {
        public int processId { get; set; }
        public int other { get; set; }
    }
    public class Job
    {
        public int jobId { get; set; }

        public Job(int jobId)
        {
            this.jobId = jobId;
        }
    }
}
