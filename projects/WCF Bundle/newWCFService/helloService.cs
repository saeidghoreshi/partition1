using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Syndication;
using System.ServiceModel.Activation;
using System.Net;

namespace newWCFService
{
    [DataContract(Namespace = "http://test.com/Interface1/spec")]  //DataContract serializer
    public class spec
    {
        [DataMember]
        public string name;
        [DataMember]
        public string xaddress;
        [DataMember]
        public string bamboo;
        [DataMember]
        public string postal;
    }

    [ServiceContract]
    public interface IHello 
    {
        [WebInvoke(Method = "POST", UriTemplate = "Interface1", 
            RequestFormat = WebMessageFormat.Xml, 
            ResponseFormat = WebMessageFormat.Xml
            )]
        [OperationContract(IsOneWay = true)]  
        void addSpec(spec spec);


        //[AspNetCacheProfile("cachefor10sec")] IIS Host
        [WebGet(UriTemplate = "Interface1", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]  
        List<spec> getSpecs();

        [WebGet(UriTemplate = "Interface1/{name}")]
        [OperationContract]
        spec getSpecByName(string name);

        [WebInvoke(Method = "DELETE", UriTemplate = "Interface1/{id}")]
        [OperationContract(IsOneWay = true)]
        void deleteSpec(string id);

        [ServiceKnownType(typeof(Atom10FeedFormatter))]
        [ServiceKnownType(typeof(Rss20FeedFormatter))]
        [WebGet(UriTemplate = "Interface1/feed/{format}")]
        [OperationContract]
        SyndicationFeedFormatter GetFeed(string format);
    }

    /*
     Adding webHttp Config
     * <endpoint address="" binding="webHttpBinding" name="Helloservice_webhttp" contract="newWCFService.IHello"/>
     * 
     * and also endpoint behavior
     */


    //in this case all object remains in memory as long as this service is running no matter of various channel connection
    [ServiceBehavior(InstanceContextMode=InstanceContextMode.Single) ]
    //[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)] //IIS Host
    public class HelloService : IHello
    {
        List<spec> list = new List<spec> { };
        public void addSpec(spec c)
        {
            if (list.Contains(c))
                throw new WebFaultException(HttpStatusCode.Conflict);
            list.Add(c);
        }
        public List<spec> getSpecs() 
        {
            return list;
        }
        public spec getSpecByName(string name)
        {
            if (!list.Contains(new spec { name = name }))
                throw new WebFaultException(HttpStatusCode.NotFound);

            return list.Where(x => x.name == name).FirstOrDefault();
        }
        public void deleteSpec(string id)
        {   
            list.RemoveAt(Convert.ToInt32(id));
        }
        public SyndicationFeedFormatter GetFeed(string format)
        {
            SyndicationFeed feed = new SyndicationFeed()
            {
                Title = new TextSyndicationContent("My interface feed Title"),
                Description = new TextSyndicationContent("My Interface feed Desription"),
                Items = list.Select(x => new SyndicationItem
                {
                    Title = new TextSyndicationContent(x.name),
                    Content = new TextSyndicationContent(x.xaddress)
                })

            };
            if (format.Equals("atom"))
                return new Atom10FeedFormatter(feed);
            else
                return new Rss20FeedFormatter(feed);

        }

    }

}
