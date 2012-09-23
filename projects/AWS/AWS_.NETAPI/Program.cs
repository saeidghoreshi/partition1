﻿using System;
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

namespace AWS_.NETAPI
{
    class Program
    {
        public static void Main(string[] args)
        {
            //Console.Write(GetServiceOutput());

            ManageUsingDOTNET ins = new ManageUsingDOTNET();
            //ins.CreateUser();
            ins.AddPolicy();


            Console.WriteLine("press Key to Exit");
            Console.Read();
        }

        public static string GetServiceOutput()
        {
            StringBuilder sb = new StringBuilder(1024);
            using (StringWriter sr = new StringWriter(sb))
            {
                sr.WriteLine("===========================================");
                sr.WriteLine("Welcome to the AWS .NET SDK!");
                sr.WriteLine("===========================================");

                // Print the number of Amazon EC2 instances.
                AmazonEC2 ec2 = AWSClientFactory.CreateAmazonEC2Client(RegionEndpoint.USWest2);
                DescribeInstancesRequest ec2Request = new DescribeInstancesRequest();

                try
                {
                    DescribeInstancesResponse ec2Response = ec2.DescribeInstances(ec2Request);
                    int numInstances = 0;
                    numInstances = ec2Response.DescribeInstancesResult.Reservation.Count;
                    sr.WriteLine("You have " + numInstances + " Amazon EC2 instance(s) running in the US-East (Northern Virginia) region.");

                }
                catch (AmazonEC2Exception ex)
                {
                    if (ex.ErrorCode != null && ex.ErrorCode.Equals("AuthFailure"))
                    {
                        sr.WriteLine("The account you are using is not signed up for Amazon EC2.");
                        sr.WriteLine("You can sign up for Amazon EC2 at http://aws.amazon.com/ec2");
                    }
                    else
                    {
                        sr.WriteLine("Caught Exception: " + ex.Message);
                        sr.WriteLine("Response Status Code: " + ex.StatusCode);
                        sr.WriteLine("Error Code: " + ex.ErrorCode);
                        sr.WriteLine("Error Type: " + ex.ErrorType);
                        sr.WriteLine("Request ID: " + ex.RequestId);
                        sr.WriteLine("XML: " + ex.XML);
                    }
                }
                sr.WriteLine();

                // Print the number of Amazon SimpleDB domains.
                AmazonSimpleDB sdb = AWSClientFactory.CreateAmazonSimpleDBClient(RegionEndpoint.USWest2);
                ListDomainsRequest sdbRequest = new ListDomainsRequest();

                try
                {
                    ListDomainsResponse sdbResponse = sdb.ListDomains(sdbRequest);

                    if (sdbResponse.IsSetListDomainsResult())
                    {
                        int numDomains = 0;
                        numDomains = sdbResponse.ListDomainsResult.DomainName.Count;
                        sr.WriteLine("You have " + numDomains + " Amazon SimpleDB domain(s) in the US-East (Northern Virginia) region.");
                    }
                }
                catch (AmazonSimpleDBException ex)
                {
                    if (ex.ErrorCode != null && ex.ErrorCode.Equals("AuthFailure"))
                    {
                        sr.WriteLine("The account you are using is not signed up for Amazon SimpleDB.");
                        sr.WriteLine("You can sign up for Amazon SimpleDB at http://aws.amazon.com/simpledb");
                    }
                    else
                    {
                        sr.WriteLine("Caught Exception: " + ex.Message);
                        sr.WriteLine("Response Status Code: " + ex.StatusCode);
                        sr.WriteLine("Error Code: " + ex.ErrorCode);
                        sr.WriteLine("Error Type: " + ex.ErrorType);
                        sr.WriteLine("Request ID: " + ex.RequestId);
                        sr.WriteLine("XML: " + ex.XML);
                    }
                }
                sr.WriteLine();

                // Print the number of Amazon S3 Buckets.
                AmazonS3 s3Client = AWSClientFactory.CreateAmazonS3Client(RegionEndpoint.USWest2);

                try
                {
                    ListBucketsResponse response = s3Client.ListBuckets();
                    int numBuckets = 0;
                    if (response.Buckets != null &&
                        response.Buckets.Count > 0)
                    {
                        numBuckets = response.Buckets.Count;
                    }
                    sr.WriteLine("You have " + numBuckets + " Amazon S3 bucket(s) in the US Standard region.");
                }
                catch (AmazonS3Exception ex)
                {
                    if (ex.ErrorCode != null && (ex.ErrorCode.Equals("InvalidAccessKeyId") ||
                        ex.ErrorCode.Equals("InvalidSecurity")))
                    {
                        sr.WriteLine("Please check the provided AWS Credentials.");
                        sr.WriteLine("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                    }
                    else
                    {
                        sr.WriteLine("Caught Exception: " + ex.Message);
                        sr.WriteLine("Response Status Code: " + ex.StatusCode);
                        sr.WriteLine("Error Code: " + ex.ErrorCode);
                        sr.WriteLine("Request ID: " + ex.RequestId);
                        sr.WriteLine("XML: " + ex.XML);
                    }
                }
                sr.WriteLine("Press any key to continue...");
            }
            return sb.ToString();
        }
    }


    public class ManageUsingDOTNET 
    {
        public void CreateUser() 
        {
            Console.WriteLine("Create User using .NET API Progressing ...");
            Amazon.IdentityManagement.AmazonIdentityManagementServiceClient client=new Amazon.IdentityManagement.AmazonIdentityManagementServiceClient();
            Amazon.IdentityManagement.Model.CreateUserRequest request = new Amazon.IdentityManagement.Model.CreateUserRequest();

            request.UserName = "USER"+DateTime.Now.Ticks;
            request.Path = "/IT/Arch/";//defining path is only available with SDK

            Amazon.IdentityManagement.Model.CreateUserResponse response = client.CreateUser(request);

            Console.WriteLine("user Created");

        }
        public void AddPolicy()
        {
            Console.WriteLine("Add Policy Progressing ...");
            Amazon.IdentityManagement.AmazonIdentityManagementServiceClient client = new Amazon.IdentityManagement.AmazonIdentityManagementServiceClient();
            Amazon.IdentityManagement.Model.PutUserPolicyRequest policyReq = new Amazon.IdentityManagement.Model.PutUserPolicyRequest();

            policyReq.PolicyName="EC2Policy";
            policyReq.UserName = "USER634840144107689115";
            policyReq.PolicyDocument= "{\"Statement\": [{\"Sid\": \"Stmt1348443119479\",\"Action\": [\"ec2:DescribeInstances\"],\"Effect\": \"Allow\",\"Resource\": \"*\"}]}";

            Amazon.IdentityManagement.Model.PutUserPolicyResponse policyResp = client.PutUserPolicy(policyReq) ;

            Console.WriteLine("Policy added to Already defined User : USER634840144107689115");

        }
    }
}

/*
 Note
 * s3 policy GEnerator
 * awspolicygen.s3.amazonaws.com/policygen.html
 * also can use view > AWS
 * also can create web app and dep
 *
 */