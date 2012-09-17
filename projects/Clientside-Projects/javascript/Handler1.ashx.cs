using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace javascript
{
    /// <summary>
    /// Summary description for Handler1
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            //context.Response.ContentType = "text/plain";
            context.Response.ContentType = "application/json";

            var term=context.Request["term"]?? "";
            var matches=    from c in classes
                            where c.label.ToLower().StartsWith(term.ToLower())
                            select new 
                            {
                                value=c.value,
                                label=c.label
                            };
            var serializer=new JavaScriptSerializer();
            context.Response.Write(serializer.Serialize(matches));
            

            //context.Response.ContentType = "image/png";
	        //context.Response.WriteFile("~/Flower1.png");
    
        }
        private IEnumerable<dynamic> classes =new List<dynamic>()
        {
            new {value="YVR",label="Vancouver" },
            new {value="VVV",label="Vernon" },
            new {value="LAX",label="Los Angeles"},
            new {value="IKH",label="Tehran"}
        };
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}