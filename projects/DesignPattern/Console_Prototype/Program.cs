using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_Prototype
{
    //can be used for resource intensive operations
    class Program
    {
        static void Main(string[] args)
        {
            var crawler = new webCrawler();
            crawler.run();
            var crawler2 = crawler.Clone() as webCrawler;
            crawler2.run();
        }
    }
    public class webCrawler : ICloneable 
    {
        public void run() { }
        public object Clone()
        {
            return MemberwiseClone();
        }
    }
}
