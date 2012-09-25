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

namespace AWS_RDS_NETAPI
{
    class Program
    {
        public static void Main(string[] args)
        {
            AWSRDSNETAPI ins = new AWSRDSNETAPI();
            //ins.getIndivisualObject();
            //ins.selectObject();
            ins.conditionalUpdate();

            Console.WriteLine("press enter to quit");
            Console.Read();
        }
    }
    public class AWSRDSNETAPI 
    {
        public void getIndivisualObject() 
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
        public void selectObject()
        {
            Console.WriteLine("Select Objects ...");
            AmazonSimpleDBClient client = new AmazonSimpleDBClient();
            SelectRequest request = new SelectRequest();
            request.ConsistentRead = true;
            request.SelectExpression= "select * from SaeidDomain where Coursename2='Math2'";

            SelectResponse response = client.Select(request);

            Console.WriteLine("Select Objects completed");
            Console.WriteLine(response.ToXML());
        }
        public void conditionalUpdate()
        {
            Console.WriteLine("Conditional Update ...");
            AmazonSimpleDBClient client = new AmazonSimpleDBClient();
            GetAttributesRequest request = new GetAttributesRequest();
            request.DomainName="SaeidDomain";
            request.ItemName = "Course01";
            request.AttributeName = new List<string>() { "coursename"};
            GetAttributesResponse response = client.GetAttributes(request);

            Console.WriteLine("simpleDb item returned");
            Console.WriteLine(response.ToXML());
            Console.WriteLine("Press enter to update the item ...");
            Console.ReadLine();

            PutAttributesRequest request2 = new PutAttributesRequest();
            request2.DomainName = "SaeidDomain";
            request2.ItemName = "Course01";


            List<ReplaceableAttribute> items = new List<ReplaceableAttribute>();
            ReplaceableAttribute attr1 = new ReplaceableAttribute();
            attr1.Name = "Index";
            attr1.Value = "Super cool";
            items.Add(attr1);
            request2.Attribute = items;


            UpdateCondition condition = new UpdateCondition();
            condition.Name = "Coursename1";
            condition.Value = "Math1";
            request2.Expected = condition;

            try 
            {
                PutAttributesResponse response2 = client.PutAttributes(request2);
                Console.WriteLine("SimpleDB Item Updated");
                Console.WriteLine(response2.ToXML());
            }
            catch(AmazonSimpleDBException ex)
            {
                Console.WriteLine("Exception : "+ex.Message);
                Console.ReadLine();
            }



            Console.WriteLine("Conditional Update completed");
        }
    }
}