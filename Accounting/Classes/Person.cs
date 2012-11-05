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
        //List<ICard> Cards;
        //List<IAccount> Accounts;
        //List<IAddress> Addresses;


        public int ID { get; set; }
        public string firstname { get; set; }
        public string lastName { get; set; }

        public Models.person create(string firstName,string lastName) 
        {
            using(var ctx =new AccContext())
            {   
                var newEntity=base.createEntity();
                var checkDuplication = ctx.person.Where(x => x.firstName == firstName && x.lastName == lastName).FirstOrDefault();
                if (checkDuplication != null)
                    throw new Exception(personOperationStatus.Duplicated.ToString());

                var newPerson = new Models.person() 
                {
                    firstName=firstName,
                    lastName=lastName,
                    entityID = newEntity.ID
                };
                ctx.person.AddObject(newPerson);
                ctx.SaveChanges();
                
                return newPerson;
            }
            
        } 
       
    }
    

}
