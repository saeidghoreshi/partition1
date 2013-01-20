using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Data;
using Npgsql;
using System.Collections;
using System.Data.EntityClient;
using System.Configuration;


using System.Text;
using System.IO;

namespace MvcApplication1.Controllers
{
    public class NotebookController : Controller
    {
        //
        // GET: /Notebook/

        public ActionResult Index()
        {
            return View();
        }

        //tik
        [HttpPost]
        public JsonResult json_getFolderingForm()
        {
            var pars = Request.Params;

            string html = "";
            if (pars["keyword"] == "saeid")
                html = this.getPureView("foldering/foldering").ToString();
            else
                html = "Not Authorized";
            
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }

        //tik
        public JsonResult json_getDocumentorACLForm()
        {
            var html = this.getPureView("foldering/enterkeyword");
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }
        //tik
        public JsonResult json_getTopicDetailsForm()
        {
            var html = this.getPureView("foldering/folderingDetails");
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult json_getTopicDetails()
        {
            var pars = Request.Params;
            int topic_id = Convert.ToInt32(pars["topic_id"]);
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            DataTable dt = db.fetch("select topic_details from saeid.topic where is_active=1 and topic_id=" + topic_id + " order by datetime").Tables[0];
            return Json(new { result = dt.Rows[0][0].ToString() });
        }

        //tik
        public JsonResult json_getTopics()
        {
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            DataTable dt = db.fetch(
                "select topic_id as type_id,topic_title as type_title, topic_details as type_detail, topic_parent_id as parent_type_id,topic_title as type_name,is_active " +
                " from saeid.topic  where is_active=1 order by datetime").Tables[0];

            List<menu> tree = new List<menu> { };
            for (int i = 0; i < dt.Rows.Count; i++) 
            {
                if (dt.Rows[i]["parent_type_id"].ToString() == "")
                {
                    var node = new menu()
                    {
                        id = dt.Rows[i]["type_id"].ToString(),
                        iconCls = "treei",
                        type_name = dt.Rows[i]["type_name"].ToString(),
                        parent_type_id = dt.Rows[i]["parent_type_id"].ToString(),
                        type_title = dt.Rows[i]["type_title"].ToString(),
                        type_detail = dt.Rows[i]["type_detail"].ToString(),

                        children        = new List<menu>()
                    };
                    tree.Add(node);
                }
            }
            
            for (int j = 0; j < tree.Count; j++)
                Rec(tree[j], dt);
            
            return Json(tree, JsonRequestBehavior.AllowGet);
            
        }

        public void Rec(menu node,DataTable dt)
        {
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (dt.Rows[j]["parent_type_id"].ToString() == node.id)
                {
                    var _node = new menu()
                    {
                        id = dt.Rows[j]["type_id"].ToString(),
                        iconCls = "treei",
                        type_name = dt.Rows[j]["type_name"].ToString(),
                        parent_type_id  = dt.Rows[j]["parent_type_id"].ToString(),
                        type_title = dt.Rows[j]["type_title"].ToString(),
                        type_detail = dt.Rows[j]["type_detail"].ToString(),

                        children        = new List<menu>()
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                Rec(node.children[j], dt);
        }
        
        //tik
        [HttpPost]
        public JsonResult json_saveSelectedTopic() 
        {
            var pars = Request.Params;  
            string topic_id     = pars["foldering_editPanel_id"];
            string topic_title = pars["foldering_editPanel_title"];
            string topic_details = pars["foldering_editPanel_detail"];


            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            db.exec("update saeid.topic set topic_title='" + topic_title + "' , topic_details='" + topic_details + "',datetime='" + DateTime.Now.Ticks + "' where topic_id=" + topic_id);

            return Json(new { result = DateTime.Now.Ticks }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult json_deleteTopic() 
        {
            var pars = Request.Params;
            string topic_id = pars["topic_id"];

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            db.exec("update saeid.topic set is_active=0 , datetime='" + DateTime.Now.Ticks + "' where topic_id=" + topic_id);

            return Json(new { result = "Done" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult json_saveOrdering() 
        {
            var pars = Request.Params;
            string[] ordering = pars["newOrdering"].Split('-');
            
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            foreach (var item in ordering)
            {
                string parentId = item.Split(',')[0];
                string id = item.Split(',')[1];
                db.exec("update saeid.topic set topic_parent_id=" + ((parentId == "") ? null : "'" + parentId + "'") + " , datetime='" + DateTime.Now.Ticks + "' where topic_id=" + id);
            }
            
            return Json(new { result = "Done" }, JsonRequestBehavior.AllowGet);
        }

        //create new non-root or node 
        //tik
        [HttpPost]
        public JsonResult json_createNewTopic() 
        {
            var pars = Request.Params;
            string topic_parent_id = pars["foldering_editPanel_id"];
            string topic_title = pars["foldering_editPanel_title"];
            string topic_details = pars["foldering_editPanel_detail"];

            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            if (topic_parent_id == "")
            {
                db.exec("insert into saeid.topic (topic_title,topic_details,datetime)values("
                 +"'" + topic_title + "','" + topic_details + "','" + DateTime.Now.Ticks + "')");
            }
            else 
            {
                db.exec("insert into saeid.topic (topic_parent_id,topic_title,topic_details,datetime)values("
                + topic_parent_id + ",'" + topic_title + "','" + topic_details + "','" + DateTime.Now.Ticks + "')");
            }

            return Json(new { result = "Done" }, JsonRequestBehavior.AllowGet);

        }


        //GET PURE VIEW
        public object getPureView(string viewName)
        {
            var sw = new System.IO.StringWriter();
            var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
            var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
            viewResult.View.Render(viewContext, sw);
            viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);

            return sw.GetStringBuilder().ToString();
        }
        
    }
    public class menu 
    {
        public string id ;
        public string iconCls;
        public string parent_type_id ;
        public string type_name ;
        public string type_title;
        public string type_detail;


        public List<menu> children;
    }
    
}


