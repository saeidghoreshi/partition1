using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using AccountingLib.Models;
using accounting.classes.enums;
using accounting.classes.subAccounts;
namespace accounting.classes
{
    public class Person :classes.Entity
    {
        public readonly int ENTITYTYPEID = (int)enums.entityType.Person;
        public int id;
        public string firstname;
        public string lastname;

        public Person():base() { }
        public Person(int personID) : base() 
        {
            loadPerson(personID);
        }
        private void loadPerson(int personID) 
        {
            using (var ctx = new AccContexts())
            {
                var person = ctx.person
                    .Where(x => x.ID == personID)
                    .SingleOrDefault();

                if (person == null)
                    throw new Exception("no such a Person Exists");

                this.id = person.ID;
                this.firstname = person.firstName;
                this.lastname = person.lastName;
            }    
        }

        public void New(string firstName,string lastName) 
        {
            using (var ctx = new AccContexts())
            {   
                base.New((int)enums.entityType.Person);

                var checkDuplication = ctx.person.Where(x => x.firstName == firstName && x.lastName == lastName).FirstOrDefault();
                if (checkDuplication != null)
                    throw new Exception("Person Duplicated");

                var newPerson = new AccountingLib.Models.person() 
                {
                    firstName=firstName,
                    lastName=lastName,
                    entityID = base.ENTITYID
                };
                ctx.person.AddObject(newPerson);
                ctx.SaveChanges();

                this.id = newPerson.ID;
                this.firstname = newPerson.firstName;
                this.lastname = newPerson.lastName;
            }
            
        }
        

        public List<AccountingLib.Models.account> createAccounts(int currencyID) 
        {
            List<AccountingLib.Models.account> accounts = new List<account>();

            accounts.Add(new APAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new ARAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new WAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new EXPAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new INCAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new CCCASHAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new DBCASHAccount().Create(base.ENTITYID, currencyID));

            return accounts;
        }

        /// <summary>
        /// Add Wallet Money
        /// </summary>
        /// <param name="amount"></param>
        /// <param name="title"></param>
        /// <param name="currencyID"></param>
        public new void addWalletMoney(decimal amount, string title, int currencyID)
        {
            base.addWalletMoney(amount, title, currencyID);
        }

        public new void payInvoiceByInternal(classes.Invoice inv, decimal amount)
        {
            base.payInvoiceByInternal(inv, amount);
        }
        public new void payInvoiceByInterac(classes.Invoice inv, decimal amount, int cardID)
        {
            base.payInvoiceByInterac(inv, amount, cardID);
        }
        public void payInvoiceByCC(classes.Invoice inv, decimal amount, int cardID, enums.ccCardType cardType)
        {
            base.payInvoiceByCC(inv, amount, cardID, cardType);
        }
    }
    

}
