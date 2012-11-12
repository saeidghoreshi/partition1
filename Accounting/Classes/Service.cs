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
        public Models.service CreateNewService(int giverEntityID, int receiverEntityID, string serviceName)
        {
            using (var ctx = new AccContext())
            {
                var giverPerson = ctx.person.Where(x => x.entityID == giverEntityID).FirstOrDefault();
                var receiverPerson = ctx.person.Where(x => x.entityID == receiverEntityID).FirstOrDefault();
                if (receiverPerson == null || giverPerson == null)
                    throw new Exception(serviceOperationStatus.NULL.ToString()); 

                var newService = new Models.service()
                {
                    issuerEntityID=giverEntityID,
                    receiverEntityID=receiverEntityID,
                    name=serviceName
                };

                ctx.service.AddObject(newService);
                ctx.SaveChanges();
                return newService;
            }
        }

    }
}
