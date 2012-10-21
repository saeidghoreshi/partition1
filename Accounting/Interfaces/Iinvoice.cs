using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface  IInvoice
    {
        void createNewByExistingPersons(int senderId,int receiverId,int serviceId,decimal amount,int currencyId);
        void createNewDraft();
        void createNewFromDraft(IInvoice Draft);
        void Finalize();
        void PayByCard();
        void PayInternally();

        void setCurrency(ICurrency currency);
    }
}
