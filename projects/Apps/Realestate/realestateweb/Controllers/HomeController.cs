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
            
            return View();
        }
        public ActionResult getListings() 
        {
            sqlServer db = new sqlServer(connString);
            var listings = db.fetch("exec realestate.getListings").Tables[0];
            ViewBag.data = listings.AsEnumerable() ;
            return PartialView("index1/listings");
        }

        
    }
}
