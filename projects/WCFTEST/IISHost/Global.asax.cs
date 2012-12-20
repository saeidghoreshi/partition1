using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using System.Web.Routing;

namespace IISHost
{
    public class Global : System.Web.HttpApplication
    {
        private void registerRoautes() 
        {
            var factory = new WebServiceHostFactory();
            RouteTable.Routes.Add(new ServiceRoute("RestService",factory,typeof(wcfLibrary.service)));
        }
        
        protected void Application_Start(object sender, EventArgs e)
        {
            registerRoautes();
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}