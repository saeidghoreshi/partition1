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
    [DataContract(Namespace = "accounting")]
    public class A_customer
    {
        [DataMember(Order=1)]
        public string firstname;
        [DataMember(Order = 2)]
        public string lastname;
        [DataMember(Order = 3)]
        public int curId;
    }
    [DataContract(Namespace = "accounting")]
    public class A_service
    {
        [DataMember(Order=1)]
        public string servicename;
        [DataMember(Order=2)]
        public int issuerEntityId;
        [DataMember(Order=3)]
        public int receiverEntityId;
    }
    [DataContract(Namespace = "accounting")]
    public class A_invoice
    {
        [DataMember(Order=1)]
        public int issuerEntityId;
        [DataMember(Order=2)]
        public int receiverEntityId;
        [DataMember(Order=3)]
        public int curId;
    }
    [DataContract(Namespace = "accounting")]
    public class A_InvoiceService
    {
        [DataMember(Order = 1)]
        public int invoiceId;
        [DataMember(Order = 2)]
        public int serviceId;
        [DataMember(Order = 3)]
        public decimal amount;
    }
    [DataContract(Namespace = "accounting")]
    public class A_newbank
    {
        [DataMember(Order=1)]
        public string bankname;
    }
    [DataContract(Namespace = "accounting")]
    public class A_finalizeInvoice
    {
        [DataMember(Order=1)]
        public int invoiceId;
    }
    [DataContract(Namespace = "accounting")]
    public class A_setBankInteracFee
    {
        [DataMember(Order=1)]
        public int bankId;
        [DataMember(Order=2)]
        public decimal amount;
        [DataMember(Order=3)]
        public string description;
    }
    [DataContract(Namespace = "accounting")]
    public class A_setBankCreditcardFee
    {
        [DataMember(Order=1)]
        public int bankId;
        [DataMember(Order=2)]
        public int ccCardTypeId;
        [DataMember(Order=3)]
        public decimal amount;
        [DataMember(Order=4)]
        public string description;

        
    }
    [DataContract(Namespace = "accounting")]
    public  class A_newCard
    {
        [DataMember(Order=1)]
        public string cardNumber;
        [DataMember(Order=2)]
        public string expirydate;
    }
    [DataContract(Namespace = "accounting")]
    public class A_assignCardToBank
    {
        [DataMember(Order=1)]
        public int cardId;
        [DataMember(Order=2)]
        public int bankId;
    }
    [DataContract(Namespace = "accounting")]
    public class A_assignCardToPerson
    {
        [DataMember(Order=1)]
        public int cardId;
        [DataMember(Order=2)]
        public int personEntityId;
    }
    [DataContract(Namespace = "accounting")]
    public class A_addWallet
    {
        [DataMember(Order=1)]
        public int personEntityId;
        [DataMember(Order=2)]
        public decimal amount;
        [DataMember(Order=3)]
        public int curId;
        [DataMember(Order=4)]
        public string description;
    }
    [DataContract(Namespace = "accounting")]
    public class A_invoiceSum
    {
        [DataMember(Order=1)]
        public int invoiceId;
    }
    [DataContract(Namespace = "accounting")]
    public class A_payInvoiceCredit
    {
        [DataMember(Order=1)]
        public int invoiceId;
        [DataMember(Order=2)]
        public decimal amount;
        [DataMember(Order=3)]
        public int cardId;
        [DataMember(Order=4)]
        public int ccCardTypeId;
    }
    [DataContract(Namespace = "accounting")]
    public class  A_payInvoiceInterac
    {
        [DataMember(Order=1)]
        public int invoiceId;
        [DataMember(Order=2)]
        public decimal amount;
        [DataMember(Order=3)]
        public int cardId;
    }
    [DataContract(Namespace = "accounting")]
    public class  A_payInvoiceInternal
    {
        [DataMember(Order=1)]
        public int invoiceId;
        [DataMember(Order=2)]
        public decimal amount;
    }
    [DataContract(Namespace = "accounting")]
    public class  A_cancelInvoicePayExt
    {
        [DataMember(Order=1)]
        public int invoiceId;
        [DataMember(Order=2)]
        public int paymentId;
    }
    [DataContract(Namespace = "accounting")]
    public class  A_cancelInvoicePayInt
    {
        [DataMember(Order=1)]
        public int invoiceId;
        [DataMember(Order=2)]
        public int paymentId;
    }
    [DataContract(Namespace = "accounting")]
    public class  A_cancelInvoice
    {
        [DataMember(Order=1)]
        public int invoiceId;
    }
    
    

    [ServiceContract(SessionMode = SessionMode.Allowed)]
    public interface IAccountingV1
    {
        [WebInvoke(Method = "POST", UriTemplate = "reset", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void reset();

        [WebInvoke(Method = "POST", UriTemplate = "Customer/new", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        [OperationContract]
        Person newCustomer(A_customer I);

        [WebInvoke(Method = "POST", UriTemplate = "Service/new", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        Service createService(A_service I);

        [WebInvoke(Method = "POST", UriTemplate = "Invoice/new", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        Invoice createinvoice(A_invoice I);

        [WebInvoke(Method = "POST", UriTemplate = "invoice/service/add", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void createInvoiceService(A_InvoiceService I);

        [WebInvoke(Method = "POST", UriTemplate = "invoice/finalize", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void finalizeInvoice(A_finalizeInvoice I);

        [WebInvoke(Method = "POST", UriTemplate = "Bank/new", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void createBank(A_newbank I);

        [WebInvoke(Method = "POST", UriTemplate = "Bank/setFee/IntracCardType", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void setFeeForIntracCardType(A_setBankInteracFee I);

        [WebInvoke(Method = "POST", UriTemplate = "Bank/setFee/CreditCardType", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void setFeeForCreditCardType(A_setBankCreditcardFee I);

        [WebInvoke(Method = "POST", UriTemplate = "Card/Master/new", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void createMasterCard(A_newCard I);

        [WebInvoke(Method = "POST", UriTemplate = "Card/Visa/new", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void createVisaCard(A_newCard I);

        [WebInvoke(Method = "POST", UriTemplate = "Card/Debit/new", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void createDebitCard(A_newCard I);

        [WebInvoke(Method = "POST", UriTemplate = "Card/assignToBank", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void assignCardToBank(A_assignCardToBank I);

        [WebInvoke(Method = "POST", UriTemplate = "Card/AssignToPerson", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void assignCardToPerson(A_assignCardToPerson I);

        //Transactions

        [WebInvoke(Method = "POST", UriTemplate = "Person/txn/addWallet", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void addWalletMoney(A_addWallet I);

        [WebInvoke(Method = "POST", UriTemplate = "Invoice/sum", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        decimal getInvoiceServicesSumAmt(A_invoiceSum I);

          
        [WebInvoke(Method = "POST", UriTemplate = "Invoice/Pay/Credit", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void payInvoiceByCC(A_payInvoiceCredit I);

        [WebInvoke(Method = "POST", UriTemplate = "Invoice/Pay/Interac", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void payInvoiceByInterac(A_payInvoiceInterac I);

        [WebInvoke(Method = "POST", UriTemplate = "Invoice/Pay/Internal", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void payInvoiceByInternal(A_payInvoiceInternal I);

        //Invoice Payment Cancellation

        [WebInvoke(Method = "POST", UriTemplate = "Invoice/Payment/Cancel/Ext", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void cancelInvoicePaymentEXT(A_cancelInvoicePayExt I);

        [WebInvoke(Method = "POST", UriTemplate = "Invoice/Payment/Cancel/INT", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void cancelInvoicePaymentINTERNAL(A_cancelInvoicePayInt I);

        //Invoice Cancellation
        [WebInvoke(Method = "POST", UriTemplate = "Invoice/Cancel", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Xml)]
        [OperationContract]
        void cancelInvoice(A_cancelInvoice I);

        //Invoice Cancellation
        
        //[WebGet(UriTemplate = "test", ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "test", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        A_customer test(A_customer x);
    }

    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class AccountingV1: IAccountingV1
    {
        public void reset()
        {
            Controller.resetAll();

            var cur_ca = new accounting.classes.Currency();
            cur_ca.create("CAD", (int)accounting.classes.enums.currencyType.Real);
        }

        public Person newCustomer(A_customer I)
        {
            /*
            var person = new accounting.classes.Person();
            person.New(I.firstname, I.lastname);
            
            //setup account
            person.createAccounts(I.curId);
            return person;
            */
            return new Person();
        }
        
        public Service createService(A_service I)
        {
            var service = new accounting.classes.Service();
            service.serviceName = I.servicename;
            service.issuerEntityID = I.issuerEntityId;
            service.receiverEntityID = I.receiverEntityId;
            service.New();
            return service;
        }
        
        public Invoice createinvoice(A_invoice I)
        {
            accounting.classes.Invoice newInvoice = new accounting.classes.Invoice();
            newInvoice.New(I.issuerEntityId, I.receiverEntityId, I.curId);
            return newInvoice;
        }
        
        public void createInvoiceService(A_InvoiceService I)
        {
            accounting.classes.Invoice inv= new accounting.classes.Invoice(I.invoiceId);
            inv.addService(I.serviceId, I.amount);
        }
        
        public void finalizeInvoice(A_finalizeInvoice I)
        {
            accounting.classes.Invoice inv = new accounting.classes.Invoice(I.invoiceId);
            inv.finalizeInvoice();
        }

        public void createBank(A_newbank I)
        {
            accounting.classes.Bank bank1 = new accounting.classes.Bank();
            bank1.New(I.bankname);
        }

        public void createMasterCard(A_newCard I)
        {
            accounting.classes.card.creditcard.MasterCard mc1 = new accounting.classes.card.creditcard.MasterCard();
            mc1.cardNumber = I.cardNumber;
            mc1.expiryDate = Convert.ToDateTime(I.expirydate);
            mc1.New();
        }

        public void createVisaCard(A_newCard I)
        {
            accounting.classes.card.creditcard.VisaCard visa1 = new accounting.classes.card.creditcard.VisaCard();
            visa1.cardNumber = I.cardNumber;
            visa1.expiryDate = Convert.ToDateTime(I.expirydate);
            visa1.New();
        }

        public void createDebitCard(A_newCard I)
        {
            accounting.classes.card.DebitCard debit1 = new accounting.classes.card.DebitCard();
            debit1.cardNumber = I.cardNumber;
            debit1.expiryDate = Convert.ToDateTime(I.expirydate);
            debit1.New();
        }

        public void assignCardToBank(A_assignCardToBank I)
        {
            Bank b = new Bank(I.bankId);
            (b as Entity).addCard(I.cardId);
        }

        public void assignCardToPerson(A_assignCardToPerson I)
        {
            Person p = new Person(I.personEntityId);
            p.addCard(I.cardId);
        }

        public void setFeeForIntracCardType(A_setBankInteracFee I)
        {
            Bank b=new Bank(I.bankId);
            b.setFeeForIntracCardType(I.amount, I.description);
        }

        public void setFeeForCreditCardType(A_setBankCreditcardFee I)
        {
            
            Bank b = new Bank(I.bankId);

            accounting.classes.enums.ccCardType cccardType = accounting.classes.enums.ccCardType.MASTERCARD;
            switch (I.ccCardTypeId)
            {
                case 1:
                    cccardType = accounting.classes.enums.ccCardType.MASTERCARD;
                    break;

                case 2:
                    cccardType = accounting.classes.enums.ccCardType.VISACARD;
                    break;
            }

            b.setFeeForCreditCardType(cccardType,I.amount, I.description);
        }

        //Transacrtions

        public void addWalletMoney(A_addWallet I)
        {
            Person p = new Person(I.personEntityId);
            p.addWalletMoney(I.amount, I.description, I.curId);
        }

        public decimal getInvoiceServicesSumAmt(A_invoiceSum I)
        {
            Invoice inv = new Invoice(I.invoiceId);
            return inv.getInvoiceServicesSumAmt();
        }

        public void payInvoiceByCC(A_payInvoiceCredit I)
        {
            
            accounting.classes.enums.ccCardType cccardType = accounting.classes.enums.ccCardType.MASTERCARD;
            
            switch (I.ccCardTypeId)
            {
                case 1:
                    cccardType = accounting.classes.enums.ccCardType.MASTERCARD;
                    break;
                case 2:
                    cccardType = accounting.classes.enums.ccCardType.VISACARD;
                    break;
            }

            Invoice inv = new Invoice(I.invoiceId);
            
            inv.doCCExtPayment(I.amount, I.cardId, cccardType);
        }

        public void payInvoiceByInterac(A_payInvoiceInterac I)
        {
            Invoice inv = new Invoice(I.invoiceId);
            inv.doINTERACPayment(I.amount, I.cardId);
        }

        public void payInvoiceByInternal(A_payInvoiceInternal I)
        {
            Invoice inv = new Invoice(I.invoiceId);
            inv.doINTERNALTransfer(I.amount);
        }

        public void cancelInvoicePaymentEXT(A_cancelInvoicePayExt I)
        {
            Invoice Inv = new Invoice(I.invoiceId);
            Inv.cancelInvoicePaymentEXT(I.paymentId);
        }

        public void cancelInvoicePaymentINTERNAL(A_cancelInvoicePayInt I)
        {
            Invoice Inv = new Invoice(I.invoiceId);
            Inv.cancelInvoicePaymentINTERNAL(I.paymentId);
        }

        public void cancelInvoice(A_cancelInvoice I)
        {
            Invoice Inv = new Invoice(I.invoiceId);
            Inv.cancelInvoice();
        }



        public A_customer test(A_customer x)
        {

            return x;
        }
    }
}
