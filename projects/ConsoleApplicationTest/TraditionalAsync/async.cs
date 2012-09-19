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
        private string func1(string input) { Thread.Sleep(4000); return "Output From Func1 " + input; }

        public void run()
        {
            func1Delegate Func1Ins = new func1Delegate(func1);

            IAsyncResult func1Result = Func1Ins.BeginInvoke("Input 1", null, Func1Ins);
            Console.WriteLine("Function1 Called");

            string func1Return = Func1Ins.EndInvoke(func1Result);//Wait on Async Operation to be finished
            Console.WriteLine(func1Return);
        }
    }

    public class asyncTradPattern2
    {
        public delegate string func1Delegate(string input);
        private string func1(string input) { Thread.Sleep(4000); return "Output From Func1 " + input; }

        private void callbackFunc(IAsyncResult result){Console.WriteLine(this.func1Ins.EndInvoke(result));}

        func1Delegate func1Ins;
        public void run()
        {
            this.func1Ins = new func1Delegate(func1);
            AsyncCallback callback = new AsyncCallback(callbackFunc);

            this.func1Ins.BeginInvoke("input",callback,this.func1Ins);
        }
    }
}
