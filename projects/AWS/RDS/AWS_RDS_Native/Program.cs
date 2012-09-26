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
using System.Web;
using System.Net;
using System.IO;
using System.Xml;

namespace AWS_RDS_Native
{
    class Program
    {
        public static void Main(string[] args)
        {
            AWSRDSManagement ins = new AWSRDSManagement();
            //ins.DescribeDbInstance();
            //ins.ModifyDbInstance();
            //ins.CreateSubDomain();
            //ins.ListDomains();
            ins.PutNewItems();

            Console.Read();
        }

    }
    public class AWSRDSManagement 
    {
        public void DescribeDbInstance() 
        {
            Console.WriteLine("Describe DB Instance");
            string timestamp = AWS_RDS_Native.AWSRDSHelper.CalculateTimeStamp();

            string stringToConvert = "GET\n" +
                "rds.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=DescribeDBInstances" +
                "&DBInstanceIdentifier=saeidmysql" +
                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2012-01-15" 
                ;

            string EC2Url = "https://rds.amazonaws.com/?Action=DescribeDBInstances" +
                "&DBInstanceIdentifier=saeidmysql" +
                "&Version=2012-01-15" +
                "&Timestamp=" + timestamp +
                "&Signature=" + AWS_RDS_Native.AWSRDSHelper.CreateHash(stringToConvert) +
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

            Console.WriteLine("DB Instance Created");
            Console.WriteLine(doc.OuterXml);
        }
        public void ModifyDbInstance()
        {
            Console.WriteLine("Modify DB Instance");
            string timestamp = AWS_RDS_Native.AWSRDSHelper.CalculateTimeStamp();

            string stringToConvert = "GET\n" +
                "rds.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=ModifyDBInstance" +
                "&DBInstanceIdentifier=saeidmysql" +
                "&PreferredMaintenanceWindow=sun%3A03%3A30-sun%3A04%3A00" +
                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2012-01-15"
                ;

            string rdsUrl = "https://rds.amazonaws.com/?Action=ModifyDBInstance" +
                "&DBInstanceIdentifier=saeidmysql" +
                "&PreferredMaintenanceWindow=sun%3A03%3A30-sun%3A04%3A00" +
                "&Version=2012-01-15" +
                "&Timestamp=" + timestamp +
                "&Signature=" + AWS_RDS_Native.AWSRDSHelper.CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";

            HttpWebRequest req = WebRequest.Create(rdsUrl) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("DB Instance Created");
            Console.WriteLine(doc.OuterXml);
        }
        public void CreateSubDomain()
        {
            Console.WriteLine("Create Subdomain...");
            string timestamp = AWS_RDS_Native.AWSRDSHelper.CalculateTimeStamp();

            string stringToConvert = "GET\n" +
                "sdb.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=CreateDomain" +
                "&DomainName=SaeidDomain" +
                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2009-04-15"
                ;

            string rdsUrl = "https://sdb.amazonaws.com/?Action=CreateDomain" +
                "&DomainName=SaeidDomain" +
                "&Version=2009-04-15" +
                "&Timestamp=" + timestamp +
                "&Signature=" + AWS_RDS_Native.AWSRDSHelper.CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";

            HttpWebRequest req = WebRequest.Create(rdsUrl) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("SubDomain Created");
            Console.WriteLine(doc.OuterXml);
        }
        public void ListDomains()
        {
            Console.WriteLine("List Domains ...");
            string timestamp = AWS_RDS_Native.AWSRDSHelper.CalculateTimeStamp();

            string stringToConvert = "GET\n" +
                "sdb.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=ListDomains" +
                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2009-04-15"
                ;

            string rdsUrl = "https://sdb.amazonaws.com/?Action=ListDomains" +
                "&Version=2009-04-15" +
                "&Timestamp=" + timestamp +
                "&Signature=" + AWS_RDS_Native.AWSRDSHelper.CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";

            HttpWebRequest req = WebRequest.Create(rdsUrl) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("List Domains Completed");
            Console.WriteLine(doc.OuterXml);
        }
        public void PutNewItems()
        {
            Console.WriteLine("Put New Items ...");
            string timestamp = AWS_RDS_Native.AWSRDSHelper.CalculateTimeStamp();

            string stringToConvert = "GET\n" +
                "sdb.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=PutAttributes" +
                "&Attribute.1.Name=Coursename1" +
                "&Attribute.1.Value=Math1" +
                "&Attribute.2.Name=Coursename2" +
                "&Attribute.2.Value=Math2" +
                "&Attribute.3.Name=Coursename3" +
                "&Attribute.3.Value=Math3" +
                "&DomainName=SaeidDomain" +
                "&ItemName=Course01" +
                "&SignatureMethod=HmacSHA1" +
                "&SignatureVersion=2" +
                "&Timestamp=" + timestamp +
                "&Version=2009-04-15"
                ;

            string rdsUrl = "https://sdb.amazonaws.com/?Action=PutAttributes" +
                "&DomainName=SaeidDomain" +
                "&ItemName=Course01" +
                "&Attribute.1.Name=Coursename1" +
                "&Attribute.1.Value=Math1" +
                "&Attribute.2.Name=Coursename2" +
                "&Attribute.2.Value=Math2" +
                "&Attribute.3.Name=Coursename3" +
                "&Attribute.3.Value=Math3" +
                "&Version=2009-04-15" +
                "&Timestamp=" + timestamp +
                "&Signature=" + AWS_RDS_Native.AWSRDSHelper.CreateHash(stringToConvert) +
                "&SignatureVersion=2" +
                "&SignatureMethod=HmacSHA1" +
                "&AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ";

            HttpWebRequest req = WebRequest.Create(rdsUrl) as HttpWebRequest;

            XmlDocument doc = new XmlDocument();
            using (HttpWebResponse resp = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(resp.GetResponseStream());
                string responseXml = reader.ReadToEnd();
                doc.LoadXml(responseXml);
            }

            Console.WriteLine("Put Items Completed");
            Console.WriteLine(doc.OuterXml);
        }
    }
    public class AWSRDSHelper
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