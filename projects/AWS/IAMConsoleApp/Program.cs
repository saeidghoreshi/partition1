using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Web;
using System.Net;
using System.Xml;
using System.Security.Cryptography;
using System.Xml.Linq;
using System.IO;


namespace IAMConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            IAMManage ins = new IAMManage();
            ins.Run();



            Console.WriteLine("Enter to quit");
            Console.Read();
        }
    }
    //Identity and access management
    public class IAMManage
    {
        public void Run()
        {
            Console.WriteLine("Started ...");
            string timestamp=CalculateTimeStamp();

            //create string to login --must be alpha ordered
           string stringToConvert="GET\n"+
               "iam.amazonaws.com\n" +
               "/\n"+
               "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
               "&Action=CreateUser"+
               "&Path=%2F"+
               "&SignatureMethod=HmacSHA1"+
               "&SignatureVersion=2"+
               "&Timestamp="+timestamp+
               "&UserName=111"+
               "&Version=2010-05-08";

           string privateKey = "f0vDEsCeID1axf7pz+eUn0x49CYKOvdPvdYhZJdh";
            Encoding ae = new UTF8Encoding();
            HMACSHA1 signature = new HMACSHA1();
            signature.Key = ae.GetBytes(privateKey);
            byte[] bytes = ae.GetBytes(stringToConvert);
            byte[] moreBytes = signature.ComputeHash(bytes);
            string encodedCanonical = Convert.ToBase64String(moreBytes);
            string urlEncodedCanonical = HttpUtility.UrlEncode(encodedCanonical).Replace("+", "%20").Replace("%3d", "%3D").Replace("%2f", "%2F").Replace("%2b", "%2B");

            	


            string IMUrl = "https://iam.amazonaws.com/?Action=CreateUser" +

                "&Path=%2F" +
                "&UserName=111" +
                "&Version=2010-05-08"+
                "&Timestamp=" + timestamp +
                "&Signature=" + urlEncodedCanonical +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";
              

            HttpWebRequest req = WebRequest.Create(IMUrl) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using(HttpWebResponse resp=req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("User Created");
            Console.WriteLine(doc.OuterXml);

        }
        string CalculateTimeStamp()
        {
            string timestamp = Uri.EscapeUriString(string.Format("{0:s}",DateTime.UtcNow));
            timestamp = DateTime.Now.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ");
            timestamp = HttpUtility.UrlEncode(timestamp).Replace("%3a","%3A");

            return timestamp;
        }
    }
}
	

