using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1.Generics
{
    interface IAccount { }
    class Account :IAccount{ }

    class CreditAccount : Account { }
    class DebitAccount : Account { }

    class InternalCreditAccount : CreditAccount { }
    class InternalDebitAccount : DebitAccount { }

    class ForeignCreditAccount : CreditAccount { }
    class ForeignDebitAccount : DebitAccount { }

    class accountManagement<T> : Account where T : IAccount  /*lower the better*/
    {
    }
    class accountManagement2<T> : Account where T : class, new()
    {
    }

    class accountCollection<T> : List<T>
    {
        public new void Add (T item)
        {
            base.Add(item);
            //other ops
            
        }
    }

    class consumer 
    {
        public consumer() 
        {
            
        }
    }
}
