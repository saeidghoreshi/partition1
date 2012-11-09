using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Accounting.Interfaces;
using Accounting.Classes;
using Accounting.Models;
using Accounting.Interfaces.subAccounts;
using Accounting.Classes.Enums;
using System.Transactions;

namespace Accounting
{
    class Program
    {
        static void Main(string[] args)
        {

            //lookupManagement.run();
            //personManagement.createPerson();
            //currencyManagement.createCur();
            
            //accountManagement.create();
            //cardManagement.createMasterCard();
            

            /*sample Invoice Creation*/
            //invoiceManagement.createInvoice();

          
            Console.WriteLine("Enter to Quit");
            Console.ReadLine();
        }
    }
    public class personManagement 
    {
        public static void createPerson() 
        {
            var result=new Classes.Person().create("newFirstName",DateTime.Now.Ticks.ToString()).lastName;
            Console.WriteLine(result);
        }
    }


    public class cardManagement
    {
        public static void createMasterCard()
        {
            var result = new Classes.MasterCard().create("111222333444",DateTime.Now);
        }
    }

    public class accountManagement
    {
        public static void create()
        {
            using(var ts=new TransactionScope())
            {
                new APAccount().Create(16, 2);
                new ARAccount().Create(16, 2);
                new WAccount().Create(16, 2);
                new EXPAccount().Create(16, 2);
                new INCAccount().Create(16, 2);
                new CCCASHAccount().Create(16, 2);
                new DBCASHAccount().Create(16, 2);
                new TAAccount().Create(16, 2);
                
                ts.Complete();
            }
            
        }
    }
    public class currencyManagement
    {
        public static void createCur()
        {
            new Classes.Currency().createNewCurrency("CAD", (int)Accounting.Classes.Enums.currencyType.Real);
        }
    }
    public class serviceManagement
    {
        public static void createService()
        {
            var person1 = new Classes.Person().create("newFirstName", DateTime.Now.Ticks.ToString());
            var person2 = new Classes.Person().create("newFirstName", DateTime.Now.Ticks.ToString());


            new Classes.Service().CreateNewService((int)person1.entityID, (int)person2.entityID, "NewService"+DateTime.Now.Ticks.ToString());
        }
    }
    public class  invoiceManagement
    {
        public static void createInvoice()
        {
            var person1 = new Classes.Person().create("newFirstName", DateTime.Now.Ticks.ToString());
            var person2 = new Classes.Person().create("newFirstName", DateTime.Now.Ticks.ToString());

            var myInvoice=new Classes.Invoice();
            var newInvoice=myInvoice.createInvoice((int)person1.entityID, (int)person2.entityID, 2);

            var newService=new Classes.Service().CreateNewService((int)person1.entityID, (int)person2.entityID, "NewService" + DateTime.Now.Ticks.ToString());
            myInvoice.addService(newService.ID, newInvoice.ID, 2, 1000);

            newService = new Classes.Service().CreateNewService((int)person1.entityID, (int)person2.entityID, "NewService" + DateTime.Now.Ticks.ToString());
            myInvoice.addService(newService.ID, newInvoice.ID, 2, 3000);

            myInvoice.finalizeInvoice(newInvoice.ID);
        }
    }
    public class lookupManagement
    {
        public static void run()
        {
            //Setup initiatives lookups
            var result1 = Controller.SetupGLTypes();
            var result2 = Controller.SetupOfficeTypes();
            var result3 = Controller.SetupCardTypes();
            var result4 = Controller.SetupccCardTypes();
            var result5 = Controller.SetupCurrencyType();
            var result6 = Controller.SetupEntityTypes();
            var result7 = Controller.SetupExtPaymentTypes();
            var result8 = Controller.SetupInvoiceStat();
            var result9 = Controller.SetupOfficeTypes();
            var result10 = Controller.SetupPaymentTypes();
            var result11 = Controller.SetupSysUserTypes();
            var result12 = Controller.SetupUserTypes();

            Console.WriteLine(result1);
            Console.WriteLine(result2);
            Console.WriteLine(result3);
            Console.WriteLine(result4);
            Console.WriteLine(result5);
            Console.WriteLine(result6);
            Console.WriteLine(result7);
            Console.WriteLine(result8);
            Console.WriteLine(result9);
            Console.WriteLine(result10);
            Console.WriteLine(result11);
            Console.WriteLine(result12);
        }
    }

    
    
    
}
