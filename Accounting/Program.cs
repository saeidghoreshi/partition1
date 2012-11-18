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
                 Controller.SetupPaymentStat();

               

                //create one Currency
                var cur1=new accounting.classes.Currency();
                cur1.create("CAD", (int)accounting.classes.enums.currencyType.Real);

                
                //create 2 person
                List <accounting.classes.Person> persons=new List <accounting.classes.Person>();

                var person1 = new accounting.classes.Person();
                person1.create("MASTER", "");
                persons.Add(person1);

                var person2 = new accounting.classes.Person();
                person2.create("SLAVE", "");
                persons.Add(person2);

                //Relate Acconts to the persons
                person1.createAccounts(cur1.currencyID);
                person2.createAccounts(cur1.currencyID);


                
                //Create 2 services
                Dictionary<accounting.classes.Service,decimal> services = new Dictionary<Service,decimal>();

                var service1 = new accounting.classes.Service();
                service1.serviceName = "Service-1";
                service1.issuerEntityID = person1.ENTITYID;
                service1.receiverEntityID = person2.ENTITYID;
                service1.Create();
                services.Add( service1,1000);

                var service2 = new accounting.classes.Service();
                service2.serviceName = "Service-2";
                service2.issuerEntityID = person1.ENTITYID;
                service2.receiverEntityID = person2.ENTITYID;
                service2.Create();
                services.Add(service2,1000);

                //Create Invoice 
                accounting.classes.Invoice inv= person1.createInvoice(person2.ENTITYID, cur1.currencyID,services);
                
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
                person1.addWalletMoney(780, "New Deposit for person 1", cur1.currencyID);
                person2.addWalletMoney(420, "New Deposit for Person 2", cur1.currencyID);

                //Assign cards lto Persons
                person2.addCard(mc1.cardID);
                person2.addCard(visa1.cardID);
                person2.addCard(debit1.cardID);

                //2 partial payments for invoice 
                person2.payInvoiceByCC(inv, inv.getInvoiceServicesSumAmt() / 2, visa1.cardID, accounting.classes.enums.ccCardType.VISACARD);
                person2.payInvoiceByInterac(inv, inv.getInvoiceServicesSumAmt() / 4, debit1.cardID);
                person2.payInvoiceByInternal(inv, inv.getInvoiceServicesSumAmt() / 8);
                person2.payInvoiceByCC(inv, inv.getInvoiceServicesSumAmt() / 8, visa1.cardID, accounting.classes.enums.ccCardType.MASTERCARD);

                //Cancel Invoice Payment
                inv.cancelInvoicePaymentCC(1);
                inv.cancelInvoicePaymentDB(2);
                inv.cancelInvoicePaymentINTERNAL(3);
                inv.cancelInvoicePaymentCC(4);

                ts.Complete();
            }
        }
    }

}
