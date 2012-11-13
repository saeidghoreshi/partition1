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
            lookupManagement.run();
            
          
            Console.WriteLine("Enter to Quit");
            Console.ReadLine();
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
    
    public class lookupManagement
    {
        public static void run()
        {
            using (var ctx=new AccContext())
            using (var ts = new TransactionScope())
            {
                ctx.resetSeeds();

                //Setup initiatives lookups
                 Controller.SetupAccountTypes();
                 Controller.SetupCardTypes();
                 Controller.SetupccCardTypes();
                 Controller.SetupCurrencyType();
                 Controller.SetupEntityTypes();
                 Controller.SetupInvoiceStat();
                 Controller.SetupExtPaymentTypes();
                 Controller.SetupPaymentTypes();
                 Controller.SetupOfficeTypes();
                 Controller.SetupUserTypes();
                 Controller.SetupSysUserTypes();

               

                //create one Currency
                var cur1=new Classes.Currency();
                var curCAD=cur1.create("CAD", (int)Accounting.Classes.Enums.currencyType.Real);

                
                //create 2 person and related accounts
                List<Models.person> persons=new List<Models.person>();

                var person1 = new Classes.Person();
                persons.Add(person1.create("PersonFname 1 ", DateTime.Now.Ticks.ToString()));
                
                var person2 = new Classes.Person();
                persons.Add(person2.create("PersonFname 1 ", DateTime.Now.Ticks.ToString()));
                var person3 = new Classes.Person();
                persons.Add(person3.create("PersonFname 1 ", DateTime.Now.Ticks.ToString()));
                var person4 = new Classes.Person();
                persons.Add(person4.create("PersonFname 1 ", DateTime.Now.Ticks.ToString()));


                new APAccount().Create(person1.ENTITYID, 1);
                new ARAccount().Create(person1.ENTITYID, 1);
                new WAccount().Create(person1.ENTITYID, 1);
                new EXPAccount().Create(person1.ENTITYID, 1);
                new INCAccount().Create(person1.ENTITYID, 1);
                new CCCASHAccount().Create(person1.ENTITYID, 1);
                new DBCASHAccount().Create(person1.ENTITYID, 1);
                new TAAccount().Create(person1.ENTITYID, 1);


                //run the first Scenario
                Scenario1.run(persons, curCAD);


                ts.Complete();
            }
        }
    }


   /// <summary>
   /// create card
   /// create invoice
   /// payInvoice
   /// </summary>
    public class Scenario1
    {
        public static void run(List<Models.person> persons,Models.currency currency)
        {
            var service1 = new Classes.Service();
            service1.serviceName="Service 1" + DateTime.Now.Ticks.ToString();
            service1.Create();

            var service2 = new Classes.Service();
            service2.serviceName = "Service 2" + DateTime.Now.Ticks.ToString();
            service2.Create();


            var invoice = new Classes.Invoice();
            invoice.createInvoice((int)persons[0].entityID, (int)persons[1].entityID, currency.ID);

            invoice.addService(service1.serviceID, 1500);
            invoice.addService(service2.serviceID, 2500);

            
            invoice.finalizeInvoice();


            //pay for invoice
            invoice.doCCExtPayment( invoice.getInvoiceServicesSumAmt(invoice.invoiceID), cardID);
        }
    }

    
    
    
}
