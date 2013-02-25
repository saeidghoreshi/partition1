using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using realestateweb.Models;


namespace webComponents.Controllers
{
    public class HomeController : Controller
    {
        readonly string connString = "server=s06.winhost.com;uid=DB_40114_codeclub_user;pwd=p0$31d0n;database=DB_40114_codeclub";
        public ActionResult Index()
        {   
            return View("index1");
        }
        public ActionResult Index2()
        {
            return View("index2");
        }
        public ActionResult Index3()
        {   
            return View("index3");
        }
        public ActionResult easyUI()
        {
            return View("easyUI");
        }
        public ActionResult dojo()
        {
            return View("dojo");
        }
        public ActionResult accounting()
        {
            return View("accounting");
        }
        
        
        
        public void upload() 
        {
            var file = Request.Files["myfile"];
            
            //IE messup file.FileName then use your own >> [to cover all browser code like this]
            var nameSections=file.FileName.Split(new char[]{'\\'});
            file.SaveAs(Server.MapPath("../uploads/") + nameSections[nameSections.Length-1]); 
        }




        //sandBox
        public ActionResult form_newheader() 
        {
            return PartialView("sandbox/box-new");
        }
        
        [HttpPost]
        public string newheader()
        {
            var pars=Request.Params;
            string header=pars["header"];

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            db.exec(string.Format("insert into sandbox.header (label) values('{0}')",header));
            return "";
        }

        public ActionResult form_updateheader()
        {
            return PartialView("sandbox/box-update");
        }

        [HttpPost]
        public string updateheader()
        {
            var pars = Request.Params;
            string header = pars["header"];
            string headerid = pars["headerid"];

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            db.exec(string.Format("update sandbox.header set label='{0}' where id='{1}'", header,headerid));
            return "";
        }

        public ActionResult form_editcontent()
        {
            return PartialView("sandbox/content-edit");
        }
        [HttpPost]
        public string updatecontent()
        {
            var pars = Request.Params;
           
            return "";
        }

        public ActionResult form_newcontent()
        {
            return PartialView("sandbox/content-new");
        }
        public ActionResult getHeaders() 
        {
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            var source= db.fetch("select id,label from sandbox.header").Tables[0]
                .AsEnumerable()
                .Select(x => new 
                {
                    id=x.ItemArray[0],
                    label = x.ItemArray[1]
                });

            return Json(source,JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public string newcontent()
        {
                var pars = Request.Params;
                string headerid = pars["headerid"];
                string url = pars["viewurl"];
                string content = pars["description"];
                string label = pars["label"];

                sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
                DataTable dt1 = db.fetch(string.Format("insert into sandbox.content (content,label,viewurl) values('{0}','{1}','{2}');select SCOPE_IDENTITY();", content, label, url)).Tables[0];
                var contentid = dt1.Rows[0][0].ToString();

                db.exec(string.Format("insert into sandbox.headercontent (headerId,contentid) values('{0}','{1}')", headerid, contentid));
                return "";
        }

        public ActionResult getHeaderContents()
        {
            var query = 
                "select id,label from sandbox.header;"
                +"select hc.ID as headerContentID,h.id as headerID , contentID,c.label , content,viewurl from sandbox.header h "
                +"inner join sandbox.headerContent hc on hc.headerID=h.ID "
                +"inner join sandbox.Content c on hc.contentID=c.ID "
                +" order by h.id"
                ;

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            var ds = db.fetch(query);
            var headers = ds.Tables[0]
                .AsEnumerable()
                .Select(x => new 
                {
                    id=x.ItemArray[0],
                    label = x.ItemArray[1]
                });
            var headerContents = ds.Tables[1]
                .AsEnumerable()
                .Select(x => new
                {
                    headerContentID = x.ItemArray[0],
                    headerID = x.ItemArray[1],
                    contentID = x.ItemArray[2],
                    contentLabel = x.ItemArray[3],
                    content = x.ItemArray[4],
                    viewurl = x.ItemArray[5]
                })
                .OrderBy(x=>x.headerID);

            return Json(new { headers = headers, headerContents = headerContents }, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult test() 
        {
            return PartialView("test");
        }
            

       


       
    }
   
    public class organization
    {
        public string org_id { get; set; }
        public string org_name { get; set; }
        public string parent_org_id { get; set; }
        public string street { get; set; }
        public string city { get; set; }
        public string postalcode { get; set; }
        public string logo { get; set; }

        public List<organization> children;
        public IEnumerable<object> assignedUsers;

        public static IEnumerable<organization> toJson(DataTable dt)
        {
            List<organization> data = new List<organization> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                data.Add(
                    new organization()
                    {
                        org_id = dt.Rows[i][0].ToString(),
                        parent_org_id = dt.Rows[i][1].ToString(),
                        org_name = dt.Rows[i][2].ToString()
                    });
            }
            return data;
        }
        public static organization getOrgDetails(string org_id)
        {
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            DataTable dt = db.fetch("select * from organization where org_id=" + org_id).Tables[0];

            organization data = new organization();
            data =
                    new organization()
                    {
                        org_id = dt.Rows[0][0].ToString(),
                        parent_org_id = dt.Rows[0][1].ToString(),
                        org_name = dt.Rows[0][2].ToString(),
                        street = dt.Rows[0][3].ToString(),
                        city = dt.Rows[0][4].ToString(),
                        postalcode = dt.Rows[0][5].ToString()
                    };
            return data;
        }
    }


   
}
