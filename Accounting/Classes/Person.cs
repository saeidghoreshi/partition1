using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting.Models;
namespace Accounting.Classes
{
    public class Person : IPerson
    {
        List<ICard> Cards;
        List<IAccount> Accounts;
        List<IAddress> Addresses;


        public int ID { get; set; }
        public string firstname { get; set; }
        public string lastName { get; set; }
        public string userName { get; set; }
        public string email { get; set; }

        

        public IOperationStat Delete()
        {
            throw new NotImplementedException();
        }

        public IOperationStat Recover()
        {
            throw new NotImplementedException();
        }

        public IOperationStat initiateAccounting()
        {
            throw new NotImplementedException();
        }

        public IOperationStat AssignCard(ICard card)
        {
            throw new NotImplementedException();
        }

        public List<ICard> getCards()
        {
            throw new NotImplementedException();
        }

        public List<IAccount> getAccounts()
        {
            throw new NotImplementedException();
        }


        public IOperationStat addAddress(IAddress address)
        {
            throw new NotImplementedException();
        }

        public List<IAddress> getAddresses()
        {
            return Addresses;
        }

        public Person Create(string fName, string lName, string userName, string email)
        {
            throw new NotImplementedException();
        }

        IPerson IPerson.Create(string fName, string lName, string userName, string email)
        {
            throw new NotImplementedException();
        }
    }
    

}
