using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting.Models;
using Accounting.Classes.Enums;

namespace Accounting.Classes
{
    public class Service
    {
        public int serviceID;
        public int issuerEntityID; 
        public int receiverEntityID;
        public string serviceName;

        public void Create()
        {
            using (var ctx = new AccContext())
            {
                var giverPerson = ctx.person.Where(x => x.entityID == issuerEntityID).FirstOrDefault();
                var receiverPerson = ctx.person.Where(x => x.entityID == receiverEntityID).FirstOrDefault();
                if (receiverPerson == null || giverPerson == null)
                    throw new Exception("No entities defined"); 

                var newService = new Models.service()
                {
                    issuerEntityID=issuerEntityID,
                    receiverEntityID=receiverEntityID,
                    name=serviceName
                };

                ctx.service.AddObject(newService);
                ctx.SaveChanges();

                mapData(newService);
            }
        }
        public void mapData(Models.service service)
        {
            this.serviceID = service.ID;
            this.receiverEntityID = (int)service.receiverEntityID;
            this.issuerEntityID = (int)service.issuerEntityID;
            this.serviceName = (string)service.name;
        }

    }
}
