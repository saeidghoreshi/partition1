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

namespace S3NETAPIConsoleApp
{
    class Program
    {
        public static void Main(string[] args)
        {
            S3Management s3m = new S3Management();
            s3m.BucketList();
            s3m.AddToBucket();

            Console.WriteLine("Press enter to exit");
            Console.Read();
        }

        public class S3Management 
        {
            public void BucketList()
            {
                Console.WriteLine("bucketList initiated ...");

                AmazonS3Client client = new AmazonS3Client();
                ListBucketsResponse response = client.ListBuckets();

                foreach(S3Bucket bucket in response.Buckets)
                {
                    Console.WriteLine("Bucket : " + bucket.BucketName);
                }
            }
            public void AddToBucket()
            {
                Console.WriteLine("Add to bucket initiated ...");
                AmazonS3Client client = new AmazonS3Client();
                PutObjectRequest request = new PutObjectRequest();

                request.BucketName = "psbuket";
                request.FilePath = @"../../TestFile.ppt";
                request.Key = "testfileuploadedkey.ppt";
                request.ContentType = "application/vnd.ms-powerpoint";

                PutObjectResponse response = client.PutObject(request);
                Console.WriteLine("S3 Object Created");
            }
        }
    }
}