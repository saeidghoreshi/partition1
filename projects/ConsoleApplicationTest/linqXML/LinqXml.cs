using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;

using System.Runtime.InteropServices.Expando;
using System.Dynamic;

namespace ConsoleApplication1.linqXML
{
    public class LinqXml
    {
        public void run() 
        {
            XDocument doc = XDocument.Load("../../linqxml/users.xml");

            var query = doc.Element("users").Elements("user").ToList();

            foreach (var item in query)
                foreach (var x in item.Elements("specs"))
                    Console.WriteLine(x.Element("fname").Value);
        }
        
    }
}
