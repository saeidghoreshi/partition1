using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Classes;

namespace Accounting.Interfaces.Service
{
    public interface IService
    {
        dynamic CreateNewService(Person sender,Person receiver,string serviceName);
        dynamic CreateNewServiceByExistingPersons(int sender_id, int receiver_id, string serviceName);
        dynamic loadServiceById(int serviceId);
        dynamic loadServiceByName(string serviceName);
    }
    
}
