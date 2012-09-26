using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

using Amazon;
using Amazon.EC2;
using Amazon.EC2.Model;
using Amazon.SimpleDB;
using Amazon.SimpleDB.Model;
using Amazon.S3;
using Amazon.S3.Model;

using System.Web;
using System.IO;
using System.Net;
using System.Security.Cryptography;
using System.Xml;

namespace AWS_SQS_NATIVE
{
    class Program
    {
        public static void Main(string[] args)
        {

            //new AWSSQSManagement().ListQueues();
            //new AWSSQSManagement().SendMessage();
            new AWSSQSManagement().ReadAndDeleteMessage();

            Console.Read();
        }

    }
    public class AWSSQSManagement 
    {
        public void ListQueues()
        {
            Console.WriteLine("List Queues ...");
            string timestamp = AWSSQSHelper.CalculateTimeStamp();

            string stringToConvert = "GET\n" +
                "sqs.us-east-1.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=ListQueues" +
                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2009-02-01"
                ;

            string sqsUrl = "https://sqs.us-east-1.amazonaws.com/?Action=ListQueues" +
                "&Version=2009-02-01" +
                "&Timestamp=" + timestamp +
                "&Signature=" + AWSSQSHelper.CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";

            HttpWebRequest req = WebRequest.Create(sqsUrl) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("List Queues Created");
            Console.WriteLine(doc.OuterXml);
        }
        public void SendMessage()
        {
            Console.WriteLine("Send Message ...");
            string timestamp = AWSSQSHelper.CalculateTimeStamp();
            string message="this a test message on "+DateTime.Now.Ticks;

            string stringToConvert = "GET\n" +
                "sqs.us-east-1.amazonaws.com\n" +
                "/158683541032/saeidsqs\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=SendMessage" +
                "&MessageBody=" + message.Replace(" ","%20")+
                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2009-02-01"
                ;

            string sqsUrl = "https://sqs.us-east-1.amazonaws.com/158683541032/saeidsqs?Action=SendMessage" +
                "&MessageBody="+message+
                "&Version=2009-02-01" +
                "&Timestamp=" + timestamp +
                "&Signature=" + AWSSQSHelper.CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";

            HttpWebRequest req = WebRequest.Create(sqsUrl) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("Queue Message Created");
            Console.WriteLine(doc.OuterXml);
        }
        public void ReadAndDeleteMessage()
        {
            Console.WriteLine("Read and Delete Messages ...");
            string timestamp = AWSSQSHelper.CalculateTimeStamp();
            bool isNotFound = true;
            string receiptHandle = string.Empty;


            //Reading Message
            while (isNotFound)
            {
                string stringToConvert = "GET\n" +
                    "sqs.us-east-1.amazonaws.com\n" +
                    "/158683541032/saeidsqs\n" +
                    "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                    "&Action=ReceiveMessage" +
                    "&AttributeName=All" +
                    "&MaxNumberOfMessages=5" +
                    "&SignatureMethod=HmacSHA1" +
                    "&SignatureVersion=2" +
                    "&Timestamp=" + timestamp +
                    "&Version=2009-02-01"
                    ;

                string sqsUrl = "https://sqs.us-east-1.amazonaws.com/158683541032/saeidsqs?Action=ReceiveMessage" +
                    "&AttributeName=All" +
                    "&MaxNumberOfMessages=5" +
                    "&Version=2009-02-01" +
                    "&Timestamp=" + timestamp +
                    "&Signature=" + AWSSQSHelper.CreateHash(stringToConvert) +
                    "&SignatureVersion=2" +
                    "&SignatureMethod=HmacSHA1" +
                    "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";

                HttpWebRequest req = WebRequest.Create(sqsUrl) as HttpWebRequest;

                XmlDocument doc = new XmlDocument();
                using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
                {
                    StreamReader reader = new StreamReader(resp.GetResponseStream());
                    string responseXml = reader.ReadToEnd();
                    doc.LoadXml(responseXml);
                }

                Console.WriteLine("Message Read");
                Console.WriteLine(doc.OuterXml);

                //---------------------Delete Messages
                Console.WriteLine("Deleteing Messages ...");
                XmlNamespaceManager mgr = new XmlNamespaceManager(doc.NameTable);
                mgr.AddNamespace("aws","http://queue.amazonaws.com/doc/2009-02-01/");
                if (doc.SelectSingleNode("//aws:ReceiptHandle", mgr) != null)
                {
                    receiptHandle = doc.SelectSingleNode("//aws:ReceiptHandle", mgr).InnerText;
                    receiptHandle = HttpUtility.UrlEncode(receiptHandle).Replace("+", "%20").Replace("%3d", "%3D").Replace("%2f", "%2F").Replace("%2b", "%2B");
                    isNotFound = false;

                    Console.WriteLine("Queue Message Received.Handle is "+receiptHandle);                    
                }
            }//While loop

        }
    }
    public class AWSSQSHelper
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
            string urlEncodedCanonical = HttpUtility.UrlEncode(encodedCanonical).Replace("+", "%20").Replace("%3d", "%3D").Replace("%2f", "%2F").Replace("%2b", "%2B");
            return urlEncodedCanonical;
        }

        public static string CalculateTimeStamp()
        {
            string timestamp = Uri.EscapeUriString(string.Format("{0:s}", DateTime.UtcNow));
            timestamp = DateTime.Now.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ");
            timestamp = HttpUtility.UrlEncode(timestamp).Replace("%3a", "%3A");

            return timestamp;
        }
    }
}