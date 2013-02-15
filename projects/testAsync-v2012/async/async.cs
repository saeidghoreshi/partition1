using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Net;
using System.Threading;


namespace ConsoleApplication1.async
{
    public class testAsync
    {
        public string formatOutput(WebHeaderCollection input)
        {

            var query = input.Keys.Cast<string>().Select(x => x + " >>>> " + input[x]).ToList();
            return string.Join(Environment.NewLine, query);

        }
        public void runSync()
        {
            var request = (HttpWebRequest)WebRequest.Create("http://www.google.com");
            request.Method = "Head";
            var response = (HttpWebResponse)request.GetResponse();
            string headersText = formatOutput(response.Headers);
            Console.WriteLine(headersText);

        }
        public void runAsyncTrad()
        {
            //Main Thread context in GUI Apps
            var sync = SynchronizationContext.Current;

            var request = (HttpWebRequest)WebRequest.Create("http://www.google.com");
            request.Method = "Head";
            request.BeginGetResponse(
                asyncResult =>
                {
                    var response = (HttpWebResponse)request.EndGetResponse(asyncResult);
                    string headersText = formatOutput(response.Headers);
                    if (sync != null)
                        sync.Post
                            (
                            delegate
                            {
                                Console.WriteLine(headersText);
                            }
                            , null);
                    else
                        Console.WriteLine(headersText);
                }, null
                );
        }
        public async void runAsyncModern1()
        {
            try {

                WebClient client = new WebClient();
                //await blocks the main thread and  acts like Traditional ENDInvoke request 
                //but the difference is , it creates new thread and call async op there then UI wont be blocked
                string result = await client.DownloadStringTaskAsync("http://cloudcodeclub.com"); 

                Console.WriteLine("continues");
                Console.WriteLine("result");
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
        //More General Approach
        public async void runAsyncModern2()
        {
            try
            {
                var request = (HttpWebRequest)WebRequest.Create("http://www.google.com");
                request.Method = "Head";

                Task<WebResponse> GetResponseTask = Task.Factory.FromAsync<WebResponse>(
                    request.BeginGetResponse,request.EndGetResponse,null);

                //var response = (HttpWebResponse)await GetResponseTask;//Blocks the main thread
                //OR
                await GetResponseTask;//Blocks the main thread

                Console.WriteLine("then continues");

                var T2 = GetResponseTask.ContinueWith(
                    (respTask) => 
                    {
                        //var result = response.Headers;
                        //OR
                        var result = respTask.Result.Headers;

                        Console.WriteLine(formatOutput(result));
                    }
                );

                
            }
            catch (WebException e)
            {
                Console.WriteLine(e.Message);
            }
        }
        public void runAsyncModern3() 
        {
            Console.WriteLine("started");
            doWork();
            Console.WriteLine("Ended");
        }
        public async void doWork()
        {
            string result=await  new Awaitable();
            Console.WriteLine(result);
        }
    }
    
    public class Awaitable 
    {
        public Awaiter GetAwaiter() 
        {
            return new Awaiter();
        }
    }
    public class Awaiter:System.Runtime.CompilerServices.INotifyCompletion {

        public bool BeginAwait(Action callback) { return true; }
        public string EndAwait() { return "End Await is called"; }

        public bool IsCompleted { get { return true; } }
        public void OnCompleted(Action continuation)
        {
            throw new NotImplementedException();
        }
        public string GetResult()
        {
            Thread.Sleep(5000);
            return "result";
        }
    }


}
