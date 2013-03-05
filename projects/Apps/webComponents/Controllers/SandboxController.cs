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
    public class SandboxController : Controller
    {
        readonly string connString = "server=s06.winhost.com;uid=DB_40114_codeclub_user;pwd=p0$31d0n;database=DB_40114_codeclub";

        //FORMS
        public ActionResult Index()
        {
            return View("sandbox");
        }

        public ActionResult header_edit_form()
        {
            return PartialView("sandbox/header_edit_form");
        }

        public ActionResult header_new_form() 
        {
            return PartialView("sandbox/header_new_form");
        }

        public ActionResult headercontent_edit_form()
        {
            return PartialView("sandbox/headercontent_edit_form");
        }

        public ActionResult headerContent_new_form()
        {
            return PartialView("sandbox/headerContent_new_form");
        }

        //Actions

        [HttpPost]
        public string header_savenew()
        {
            var pars=Request.Params;
            string header=pars["header"];

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            db.exec(string.Format("insert into sandbox.header (label) values('{0}')",header));
            return "";
        }

        [HttpPost]
        public string header_update()
        {
            var pars = Request.Params;
            string header = pars["header"];
            string headerid = pars["headerid"];

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            db.exec(string.Format("update sandbox.header set label='{0}' where id='{1}'", header,headerid));
            return "";
        }

        [HttpPost]
        public string header_delete()
        {
            var pars = Request.Params;
            string headerid = pars["headerid"];

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            db.exec(string.Format("delete from sandbox.header where ID='{0}'", headerid));
            return "";
        }

        [HttpPost]
        public string headercontent_update()
        {
            var pars = Request.Params;
            string headerid = pars["headerid"];
            string url = pars["viewurl"];
            string content = pars["description"];
            string label = pars["label"];
            string contentid = pars["contentid"];

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            db.exec(string.Format("update sandbox.content set content='{0}' ,label = '{1}', viewurl ='{2}'  where id='{3}';"
                , content, label, url,contentid));
            db.exec(string.Format("update sandbox.headercontent set headerID='{0}' where contentID='{1}'"
                , headerid, contentid));
            
            return "";
        }

        [HttpPost]
        public string headercontent_savenew()
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

        [HttpPost]
        public string headercontent_delete()
        {
            var pars = Request.Params;
            string contentid = pars["contentid"];
            
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            db.fetch(string.Format("delete from sandbox.headercontent where contentID='{0}' ;", contentid));
            db.fetch(string.Format("delete from sandbox.content where contentID='{0}' ;", contentid));

            return "";
        }

        //DS
        public ActionResult getHeaders()
        {
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            var source = db.fetch("select id,label from sandbox.header").Tables[0]
                .AsEnumerable()
                .Select(x => new
                {
                    id = x.ItemArray[0],
                    label = x.ItemArray[1]
                });

            return Json(source, JsonRequestBehavior.AllowGet);
        }

        public ActionResult getHeaderContents()
        {
            var query =
                "select id,label from sandbox.header;"
                + "select hc.ID as headerContentID,h.id as headerID , contentID,c.label , content,viewurl from sandbox.header h "
                + "inner join sandbox.headerContent hc on hc.headerID=h.ID "
                + "inner join sandbox.Content c on hc.contentID=c.ID "
                + " order by h.id"
                ;

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhost"].ConnectionString);
            var ds = db.fetch(query);
            var headers = ds.Tables[0]
                .AsEnumerable()
                .Select(x => new
                {
                    id = x.ItemArray[0],
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
                .OrderBy(x => x.headerID);

            return Json(new { headers = headers, headerContents = headerContents }, JsonRequestBehavior.AllowGet);
        }

        //Routes
        public PartialViewResult sandbox() 
        {
            var type=Request.Params["type"];
            switch(type)
            {
                case "vchart":
                    return PartialView("chart/vchart");
                case "breadcrum":
                    return PartialView("misc/breadcrum");
                case "simplemenuv1":
                    return PartialView("misc/menu");
                case "uimask":
                    return PartialView("misc/uimask");
                case "scrollerpane":
                    return PartialView("misc/scrollerpane");
                case "facebook":
                    return PartialView("misc/facebook");
                case "Projects":
                    return PartialView("misc/projects");
                
                default:
                    return PartialView("404");
            }
            return PartialView("");
        }



        //Miscellanous

        public JsonResult getUsers()
        {
            List<dynamic> repo = new List<dynamic>();
            repo.Add(new {id = 1,parentId = "",text = "name1",title = "title1",});
            repo.Add(new { id = 2, parentId = 1, text = "name2", title = "title2", });
            repo.Add(new { id = 3, parentId = 1, text = "name3", title = "title3", });
            repo.Add(new { id = 4, parentId = 2, text = "name4", title = "title3", });
            repo.Add(new { id = 5, parentId = 2, text = "name6", title = "title3", });
            repo.Add(new { id = 6, parentId = 2, text = "name6", title = "title3", });

            //build tree
            List<dynamic> tree = new List<dynamic> { };
            for (int i = 0; i < repo.Count; i++)
            {
                if (repo[i].parentId.ToString() == "")
                {
                    var node = new
                    {
                        id = repo[i].id.ToString(),
                        parentId = repo[i].parentId.ToString(),
                        text = repo[i].text,
                        title = repo[i].title.ToString(),
                        state = "",//closed
                        iconCls = "",
                        children = new List<dynamic>()
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                this.getUsersRec(tree[j], repo);

            return Json(tree, JsonRequestBehavior.AllowGet);
        }

        public void getUsersRec(dynamic node, List<dynamic> repo)
        {
            for (int j = 0; j < repo.Count; j++)
            {
                if (repo[j].parentId.ToString() == node.id)
                {
                    var _node = new
                    {
                        id = repo[j].id.ToString(),
                        parentId = repo[j].parentId.ToString(),
                        text = repo[j].text,
                        title = repo[j].title.ToString(),
                        state = "",
                        iconCls = "",
                        children = new List<dynamic>()
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                getUsersRec(node.children[j], repo);
        }

        public void upload()
        {
            var file = Request.Files["myfile"];

            //IE messup file.FileName then use your own >> [to cover all browser code like this]
            var nameSections = file.FileName.Split(new char[] { '\\' });
            file.SaveAs(Server.MapPath("../uploads/") + nameSections[nameSections.Length - 1]);
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
