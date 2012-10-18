using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


/**/
using System.Configuration;
using System.Data.Linq;
using System.Data.Linq.Mapping;
using System.Data;
using System.Web.UI.WebControls;

using System.Data.SqlClient;
using Npgsql;

using System.Net;
using System.IO;

using System.Xml;
using Newtonsoft.Json;


//Entity Frame work soecific
using System.Data.Entity;
using System.Data.Objects;

using MvcApplication1;

namespace MvcApplication1.Controllers
{
    public partial class HomeController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }

        //component ingrediant Loader based on component Name
        [HttpPost]
        public JsonResult componentIngridiantsLoader_Depreciated()
        {
            string componentName = Request.Form["componentName"];
            componentIngridiants Ings = new componentIngridiants();

            List<string> jsFiles = new List<string>();
            List<string> cssFiles = new List<string>();
            //jsFiles.add("");
            //Ings.js=jsFiles
            
            return Json(new { result = Ings }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult componentIngridiantsLoader()
        {
            string componentName = Request.Form["componentName"];
            string viewName = "";

            if (componentName == "viewport1")
                viewName = "viewport/viewport2";
            
            string html = this.getPureView(viewName).ToString();
            
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult json_test()
        {
            var pars = Request.Params;
            var q = ((pars["query"]==null)?"":pars["query"].ToString());


            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
            (
                from tp in ctx.task_person
                join p in ctx.person on tp.person_id equals p.person_id into joint1

                from jointItem1 in joint1
                join po in ctx.person_org on jointItem1.person_id equals po.person_id into joint2

                from jointItem2 in joint2

                orderby tp.task_person_id, jointItem2.org_id ascending
                where jointItem1.fname.Contains(q)
                select new
                {
                    org_id = jointItem2.org_id,
                    person_id = jointItem1.person_id,
                    fname = jointItem1.fname,
                    lname = jointItem1.lname,
                    value =10045,
                    bandwidth=104
                }
            );

            string start = ((pars["start"] == null) ? "0" : pars["start"]);
            string limit = ((pars["limit"] == null) ? Int32.MaxValue.ToString() : pars["limit"]);

            return Json(new { totalCount = Q.Count(), root = this.filterJson(Q,new extjsQuery{start=Convert.ToInt32(start),limit=Convert.ToInt32(limit) }) }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult json_test2()
        {
           
            return Json(new { totalCount = 0, root = ""}, JsonRequestBehavior.AllowGet);

        }
        public JsonResult json_test_treeview_extra()
        {
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            DataTable dt = db.fetch(
                "select topic_id as type_id,topic_title as type_title, topic_details as type_detail, topic_parent_id as parent_type_id,topic_title as type_name,is_active " +
                " from saeid.topicFoldering  where is_active=1 order by datetime , type_id").Tables[0];

            List<object> ids = new List<object>();

            for (int i = 0; i < dt.Rows.Count; i++)
                ids.Add(new {id=dt.Rows[i]["type_id"]});

                return Json(new { ids=ids }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult json_test_treeview()
        {
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            DataTable dt = db.fetch( 
                "select topic_id as type_id,topic_title as type_title, topic_details as type_detail, topic_parent_id as parent_type_id,topic_title as type_name,is_active " +
                " from saeid.topicFoldering  where is_active=1 order by datetime , type_id").Tables[0];
            
            List<treeViewNode> tree = new List<treeViewNode> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (dt.Rows[i]["parent_type_id"].ToString() == "")
                {
                    var node = new treeViewNode()
                    {
                        id = dt.Rows[i]["type_id"].ToString(),
                        firstCol = dt.Rows[i]["type_name"].ToString(),
                        secondCol = dt.Rows[i]["type_detail"].ToString(),
                        leaf = false,
                        @checked = false
                        //cls = "testClass"
                    };
                    
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                Rec(tree[j], dt);
         

            return Json(new { root = "",children=tree }, JsonRequestBehavior.AllowGet);

        }
        public void Rec(treeViewNode node, DataTable dt)
        {
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (dt.Rows[j]["parent_type_id"].ToString() == node.id)
                {
                    var _node = new treeViewNode()
                    {
                        id = dt.Rows[j]["type_id"].ToString(),
                        firstCol = dt.Rows[j]["type_name"].ToString(),
                        secondCol = dt.Rows[j]["type_detail"].ToString(),
                        leaf = false,
                        @checked=false,
                        cls = "testClass"
                    };
                    
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                Rec(node.children[j], dt);
        }
        public class treeViewNode
        {
            public string id;
            public string firstCol;
            public string secondCol;

            public string cls;
            public string iconCls;
            public bool expanded;
            public bool leaf;
            public bool @checked;
            public List <treeViewNode> children=new List<treeViewNode>();
        }
        public class extjsQuery
        {
            public int start;
            public int limit;
        }
        public IEnumerable<dynamic> filterJson(IEnumerable<dynamic> obj, extjsQuery pars) {

            return obj.AsEnumerable().Where((o, index) => index >= pars.start && index <= pars.start + pars.limit-1 );
        }


        //Fetch Slider component data >> Hirarchical Org/User  [Right Side]
        public JsonResult json_getSliderData()
        {
            /*List<dataItem> data = new List<dataItem>();
            data.Add(new dataItem() { id = "1", header = "test1", footer = "test1", thumbnail =  "/resources/modules/slider/images/icon.png" });
            data.Add(new dataItem() { id = "2", header = "test1", footer = "test1", thumbnail =  "/resources/modules/slider/images/icon.png" });
            data.Add(new dataItem() { id = "3", header = "test1", footer = "test1", thumbnail =  "/resources/modules/slider/images/icon.png" });
            data.Add(new dataItem() { id = "4", header = "test1", footer = "test1", thumbnail =  "/resources/modules/slider/images/icon.png" });
            data.Add(new dataItem() { id = "5", header = "test1", footer = "test1", thumbnail =  "/resources/modules/slider/images/icon.png" });
            data.Add(new dataItem() { id = "6", header = "test1", footer = "test1", thumbnail =  "/resources/modules/slider/images/icon.png" });
            */

            Models.prjEntities ctx = new Models.prjEntities();
            var Q =
                (from o in ctx.organization
                 select new
                 {
                     office = o.org_name,
                     employees =
                     (
                         from po in o.person_org
                         where po.org_id == o.org_id
                         select new
                         {
                             person_id = po.person.person_id,
                             fname = po.person.fname,
                             lname = po.person.lname,
                             thumbnail = "/resources/modules/slider/images/icon.png"
                         }
                     )
                 }
                );
            return Json(Q, JsonRequestBehavior.AllowGet);
        }

        //Fetch Forms
        public IEnumerable<object> getExistingOfficeList()
        {
            //Note : 
            /*
                "using"  wont be Helpfull because thid resource 
                need to be passed to the view and context lifecycle need to be continued
            */
            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
                (
                from o in ctx.organization
                select o
                );
            return Q;
        }
        public JsonResult json_addNewUserForm()
        {
            ViewBag.existingOffices = getExistingOfficeList();

            string viewName = "user/newUser";
            
            var html = this.getPureView(viewName);
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult json_addNewOfficeForm()
        {
            ViewBag.existingOffices = getExistingOfficeList();

            string viewName = "office/newOffice";
            var html = this.getPureView(viewName);
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult json_getOfficeDetails()
        {
            int org_id = Convert.ToInt32(Request.Params["org_id"]);

            //Note : 
            /*
                "using"  wont be Helpfull because thid resource 
                need to be passed to the view and context lifecycle need to be continued
            */
            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
                (
                from o in ctx.organization
                where o.org_id == org_id
                select new
                {
                    street = o.street,
                    city = o.city,
                    postalcode = o.postalcode
                }
                );

            return Json(new { result = Q.ToList() }, JsonRequestBehavior.AllowGet);
        }


        //Commands 
        //Create NewUser
        [HttpPost]
        public JsonResult json_CreateUser()
        {
            var pars = Request.Params;
            //var file = Request.Files["newUser_uploadFile"];
            //file.SaveAs(Server.MapPath("../../upload") + file.FileName);
            var org_id = Convert.ToInt32(pars["newUser_existingOffices"]);

            Models.prjEntities ctx = new Models.prjEntities();
            var newPerson = new Models.person()
            {
                fname = pars["newUser_fname"],
                lname = pars["newUser_lname"],
            };
            newPerson.person_org.Add(new Models.person_org()
            {
                org_id = org_id
            });
            ctx.person.AddObject(newPerson);
            ctx.SaveChanges();
            return Json(new { result = "done" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult json_upload()
        {
            var pars = Request.Params;
            var file = Request.Files;
            //file.SaveAs(Server.MapPath("../../upload") + file.FileName);
            return Json(new { success="true"}, "text/html", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult json_CreateOffice()
        {
            var pars = Request.Params;

            Models.prjEntities ctx = new Models.prjEntities();
            var newOffice = new Models.organization()
            {
                org_name = pars["newOffice_name"],
                parent_org_id = Convert.ToInt32(pars["newOffice_existing"]),
                street = pars["newOffice_street"],
                city = pars["newOffice_city"],
                postalcode = pars["newOffice_postalcode"],
                logo = pars["selectedLogo"]
            };
            ctx.organization.AddObject(newOffice);
            ctx.SaveChanges();

            return Json(new { result = newOffice }, JsonRequestBehavior.AllowGet);

        }


        public string json_getGoogleWeather() 
        {
           
            string responseText = String.Empty;

            string url = "http://www.google.com/ig/api?weather=vernon+bc";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            using (StreamReader sr = new StreamReader(response.GetResponseStream()))
            {
                responseText = sr.ReadToEnd();
            }

            //convert Xml to json
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(responseText);
            string json = Newtonsoft.Json.JsonConvert.SerializeXmlNode(doc.DocumentElement);
            return json;
            
        }
        

        //App Features
        public JsonResult json_getAppFeatures()
        {
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            DataTable dt = db.fetch("select * from dbo.app_features order by id").Tables[0];

            List<dynamic> tree = new List<dynamic> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (dt.Rows[i]["parent_id"].ToString() == "")
                {
                    var node = new 
                    {
                        id = dt.Rows[i]["id"].ToString(),
                        iconCls="treei",
                        parent_id = dt.Rows[i]["parent_id"].ToString(),
                        title= dt.Rows[i]["title"].ToString(),
                        description= dt.Rows[i]["description"].ToString(),

                        children = new List<dynamic>()
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                AppFeaturesRec(tree[j], dt);



            return Json(tree, JsonRequestBehavior.AllowGet);

        }

        public void AppFeaturesRec(dynamic node, DataTable dt)
        {
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (dt.Rows[j]["parent_id"].ToString() == node.id)
                {
                    var _node = new 
                    {
                        id = dt.Rows[j]["id"].ToString(),
                        iconCls = "treei",
                        parent_id = dt.Rows[j]["parent_id"].ToString(),
                        title = dt.Rows[j]["title"].ToString(),
                        description = dt.Rows[j]["description"].ToString(),

                        children = new List<dynamic>()
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                AppFeaturesRec(node.children[j], dt);
        }

        //Module Features
        public JsonResult json_getModuleFeatures()
        {
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            DataTable dt = db.fetch("select * from dbo.module_features order by id").Tables[0];

            List<dynamic> tree = new List<dynamic> ();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (dt.Rows[i]["parent_id"].ToString() == "")
                {
                    var node = new
                    {
                        id = dt.Rows[i]["id"].ToString(),
                        parent_id = dt.Rows[i]["parent_id"].ToString(),
                        text = dt.Rows[i]["title"].ToString(),
                        description = dt.Rows[i]["description"].ToString(),
                        expanded = true,
                        items = new List<dynamic>()
                    };
                    tree.Add(node);
                }
            }
            return Json(tree, JsonRequestBehavior.AllowGet);
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

    public class componentIngridiants
    {
        public List<string> js { get; set; }
        public List<string> css { get; set; }
        public string html { get; set; }
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
    public class Person
    {
        public int person_id { get; set; }
        public string fname { get; set; }
        public string lname { get; set; }
        public string thumbnail { get; set; }

    }
    public class dataItem
    {
        public string id { get; set; }
        public string header { get; set; }
        public string footer { get; set; }
        public string thumbnail { get; set; }
    }
    //sqlserver Class
    public class sqlServer
    {
        private SqlConnection conn;
        private string connstring;

        public sqlServer(string connStr)
        {
            this.connstring = connStr;
        }

        public SqlConnection sqlconnection
        {
            get { return this.conn; }
            set { this.conn = value; }
        }
        public DataSet fetch(string query)
        {
            using (this.sqlconnection = new SqlConnection(this.connstring))
            {
                this.sqlconnection.Open();
                //SqlTransaction trans = this.conn.BeginTransaction();
                try
                {
                    SqlDataAdapter da = new SqlDataAdapter(query, this.conn);
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    //trans.Commit();
                    conn.Close();
                    return ds;
                }
                catch (Exception ex)
                {
                    try
                    {
                        if (this.sqlconnection.State != ConnectionState.Open)
                            throw new Exception("Connection Is Not Open" + ex.Message);
                        //else
                        //trans.Rollback();
                    }
                    catch (Exception ex1)
                    {
                        throw new Exception("Connection Is Not Open" + ex1.Message);
                    }
                    return (DataSet)null;
                }
                finally
                {
                    if (this.sqlconnection.State != ConnectionState.Open)
                        this.conn.Close();
                }
            }
        }

        public void exec(string query)
        {
            using (this.sqlconnection = new SqlConnection(this.connstring))
            {
                this.sqlconnection.Open();
                try
                {
                    SqlCommand comm = new SqlCommand(query, this.conn);
                    comm.ExecuteNonQuery();
                    conn.Close();

                }
                catch (Exception ex)
                {
                    try
                    {
                        if (this.sqlconnection.State != ConnectionState.Open)
                            throw new Exception("Connection Is Not Open" + ex.Message);
                        //else
                        //trans.Rollback();
                    }
                    catch (Exception ex1)
                    {
                        throw new Exception("Connection Is Not Open" + ex1.Message);
                    }

                }
                finally
                {
                    if (this.sqlconnection.State != ConnectionState.Open)
                        this.conn.Close();
                }
            }
        }

    }
}
