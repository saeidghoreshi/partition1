using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
using System.ServiceModel.Description;

namespace newWCFService
{
    public class myHelloServiceHost:ServiceHost
    {
        public myHelloServiceHost(params Uri[] baseAddresses) : base(typeof(HelloService),baseAddresses) { }

        protected override void  OnOpening()
        {
 	        base.OnOpening();

            this.AddServiceEndpoint
                (
                typeof(IHello),
                new BasicHttpBinding(),
                "always-here"
                );
            
            ServiceMetadataBehavior meta=this.Description.Behaviors.Find<ServiceMetadataBehavior>();
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
}
