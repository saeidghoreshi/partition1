using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface IFee
    {
        IOperationStat CreateNewFee(string name,double amount);
        IOperationStat getFeeInfo(  );
    }
    public class Fee : IFee,ICloneable
    {
        private int Id;
        public int ID { get { return Id; } }
        public string Name { get; set; }
        public double Amount { get; set; }


        public IOperationStat CreateNewFee(string name, double amount)
        {
            throw new NotImplementedException();
        }

        public IOperationStat getFeeInfo()
        {
            //load feee from repository and return back
            throw new NotImplementedException();
        }

        public object Clone()
        {
            return this.MemberwiseClone();
        }
    }

}
