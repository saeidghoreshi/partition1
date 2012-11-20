using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace accounting.classes.bank
{
    public class Fee
    {
        public int feeID;
        public int bankID;
        public int cardTypeID;
        public decimal amount;
        public string description;

        /// <summary>
        /// load fee based on feeID
        /// </summary>
        /// <param name="feeID"></param>
        public void loadFeeById(int feeID)
        {
        
        }
    }
}
