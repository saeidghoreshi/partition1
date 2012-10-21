using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface IPerson
    {
        IPerson Create(string fName,string lName,string userName,string email);
        IOperationStat Delete();
        IOperationStat Recover();
        IOperationStat initiateAccounting();
        IOperationStat AssignCard(ICard card);


        IOperationStat addAddress(IAddress address);
        List<IAddress> getAddresses();

        List<ICard> getCards();
        List<IAccount> getAccounts();
    }
    

}
