using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using Newtonsoft;
using System.Xml.Serialization;
using System.Runtime.Serialization.Json;

namespace AccountingServiceClient
{
    class Program
    {
        static void Main(string[] args)
        {
            
            try
            {
                AccountingTest.request("reset", "");
                Console.WriteLine("reset Done");

                AccountingTest.request("customer/new",
                    "<A_customer  xmlns=\"accounting\" ><firstname>Cust Fname1</firstname><lastname>Cust Lname1</lastname><curId>1</curId></A_customer>");
                Console.WriteLine("customer new done");

                AccountingTest.request("customer/new",
                    "{firstname:'Cust Fname2',lastname:'Cust Lname2',curId:1}");
                Console.WriteLine("custoner new done");

                AccountingTest.request("Service/new",
                    "<A_service xmlns=\"accounting\" ><servicename>SRV1</servicename><issuerEntityId>1</issuerEntityId><receiverEntityId>2</receiverEntityId></A_service>");
                Console.WriteLine("service new done");

                AccountingTest.request("Service/new",
                    "<A_service xmlns=\"accounting\" ><servicename>SRV2</servicename><issuerEntityId>1</issuerEntityId><receiverEntityId>2</receiverEntityId></A_service>");
                Console.WriteLine("service new done");

                AccountingTest.request("Invoice/new",
                    "<A_invoice xmlns=\"accounting\" ><issuerEntityId>1</issuerEntityId><receiverEntityId>2</receiverEntityId><curId>1</curId></A_invoice>");
                Console.WriteLine("invoice new done");

                AccountingTest.request("invoice/service/add",
                    "<A_InvoiceService xmlns=\"accounting\" ><invoiceId>1</invoiceId><serviceId>1</serviceId><amount>100</amount></A_InvoiceService>");
                Console.WriteLine("invoice service done");

                AccountingTest.request("invoice/service/add",
                "<A_InvoiceService xmlns=\"accounting\" ><invoiceId>1</invoiceId><serviceId>2</serviceId><amount>150</amount></A_InvoiceService>");
                Console.WriteLine("invoice service done");

                AccountingTest.request("Invoice/finalize",
                    "<A_finalizeInvoice xmlns=\"accounting\" ><invoiceId>1</invoiceId></A_finalizeInvoice>");
                Console.WriteLine("invoice finalize done");

                //Banking
                AccountingTest.request("Bank/new",
                    "<A_newbank xmlns=\"accounting\" ><bankname>Scotia</bankname></A_newbank>");
                Console.WriteLine("bank new done");

                AccountingTest.request("Bank/new",
                    "<A_newbank xmlns=\"accounting\" ><bankname>RBC</bankname></A_newbank>");
                Console.WriteLine("bank new done");

                AccountingTest.request("Bank/setFee/IntracCardType",
                    "<A_setBankInteracFee xmlns=\"accounting\" ><bankId>1</bankId><amount>0.98</amount><description>set Interac fee for scotia</description></A_setBankInteracFee>");
                Console.WriteLine("set scotia interac done");

                AccountingTest.request("Bank/setFee/CreditCardType",
                    "<A_setBankCreditcardFee xmlns=\"accounting\" ><bankId>1</bankId><ccCardTypeId>1</ccCardTypeId><amount>0.36</amount><description>set MasterCard Fee for Scotia</description></A_setBankCreditcardFee>");
                Console.WriteLine("set scotia credit fee done");

                AccountingTest.request("Card/Debit/new",
                    "<A_newCard xmlns=\"accounting\" ><cardNumber>Debit-111-222-33</cardNumber><expirydate>2013-3-3</expirydate></A_newCard>");
                Console.WriteLine("new debit card done");

                AccountingTest.request("Card/Master/new",
                    "<A_newCard xmlns=\"accounting\" ><cardNumber>Master-111-222-33</cardNumber><expirydate>2013-3-3</expirydate></A_newCard>");
                Console.WriteLine("new master card done");

                //debit card Assignment
                AccountingTest.request("Card/assignToBank",
                    "<A_assignCardToBank xmlns=\"accounting\" ><cardId>1</cardId><bankId>1</bankId></A_assignCardToBank>");
                Console.WriteLine("debit card assignred to bank");

                AccountingTest.request("Card/assignToPerson",
                    "<A_assignCardToPerson xmlns=\"accounting\" ><cardId>1</cardId><personEntityId>1</personEntityId></A_assignCardToPerson>");
                Console.WriteLine("debit card assigned to person");

                //master card Assignment
                AccountingTest.request("Card/assignToBank",
                    "<A_assignCardToBank xmlns=\"accounting\" ><cardId>2</cardId><bankId>1</bankId></A_assignCardToBank>");
                Console.WriteLine("mastrer card assignred to bank");

                AccountingTest.request("Card/assignToPerson",
                    "<A_assignCardToPerson xmlns=\"accounting\" ><cardId>2</cardId><personEntityId>1</personEntityId></A_assignCardToPerson>");
                Console.WriteLine("master card assigned to person");


                //Transactipons
                AccountingTest.request("Person/txn/addWallet",
                    "<A_addWallet xmlns=\"accounting\" > <personEntityId>1</personEntityId>  <amount>123.58</amount> <curId>1</curId> <description>add wallet money</description></A_addWallet>");
                Console.WriteLine("add wallet done");

                AccountingTest.request("Invoice/sum",
                    "<A_invoiceSum xmlns=\"accounting\" ><invoiceId>1</invoiceId></A_invoiceSum>");
                Console.WriteLine("invoice sum done");

                //payment
                AccountingTest.request("Invoice/Pay/Interac",
                    "<A_payInvoiceInterac xmlns=\"accounting\" ><invoiceId>1</invoiceId><amount>10.25</amount><cardId>1</cardId></A_payInvoiceInterac>");
                Console.WriteLine("invoice pay interac done");
                
                AccountingTest.request("Invoice/Pay/Credit",
                    "<A_payInvoiceCredit xmlns=\"accounting\" ><invoiceId>1</invoiceId><amount>20</amount><cardId>2</cardId><ccCardTypeId>1</ccCardTypeId></A_payInvoiceCredit>");
                Console.WriteLine("invoice pay credit master done");
                

                AccountingTest.request("Invoice/Pay/Internal",
                    "<A_payInvoiceInternal xmlns=\"accounting\" ><invoiceId>1</invoiceId><amount>11.58</amount></A_payInvoiceInternal>");
                Console.WriteLine("invoice pay internal done");

                //payment Cancellation  XOR w/  cancel invoice  [????]
                /*
                AccountingTest.request("Invoice/Payment/Cancel/Ext",
                    "<A_cancelInvoicePayExt xmlns=\"accounting\" ><invoiceId>1</invoiceId><paymentId>1</paymentId></A_cancelInvoicePayExt>");
                Console.WriteLine("invoice payment cancel ext done");

                AccountingTest.request("Invoice/Payment/Cancel/Ext",
                    "<A_cancelInvoicePayExt xmlns=\"accounting\" ><invoiceId>1</invoiceId><paymentId>2</paymentId></A_cancelInvoicePayExt>");
                Console.WriteLine("invoice payment cancel ext done");

                AccountingTest.request("Invoice/Payment/Cancel/INT",
                    "<A_cancelInvoicePayInt xmlns=\"accounting\" ><invoiceId>1</invoiceId><paymentId>3</paymentId></A_cancelInvoicePayInt>");
                Console.WriteLine("invoice pay cancel int done");
                */

                //cancel Invoice
                AccountingTest.request("Invoice/Cancel",
                    "<A_cancelInvoice xmlns=\"accounting\" ><invoiceId>1</invoiceId></A_cancelInvoice>");
                Console.WriteLine("invoice cancel done");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            

            Console.WriteLine("Enter to Quit");
            Console.ReadLine();
        }
    }    
    public class AccountingTest 
    {
        
        public static void request(string command,string xmlData)
        {
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create("http://localhost:555/srv.svc/rest/" + command);
            //http://accouning.azurewebsites.net

            string sXML = xmlData;
            request.Method = "POST";
            request.ContentType = "application/xml;";
            request.ContentLength = sXML.Length;

            
            using (System.IO.StreamWriter sw = new System.IO.StreamWriter(request.GetRequestStream()))
            {
                sw.Write(sXML);
            }
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (var dataStream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(dataStream))
            {
                string responseFromServer = reader.ReadToEnd();
                dynamic x = Newtonsoft.Json.JsonConvert.DeserializeObject(responseFromServer);
                if (x != null) Console.WriteLine(x);
            }

        }
    }
}
