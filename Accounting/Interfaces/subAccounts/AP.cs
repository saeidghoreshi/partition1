using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Classes;
using Accounting.Models;

namespace Accounting.Interfaces.subAccounts
{
    public class APAccount : OEAccount//, IAccount
    {
        CATEGORYTYPE CatTYPE = CATEGORYTYPE.Inc;
        CATEGORYTYPE TYPE { get { return CatTYPE; } }



        public accountOperationStatus Create()
        {
            using(var ctx=new  AccContext())
            {

                return accountOperationStatus.Approved;
            }
        }

        public accountOperationStatus Suspend()
        {
            throw new NotImplementedException();
        }

        public accountOperationStatus Close()
        {
            throw new NotImplementedException();
        }

        public accountStatus getStatus()
        {
            throw new NotImplementedException();
        }

        public dynamic getAccountInfo()
        {
            throw new NotImplementedException();
        }
    }
}
