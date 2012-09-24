using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web;
using System.IO;
using System.Net;
using System.Xml;
using System.Security.Cryptography;

namespace S3NativeConsoleProject
{
    class Program
    {
        static void Main(string[] args)
        {
            S3ManagementConsole s3m = new S3ManagementConsole();
            //s3m.ListBucketREST();
            s3m.ListBucketPropertyREST();

            Console.WriteLine("Enter the key to Exit");
            Console.ReadLine();
        }
    }
    public class S3ManagementConsole
    {
        public void ListBucketREST()
        {
            Console.WriteLine("S3 ListBucket REST Started ...");
            string timestamp = S3ManagementConsoleProperty.CalculateTimeStamp();

            //create string to login --must be alpha ordered
            string stringToConvert = "GET\n" +  //HTTP verb
                
                "\n" +                          //content[payload]-md5
                "\n" +                          //content-type
                "\n" +                          //date
                "x-amz-date:" +timestamp+"\n"+  //optionally AMZ header
                "/"                             //resource
                ;

            string S3Url = "https://s3.amazonaws.com/";

            HttpWebRequest req = WebRequest.Create(S3Url) as HttpWebRequest;
            req.Method = "GET";
            req.Host = "s3.amazonaws.com";
            req.Date = DateTime.Parse(timestamp);
            req.Headers["x-amz-date"] = timestamp;
            req.Headers["Authorization"] = "AWS AKIAJUKCDIHVVPJHEAYQ:" + S3ManagementConsoleProperty.CreateHash(stringToConvert);

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("S3 BucketList Queried");
            Console.WriteLine(doc.OuterXml);
        }
        public void ListBucketPropertyREST()
        {
            Console.WriteLine("S3 ListBucketProperty REST Started ...");
            string timestamp = S3ManagementConsoleProperty.CalculateTimeStamp();

            //create string to login --must be alpha ordered
            string stringToConvert = "GET\n" +      //HTTP verb

                "\n" +                              //content[payload]-md5
                "\n" +                              //content-type
                "\n" +                              //date
                "x-amz-date:" + timestamp + "\n" +  //optionally AMZ header
                "/psbuket/?lifecycle"               //resource
                ;

            string S3Url = "https://psbuket.s3.amazonaws.com/?lifecycle";

            HttpWebRequest req = WebRequest.Create(S3Url) as HttpWebRequest;
            req.Method = "GET";
            req.Host = "psbuket.s3.amazonaws.com";
            req.Date = DateTime.Parse(timestamp);
            req.Headers["x-amz-date"] = timestamp;
            req.Headers["Authorization"] = "AWS AKIAJUKCDIHVVPJHEAYQ:" + S3ManagementConsoleProperty.CreateHash(stringToConvert);

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("S3 BucketListProperty Queried");
            Console.WriteLine(doc.OuterXml);
        }

        
    }
    public class S3ManagementConsoleProperty 
    {
        public static string CreateHash(string stringToConvert)
        {
            string privateKey = "f0vDEsCeID1axf7pz+eUn0x49CYKOvdPvdYhZJdh";
            Encoding ae = new UTF8Encoding();
            HMACSHA1 signature = new HMACSHA1();
            signature.Key = ae.GetBytes(privateKey);
            byte[] bytes = ae.GetBytes(stringToConvert);
            byte[] moreBytes = signature.ComputeHash(bytes);
            string encodedCanonical = Convert.ToBase64String(moreBytes);

            return encodedCanonical;
        }

        public static string CalculateTimeStamp()
        {
            string timestamp = string.Format("{0:r}", DateTime.UtcNow);
            return timestamp;
        }
    }
}
