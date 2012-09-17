using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


using  ClientWCFService.HelloServiceReference;

using System.ServiceModel;
using System.Net;
using System.IO;
using System.Xml;
using System.Xml.Linq;


namespace ClientWCFService
{
    class clientProgram
    {
        static void Main(string[] args)
        {
            //byProxy();
            //byChannel();
            

            //using Restful services
            curlToRESTService();
            
         
            Console.WriteLine("Enter key to terminate ...");
            Console.ReadLine();
        }

        

        private static void curlToRESTService()
        {
            /*
             Request body
            <spec xmlns="http://test.com/Interface1/spec">
            <!--Inorder Alphabetically-->
            <bamboo>bbbb</bamboo>
            <name>Ryan</name>
            <postal>V1T</postal>
            <xaddress>Vancouver</xaddress>
            </spec>
             */
            /*
             Header
             * User-Agent: XXX
            Host: localhost:8080
            Content-Length: XXX
            Content-Type: application/xml

             */
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create("http://localhost:8080/helloservice/webhttp/Interface1");
            
            
            //*******************************
            //send post data and header info and make it work Asyncrounously
            //*******************************
            string sXML = "<spec  xmlns=\"http://test.com/Interface1/spec\" ><bamboo>bbbb</bamboo><name>Ryan</name><postal>V1T</postal><xaddress>Vancouver</xaddress></spec>";
            request.Method = "POST";
            request.ContentType = "application/xml;";
            

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.XmlResolver = null;
            
            
            request.ContentLength = sXML.Length;
            System.IO.StreamWriter sw = new System.IO.StreamWriter(request.GetRequestStream());
            sw.Write(sXML);
            sw.Close();
            


            WebResponse response = request.GetResponse();
            Stream streamx = response.GetResponseStream();
            StreamReader reader = new StreamReader(streamx);
            string resp= reader.ReadToEnd();
            Console.WriteLine(resp);

        }
        public static void byProxy()
        {
            
            HelloClient client = new HelloClient("Helloservice_basichttp");
            //HelloClient client = new HelloClient(new BasicHttpBinding(),new EndpointAddress("http://localhost:8080/helloservice/basic"));
            
            try
            {
                spec s = new spec() { name = "test", xaddress = "test" };
                client.addSpec(s);
                client.addSpec(s);
                
                client.getSpecsCompleted+=new EventHandler<getSpecsCompletedEventArgs>(client_getSpecsCompleted);
                client.getSpecsAsync();

                Console.WriteLine("waiting");

                client.Close();

            }
            catch (FaultException fe)
            {
                Console.WriteLine(fe.GetType());
                client.Abort();
            }
            catch (CommunicationException ce)
            {
                Console.WriteLine(ce.GetType());
                client.Abort();
            }
            catch (TimeoutException te)
            {
                Console.WriteLine(te.GetType());
                client.Abort();
            }
        }
        public static void byChannel()
        {
            
            //Channel
            ChannelFactory<IHelloChannel> service = new ChannelFactory<IHelloChannel>("Helloservice_basichttp");
            IHelloChannel channel = service.CreateChannel();
            try
            {
                spec s = new spec() { name = "test", xaddress = "test" };
                channel.addSpec(s);
                channel.addSpec(s);

                spec[] result = channel.getSpecs();
                Console.WriteLine("number of entries: " + result.Length);

                channel.Close();

            }
            catch (FaultException fe)
            {
                Console.WriteLine(fe.GetType());
                channel.Abort();
            }
            catch (CommunicationException ce)
            {
                Console.WriteLine(ce.GetType());
                channel.Abort();
            }
            catch (TimeoutException te)
            {
                Console.WriteLine(te.GetType());
                channel.Abort();
            }
        }

        public static void client_getSpecsCompleted (object sender,getSpecsCompletedEventArgs args)
        {
            Console.WriteLine("number of entries: " + args.Result.Length);
        
        }
    }
}
