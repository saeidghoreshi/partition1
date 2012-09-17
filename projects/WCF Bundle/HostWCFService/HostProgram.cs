using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using newWCFService;
using System.ServiceModel;
using System.ServiceModel.Description;

namespace HostWCFService
{
    class HostProgram
    {
        static void Main(string[] args)
        {
           
            ServiceHost();
            //WebServiceHost();
        }

        private static void WebServiceHost()
        {
            try
            {
                System.ServiceModel.Web.WebServiceHost webServiceHost = new System.ServiceModel.Web.WebServiceHost(typeof(HelloService));
                webServiceHost.Open();
                printRunningServices(webServiceHost);
                Console.Read();
                webServiceHost.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }

        private static void ServiceHost()
        {
            
            myHelloServiceHost host = new myHelloServiceHost();
            host.Open();
            printRunningServices(host);

            Console.WriteLine("HEllo Service Running");
            Console.ReadLine();
            host.Close();
        }



        public static void printRunningServices(ServiceHost sh) {
               
            foreach(ServiceEndpoint item in sh.Description.Endpoints)
                Console.WriteLine(item.Address);
        }

    }
   
}
