using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

using Themes.TskMgmtService;

namespace Themes.Controllers
{
    public class homeController : Controller
    {
        readonly string connString = "server=s06.winhost.com;uid=DB_40114_codeclub_user;pwd=p0$31d0n;database=DB_40114_codeclub";
        public ActionResult Index()
        {
            
            return View();
        }
        public ActionResult Index2()
        {
            return View();
        }
        public ActionResult IndexFooter()
        {
            return PartialView("IndexFooter");
        }
        public JsonResult json_readWorkFlow()
        {
            /*sqlServer db = new sqlServer(connString);
            DataTable dt = db.fetch("select * from dbo.organization").Tables[0];

            //build tree
            List<organization> tree = new List<organization> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (dt.Rows[i]["parent_org_id"].ToString() == "")
                {
                    var node = new organization()
                    {
                        org_id = dt.Rows[i][0].ToString(),
                        parent_org_id = dt.Rows[i][1].ToString(),
                        org_name = dt.Rows[i][2].ToString(),
                        logo = "/jsplugins/workflow/images/" + dt.Rows[i][6].ToString(),

                        children = new List<organization>(),
                        //assignedUsers = this.getTaskAssignedUsers(Convert.ToUInt16(dt.Rows[i][0]))
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                this.RecTree(tree[j], dt);

            return Json(tree, JsonRequestBehavior.AllowGet);
             */
            TskMgmtService.TskMgmtserviceClient TskMgmtClient = new TskMgmtserviceClient("BasicHttpBinding_ITskMgmtservice");
            var result=TskMgmtClient.json_readWorkFlow();
            return Json(result, JsonRequestBehavior.AllowGet);

        }

        public void RecTree(organization node, DataTable dt)
        {
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (dt.Rows[j]["parent_org_id"].ToString() == node.org_id)
                {
                    var _node = new organization()
                    {
                        org_id = dt.Rows[j][0].ToString(),
                        parent_org_id = dt.Rows[j][1].ToString(),
                        org_name = dt.Rows[j][2].ToString(),
                        logo = "/jsplugins/workflow/images/" + dt.Rows[j][6].ToString(),

                        children = new List<organization>(),
                        //assignedUsers = this.getTaskAssignedUsers(Convert.ToUInt16(dt.Rows[j][0]))
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                RecTree(node.children[j], dt);
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
