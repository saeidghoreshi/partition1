using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;
using Newtonsoft;

namespace AccountingServiceClient
{
    class Program
    {
        static void Main(string[] args)
        {
            /*AccountingServiceClient.ServiceReference1.AccountingV1Client x = 
                new AccountingServiceClient.ServiceReference1.AccountingV1Client("BasicHttpBinding_IAccountingV1");
            Console.WriteLine("getInvoiceServicesSumAmt = " + x.getInvoiceServicesSumAmt());
            */

            //string setupCustomer = "http://localhost:555/srv.svc/rest/setupNewCustomer/saeid/hhhhoreshi/1";
            string createservice = "http://localhost:555/srv.svc/rest/Service/New/Service-12345/1/1";
            AccountingTest.request(createservice);

            Console.ReadLine();
        }
    }

    public class AccountingTest 
    {
        public static void request(string webaddress)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(webaddress);
            request.Method = "GET";

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (var dataStream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(dataStream))
            {   
                string responseFromServer = reader.ReadToEnd();
                dynamic x=Newtonsoft.Json.JsonConvert.DeserializeObject(responseFromServer);
                Console.WriteLine(x.serviceName);
            }
        }
    }
}
