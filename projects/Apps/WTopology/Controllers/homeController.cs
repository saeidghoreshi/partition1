using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Data;
using System.Data.SqlClient;

using WTopology.Classes;
using System.Data.Linq;
using System.Web.Security;

namespace WTopology.Controllers
{
    
    public class homeController : Controller
    {
        
        
        public ActionResult Index()
        {
            //if (Session["user"] == null)
             //   return RedirectToAction("login");

            sqlServer x = new sqlServer();
            List<sqlServerPar> pars = new List<sqlServerPar>();

            var ds=x.runSP("WTopology.getAllResources",pars);
            
            /*categorize*/
            //List<treeNode> resultTree = library.categorizeTree(ds.Tables[0]);
            List<flatNode> resultFlat = library.categorizeFlat(ds.Tables[0]);

            //var modelTree = resultTree.AsEnumerable();
            var modelFlat = resultFlat.AsEnumerable();
            ViewBag.x0 = modelFlat;

            return View("index");
        }

        [HttpPost]
        public JsonResult jSON_getSearchResult() 
        {
            var CRITERIA = "";
            if (string.IsNullOrEmpty(Request.Params["criteria"]))
                CRITERIA = "";
            else
                CRITERIA = Request.Params["criteria"].ToString().Trim();

            sqlServer x = new sqlServer();
            List<sqlServerPar> pars = new List<sqlServerPar>();
            pars.Add(new sqlServerPar { dbType = SqlDbType.VarChar, name = "criteria", value = CRITERIA });

            var ds = x.runSP("WTopology.getSearchResources", pars);
            List<flatNode> resultFlat = library.categorizeFlat(ds.Tables[0]);

            return Json(resultFlat,JsonRequestBehavior.AllowGet);
        }

        public ActionResult actionsOnMainPage() 
        {
            if (Session["user"] == null)
                return RedirectToAction("login");
            /*redirect to action wont pass post data but goes exactly to the url*/
            /*call the function directly wont replace the url but passes the data*/

            if (!string.IsNullOrEmpty(Request.Params["main_btn_createNew"]))
                return RedirectToAction("createNew");

            if (!string.IsNullOrEmpty(Request.Params["main_btn_deleteSelected"]))
                return deleteResources();
                
            if (!string.IsNullOrEmpty(Request.Params["main_btn_hightlightResources"]))
                return highlightResources();
                
            if (!string.IsNullOrEmpty(Request.Params["main_btn_unhightlightResources"]))
                return unhighlightResources();

            if (!string.IsNullOrEmpty(Request.Params["main_btn_createCategory"]))
                return RedirectToAction("createCategory");

            else
                return RedirectToAction("index");
        }

        public ActionResult createNew()
        {
            sqlServer x = new sqlServer();
            List<sqlServerPar> pars = new List<sqlServerPar>();

            var ds = x.runSP("WTopology.getAllParentResources", pars);

            ViewBag.parentCategoryList = ds.Tables[0].AsEnumerable();

            return View("createNew");
        }

        public ActionResult saveCreateNew()
        {
            var qs = Request.Params;

            var parentID = Convert.ToInt32(qs["createNew_parentCat"]);
            var title = qs["createNew_title"] as string;
            var description = qs["createNew_description"] as string;

            sqlServer x = new sqlServer();
            List<sqlServerPar> pars = new List<sqlServerPar>();
            pars.Add(new sqlServerPar{dbType=SqlDbType.Int,name="parentID",value=parentID});
            pars.Add(new sqlServerPar{dbType=SqlDbType.Text,name="title",value=title});
            pars.Add(new sqlServerPar { dbType = SqlDbType.Text, name = "description", value = description});

            var ds = x.runSP("WTopology.saveNewResource", pars);

            return RedirectToAction("index");
        }
        public ActionResult createCategory()
        {
            return View("createCategory");
        }
        public ActionResult deleteResources()
        {
            if (string.IsNullOrEmpty(Request.Params["main_resources_cb"]))
                return RedirectToAction("index");

            var resourceIDs  = Request.Params["main_resources_cb"].ToString();
            
            sqlServer x = new sqlServer();
            List<sqlServerPar> sqlPars = new List<sqlServerPar>();
            sqlPars.Add(new sqlServerPar {dbType=SqlDbType.VarChar,name="resourceIDs" ,value = resourceIDs});

            var ds = x.runSP("WTopology.deleteResourceIDs", sqlPars);

            ViewBag.par = resourceIDs.AsEnumerable();

            return RedirectToAction("index");
        }
        public ActionResult saveNewCategory()
        {
            if (
                string.IsNullOrEmpty(Request.Params["createCategory_title"])
                ||
                string.IsNullOrEmpty(Request.Params["createCategory_description"])
            )
                return RedirectToAction("index");
            
            var categoryTitle = Request.Params["createCategory_title"];
            var categoryDescription= Request.Params["createCategory_description"];

            sqlServer x = new sqlServer();
            List<sqlServerPar> sqlPars = new List<sqlServerPar>();
            sqlPars.Add(new sqlServerPar { dbType = SqlDbType.VarChar, name = "cat_title", value = categoryTitle});
            sqlPars.Add(new sqlServerPar { dbType = SqlDbType.VarChar, name = "cat_description", value = categoryDescription });

            var ds = x.runSP("WTopology.createCategory", sqlPars);

            return RedirectToAction("index");
        }

        public ActionResult highlightResources() 
        {
            if (string.IsNullOrEmpty(Request.Params["main_resources_cb"]))
                return RedirectToAction("index");

            var resourceIDs = Request.Params["main_resources_cb"].ToString();

            sqlServer x = new sqlServer();
            List<sqlServerPar> sqlPars = new List<sqlServerPar>();
            sqlPars.Add(new sqlServerPar { dbType = SqlDbType.VarChar, name = "resourceIDs", value = resourceIDs });

            var ds = x.runSP("WTopology.highlightedResourceIDs", sqlPars);

            ViewBag.par = resourceIDs.AsEnumerable();

            return RedirectToAction("index");
        }

        public ActionResult unhighlightResources()
        {
            if (string.IsNullOrEmpty(Request.Params["main_resources_cb"]))
                return RedirectToAction("index");

            var resourceIDs = Request.Params["main_resources_cb"].ToString();

            sqlServer x = new sqlServer();
            List<sqlServerPar> sqlPars = new List<sqlServerPar>();
            sqlPars.Add(new sqlServerPar { dbType = SqlDbType.VarChar, name = "resourceIDs", value = resourceIDs });

            var ds = x.runSP("WTopology.unhighlightedResourceIDs", sqlPars);

            ViewBag.par = resourceIDs.AsEnumerable();

            return RedirectToAction("index");
        }

        public ActionResult login() 
        {
            return View("login");
        }
        public ActionResult checkLogin() 
        {
                // Success, create non-persistent authentication cookie.
                
                //HttpCookie cookie1 = new HttpCookie("AppCookie",Guid.NewGuid().ToString());
                //Response.Cookies.Add(cookie1);


            if (Request.Params["login_name"] == "saeid") 
            {
                Session["user"] = "active";
                return RedirectToAction("/index");
            }
                
            else
                return RedirectToAction("/");
        }


        [HttpPost]
        public JsonResult jSON_FetchResourceDescription()
        {
            var resourceID = -1;
            if (string.IsNullOrEmpty(Request.Params["resourceID"]))
                resourceID = -1;
            else
                resourceID = Convert.ToInt32(Request.Params["resourceID"].ToString().Trim());

            sqlServer x = new sqlServer();
            List<sqlServerPar> pars = new List<sqlServerPar>();
            pars.Add(new sqlServerPar { dbType = SqlDbType.Int, name = "resourceID", value = resourceID });

            var result = resource.getResourceList(x.runSP("WTopology.getResourcedetails", pars).Tables[0]);
            
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}
