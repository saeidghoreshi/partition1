using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface IPerson
    {
        IOperationStat Craete();
        IOperationStat Delete();
        IOperationStat Recover();
        IOperationStat initiateAccounting();
        IOperationStat AssignCard(ICard card);


        IOperationStat addAddress(IAddress address);
        List<IAddress> getAddresses();

        List<ICard> getCards();
        List<IAccount> getAccounts();
    }
    public class Person : IPerson
    {
        List<ICard> Cards;
        List<IAccount> Accounts;
        List<IAddress> Addresses;

        private int Id;
        public int ID { get{return Id;} }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string userName { get; set; }
        public string email { get; set; }

        public IOperationStat Craete()
        {
            throw new NotImplementedException();
        }

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
            return Cards;
        }

        public List<IAccount> getAccounts()
        {
            return Accounts;
        }


        public IOperationStat addAddress(IAddress address)
        {
            throw new NotImplementedException();
        }

        public List<IAddress> getAddresses()
        {
            return Addresses;
        }
    }

}
