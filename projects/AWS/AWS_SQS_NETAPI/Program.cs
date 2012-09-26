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

using Amazon.SQS;
using Amazon.SQS.Model;


namespace AWS_SQS_NETAPI
{
    class Program
    {
        public static void Main(string[] args)
        {
            //new AWSSQSManagement().ListQueueUrl();
            new AWSSQSManagement().SendMessage();


            Console.WriteLine("Press enter to quit");
            Console.Read();
        }
    }
    public class AWSSQSManagement 
    {
        public void ListQueueUrl() 
        {
            Console.WriteLine("List Queue Url ...");

            AmazonSQSClient client = new AmazonSQSClient();
            GetQueueUrlRequest request= new GetQueueUrlRequest();
            request.QueueName = "saeidsqs2";
            request.QueueOwnerAWSAccountId = "158683541032";

            GetQueueUrlResponse response = client.GetQueueUrl(request);

            Console.WriteLine("Url is :" + response.GetQueueUrlResult.QueueUrl);
        }
        public void SendMessage()
        {
            Console.WriteLine("sending Message...");

            AmazonSQSClient client = new AmazonSQSClient();
            SendMessageRequest request = new SendMessageRequest();
            request.DelaySeconds = 0;
            request.QueueUrl = "https://queue.amazonaws.com/158683541032/saeidsqs2";
            request.MessageBody = "this is a message from SDK";

            SendMessageResponse response = client.SendMessage(request);

            Console.WriteLine("Sent");
        }
        public void ReadDelete()
        {
            Console.WriteLine("Read and delete...");

            AmazonSQSClient client = new AmazonSQSClient();
            ReceiveMessageRequest request = new ReceiveMessageRequest();
            request.AttributeName = new List<string>() {"ALL" };
            request.MaxNumberOfMessages= 10;
            request.QueueUrl = "https://queue.amazonaws.com/158683541032/saeidsqs2";

            bool<Message> queueMessage=new List<Message>();

            ReceiveMessageResponse response = client.ReceiveMessage(request);

            Console.WriteLine("Sent");
        }
    }
}