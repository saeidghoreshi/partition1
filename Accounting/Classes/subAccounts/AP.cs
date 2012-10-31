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



        public accountOperationStatus Create(int sender_id,int receiver_id,decimal amount,int currency_id,string timestamp,int service_id)
        {
            using(var ctx=new  AccContext())
            {
                //var newAPAccount = new APAccount()
                //{
                //    receiver_id = receiver_id,
                //    sender_id = sender_id,
                //    amount = amount,
                //    currency_id = currency_id,
                //    timestamp = timestamp,
                //    service_id = service_id
                //};
                
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
