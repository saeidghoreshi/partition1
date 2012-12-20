using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApplication1.MutexSolution
{
    //supports timeout-limited Lock aquisition
    public class MutexAccount:Account.Account
    {
        Mutex Lock = new Mutex();

        public MutexAccount() : base() { }
        public MutexAccount(int orderNumber, decimal Balance = 0) : base(orderNumber, Balance ) { }

        public override void TransferMoney(decimal amt, Account.Account otherAccount)
        {
            
            Mutex[] locks = { this.Lock, (otherAccount as MutexAccount).Lock };
            if (WaitHandle.WaitAll(locks, 1000))//All Locks or one approach 
                try
                {
                    this.Credit(amt);
                    Thread.Sleep(20);
                    otherAccount.Debit(amt);

                    Console.WriteLine(amt + " Transfered from " + this.orderNumber + " To " + otherAccount.orderNumber);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                finally
                {
                    foreach (var Lock in locks)
                        Lock.ReleaseMutex();
                }
        }
    }
        
    
    public class Solution
    {
        public void runSolution() 
        {
            var accMan= new Account.AccountManagement<MutexAccount>();
            accMan.run();
        }
    }
}
