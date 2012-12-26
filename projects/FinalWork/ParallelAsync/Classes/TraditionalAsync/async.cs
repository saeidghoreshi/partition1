using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading;

namespace ConsoleApplication1.TraditionalAsync
{
    public class asyncTradPattern1
    {
        public delegate string func1Delegate(string input);
        func1Delegate Func1Ins;

        private string func1(string input) 
        {
            Thread.Sleep(4000); 
            return "Output From Func1 " + input; 
        }

        private void callbackFunc(IAsyncResult result) 
        {
            Console.WriteLine("Callback Function Called");/*blocks the current thread*/ 
        }
        
        public void run()
        {
            this.Func1Ins = new func1Delegate(func1);
            AsyncCallback callback = new AsyncCallback(callbackFunc);

            Console.WriteLine("Function1 Called");
            IAsyncResult func1Result = Func1Ins.BeginInvoke("Input 1", callback, null);
            
            string func1Return = Func1Ins.EndInvoke(func1Result);//Wait on Async Operation to be finished /*blocks the current thread*/
            Console.WriteLine("EndInvoke Called");
            Console.WriteLine(func1Return);
        }
    }
}
