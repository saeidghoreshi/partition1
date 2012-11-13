using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting.Models;
using Accounting.Classes.Enums;
namespace Accounting.Classes
{
    public class Person :Classes.Entity
    {

        public int id;
        public string firstname;
        public string lastname;

        public int ID { get { return id; } }
        public string FIRSTNAME { get { return firstname; } }
        public string LASTNAME { get { return lastname; } }

        public Models.person create(string firstName,string lastName) 
        {
            using(var ctx =new AccContext())
            {   
                var newEntity=base.create();
                var checkDuplication = ctx.person.Where(x => x.firstName == firstName && x.lastName == lastName).FirstOrDefault();
                if (checkDuplication != null)
                    throw new Exception("Person Duplicated");

                var newPerson = new Models.person() 
                {
                    firstName=firstName,
                    lastName=lastName,
                    entityID = newEntity.ID
                };
                ctx.person.AddObject(newPerson);
                ctx.SaveChanges();

                fieldsMapping(newPerson);
                
                return newPerson;
            }
            
        }
        public Models.entityCard addCard(int personEntityID, int cardID)
        {
            using (var ctx = new AccContext()) 
            {
                var person = ctx.person.Where(x => x.entityID == personEntityID).SingleOrDefault();
                var newEntityCard = new Models.entityCard()
                {
                    entityID=personEntityID,
                    CardID=cardID
                };
                ctx.entityCard.AddObject(newEntityCard);
                ctx.SaveChanges();

                return newEntityCard;
            }
        }


        private void fieldsMapping(Models.person person)
        {
            this.id = person.ID;
            this.firstname = person.firstName;
            this.lastname = person.lastName;
        }
       
    }
    

}
