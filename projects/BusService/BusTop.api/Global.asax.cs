using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

using NServiceBus;

namespace BusTop.api
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        public static IBus Bus { get; set; }
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //setup endpoint
            Bus= NServiceBus.Configure
                .With()//scan runtime library for any 
                .Log4Net()
                .DefaultBuilder()//defgault container
                .XmlSerializer()
                .MsmqTransport()
                .UnicastBus()
                .SendOnly(); //define how endpoints and queues are related        Host-webapi(sendonly) >>>> backend which has its own queue

        }
    }
}