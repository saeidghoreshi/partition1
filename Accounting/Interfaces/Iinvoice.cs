using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public enum invoiceOperationStatus { Approved=1,Rejected=2}
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
