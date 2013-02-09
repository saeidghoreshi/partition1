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
        [WebGet(UriTemplate = "resetdb", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void resetDB();

        [WebGet(UriTemplate = "setupNewCustomer/{firstname}/{lastname}/{curID}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        Person setupNewCustomer(string firstname, string lastname, string curID);



        [WebGet(UriTemplate = "createService/{servicename}/{issuerEntityId}/{receiverEntityId}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        Service createService(string servicename, string issuerEntityId, string receiverEntityId);

        /*
        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void createCard();

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void addWalletMoney();

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void createBank();

        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void setFeeForIntracCardType();
        
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


        [WebGet(UriTemplate = "", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void assignCard();


        [WebGet(UriTemplate = "getInvoiceSum", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        Invoice getInvoiceServicesSumAmt();
        
        
        [WebGet(UriTemplate = "createInvoice/issuereid/receivereid/curId", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        Invoice createinvoice(int issuerEid, int receiverEid, int curId);
         * */
        
    }

    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class AccountingV1: IAccountingV1
    {
        public Invoice getInvoiceServicesSumAmt()
        {
            accounting.classes.Invoice x = new accounting.classes.Invoice(1);
            return x;
        }
        public Invoice createinvoice(int issuerEid, int receiverEid, int curId)
        {
            accounting.classes.Invoice newInvoice = new accounting.classes.Invoice();
            newInvoice.OpenNew(issuerEid, receiverEid, curId);
            return newInvoice;
        }

        //OK
        public void resetDB()
        {
            Controller.resetAll();
        }


        public Person setupNewCustomer(string firstname,string lastname,string curID)
        {
            resetDB();

            var cur1 = new accounting.classes.Currency();
            cur1.create("CAD", (int)accounting.classes.enums.currencyType.Real);


            var person1 = new accounting.classes.Person();
            person1.createNew(firstname, lastname);
            
            //setup account for default Currency
            person1.createAccounts(Convert.ToInt32(curID));
            person1.addWalletMoney(780, "New Deposit for person 1", Convert.ToInt32(curID));

            return person1;

        }


        public Service createService(string servicename,string issuerEntityId,string receiverEntityId)
        {
            var service1 = new accounting.classes.Service();
            service1.serviceName = servicename;
            service1.issuerEntityID = Convert.ToInt32(issuerEntityId);
            service1.receiverEntityID = Convert.ToInt32(receiverEntityId);
            service1.Create();

            return service1;
            
        }
    }
}
