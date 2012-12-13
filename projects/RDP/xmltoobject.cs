
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Linq;

namespace RdpProject
{
 
    public class lib 
    {
        public static List<RDP> RdpListFromXml(string xml)
        {
            List<RDP> repo = new List<RDP>();
            XDocument doc = XDocument.Load(xml);

            var query = doc.Element("ArrayOfRDP").Elements("RDP");
            foreach (var item in query)
            {
                    repo.Add(new RDP() 
                    {
                        ID=Convert.ToInt32(item.Element("ID").Value),
                        parentID = Convert.ToInt32(item.Element("parentID").Value),
                        serverName=item.Element("serverName").Value,
                        serverIP = item.Element("serverIP").Value,
                        username=item.Element("username").Value,
                        password = item.Element("password").Value
                    });
                    
            }

            return repo;

        }

    }

    public class RDP
    {
        public int ID;
        public int parentID;
        public string serverName;
        public string serverIP;
        public string username;
        public string password;
    }
}
   

