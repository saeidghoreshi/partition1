using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleApplication1.Account
{
    public interface IAccount 
    {
        void Debit(decimal amt);
        void Credit(decimal amt) ;
        void TransferMoney(decimal amt, Account otherAccount);
    }
    public class Account :IAccount
    {
       
        public int orderNumber { get; set; }
        public decimal Balance { get; set; }

        public Account() { }
        public Account(int orderNumber, decimal Balance = 0)
        {
            this.Balance = Balance;
            this.orderNumber = orderNumber;
        }
        public void Debit(decimal amt)
        {
            Thread.Sleep(20);
            decimal temp = Balance;
            Thread.Sleep(20);
            temp += amt;
            Thread.Sleep(20);
            this.Balance = temp;
        }

        public void Credit(decimal amt)
        {
            this.Debit(-1 * amt);
        }

        public virtual void TransferMoney(decimal amt, Account otherAccount)
        { }
    }



    public class AccountManagement<T> where T : Account, new()
    {
        const int NUMBER_OF_ACCOUNTS = 150;
        const decimal INITIAL_DEPOSIT = 10000;
        const decimal TRANSFER_AMOUNT = 1000;
        const int NUMBER_OF_THREADS = 100;
        List<T> Accounts = new List<T> { };

        bool simulation_over;


        public void run() 
        {
            //Define Number of Accounts
            for (int i = 0; i < NUMBER_OF_ACCOUNTS; i++)
            {
                T item = new T();
                item.orderNumber=i;
                item.Balance = INITIAL_DEPOSIT;
                Accounts.Add(item);
            }
                
                

            simulation_over = false;
            //Perform NUMBER_OF_THREADS of Random Transfers
            ///*
            List<Task> tasks = new List<Task> { };
            for (int i = 0; i < NUMBER_OF_THREADS; i++)
            {
                Task task = Task.Factory.StartNew((arg) =>
                {
                    TransferBetweenAccounts();
                }, i);
                tasks.Add(task);
            }

            Thread.Sleep(20000);
            simulation_over = true;

            Task.WaitAll(tasks.ToArray());
            //*/



            /*
            Thread[] threads = new Thread[NUMBER_OF_THREADS];
            
            for (int i = 0; i < NUMBER_OF_THREADS; i++)
            {
                threads[i] = new Thread(TransferBetweenAccounts);
                threads[i].Start();
            }

            Thread.Sleep(20000);
            simulation_over = true;
            foreach (Thread t in threads)
                t.Join();
            */

            Console.WriteLine("sum of Transactions = " + verifyBalance());

        }
        public void TransferBetweenAccounts()
        {
            while (!simulation_over)
            {
                Random rnd = new Random();
                T firstAccount;
                T secondAccount;
                int accIndex = rnd.Next(0, NUMBER_OF_ACCOUNTS - 1);
                firstAccount = Accounts[accIndex];
                while (true)
                {
                    secondAccount = Accounts[rnd.Next(0, NUMBER_OF_ACCOUNTS - 1)];
                    if (firstAccount.orderNumber == secondAccount.orderNumber) continue;
                    else break;
                }
                firstAccount.TransferMoney(TRANSFER_AMOUNT, secondAccount);
                Thread.Sleep(50);
            }

        }


        public decimal verifyBalance()
        {
            decimal balance_sum = 0;
            for (var i = 0; i < NUMBER_OF_ACCOUNTS; i++)
                balance_sum += Accounts[i].Balance;

            return balance_sum;
        }
    }
}      