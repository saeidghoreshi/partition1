using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_EventPattern
{
    class Program
    {
        static void Main(string[] args)
        {
        }
    }

    public class order {
        public Guid orderId;
        public int productId;
    }
    public  class management
    {
        public void Run()
        {
            Func<order, double> del_1 = delegate(order o) { return 2.0d; };
            Func<order,double> del_2=(order)=>{return 4.2d;};
            Func<order, double> del_3 = test;
        }
        public double test(order o) 
        {
            return 1.2d;
        }
        

    }
}
