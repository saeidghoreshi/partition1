using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Runtime.Serialization;

using System.ServiceModel.Web;
using System.ServiceModel;

namespace RyanGoreshi
{
    [ServiceContract(SessionMode = SessionMode.Allowed)]
    public interface IAccountingV1
    {

        [OperationContract]        
        void OpenNew(int issuerEntityID,int receiverEntityID, int currencyID);
        [OperationContract]        
        decimal getInvoiceServicesSumAmt();
        [OperationContract]        
        void finalizeInvoice();
        [OperationContract]        
        AccountingService.Models.invoiceService add(int serviceID, decimal amount);
        
        
       
    }
    public class AccountingV1: IAccountingV1
    {




        public void OpenNew(int issuerEntityID, int receiverEntityID, int currencyID)
        {
            throw new NotImplementedException();
        }

        public decimal getInvoiceServicesSumAmt()
        {
            throw new NotImplementedException();
        }

        public void finalizeInvoice()
        {
            throw new NotImplementedException();
        }


        public AccountingService.Models.invoiceService addService(int serviceID, decimal amount)
        {
            throw new NotImplementedException();
        }


        public AccountingService.Models.invoiceService add(int serviceID, decimal amount)
        {
            throw new NotImplementedException();
        }
    }
}
