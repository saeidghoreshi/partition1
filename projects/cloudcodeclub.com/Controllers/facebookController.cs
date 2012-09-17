using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Net;
using System.IO;

using System.Text;
using System.Web.Script.Serialization;


namespace MvcApplication1.Controllers
{
    public class facebookController : Controller
    {

        public JsonResult testCurl() 
        {
            
            string responseText = String.Empty;

            string url = "http://localhost:1490/facebook/json_get_facebook_keys";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            using (StreamReader sr = new StreamReader(response.GetResponseStream()))
            {
                responseText = sr.ReadToEnd();
            }
            return Json(new { result = responseText },JsonRequestBehavior.AllowGet);
        }
        public PartialViewResult Index()
        {
            var pars = Request.Params;

            Session["fb_user_accesstoken"] = pars["access_token"];

            //permissions/friends/groups/
            //string qs = "&message=Test";
            //ViewBag.fb = this.facebookCmd("me/feed",qs);
            //ViewBag.fb = this.facebookCmd("me", "");
            return PartialView("index");
            
        }
        public PartialViewResult getLoginPage()
        {   
            return PartialView("login");
        }
        
        public string facebookCmd(string cmd,string qs) 
        {
            string responseText = String.Empty;
            //app access token
            //string url = graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id=427117820664947&client_secret=084763c071147015c4d41eaceccdbc9b;

            string url = "https://graph.facebook.com/"+cmd+"?access_token=" + Session["fb_user_accesstoken"]+qs;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "POST";
            
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            using (StreamReader sr = new StreamReader(response.GetResponseStream()))
            {
                responseText = sr.ReadToEnd();
            }
            return responseText;
        }
        
        public JsonResult json_get_facebook_keys()
        {
            object result = null;
            if (Request.ServerVariables["SERVER_NAME"] != "localhost")
                result = new
                {
                    appid = System.Configuration.ConfigurationManager.AppSettings["facebook-remote-appid"],
                    appsecret = System.Configuration.ConfigurationManager.AppSettings["facebook-remote-appsecret"],
                    url = System.Configuration.ConfigurationManager.AppSettings["facebook-remote-url"]

                };
            else
                result = new
                {
                    appid = System.Configuration.ConfigurationManager.AppSettings["facebook-local-appid"],
                    appsecret = System.Configuration.ConfigurationManager.AppSettings["facebook-local-appsecret"],
                    url = System.Configuration.ConfigurationManager.AppSettings["facebook-local-url"]
                };
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public PartialViewResult grabRegistration() {

            var pars = Request.Params;
            string payload = (pars["signed_request"].Split('.'))[1];
            dynamic decodedObj = DecodePayload(payload);

            string name = decodedObj["registration"]["name"];

            ViewBag.data = decodedObj["registration"]["name"];
            return PartialView("registration");
           
        }
        public IDictionary<string, object> DecodePayload(string payload)
        {
            string base64 = payload.PadRight(payload.Length + (4 - payload.Length % 4) % 4, '=')
                .Replace('-', '+').Replace('_', '/');
            string json = Encoding.UTF8.GetString(Convert.FromBase64String(base64));
            return (IDictionary<string, object>)new JavaScriptSerializer().DeserializeObject(json);
        }
        
    }
    
}
