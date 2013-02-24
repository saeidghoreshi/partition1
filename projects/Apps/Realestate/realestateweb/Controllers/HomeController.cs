using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Data.Linq;
using System.Web.Security;

using realestateweb.Models;

namespace realestateweb.Controllers
{
    public class HomeController : Controller
    {
        readonly string connString = "server=s06.winhost.com;uid=DB_40114_codeclub_user;pwd=p0$31d0n;database=DB_40114_codeclub";

        public ActionResult Index()
        {   
            return View("index1");
        }
   
        public ActionResult getListings() 
        {
            sqlServer db = new sqlServer(connString);
            var listings = db.fetch("exec realestate.getListings").Tables[0].AsEnumerable();
            ViewBag.data = listings;
            return PartialView("index1/listings");
        }
        public ActionResult test()
        {
            return PartialView("index1/test");
        }
        public JsonResult getListingByFilter() 
        {
            var pars=Request.Params;
            sqlServer db = new sqlServer(connString);
            List<sqlServerPar> sppars=new List<sqlServerPar>();
            sppars.Add(new sqlServerPar { name = "bdr", value = pars["bdr"],dbType=SqlDbType.VarChar });
            sppars.Add(new sqlServerPar { name = "bath", value = pars["bath"], dbType = SqlDbType.VarChar });
            sppars.Add(new sqlServerPar { name = "pricestart", value = pars["pricerange"].Split(new char[]{','})[0], dbType = SqlDbType.VarChar });
            sppars.Add(new sqlServerPar { name = "priceend", value = pars["pricerange"].Split(new char[] { ',' })[1], dbType = SqlDbType.VarChar });
            sppars.Add(new sqlServerPar { name = "ptypes", value = pars["ptypes"], dbType = SqlDbType.VarChar });
            sppars.Add(new sqlServerPar { name = "showSelection", value = pars["showSelection"], dbType = SqlDbType.VarChar });
            
            var listings = db.runSP("realestate.getListingByFilter",sppars).Tables[0].AsEnumerable().Select(x=>x.ItemArray);
            return Json(listings,JsonRequestBehavior.AllowGet);
        }

        public ActionResult getPanel()
        {
            return PartialView("index1/Panel");
        }
        public ActionResult getSouth()
        {
            return PartialView("index1/South");
        }

        
    }
}
