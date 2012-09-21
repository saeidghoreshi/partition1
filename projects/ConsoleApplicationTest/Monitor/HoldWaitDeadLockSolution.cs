using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApplication1.HoldWaitDeadLockSolution
{

    public class holdwaitAccount : Account.Account
    {
        object Lock = new object();

        public holdwaitAccount():base(){}
        public holdwaitAccount(int orderNumber, decimal Balance = 0):base(orderNumber, Balance ){}

        public override void TransferMoney(decimal amt, Account.Account otherAccount)
        {
            var orders = getLockOrder(this, otherAccount as holdwaitAccount);//Resolve DeadLock

            lock (orders[0].Lock)
            {
                Thread.Sleep(20);
                lock (orders[1].Lock)
                {
                    this.Credit(amt);
                    otherAccount.Debit(amt);
                    Thread.Sleep(2);
                    Console.WriteLine(amt + " Transfered from " + this.orderNumber + " To " + otherAccount.orderNumber);
                }
            }
        }
        private holdwaitAccount[] getLockOrder(holdwaitAccount a1, holdwaitAccount a2)
        {
            if (a1.orderNumber < a2.orderNumber)
                return new holdwaitAccount[] { a1, a2 };
            else
                return new holdwaitAccount[] { a2, a1 };
        }

    }
    public class Solution
    {
        public void runSolution()
        {
            var accMan = new Account.AccountManagement<holdwaitAccount>();
            accMan.run();
        }
    }

   
}
