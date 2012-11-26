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
            lookupManagement.run1();
            //lookupManagement.run2();
          
            Console.WriteLine("Enter to Quit");
            Console.ReadLine();
        }
    }
    
    public class lookupManagement
    {
        public static void run1()
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
                person1.createNew("MASTER", "");
                persons.Add(person1);

                var person2 = new accounting.classes.Person();
                person2.createNew("SLAVE", "");
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
                mc1.createNew();

                accounting.classes.card.creditcard.VisaCard visa1 = new accounting.classes.card.creditcard.VisaCard();
                visa1.cardNumber = "222-222-222-222";
                visa1.expiryDate = DateTime.Now.AddYears(2);
                visa1.createNew();

                accounting.classes.card.DebitCard debit1 = new accounting.classes.card.DebitCard();
                debit1.cardNumber = "333-333-333-333";
                debit1.expiryDate = DateTime.Now.AddYears(4);
                debit1.createNew();
                

                //Add some money to the Person 0 wallet
                person1.addWalletMoney(780, "New Deposit for person 1", cur1.currencyID);
                person2.addWalletMoney(420, "New Deposit for Person 2", cur1.currencyID);

                //Assign cards to Persons
                person2.addCard(mc1.cardID);
                person2.addCard(visa1.cardID);
                person2.addCard(debit1.cardID);

                //Create Bank
                accounting.classes.bank.Bank bank1 = new accounting.classes.bank.Bank();
                bank1.createNew("Scotia");

                //Add Cards
                bank1.addCard(debit1.cardID);
                bank1.addCard(mc1.cardID);
                bank1.addCard(visa1.cardID);

                //Define Fee Rates
                bank1.setFeeForIntracCardType((decimal)2.7, "Debit Card Rate for Winter 2012");
                bank1.setFeeForCreditCardType(accounting.classes.enums.ccCardType.MASTERCARD, (decimal)1.6, "New MASTER Fees for Fall 2010");
                bank1.setFeeForCreditCardType(accounting.classes.enums.ccCardType.VISACARD, (decimal)1.6, "New VISA Fees for Fall 2010");
                

                //2 partial payments for invoice 
                person2.payInvoiceByCC(inv, inv.getInvoiceServicesSumAmt() / 2, visa1.cardID, accounting.classes.enums.ccCardType.VISACARD);
                person2.payInvoiceByInterac(inv, inv.getInvoiceServicesSumAmt() / 4, debit1.cardID);
                person2.payInvoiceByInternal(inv, inv.getInvoiceServicesSumAmt() / 8);
                person2.payInvoiceByCC(inv, inv.getInvoiceServicesSumAmt() / 8, visa1.cardID, accounting.classes.enums.ccCardType.MASTERCARD);

                //Cancel Invoice Payment
                inv.cancelInvoicePaymentEXT(1);
                inv.cancelInvoicePaymentEXT(2);
                inv.cancelInvoicePaymentINTERNAL(3);
                inv.cancelInvoicePaymentEXT(4);

                ts.Complete();
            }
        }
        public static void run2()
        {
            using (var ctx = new AccContext())
            using (var ts = new TransactionScope())
            {
                
            }
        }
    }

}
