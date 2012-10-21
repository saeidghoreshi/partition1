using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting.Interfaces.Service;
using Accounting.Models;

namespace Accounting.Classes
{
    public class Service: IService
    {
        public dynamic CreateNewService(Person sender, Person receiver, string serviceName)
        {
            using (var ctx = new AccContext())
            {
                var senderPerson = new Models.person()
                {
                    fname=sender.firstname,
                    lname=sender.lastName
                };
                var receiverPerson = new Models.person()
                {
                    fname = receiver.firstname,
                    lname = receiver.lastName
                };
                var newService = new Models.Service()
                {
                    person = receiverPerson,
                    person1 = senderPerson,
                    serviceName = serviceName
                };

                ctx.Service.AddObject(newService);
                ctx.SaveChanges();
                return newService;
            }
        }


        public dynamic CreateNewServiceByExistingPersons(int sender_id, int receiver_id, string serviceName)
        {
            using (var ctx = new AccContext())
            {
                var senderId = ctx.person.Where(x=>x.person_id==sender_id).SingleOrDefault();
                var receiverId = ctx.person.Where(x => x.person_id == sender_id).SingleOrDefault();
                
                var newService=new Models.Service()
                {
                    receiverId=receiver_id,
                    senderId=sender_id,
                    serviceName=serviceName
                };


                ctx.Service.AddObject(newService);
                ctx.SaveChanges();
                return  new {};
            }
        }


        public dynamic loadServiceById(int serviceId)
        {
            using (var ctx = new AccContext()) 
            {
                var service=ctx.Service.Where(x=>x.ID==serviceId).SingleOrDefault();
                return service;
            }
        }

        public dynamic loadServiceByName(string serviceName)
        {
            throw new NotImplementedException();
        }
    }
}
