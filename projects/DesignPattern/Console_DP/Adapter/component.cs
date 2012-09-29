using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Console_DP.AdapterDP.Interfaces;
using Console_DP.AdapterDP.Implementations;

namespace Console_DP.AdapterDP
{
    //the class that makes decision about implementations

    public class component<T> : IEnumerable<T> where T : Iadapter 
    {
        List<T> adapters = new List<T>() { };
        Iformatter chosenFormatter ;

        public component(Iformatter formater) 
        {
            this.chosenFormatter = formater;
        }
        public Iadapter passAdapter()
        {
            Iadapter adapter = new Implementations.adapterImplementationV3(this.chosenFormatter) { };
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
