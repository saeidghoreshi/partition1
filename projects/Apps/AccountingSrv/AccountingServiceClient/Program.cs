using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AccountingServiceClient
{
    class Program
    {
        static void Main(string[] args)
        {
            AccountingServiceClient.ServiceReference1.AccountingV1Client x = 
                new AccountingServiceClient.ServiceReference1.AccountingV1Client("BasicHttpBinding_IAccountingV1");
            Console.WriteLine("getInvoiceServicesSumAmt = " + x.getInvoiceServicesSumAmt());

            Console.ReadLine();
        }
    }
}
