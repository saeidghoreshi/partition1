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
using System.Security.Cryptography;
using System.Net;
using System.Xml;
using System.Web;

namespace AWS_Dynamo_DB
{
    class Program
    {
        public static void Main(string[] args)
        {
            AWSDynamoDBNETAPI ins = new AWSDynamoDBNETAPI();
            ins.getSessionToken_NATIVE();

            Console.WriteLine("Press Enter to Quit");
            Console.Read();
        }
    }
    public class AWSDynamoDBNETAPI
    {
        public void getSessionToken_NATIVE()
        {
            Console.WriteLine("Getting Session Token ...");
            string timestamp = AWSDynamoDBHelper.CalculateTimeStamp();

            string stringToConvert = "GET\n" +
                "sts.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=GetSessionToken" +
                "&DurationSeconds=3600" +
                "&SignatureMethod=HmacSHA256" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2011-06-15"
                ;

            string stsUrl = "https://sts.amazonaws.com/?Action=GetSessionToken" +
                "&DurationSeconds=3600" +
                "&Version=2011-06-15" +
                "&Timestamp=" + timestamp +
                "&Signature=" + AWSDynamoDBHelper.CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA256" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ"
                ;

            HttpWebRequest req = WebRequest.Create(stsUrl) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            XmlNamespaceManager mgr = new XmlNamespaceManager(doc.NameTable);
            mgr.AddNamespace("amz","https://sts.amazonaws.com/doc/2011-06-15/");
            string sessionToken = doc.SelectSingleNode("//amz:SessionToken",mgr).InnerText;
            string secretAccessKey = doc.SelectSingleNode("//amz:SecretAccessKey",mgr).InnerText;
            string accessKey = doc.SelectSingleNode("//amz:AccessKeyId",mgr).InnerText;


            Console.WriteLine("Temporary Credential Received");
            Console.WriteLine(sessionToken);
        }
        public void getSessionToken_NETAPI()
        {
            Console.WriteLine("Get Indivisual Object ...");
            AmazonSimpleDBClient client = new AmazonSimpleDBClient();
            GetAttributesRequest request = new GetAttributesRequest();
            request.DomainName = "SaeidDomain";
            request.ItemName = "Course01";
            request.AttributeName = new List<string> { "CourseName" };
            GetAttributesResponse response = client.GetAttributes(request);

            Console.WriteLine("get Indivisual Object completed");
            Console.WriteLine(response.ToXML());
        }
        
    }
    public class AWSDynamoDBHelper
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