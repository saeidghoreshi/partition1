using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading;

namespace ConsoleApplication1.TraditionalAsync
{
    public class asyncTradPattern1
    {
        public delegate string getfunc1Delegate(string input);
        private string function1(string input) { Thread.Sleep(4000); return "Output From Func1 " + input; }

        public void run()
        {
            getfunc1Delegate getFunc1Ins = new getfunc1Delegate(function1);

            IAsyncResult func1Result = getFunc1Ins.BeginInvoke("Input 1", null, getFunc1Ins);
            Console.WriteLine("Function1 Called");

            string func1Return = getFunc1Ins.EndInvoke(func1Result);//Wait on Async Operation to be finished
            Console.WriteLine(func1Return);
        }
    }

    public class asyncTradPattern2
    {
        public delegate string getfunc1Delegate(string input);
        private string function1(string input) { Thread.Sleep(4000); return "Output From Func1 " + input; }

        private void callbackFunc(IAsyncResult result){Console.WriteLine(this.getFunc1Ins.EndInvoke(result));}

        getfunc1Delegate getFunc1Ins;
        public void run()
        {
            this.getFunc1Ins = new getfunc1Delegate(function1);
            AsyncCallback callback = new AsyncCallback(callbackFunc);

            this.getFunc1Ins.BeginInvoke("input",callback,this.getFunc1Ins);
        }
    }
}
