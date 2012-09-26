using System;
using System.Collections.Generic;
using System.Collections;
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

using Amazon.DynamoDB;
using Amazon.DynamoDB.Model;

namespace AWS_Dynamo_DB
{
    class Program
    {
        public static void Main(string[] args)
        {
            //AWSDynamoDBNATIVE ins = new AWSDynamoDBNATIVE();
            //ins.getSessionToken();

            //new AWSDynamoDBNETAPI().PutItem();
            //new AWSDynamoDBNETAPI().QueryItems();
            new AWSDynamoDBNETAPI().ScanItems();

            Console.WriteLine("Press Enter to Quit");
            Console.Read();
        }
    }
    public class AWSDynamoDBNETAPI 
    {
        public void PutItem() 
        {
            Console.WriteLine("Amazon Dynamo Db Client Started ...");
            AmazonDynamoDBClient client = new AmazonDynamoDBClient();
            PutItemRequest request = new PutItemRequest();
            request.TableName = "saeiddynamo";
            request.Item = new Dictionary<string, AttributeValue>();

            AttributeValue value1 = new AttributeValue();
            value1.S = "1003";
            request.Item.Add("id",value1);

            AttributeValue value2 = new AttributeValue();
            value2.S = "BizTalk";
            request.Item.Add("Course",value2);

            PutItemResponse response = client.PutItem(request);

            Console.WriteLine("Item Added");
        }
        public void QueryItems()
        {
            Console.WriteLine("Querying Items...");

            AmazonDynamoDBClient client = new AmazonDynamoDBClient();
            QueryRequest request = new QueryRequest();
            request.Count = false;
            request.TableName = "dynamodb2";
            request.HashKeyValue = new AttributeValue() { S = "100" };

            Condition rangeCondition = new Condition();
            rangeCondition.AttributeValueList = new List<AttributeValue>() { new AttributeValue() { N = "10021" } };
            rangeCondition.ComparisonOperator = "GE";
            request.RangeKeyCondition = rangeCondition;

            QueryResponse response = client.Query(request);
            string resultActivity = string.Empty;
            foreach (Dictionary<string, AttributeValue> item in response.QueryResult.Items)
                resultActivity += item["activity"].S + "; ";

            Console.WriteLine("Item Queried " + resultActivity);

        }
        public void ScanItems()
        {
            Console.WriteLine("Scaning Items...");

            AmazonDynamoDBClient client = new AmazonDynamoDBClient();
            ScanRequest request = new ScanRequest();
            request.Count = false;
            request.TableName = "dynamodb2";
            
            Condition scanCondition = new Condition();
            scanCondition.AttributeValueList = new List<AttributeValue>() { new AttributeValue() { S = "Login" } };
            scanCondition.ComparisonOperator = "CONTAINS";
            request.ScanFilter= new Dictionary<string,Condition>();
            request.ScanFilter.Add("activity",scanCondition);

            ScanResponse response = client.Scan(request);
            string resultActivity = string.Empty;
            foreach (Dictionary<string, AttributeValue> item in response.ScanResult.Items)
                resultActivity += item["activity"].S + "; ";

            Console.WriteLine("Item Queried " + resultActivity);

        }
    }
    public class AWSDynamoDBNATIVE
    {
        public void getSessionToken()
        {
            Console.WriteLine("Getting Session Token ...");
            string timestamp = AWSDynamoDBHelper.CalculateTimeStamp();

            string stringToConvert = "GET\n" +
                "sts.amazonaws.com\n" +
                "/\n" +
                "AWSAccessKeyId=AKIAJUKCDIHVVPJHEAYQ" +
                "&Action=GetSessionToken" +
                "&DurationSeconds=3600" +
                "&SignatureMethod=HmacSHA1" +
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
                "&SignatureMethod=HmacSHA1" +
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

            ListDynamoTables(sessionToken,secretAccessKey,accessKey);
            PutDynamoRecord(sessionToken, secretAccessKey, accessKey);
        }

        public void ListDynamoTables(string sessionToken, string secretAccessKey, string accessKeyID)
        {
            Console.WriteLine("List Dynamo Tables ...");
            
            string timestamp = string.Format("{0:r}",DateTime.UtcNow);
            string jsonString = "{}";
            //alpha sorted
            string stringToConvert = "POST\n" +
                
                "/\n" +
                "\n" +
                "host:dynamodb.us-east-1.amazonaws.com\n"+
                "x-amz-date:" +timestamp+"\n"+
                "x-amz-security-token:" + sessionToken+ "\n" +
                "x-amz-target:DynamoDB_20111205.ListTables\n" +
                "\n"+
                jsonString;

            Encoding ae = new UTF8Encoding();
            SHA256 sha256 = SHA256CryptoServiceProvider.Create();
            byte[] hash = sha256.ComputeHash(ae.GetBytes(stringToConvert));

            HMACSHA256 signature = new HMACSHA256(ae.GetBytes(secretAccessKey));
            byte[] sigbytes = signature.ComputeHash(hash);
            string sigString = Convert.ToBase64String(sigbytes);

            Console.WriteLine("Encoding of jSON request Done");

            HttpWebRequest req = WebRequest.Create("https://dynamodb.us-east-1.amazonaws.com") as HttpWebRequest;
            req.Method = "POST";
            req.Headers["x-amz-target"] = "DynamoDB_20111205.ListTables";
            req.ContentType = "application/x-amz-json-1.0";
            req.Headers["x-amz-security-token"] = sessionToken;
            req.Headers["x-amz-date"] = timestamp;
            req.Host = "dynamodb.us-east-1.amazonaws.com";
            req.Headers["x-amzn-authorization"] = "AWS3 AWSAccessKeyId=" + accessKeyID + ",Algorithm=HMACSHA256,SignedHeaders=host;x-amz-date;x-amz-security-token;x-amz-target,Signature=" + sigString;

            //add the jSon Content
            byte[] jsonInput = Encoding.UTF8.GetBytes(jsonString);
            Stream reqStream = req.GetRequestStream();
            reqStream.Write(jsonInput,0,jsonInput.Length);
            reqStream.Close();

            string responseString=string.Empty;
            using(HttpWebResponse response=req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(response.GetResponseStream());
                responseString=reader.ReadToEnd();
            }

            Console.WriteLine("Dynamo Tables Listed");
            Console.WriteLine(responseString);
            
        }

        public void PutDynamoRecord(string sessionToken, string secretAccessKey, string accessKeyID)
        {
            Console.WriteLine("Putting Dynamo Record ...");

            string jsonString = @"{""TableName"":""saeiddynamo"",""Item"":{""id"":{""S"":""1219""}},""Expected"":{}}";

            string timestamp = string.Format("{0:r}",DateTime.UtcNow);

            //alpha sorted
            string stringToConvert = "POST\n" +
                "/\n" +
                "\n" +
                "host:dynamodb.us-east-1.amazonaws.com\n" +
                "x-amz-date:" + timestamp + "\n" +
                "x-amz-security-token:" + sessionToken + "\n" +
                "x-amz-target:DynamoDB_20111205.PutItem\n" +
                "\n" +
                jsonString;

            Encoding ae = new UTF8Encoding();
            SHA256 sha256 = SHA256CryptoServiceProvider.Create();
            byte[] hash = sha256.ComputeHash(ae.GetBytes(stringToConvert));

            HMACSHA256 signature = new HMACSHA256(ae.GetBytes(secretAccessKey));
            byte[] sigbytes = signature.ComputeHash(hash);
            string sigString = Convert.ToBase64String(sigbytes);

            Console.WriteLine("Encoding of jSON request Done");

            HttpWebRequest req = WebRequest.Create("https://dynamodb.us-east-1.amazonaws.com") as HttpWebRequest;
            req.Method = "POST";
            req.Headers["x-amz-target"] = "DynamoDB_20111205.PutItem";
            req.ContentType = "application/x-amz-json-1.0";
            req.Headers["x-amz-security-token"] = sessionToken;
            req.Headers["x-amz-date"] = timestamp;
            req.Host = "dynamodb.us-east-1.amazonaws.com";
            req.Headers["x-amzn-authorization"] = "AWS3 AWSAccessKeyId=" + accessKeyID + ",Algorithm=HMACSHA256,SignedHeaders=host;x-amz-date;x-amz-security-token;x-amz-target,Signature=" + sigString;

            //add the jSon Content
            byte[] jsonInput = Encoding.UTF8.GetBytes(jsonString);
            Stream reqStream = req.GetRequestStream();
            reqStream.Write(jsonInput, 0, jsonInput.Length);
            reqStream.Close();

            string responseString = string.Empty;
            using (HttpWebResponse response = req.GetResponse() as HttpWebResponse)
            {
                StreamReader reader = new StreamReader(response.GetResponseStream());
                responseString = reader.ReadToEnd();
            }

            Console.WriteLine("Dynamo Table Added");
            Console.WriteLine(responseString);
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
            string urlEncodedCanonical = HttpUtility.UrlEncode(encodedCanonical);
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