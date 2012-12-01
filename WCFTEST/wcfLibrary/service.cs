using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;

namespace wcfLibrary
{
    [DataContract]
    public class Data
    {
        [DataMember]
        public string name;
    }

    [ServiceContract]
    public interface IService 
    {
        [OperationContract]
        string getName(Data d);
    }
    public class service : IService
    {
        public string getName(Data d)
        {
            return d.name;
        }
    }

}
