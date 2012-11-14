using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using Accounting.Models;
using accounting.classes.enums;
namespace accounting.classes
{
    public class Person :classes.Entity
    {

        public int id;
        public string firstname;
        public string lastname;

        public int ID { get { return id; } }
        public string FIRSTNAME { get { return firstname; } }
        public string LASTNAME { get { return lastname; } }

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
        
        //public List <Accounting.Models.card> fetchPersonCards() 
        //{
        //    using(var ctx=new AccContext())
        //    {
        //        var cards=ctx.entity
        //            .Where(x=>x.ID==base.ENTITYID)
        //            .SingleOrDefault().entityCard
        //            .
        //    }
        //}


        private void fieldsMapping(Accounting.Models.person person)
        {
            this.id = person.ID;
            this.firstname = person.firstName;
            this.lastname = person.lastName;
        }
       
    }
    

}
