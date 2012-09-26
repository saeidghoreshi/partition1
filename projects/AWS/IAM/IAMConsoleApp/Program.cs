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
            AWSManage ins = new AWSManage();
            //ins.EC2Services();
            //Create Snapshot > create a volum from it  > attach it
            //ins.EC2CreateSnapShot();
            ins.EC2CreateVolFromSnapShot();


            Console.WriteLine("Enter to quit");
            Console.Read();
        }
    }
    //Identity and access management
    public class AWSManage
    {
        
        public void EC2CreateVolFromSnapShot()
        {
            Console.WriteLine("EC2 Create Volum from snapshot Started ...");
            string timestamp = CalculateTimeStamp();

            //create string to login --must be alpha ordered
            string stringToConvert = "GET\n" +
                "ec2.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=CreateVolume" +
                "&AvailabilityZone=us-east-1a"+ //real one
                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Size=1"+
                "&SnapshotId=snap-64fed311" +
                "&Timestamp=" + timestamp +
                "&Version=2011-12-15" 
                ;

            string EC2Url = "https://ec2.amazonaws.com/?Action=CreateVolume" +

                "&Version=2011-12-15" +
                "&AvailabilityZone=us-east-1a" + //real one
                "&Size=1" +
                "&SnapshotId=snap-64fed311" +
                "&Timestamp=" + timestamp +
                "&Signature=" + CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";

            HttpWebRequest req = WebRequest.Create(EC2Url) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("Instance Queried");
            Console.WriteLine(doc.OuterXml);
        }

        public void EC2CreateSnapShot()
        {
            Console.WriteLine("EC2 Create snapshot Started ...");
            string timestamp = CalculateTimeStamp();

            //create string to login --must be alpha ordered
            string stringToConvert = "GET\n" +
                "ec2.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=CreateSnapshot" +
                "&Description=volumeBAK" +
                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2011-12-15"+
                "&VolumeId=vol-c46acebe"
                ;

           
            string EC2Url = "https://ec2.amazonaws.com/?Action=CreateSnapshot" +

                "&Version=2011-12-15" +
                "&Description=volumeBAK" +
                "&VolumeId=vol-c46acebe" +
                "&Timestamp=" + timestamp +
                "&Signature=" + CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";

            HttpWebRequest req = WebRequest.Create(EC2Url) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("Instance Queried");
            Console.WriteLine(doc.OuterXml);
        }

        public void EC2Services()
        {
            Console.WriteLine("EC2 Started ...");
            string timestamp = CalculateTimeStamp();

            //create string to login --must be alpha ordered
            string stringToConvert = "GET\n" +
                "ec2.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=DescribeInstances" +
                "&Filter.1.Name=availability-zone"+
                "&Filter.1.Value.1=us-east-1a" +
                "&Filter.1.Value.2=us-east-1c" +

                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2011-12-15";

            string EC2Url = "https://ec2.amazonaws.com/?Action=DescribeInstances" +

                "&Version=2011-12-15" +
                "&Filter.1.Name=availability-zone" +
                "&Filter.1.Value.1=us-east-1a" +
                "&Filter.1.Value.2=us-east-1c"+
                "&Timestamp=" + timestamp +
                "&Signature=" + CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";


            HttpWebRequest req = WebRequest.Create(EC2Url) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("Instance Queried");
            Console.WriteLine(doc.OuterXml);
        }

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

           
            string IMUrl = "https://iam.amazonaws.com/?Action=CreateUser" +

                "&Path=%2F" +
                "&UserName=111" +
                "&Version=2010-05-08"+
                "&Timestamp=" + timestamp +
                "&Signature=" + CreateHash(stringToConvert) +
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


        //Helpers
        string CreateHash(string stringToConvert) 
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

        string CalculateTimeStamp()
        {
            string timestamp = Uri.EscapeUriString(string.Format("{0:s}",DateTime.UtcNow));
            timestamp = DateTime.Now.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ");
            timestamp = HttpUtility.UrlEncode(timestamp).Replace("%3a","%3A");

            return timestamp;
        }
    }
}
	

