using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_DP.AdapterDP
{
    public class component<T> : IEnumerable<T> where T : Iadapter
    {
        List<T> adapters = new List<T>() { };

        public component() { }
        public Iadapter passAdapter()
        {
            Iadapter adapter = new implementations.adapterImplementationV3() { };
            return adapter;
        }
        
        IEnumerator<T> IEnumerable<T>.GetEnumerator()
        {
            return adapters as IEnumerator<T>;
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return adapters as IEnumerator<T>;
        }
    }

}
