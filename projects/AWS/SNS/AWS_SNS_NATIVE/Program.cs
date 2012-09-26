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
using System.Xml;

using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;


namespace AWS_SNS_NATIVE
{
    class Program
    {
        public static void Main(string[] args)
        {
            
            //new AWSSNSManagement().SubscribToTopic();
            //new AWSSNSManagement().SendMessageToTopic();
            new AWSSNSManagement().ListSubscription();

            Console.WriteLine("Press Enter to quit ...");
            Console.Read();
        }
    }
    public class AWSSNSManagement 
    {
        public void ListSubscription() 
        {
            Console.WriteLine("List Topics ...");

            AmazonSimpleNotificationServiceClient client = new AmazonSimpleNotificationServiceClient();
            ListSubscriptionsByTopicRequest req = new ListSubscriptionsByTopicRequest();
            req.TopicArn = "arn:aws:sns:us-east-1:158683541032:saeidtopic";

            ListSubscriptionsByTopicResponse response = client.ListSubscriptionsByTopic(req);
            Console.WriteLine("Subscription Received");

            foreach(Subscription s in response.ListSubscriptionsByTopicResult.Subscriptions)
                Console.WriteLine("Subscription : "+s.Endpoint);
            
        }
        public void SubscribToTopic()
        {
            Console.WriteLine("Subscribe to Topic ...");

            AmazonSimpleNotificationServiceClient client = new AmazonSimpleNotificationServiceClient();
            SubscribeRequest req = new SubscribeRequest();
            req.TopicArn = "arn:aws:sns:us-east-1:158683541032:saeidtopic";
            req.Protocol = "email-json";
            req.Endpoint = "saeid.1984@yahoo.com";

            SubscribeResponse response = client.Subscribe(req);

            Console.WriteLine("Message Sent");

        }
        public void SendMessageToTopic()
        {
            Console.WriteLine("Send Message to Topic ...");

            //proxy Object
            AmazonSimpleNotificationServiceClient client = new AmazonSimpleNotificationServiceClient();
            PublishRequest req = new PublishRequest();
            req.TopicArn = "arn:aws:sns:us-east-1:158683541032:saeidtopic";
            req.Subject = "Order Submitted";
            req.Message = @"{""OrderId"":""ABCD"",""ItemNumber"":""1234565""}";

            PublishResponse response = client.Publish(req);

            Console.WriteLine("Subscription Received");

        }
    }
    
}