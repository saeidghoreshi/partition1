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
        Func<order, double> strategy_1 ;
        Func<order, double> strategy_2 ;
        Func<order, double> strategy_3;

        public void Run()
        {
            strategy_1 = delegate(order o) { return 2.0d; };
            strategy_2 = (order) => { return 4.2d; };
            strategy_3 = test;
        }
        public double test(order o){return 1.2d;}

        public double CalculateBasedOnStrategy(order o,Func<order,double> strategy) 
        {
            return strategy(o);
        }

    }
}
