using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using newWCFService;
using clientWCFBydll.HelloServiceReference;

using System.ServiceModel;
using System.ServiceModel.Web;


namespace clientWCFBydll
{
    class clientWCFByDll
    {
        static void Main(string[] args)
        {
            /*
             both webservice dll and web reference needed
             * good for using to host on IIS 
             */
            try
            {
                WebChannelFactory<newWCFService.IHello> cf = new WebChannelFactory<newWCFService.IHello>
                (
                    new Uri("http://localhost:8080/helloservice/")
                );
                newWCFService.IHello client = cf.CreateChannel();

                client.addSpec(new spec { name="XXX"});
                Console.WriteLine("Added");
                Console.ReadLine();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.ReadLine();
            }

            /*
             Host settings
             
             * 
             * <?xml version="1.0"?>
            <configuration>
                <system.serviceModel>
                    <services>
                        <service name="newWCFService.HelloService">
                          <host>
                            <baseAddresses>
                              <add baseAddress="http://localhost:8080/helloservice" />
                            </baseAddresses>
                          </host>
                        </service>
                    </services>
     
                </system.serviceModel>
            </configuration>

             */
        }
    }
}
