using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NS1
{
    class Program
    {
        
        static void calEnumerator() 
        {
            sampleClass[] os = new sampleClass[2];
            os[0] = new sampleClass() { name = "saeid1" };
            os[1] = new sampleClass() { name = "saeid2" };
            //EnumaratorClass<sampleClass> e = new EnumaratorClass<sampleClass>(os);
            EnumaratorClass e = new EnumaratorClass(os);


            foreach (sampleClass item in e)
            {
                Console.WriteLine("{0} ", item.name);
            }
        }
        static void callSample1() 
        {
            
            //No casting
            BMWZ4 car1 = new BMWZ4("BMW");

            //casting to interface and upper class
            ICar   car1shadow1 = new BMWZ4("BMW");
            BMW car1shadow2 = new BMWZ4("BMW") as BMW;

            car1.start();
            car1shadow1.start();
            car1shadow2.start();

            car1shadow1.carStappoed += new EventHandler(onCarStopped);
            car1shadow2.carStappoed += new EventHandler(onCarStopped);

            car1shadow1.Break();
            car1shadow2.Break();
        }
        static void onCarStopped(object sender,EventArgs e) 
        {
            Console.WriteLine("car stopped");
        }
        static void callSampleDelegate()
        {
            delegates d = new delegates();

            //assign real function Queue to function pointer but like javascript, passed function scope wont change
            d.onKey += new person("saeid").extEvent;
            d.onKey += new person("Ryan").extEvent;
            d.onKey += new person("Mahmood").extEvent;

            d.keyStrokHandler();

        }
        public static void fileHandeling()
        {
            files f = new files();
            f.createFile();
        }

        public static void collectionHandling()
        {
            Collections c = new Collections();
            c.arrayList();
            c.hashTable();
            c.sortedList();
            c.stack();
            
        }
        public static void threading1Controller()
        {
            threading1 ts = new threading1();
            

        }
        
        static void Main(string[] args)
        {
            //calEnumerator();

            //callSample1();
            //callSampleDelegate();

            //fileHandeling();
            //collectionHandling();

            threading1Controller();

            Console.WriteLine("pless key to quite");
            Console.Read();

        }
    }
    public class person 
    {
        public string name { get; set; }
        public person(string name) { this.name = name; }
        public void extEvent()
        {
            Console.WriteLine("ext event called by " + name);
        }

    }
}
