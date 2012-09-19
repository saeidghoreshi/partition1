using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Collections;

namespace ConsoleApplication1.Enumerator
{
    public class sampleClass
    {
        public string name;
    }
    //public class EnumaratorClass<T>:IEnumerable<T>
    //{
    //    public T[] os;

    //    public EnumaratorClass(T[] os) 
    //    {
    //        this.os = os; 
    //    }
    //    public IEnumerator GetEnumerator()
    //    {
    //        return os.GetEnumerator();
    //    }
    //    IEnumerator<T> IEnumerable<T>.GetEnumerator()
    //    {
    //yield
    //        return (IEnumerator<T>)os.GetEnumerator();
    //    }
    //}


    //Note:
    //IEnumerable is a repository builder and doesnt save any value
    public class EnumaratorClass : IEnumerable
    {
        public sampleClass[] os;

        public EnumaratorClass(sampleClass[] os)
        {
            this.os = os;
        }
        public IEnumerator GetEnumerator()
        {
            return os.GetEnumerator();
        }
        IEnumerator IEnumerable.GetEnumerator()
        {
            return (IEnumerator<sampleClass>)os.GetEnumerator();
        }
    }


    public class testIEnumerator 
    {
        public void showFilterResult() 
        {
            //string[] also implements IEnumerable interface
            //data source query is executable when traversing not at the time the query has been built
            IEnumerable<string> source = new string[] { "saeid", "ali", "sasan" };

            IEnumerable<string> filteredData = Filter(source);
            //OR
            //IEnumerable<string> filteredData = source.Where(s=>s.StartsWith("s"));

            foreach (var item in filteredData) 
            {
                Console.WriteLine(item);
            }
        
        }
        public IEnumerable<string> Filter(IEnumerable<string> source) 
        {
            foreach (var item in source) 
            {
                if(item.StartsWith("s"))
                    yield return item;
            }
        }

        //showFilterResultExtended w/ predicate
        public delegate bool FilterDelegate<T>(T x);

        public void showFilterResultExtended() 
        {
            IEnumerable<string> source = new string[] { "saeid", "ali", "sasan" };

            //IEnumerable<string> filteredData = FilterExtended(source,predicate1);
            //OR
            //Lambda
            //IEnumerable<string> filteredData = FilterExtended(source, (string s) => { return s.StartsWith("s"); });
            //OR
            //Anonymous Delegate
            //IEnumerable<string> filteredData = FilterExtended<string>(source, delegate(string s){ return s.StartsWith("s"); });
            //OR
            //Func -> encapsulates the delegate
            Func<string, bool> predicateInline = (x) => { return x.StartsWith("s"); };
            IEnumerable<string> filteredData = FilterExtended2(source, predicateInline);

            
            foreach (var item in filteredData)
            {
                Console.WriteLine(item);
            }
        }
        public IEnumerable<T> FilterExtended<T>(IEnumerable<T> source, FilterDelegate<T> MyPredicate)
        {
            foreach (var item in source)
            {
                if (MyPredicate(item))
                    yield return item;
            }
        }
        public IEnumerable<T> FilterExtended2<T>(IEnumerable<T> source, Func<T,bool> MyPredicate)
        {

            foreach (var item in source)
            {
                if (MyPredicate(item))
                    yield return item;
            }
        }
        public bool predicate1(string s) 
        {
            return s.StartsWith("s");
        }

    }
}
