using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Transactions;

using accounting;
using accounting.classes;
using Accounting.Models;
using accounting.classes.enums;
using accounting.classes.subAccounts;


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
                var cur1=new accounting.classes.Currency();
                cur1.create("CAD", (int)accounting.classes.enums.currencyType.Real);

                
                //create 2 person and related accounts
                List <accounting.classes.Person> persons=new List <accounting.classes.Person>();

                var person1 = new accounting.classes.Person();
                person1.create("PersonFname 1 ", DateTime.Now.Ticks.ToString());
                persons.Add(person1);

                var person2 = new accounting.classes.Person();
                person2.create("PersonFname 1 ", DateTime.Now.Ticks.ToString());
                persons.Add(person2);

                var person3 = new accounting.classes.Person();
                person3.create("PersonFname 1 ", DateTime.Now.Ticks.ToString());
                persons.Add(person3);

                var person4 = new accounting.classes.Person();
                person4.create("PersonFname 1 ", DateTime.Now.Ticks.ToString());
                persons.Add(person4);


                new APAccount().Create(person1.ENTITYID, 1);
                new ARAccount().Create(person1.ENTITYID, 1);
                new WAccount().Create(person1.ENTITYID, 1);
                new EXPAccount().Create(person1.ENTITYID, 1);
                new INCAccount().Create(person1.ENTITYID, 1);
                new CCCASHAccount().Create(person1.ENTITYID, 1);
                new DBCASHAccount().Create(person1.ENTITYID, 1);
                new TAAccount().Create(person1.ENTITYID, 1);

                new APAccount().Create(person2.ENTITYID, 1);
                new ARAccount().Create(person2.ENTITYID, 1);
                new WAccount().Create(person2.ENTITYID, 1);
                new EXPAccount().Create(person2.ENTITYID, 1);
                new INCAccount().Create(person2.ENTITYID, 1);
                new CCCASHAccount().Create(person2.ENTITYID, 1);
                new DBCASHAccount().Create(person2.ENTITYID, 1);
                new TAAccount().Create(person2.ENTITYID, 1);


                //run the first Scenario
                Scenario1.run(persons, cur1);


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
        public static void run(List<accounting.classes.Person> persons,accounting.classes.Currency currency)
        {
            var service1 = new accounting.classes.Service();
            service1.serviceName="Service 1" + DateTime.Now.Ticks.ToString();
            service1.issuerEntityID = persons[0].ENTITYID;
            service1.receiverEntityID = persons[1].ENTITYID;
            service1.Create();

            var service2 = new accounting.classes.Service();
            service2.serviceName = "Service 2" + DateTime.Now.Ticks.ToString();
            service2.issuerEntityID = persons[0].ENTITYID;
            service2.receiverEntityID = persons[1].ENTITYID;
            service2.Create();


            var invoice = new accounting.classes.Invoice();
            invoice.createInvoice((int)persons[0].ENTITYID, (int)persons[1].ENTITYID, currency.currencyID);

            invoice.addService(service1.serviceID, 1500);
            invoice.addService(service2.serviceID, 2500);


            invoice.finalizeInvoice();

            //Create Cards and assign to usrs

            accounting.classes.card.creditcard.MasterCard mc1 = new accounting.classes.card.creditcard.MasterCard();
            mc1.cardNumber = "111-111-111-111";
            mc1.expiryDate = DateTime.Now.AddYears(2);
            mc1.create();

            accounting.classes.card.creditcard.VisaCard visa1  = new accounting.classes.card.creditcard.VisaCard();
            visa1.cardNumber = "222-222-222-222";
            visa1.expiryDate = DateTime.Now.AddYears(2);
            visa1.create();


            
            persons[0].addCard(mc1.cardID);
            persons[1].addCard(visa1.cardID);

            
            //pay for invoice
            invoice.doCCExtPayment( invoice.getInvoiceServicesSumAmt(invoice.invoiceID)/2, visa1.cardID);
            invoice.doCCExtPayment(invoice.getInvoiceServicesSumAmt(invoice.invoiceID)/2, visa1.cardID);
        }
    }

    
    
    
}
