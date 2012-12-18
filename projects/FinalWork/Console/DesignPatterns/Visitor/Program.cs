using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_VisitorPattern
{
    class Program
    {
        void Main()
        {
            new VisitorPatternManager().run();

            Console.WriteLine("press enter to quit ...");
            Console.ReadLine();
        }
    }
    
    public interface IVisitor 
    {
        void Visit(BankAccount b);
        void Visit(Loan L);
    }
    public interface IAsset 
    {
        void Accept(IVisitor visitor);
    }

    //assets
    public class Loan:IAsset
    {
        public int owed { get; set; }

        public void Accept(IVisitor visitor)
        {
            visitor.Visit(this );
        }
    }
    public class BankAccount:IAsset
    {
        public int amount { get; set; }
        public double interest { get; set; }

        public void Accept(IVisitor visitor)
        {
            visitor.Visit(this);
        }
    }
    public class Person:IAsset
    {
        public List<IAsset> assets = new List<IAsset>();

        public void Accept(IVisitor visitor)
        {
            foreach (var asset in assets)
                asset.Accept(visitor);
        }
    }

    //define as much as like
    public class NetworthVisitor : IVisitor
    {
        public int total { get; set; }

        public void Visit(BankAccount b)
        {
            total += b.amount;    
        }

        public void Visit(Loan L)
        {
            total -= L.owed;
        }
    }
    public class IncomeVisitor : IVisitor
    {
        public double Amount { get; set; }

        public void Visit(BankAccount b)
        {
            Amount += b.amount+b.interest;
        }

        public void Visit(Loan L)
        {
            Amount -= L.owed;
        }
    }

    //Engin
    public class VisitorPatternManager 
    {
        public void run() 
        {
            var person = new Person();
            person.assets.Add(new BankAccount { amount=1000,interest=0.2});
            person.assets.Add(new Loan { owed=200});
            person.assets.Add(new Loan{owed=20 });

            var nwv=new NetworthVisitor();
            var iv = new IncomeVisitor();

            person.Accept(nwv);
            person.Accept(iv);

            Console.WriteLine(nwv.total);
            Console.WriteLine(iv.Amount);
        }
    }

}
