using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Transactions;
using System.Runtime.Serialization;

using System.ServiceModel.Web;
using System.ServiceModel;


using AccountingLib.Models;
using accounting.classes;
using System.ServiceModel.Activation;


namespace RyanGoreshi
{
    [DataContract(Namespace = "http://domain/testData")]
    public class testData
    {
        [DataMember]
        public string name;
    }
    
    
    [ServiceContract(SessionMode = SessionMode.Allowed)]
    public interface IAccountingV1
    {
        [WebGet(UriTemplate = "reset", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void reset();

        [WebGet(UriTemplate = "Customer/new/{firstname}/{lastname}/{curID}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        Person newCustomer(string firstname, string lastname, string curID);

        [WebGet(UriTemplate = "Service/new/{servicename}/{issuerEntityId}/{receiverEntityId}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        Service createService(string servicename, string issuerEntityId, string receiverEntityId);

        [WebGet(UriTemplate = "Invoice/new/{issuerEid}/{receiverEid}/{curId}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        Invoice createinvoice(string issuerEid, string receiverEid, string curId);

        [WebGet(UriTemplate = "invoice/service/add/{invoiceId}/{serviceId}/{amount}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        invoiceService createInvoiceService(string invoiceId, string serviceId,string amount);

        [WebGet(UriTemplate = "invoice/finalize/{invoiceId}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        invoiceService finalizeInvoice(string invoiceId);


        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void createBank();

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void createCard();

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void assignCard();

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void setFeeForIntracCardType();



        /*
        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void addWalletMoney();
          
        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void payInvoiceByCC(inv, inv.getInvoiceServicesSumAmt() / 2, visa1.cardID, accounting.classes.enums.ccCardType.VISACARD);

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void payInvoiceByInterac(inv, inv.getInvoiceServicesSumAmt() / 4, debit1.cardID);

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void payInvoiceByInternal(inv, inv.getInvoiceServicesSumAmt() / 8);

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void payInvoiceByCC(inv, inv.getInvoiceServicesSumAmt() / 8, visa1.cardID, accounting.classes.enums.ccCardType.MASTERCARD);

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void cancelInvoicePaymentEXT(1);

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void cancelInvoicePaymentINTERNAL(3);
      
        */

    }

    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class AccountingV1: IAccountingV1
    {
        //OK
        public void reset()
        {
            Controller.resetAll();

            var cur_ca = new accounting.classes.Currency();
            cur_ca.create("CAD", (int)accounting.classes.enums.currencyType.Real);
        }

        //OK
        public Person newCustomer(string firstname, string lastname, string curID)
        {
            var person = new accounting.classes.Person();
            person.createNew(firstname, lastname);
            
            //setup account
            person.createAccounts(Convert.ToInt32(curID));
            return person;
        }
        //OK
        public Service createService(string servicename, string issuerEntityId, string receiverEntityId)
        {
            var service = new accounting.classes.Service();
            service.serviceName = servicename;
            service.issuerEntityID = Convert.ToInt32(issuerEntityId);
            service.receiverEntityID = Convert.ToInt32(receiverEntityId);
            service.Create();
            return service;
        }
        //OK
        public Invoice createinvoice(string issuerEid, string receiverEid, string curId)
        {
            accounting.classes.Invoice newInvoice = new accounting.classes.Invoice();
            newInvoice.createNew(Convert.ToInt32(issuerEid), Convert.ToInt32(receiverEid), Convert.ToInt32(curId));
            return newInvoice;
        }
        //OK
        public invoiceService createInvoiceService(string invoiceId, string serviceId,string amount)
        {
            accounting.classes.Invoice inv= new accounting.classes.Invoice(Convert.ToInt32(invoiceId));
            return inv.addService(Convert.ToInt32(serviceId), Convert.ToDecimal(amount));
        }
        //OK
        public void finalizeInvoice(string invoiceId)
        {
            accounting.classes.Invoice inv = new accounting.classes.Invoice(Convert.ToInt32(invoiceId));
            inv.finalizeInvoice();
        }


        invoiceService IAccountingV1.finalizeInvoice(string invoiceId)
        {
            throw new NotImplementedException();
        }

        public void createBank()
        {
            throw new NotImplementedException();
        }

        public void createCard()
        {
            throw new NotImplementedException();
        }

        public void assignCard()
        {
            throw new NotImplementedException();
        }

        public void setFeeForIntracCardType()
        {
            throw new NotImplementedException();
        }
    }
}
