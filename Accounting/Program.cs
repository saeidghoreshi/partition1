using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Accounting.Interfaces;
using Accounting.Classes;
using Accounting.Models;
using Accounting.Interfaces.Service;
using Accounting.Interfaces.subAccounts;

namespace Accounting
{
    class Program
    {
        static void Main(string[] args)
        {
            //new ServiceManagement().CreateNewService();
            //new CurrencyManagement().run();


            //var result1=new Controller().SetupGLTypes();
            //var result2 = new Controller().SetupCurrencyTypes();
            //var result3 = new Controller().SetupCategories();
            /*
             Console.WriteLine("GL Types : "+result1);
            Console.WriteLine("Currency Types : " + result2);
            Console.WriteLine("Category Types : " + result3);
             */


            Console.WriteLine();
            
            
            
            
            

            Console.WriteLine("Enter to Quit");
            Console.ReadLine();
        }
    }
    public class ServiceManagement 
    {
        public void createCurrency()
        {
            
        }
        public void CreateInvoice() 
        {

            Classes.Invoice I = new Classes.Invoice();
            //I.createNewByExistingPersons(70,71,10.55d,)
            
        }
        public void CreateNewService()
        {
            Classes.Service s = new Classes.Service();
            Person sender = new Person
            {
                firstname = "111",
                lastName = "222"
            };
            Person Receiver= new Person
            {
                firstname = "111_",
                lastName = "222+"
            };
            //s.CreateNewService(sender,Receiver,"My New Service");
            //s.CreateNewServiceByExistingPersons(70, 71, "My Service Noew");
            //Console.WriteLine((s.loadServiceById(1) as Models.Service).serviceName);
        } 
    }
    public class CurrencyManagement 
    {
        public void run() 
        {
            Accounting.Classes.Currency x = new Classes.Currency();
            x.createNewCurrency("CAD",1);
        }
    }
    public class ApplicationManagement
    {
        public void run()
        {
            
        }
    }



    public class OE 
    {
        /// <summary>
        /// static value
        /// </summary>
        public static readonly int OEvalue = 1;
    }
    public class ASSET
    {
        /// <summary>
        /// static value
        /// </summary>
        public static readonly int ASSETvalue = 2;
    }
    public  class OEtypes:OE
    {
        /// <summary>
        /// static value
        /// </summary>
        public static readonly int INC = 10;
        public static readonly int EXP = 20;
    }
    
    
}
