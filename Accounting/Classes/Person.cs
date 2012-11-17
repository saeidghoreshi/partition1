using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using Accounting.Models;
using accounting.classes.enums;
using accounting.classes.subAccounts;
namespace accounting.classes
{
    public class Person :classes.Entity
    {

        public int id;
        public string firstname;
        public string lastname;

        
        public Accounting.Models.person create(string firstName,string lastName) 
        {
            using(var ctx =new AccContext())
            {   
                base.create();

                var checkDuplication = ctx.person.Where(x => x.firstName == firstName && x.lastName == lastName).FirstOrDefault();
                if (checkDuplication != null)
                    throw new Exception("Person Duplicated");

                var newPerson = new Accounting.Models.person() 
                {
                    firstName=firstName,
                    lastName=lastName,
                    entityID = base.ENTITYID
                };
                ctx.person.AddObject(newPerson);
                ctx.SaveChanges();

                fieldsMapping(newPerson);
                
                return newPerson;
            }
            
        }
        

        public List<Accounting.Models.account> createAccounts(int currencyID) 
        {
            List<Accounting.Models.account> accounts = new List<account>();

            accounts.Add(new APAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new ARAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new WAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new EXPAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new INCAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new CCCASHAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new DBCASHAccount().Create(base.ENTITYID, currencyID));

            return accounts;
        }


        private void fieldsMapping(Accounting.Models.person person)
        {
            this.id = person.ID;
            this.firstname = person.firstName;
            this.lastname = person.lastName;
        }

    }
    

}
