using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EventsDelegates
{
    /*
        Delegate is type-safe function pointer
        Delegates are not safe and better to use Events
    */

    public static class Delegate
    {
        //acts like function array
        delegate void writeSomething(string msg);

        public static void Run()
        {
            //1-Definition 2-Instantiation 3-Call
            writeSomething func1 = new writeSomething(logMeMain);
            func1 += logMe1;
            func1 += logMe2;
            func1 += logMe3;

            func1("Hello");
            

        }
        static void logMeMain(string input) { Console.WriteLine("Log main called "+input); }
        static void logMe1(string input) { Console.WriteLine("Log 1 called " + input); }
        static void logMe2(string input) { Console.WriteLine("Log 2 called " + input); }
        static void logMe3(string input) { Console.WriteLine("Log 3 called " + input); }
    }
}
