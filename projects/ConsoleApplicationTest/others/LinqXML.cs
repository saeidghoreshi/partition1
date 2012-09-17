using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Xml;
using System.Xml.Linq;

using System.Diagnostics;

namespace app1
{
    class LinqXML
    {
        public void buileFile()
        {
            XNamespace ns = "http://test.com/employees";
            XNamespace ns2 = "http://test.com/employees-ext";

            XDocument doc;
            //Sample1
            doc = new XDocument(
                new XElement(ns + "Employees",
                    new XAttribute(XNamespace.Xmlns + "ext", ns2),

                    new XElement(ns + "Employee", "Scott", new XAttribute("type", "developer")),
                    new XElement(ns + "Employee", "Oscar", new XAttribute("type", "developer")),
                    new XElement(ns2 + "Employee", "Oscar2", new XAttribute("type", "developer"))
                )
            );
            doc.Save("..//..//employees.xml", SaveOptions.None);
        }
        public void traverse() 
        {
            XDocument doc = XDocument.Load("..//..//employees.xml");
            XElement root = doc.Root;
            var elements = root.Descendants();//search to the leaf VS elements which searches just next level 
            foreach (var element in elements)
            {
                Console.WriteLine("{0}", element);
                foreach (XAttribute x in element.Attributes())
                {
                    Console.WriteLine("{0},  {1},  {2}\r\n\r\n", x.Name, x.Value, x);
                }

                string value = (string)element;
                string value1 = (string)element.Attribute("developer");


            }

            Console.Read();
        }
        public void traverse2()
        {
            XNamespace ns = "http://test.com/employees";
            XDocument doc = XDocument.Load("..//..//employees.xml");

            //var elements = doc.Element(ns+"Employees").Elements(ns+"Employee");
            //OR
            //IEnumerable<XElement> elements = doc.Element(ns + "Employees").Elements(ns + "Employee")as IEnumerable<XElement>;
            //OR exact the same
            IEnumerable<XElement> elements = doc.Element(ns + "Employees").Elements(ns + "Employee");

            
            Console.Read();
        }

        public void traverseAndDelete()
        {
            XNamespace ns = "http://test.com/employees";
            XDocument doc = XDocument.Load("..//..//employees.xml");

            foreach (var el in doc.Descendants(ns+"Employee"))
            {
                if (el.Attribute("type").Value ==  "developer")
                    el.Remove();
            }
            
            Console.Read();
        }
        public void buildSample1()
        {
            XNamespace ns = "http://test.com/prcesses";
 
            XDocument doc= new XDocument(
                new XElement(ns + "processes",
                    from p in Process.GetProcesses()
                    where p.ProcessName =="devenv"
                    select new XElement(ns+"process",
                        new XElement (ns+"Modules",
                        from m in p.Modules.Cast<ProcessModule>()
                        select new XElement(ns+"Module",m.ModuleName)
                        )
                    )
                )
            );
            doc.Save("..//..//processes.xml", SaveOptions.None);
        }

        //transform From one doc ,parse and push into another one
        public void buildSample2()
        {
            XNamespace ns = "http://test.com/employees";

            XDocument doc1  =   XDocument.Load("..//..//employees.xml");
            
            XDocument doc_trans = new XDocument(
                new XElement(ns + "Employees",
                    new XElement(ns+"Developers",
                        from e in doc1.Descendants(ns+"Employee")
                        where e.Attribute("type").Value=="developer"
                        select new XElement(ns + "Developer", e.Value)    
                    )
                    
                )
            );
            doc_trans.Save("..//..//employees_trans.xml", SaveOptions.None);
        }
        public void linqArray()
        {
            //Section [Linq]
            string[] words = { "apple", "strawberry", "grape", "peach", "banana" };
            var wordQuery = from word in words
                            where word[0] == 'g'
                            select word;

            foreach (string s in wordQuery)
                Console.WriteLine(s);
            

            Console.Read();
            return;
        }
    }
}
