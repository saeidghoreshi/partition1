using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;


using Classes;
using Themes.Models;
namespace Themes.Controllers
{
    public class ThemeController : Controller
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
