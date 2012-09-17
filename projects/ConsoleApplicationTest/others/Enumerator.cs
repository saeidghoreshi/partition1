using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Collections;

namespace NS1
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
}
