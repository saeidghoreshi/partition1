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
        void finalizeInvoice(string invoiceId);


        [WebGet(UriTemplate = "Bank/new/{bankname}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void createBank(string bankname);

        [WebGet(UriTemplate = "Bank/setFee/IntracCardType/{bankId}/{amount}/{description}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void setFeeForIntracCardType(string bankId,string amount, string description);

        [WebGet(UriTemplate = "Bank/setFee/CreditCardType/{bankId}/{ccCardTypeID}/{amount}/{description}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void setFeeForCreditCardType(string bankId, string ccCardTypeID, string amount, string description);

        [WebGet(UriTemplate = "Card/Master/new/{cardNumber}/{expirydate}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void createMasterCard(string cardNumber,string expirydate);

        [WebGet(UriTemplate = "Card/Visa/new/{cardNumber}/{expirydate}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void createVisaCard(string cardNumber, string expirydate);

        [WebGet(UriTemplate = "Card/Debit/new/{cardNumber}/{expirydate}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void createDebitCard(string cardNumber, string expirydate);

        [WebGet(UriTemplate = "Card/assignToBank/{cardId}/{bankId}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void assignCardToBank(string cardId,string bankId);

        [WebGet(UriTemplate = "Card/AssignToPerson/{cardId}/{personId}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void assignCardToPerson(string cardId,string personId);

        //Transactions
        
        [WebGet(UriTemplate = "Person/txn/addWallet/{personID}/{amount}/{curID}/{description}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void addWalletMoney(string personID,string amount,string curID,string description);

        [WebGet(UriTemplate = "Invoice/sum/{invoiceID}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        decimal getInvoiceServicesSumAmt(string invoiceID);

          
        [WebGet(UriTemplate = "Invoice/Pay/Credit/{invoiceID}/{amount}/{cardId}/{ccCardTypeID}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void payInvoiceByCC(string invoiceID , string amount ,string cardId,string ccCardTypeID);

        [WebGet(UriTemplate = "Invoice/Pay/Interac/{invoiceID}/{amount}/{cardId}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void payInvoiceByInterac(string invoiceID,string amount ,string cardId);

        [WebGet(UriTemplate = "Invoice/Pay/Interac/{invoiceID}/{amount}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void payInvoiceByInternal(string invoiceID,string amount);

        //Invoice Payment Cancellation

        [WebGet(UriTemplate = "Invoice/Payment/Cancel/Ext/{invoiceID}/{paymentID}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void cancelInvoicePaymentEXT(string invoiceID,string paymentID);

        [WebGet(UriTemplate = "Invoice/Payment/Cancel/INT/{invoiceID}/{paymentID}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void cancelInvoicePaymentINTERNAL(string invoiceID,string paymentID);

        //Invoice Cancellation
        [WebGet(UriTemplate = "Invoice/Cancel/{invoiceID}", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        void cancelInvoice(string invoiceID);
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
            person.New(firstname, lastname);
            
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
            service.New();
            return service;
        }
        //OK
        public Invoice createinvoice(string issuerEid, string receiverEid, string curId)
        {
            accounting.classes.Invoice newInvoice = new accounting.classes.Invoice();
            newInvoice.New(Convert.ToInt32(issuerEid), Convert.ToInt32(receiverEid), Convert.ToInt32(curId));
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

        public void createBank(string bankname)
        {
            accounting.classes.Bank bank1 = new accounting.classes.Bank();
            bank1.New("Scotia");
        }
        public void createMasterCard(string cardNumber, string expirydate)
        {
            accounting.classes.card.creditcard.MasterCard mc1 = new accounting.classes.card.creditcard.MasterCard();
            mc1.cardNumber = cardNumber;
            mc1.expiryDate = Convert.ToDateTime(expirydate);
            mc1.New();
        }

        public void createVisaCard(string cardNumber, string expirydate)
        {
            accounting.classes.card.creditcard.VisaCard visa1 = new accounting.classes.card.creditcard.VisaCard();
            visa1.cardNumber = cardNumber;
            visa1.expiryDate = Convert.ToDateTime(expirydate);
            visa1.New();
        }

        public void createDebitCard(string cardNumber, string expirydate)
        {
            accounting.classes.card.DebitCard debit1 = new accounting.classes.card.DebitCard();
            debit1.cardNumber = cardNumber;
            debit1.expiryDate = Convert.ToDateTime(expirydate);
            debit1.New();
        }

        public void assignCardToBank(string cardId, string bankId)
        {
            Bank b = new Bank(Convert.ToInt32(bankId));
            b.addCard(Convert.ToInt32(cardId));
        }

        public void assignCardToPerson(string cardId, string personId)
        {
            Person p = new Person(Convert.ToInt32(personId));
            p.addCard(Convert.ToInt32(cardId));
        }

        public void setFeeForIntracCardType(string bankId, string amount, string description)
        {
            Bank b=new Bank(Convert.ToInt32(bankId));
            b.setFeeForIntracCardType(Convert.ToDecimal(amount), description);
        }

        public void setFeeForCreditCardType(string bankId, string ccCardTypeID, string amount, string description)
        {
            Bank b = new Bank(Convert.ToInt32(bankId));

            accounting.classes.enums.ccCardType cccardType = accounting.classes.enums.ccCardType.MASTERCARD;
            switch (Convert.ToInt32(ccCardTypeID))
            {
                case 1:
                    cccardType = accounting.classes.enums.ccCardType.MASTERCARD;
                    break;
                case 2:
                    cccardType = accounting.classes.enums.ccCardType.VISACARD;
                    break;
            }

            b.setFeeForCreditCardType(cccardType,Convert.ToDecimal(amount), description);
        }

        //Transacrtions

        public void addWalletMoney(string personID, string amount, string curID, string description)
        {
            Person p = new Person(Convert.ToInt32(personID));
            p.addWalletMoney(Convert.ToDecimal(amount), description, Convert.ToInt32(curID));
        }

        public decimal getInvoiceServicesSumAmt(string invoiceID)
        {
            Invoice inv = new Invoice(Convert.ToInt32(invoiceID));
            return inv.getInvoiceServicesSumAmt();
        }

        public void payInvoiceByCC(string invoiceID, string amount, string cardId, string ccCardTypeID)
        {
            accounting.classes.enums.ccCardType cccardType = accounting.classes.enums.ccCardType.MASTERCARD;
            switch (Convert.ToInt32(ccCardTypeID))
            {
                case 1:
                    cccardType = accounting.classes.enums.ccCardType.MASTERCARD;
                    break;
                case 2:
                    cccardType = accounting.classes.enums.ccCardType.VISACARD;
                    break;
            }

            Invoice inv = new Invoice(Convert.ToInt32(invoiceID));
            inv.doCCExtPayment(Convert.ToDecimal(amount), Convert.ToInt32(cardId), cccardType);
        }

        public void payInvoiceByInterac(string invoiceID, string amount, string cardId)
        {
            Invoice inv = new Invoice(Convert.ToInt32(invoiceID));
            inv.doINTERACPayment(Convert.ToDecimal(amount), Convert.ToInt32(cardId));
        }

        public void payInvoiceByInternal(string invoiceID, string amount)
        {
            Invoice inv = new Invoice(Convert.ToInt32(invoiceID));
            inv.doINTERNALTransfer(Convert.ToDecimal(amount));
        }

        public void cancelInvoicePaymentEXT(string invoiceID, string paymentID)
        {
            Invoice Inv = new Invoice(Convert.ToInt32(invoiceID));
            Inv.cancelInvoicePaymentEXT(Convert.ToInt32(paymentID));
        }

        public void cancelInvoicePaymentINTERNAL(string invoiceID, string paymentID)
        {
            Invoice Inv = new Invoice(Convert.ToInt32(invoiceID));
            Inv.cancelInvoicePaymentINTERNAL(Convert.ToInt32(paymentID));
        }

        public void cancelInvoice(string invoiceID)
        {
            Invoice Inv = new Invoice(Convert.ToInt32(invoiceID));
            Inv.cancelInvoice();
        }
    }
}
