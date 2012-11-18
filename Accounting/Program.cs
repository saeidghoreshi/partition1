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

                
                //create 2 person
                List <accounting.classes.Person> persons=new List <accounting.classes.Person>();

                var person1 = new accounting.classes.Person();
                person1.create("PersonFname 1 ", DateTime.Now.Ticks.ToString());
                persons.Add(person1);

                var person2 = new accounting.classes.Person();
                person2.create("PersonFname 1 ", DateTime.Now.Ticks.ToString());
                persons.Add(person2);

                //Relate Acconts to the persons
                person1.createAccounts(cur1.currencyID);
                person2.createAccounts(cur1.currencyID);


                
                //Create 2 services
                var service1 = new accounting.classes.Service();
                service1.serviceName = "Service 1" + DateTime.Now.Ticks.ToString();
                service1.issuerEntityID = persons[0].ENTITYID;
                service1.receiverEntityID = persons[1].ENTITYID;
                service1.Create();

                var service2 = new accounting.classes.Service();
                service2.serviceName = "Service 2" + DateTime.Now.Ticks.ToString();
                service2.issuerEntityID = persons[0].ENTITYID;
                service2.receiverEntityID = persons[1].ENTITYID;
                service2.Create();

                //Create Invoice 
                var invoice = new accounting.classes.Invoice();
                invoice.createInvoice((int)persons[0].ENTITYID, (int)persons[1].ENTITYID /*issuer*/, cur1.currencyID);


                //assign services to the Invoice
                invoice.addService(service1.serviceID, 1000);
                invoice.addService(service2.serviceID, 1000);

                //Finalize Invoice
                invoice.finalizeInvoice();

                //Create Cards and assign to users
                accounting.classes.card.creditcard.MasterCard mc1 = new accounting.classes.card.creditcard.MasterCard();
                mc1.cardNumber = "111-111-111-111";
                mc1.expiryDate = DateTime.Now.AddYears(2);
                mc1.create();

                accounting.classes.card.creditcard.VisaCard visa1 = new accounting.classes.card.creditcard.VisaCard();
                visa1.cardNumber = "222-222-222-222";
                visa1.expiryDate = DateTime.Now.AddYears(2);
                visa1.create();

                accounting.classes.card.DebitCard debit1 = new accounting.classes.card.DebitCard();
                debit1.cardNumber = "333-333-333-333";
                debit1.expiryDate = DateTime.Now.AddYears(4);
                debit1.create();

                //Add some money to the Person 0 wallet
                //person1.addWalletMoney(8000, "New Deposit", cur1.currencyID);

                //Assign cards lto Persons
                //Add cards for payer
                persons[0].addCard(mc1.cardID);
                persons[0].addCard(visa1.cardID);
                persons[0].addCard(debit1.cardID);

                //2 partial payments for invoice 
                /*person1 is invoice receiver and payer*/
                person1.payInvoiceByCC(invoice, invoice.getInvoiceServicesSumAmt(invoice.invoiceID) / 2, visa1.cardID, accounting.classes.enums.ccCardType.VISACARD);
                person1.payInvoiceByInterac(invoice, invoice.getInvoiceServicesSumAmt(invoice.invoiceID) / 4, debit1.cardID);
                person1.payInvoiceByInternal(invoice, invoice.getInvoiceServicesSumAmt(invoice.invoiceID) / 8);
                person1.payInvoiceByCC(invoice, invoice.getInvoiceServicesSumAmt(invoice.invoiceID) / 8, visa1.cardID, accounting.classes.enums.ccCardType.MASTERCARD);

                //Cancel Invoice Payment
                


                ts.Complete();
            }
        }
    }

}
