using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes.organization;

namespace accounting.classes.bank
{
    public class bankBranch:Office
    {
        public int bankBranchID;
        public int name;

        /// <summary>
        /// load bank Branch based on bankID
        /// </summary>
        /// <param name="bankID"></param>
        public void loadBankBranchByBankID(int bankBranchID) 
        {
            
        }

        public void createNew()
        {
        
        }
    }
}
