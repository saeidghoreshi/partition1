using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;

using System.ServiceModel.Syndication;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Net;

namespace wcfLibrary
{
    [DataContract(Namespace = "http://domain/Data")]
    public class Data
    {
        [DataMember]
        public string name;
    }

    //netTcp and net.pipes already are session-mode
    [ServiceContract(SessionMode=SessionMode.Allowed)]
    public interface IService 
    {
        
        [WebInvoke(Method = "POST", UriTemplate = "Data",
            RequestFormat = WebMessageFormat.Xml,
            ResponseFormat = WebMessageFormat.Xml
            )]
        [OperationContract(IsOneWay = true)]
        void addData(Data d);

        [WebGet(UriTemplate = "Datas", ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        List<Data> getList();

        [ServiceKnownType(typeof(Atom10FeedFormatter))]
        [ServiceKnownType(typeof(Rss20FeedFormatter))]
        [WebGet(UriTemplate = "Interface/feed/{format}")]
        [OperationContract]
        SyndicationFeedFormatter GetFeed(string format);
    }

    /*
     singletone call is not threadsafe and needs concurrency and optionally manage the session state
     
     */
    //in this case all object remains in memory as long as this service is running no matter of various channel connection  .Single
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerSession)]
    //[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)] //IIS Host
    public class service : IService
    {
        List<Data> repo = new List<Data>();
        public List<Data> getList()
        {
            //can use it
            //OperationContext.Current.SessionId
            return repo;
        }
        public void addData(Data d)
        {
            if (repo.Contains(d))
                throw new WebFaultException(HttpStatusCode.Conflict);
            repo.Add(d);
        }
        public SyndicationFeedFormatter GetFeed(string format)
        {
            SyndicationFeed feed = new SyndicationFeed()
            {
                Title = new TextSyndicationContent("My interface feed Title"),
                Description = new TextSyndicationContent("My Interface feed Desription"),
                Items = repo.Select(x => new SyndicationItem
                {
                    Title = new TextSyndicationContent(x.name)
                })

            };
            if (format.Equals("atom"))
                return new Atom10FeedFormatter(feed);
            else
                return new Rss20FeedFormatter(feed);

        }
    }

}
