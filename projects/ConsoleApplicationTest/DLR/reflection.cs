using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

namespace ConsoleApplication1.DLR
{
    public class reflection
    {
        private object getRandomObject() 
        {
            return new randomClass();
        }
        public void runInternalDllTrad()
        {
            object ins = getRandomObject();
            string result= ins.GetType().GetMethod("testMethod").Invoke(ins, new object[] { "input" }) as string;

            Console.WriteLine(result);
        }
        public void runInternalDllModern()
        {
            dynamic ins = getRandomObject();
            string result = ins.testMethod("Modern Input");

            Console.WriteLine(result);
        }
        public void runExternalDllModern()
        {
            //copy reference of  WindowsFormsApp assembly   [do not add reference]
            Type winappType = Assembly.Load("WindowsFormsApp").GetType("WindowsFormsApp.testMeReflection");
            dynamic ins = Activator.CreateInstance(winappType);
            string result=ins.testMethod();
            Console.WriteLine(result);
        }

        
    }
    public class randomClass 
    {
        public string testMethod(string input) { return "Hi "+input; }
    }
}
