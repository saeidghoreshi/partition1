using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using client.ServiceReference1;
using System.ServiceModel;
using System.Net;
using System.Xml;
using System.IO;

namespace client
{
    class Program
    {
        static void Main(string[] args)
        {
            syncOperation();
            //asyncsyncOperation();
            Console.ReadLine();
        }
        public static void syncOperation()
        {
            //client.ServiceReference1.ServiceClient client = new client.ServiceReference1.ServiceClient(new BasicHttpBinding(),new EndpointAddress(""));

            client.ServiceReference1.ServiceClient client = new ServiceClient("WSHttpBinding_IService");
            try
            {
                Data s1 = new Data() { name="saeid1"};
                Data s2 = new Data() { name = "saeid2" };
                client.addData(s1);
                client.addData(s2);

                Data[] result = client.getList();
                Console.WriteLine("number of entries: " + result.Length);

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


        public static void asyncsyncOperation()
        {

            ServiceClient client = new ServiceClient("WSHttpBinding_IService");
            Data s1 = new Data() { name = "saeid1" };
            Data s2 = new Data() { name = "saeid2" };
            client.addData(s1);
            client.addData(s2);

            //client.getListCompleted += new EventHandler<getListCompletedEventArgs>(client_getListCompleted);
            //client.getListAsync();

            Console.WriteLine("waiting");

            //waits till finishes
            client.Close();
            //aborts no matter not completed
            //client.Abort();
        }
        public static void client_getListCompleted(object sender, getListCompletedEventArgs args)
        {
            Console.WriteLine("number of entries: " + args.Result.Length);

        }

        private static void curlToRESTService()
        {

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
            string resp = reader.ReadToEnd();
            Console.WriteLine(resp);
        }
    }
}
