using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    /*
    object.ReferenceEquals()
    Debug.writeLine()
    * 
    1-structs are implicitly sealed and cant be inherited from other struct
    use them if dont want to have obkject allocation oveehead
     
    3-val-types[struct/enum] will be passed by value unless using ref/out  and ref-types[class/interface/delegate/array] passed by reference unless using clone
    4-in assigning an object to an interface or degrading to a class, first opens doors to specific functioality 
    * second, in case of degrading, degraded implementation will be used unless override has been used
    * 
    5-boxing means , converting val-type to object type using ()
    6-modifies can be private,public,protected,internal,protected internal
    7-Interface is a very vague concept whether or not implemented and multiple implementation
    8-class and struct can implement multiple Interface [Unique option]
    9-Design
     * we can expand built-in or custom class and override [use base]
     * use classes as an object and work with them
     * 
    Delegate/Event/subscriber
    * delegate is type-safe function poinert
     
    */

    public class Delegate
    {
        delegate void writeSomething(string msg);

        
        public Delegate()
        {
            writeSomething func1 = new writeSomething(this.logMeMain);
            func1 += this.logMe1;
            func1 += this.logMe2;
            func1 += this.logMe3;

            func1("  Hello");
            //Delegates are not safe then better to use events

        }
        public void logMeMain(string input) { Console.WriteLine("Log main called "+input); }
        public void logMe1(string input) { Console.WriteLine("Log 1 called " + input); }
        public void logMe2(string input) { Console.WriteLine("Log 2 called " + input); }
        public void logMe3(string input) { Console.WriteLine("Log 3 called " + input); }


    }
}
