using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Net;
using System.IO;

using System.Text;
using System.Web.Script.Serialization;


namespace Themes.Controllers
{
    public class facebookController : Controller
    {

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

        public PartialViewResult auth()
        {
            var pars = Request.Params;

            Session["fb_user_accesstoken"] = pars["access_token"];

            //permissions/friends/groups/
            string qs = "&message=Test";
            //ViewBag.fb = this.facebookCmd("me/feed",qs);
            ViewBag.fb = this.facebookCmd("me", "");
            return PartialView("auth");

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



        //Passed
        public ActionResult Index() 
        {

            return View(""); 
        }

       

        public JsonResult json_get_facebook_keys()
        {
            object result = null;

            var facebook_remote_appid = "389720204422529";
            var facebook_remote_appsecret = "00fa71c860d62ce5c636077ff8af9017";
            var facebook_remote_url = "http://cloudcodeclub.com";
            var facebook_local_appid = "427117820664947";
            var facebook_local_appsecret = "084763c071147015c4d41eaceccdbc9b";
            var facebook_local_url = "http://localhost:8890";

            if (Request.ServerVariables["SERVER_NAME"] != "localhost")
                result = new
                {
                    appid = facebook_remote_appid,
                    appsecret = facebook_remote_appsecret,
                    url = facebook_remote_url
                };
            else
                result = new
                {
                    appid = facebook_local_appid,
                    appsecret = facebook_local_appsecret,
                    url = facebook_local_url
                };
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public PartialViewResult getLoginPage()
        {
            return PartialView("login");
        }
        
    }
    
}
