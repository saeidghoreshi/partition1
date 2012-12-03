using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;

using wcfLibrary;
using System.ServiceModel.Description;

namespace ConsoleHost
{
    public class myCustomSericeHost : ServiceHost
    {
        public myCustomSericeHost() : base(typeof(wcfLibrary.service)) { }
        protected override void OnOpening()
        {
            base.OnOpening();
            this.AddServiceEndpoint(typeof(wcfLibrary.IService), new BasicHttpBinding(), "http://localhost:2100/service/always-here");
            //check if exists
            ServiceMetadataBehavior meta = this.Description.Behaviors.Find<ServiceMetadataBehavior>();
            if (meta != null)
                meta.HttpGetEnabled = true;
            else 
            {
                meta = new ServiceMetadataBehavior();
                meta.HttpGetEnabled = true;
                this.Description.Behaviors.Add(meta);
            }
        }
    }
    
    class Program
    {
        static void Main(string[] args)
        {
            ServicesList();
            /*
              System.ServiceModel.Web.WebServiceHost webServiceHost = new System.ServiceModel.Web.WebServiceHost(typeof(HelloService));
                webServiceHost.Open();
                printRunningServices(webServiceHost);
                Console.Read();
                webServiceHost.Close();
             */
        }

        static void printInfo(ServiceHost sh) 
        {
            Console.WriteLine(sh.Description.ServiceType);

            foreach(ServiceEndpoint se in sh.Description.Endpoints)
            {
                Console.WriteLine(se.Address);
            }
        }
        public static void ServicesList() 
        {
            myCustomSericeHost host = new myCustomSericeHost();

            host.AddServiceEndpoint(typeof(wcfLibrary.IService), new BasicHttpBinding(), "http://localhost:4000/service/basic");
            host.AddServiceEndpoint(typeof(wcfLibrary.IService), new WSHttpBinding(), "http://localhost:4000/service/ws");
            host.AddServiceEndpoint(typeof(wcfLibrary.IService), new NetTcpBinding(), "net.tcp://localhost:4001/service/tcp");


            try
            {
                host.Open();
                printInfo(host);
                Console.ReadLine();
                host.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Console.ReadLine();
                host.Abort();
            }
        }
        
    }
}
