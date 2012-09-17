using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Collections;

namespace NS1
{
    class Collections
    {
        public void arrayList() 
        {
            ArrayList a = new ArrayList() { "a" ,"b" };

            foreach (var item in (IEnumerable)a)
                Console.WriteLine(item.ToString());

            Console.WriteLine(a.BinarySearch("b"));
            
        }
        public void hashTable()
        {
            Hashtable a = new Hashtable() ;

            a["saeid"] = 34;
            a["mali"] = 24;
           
            Console.WriteLine(a["saeid"].ToString());
        }
        public void sortedList()
        {
            SortedList a = new SortedList();

            a["saeid"] = 34;
            a["mali"] = 24;
            
        }
        public void stack()
        {
            Stack a = new Stack();

            a.Push(12);
            a.Push(22);
            a.Push(32);
            a.Push(42);
            
            foreach (var item in (IEnumerable)a)
                Console.WriteLine(item.ToString());
        }
    }
}
