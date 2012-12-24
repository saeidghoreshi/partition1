using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication3.Controllers
{
    public class HomeController : Controller
    {
        [ActionName("Index")]
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";
            return View();
        }
        [ActionName("dnd")]
        public ActionResult dnd()
        {   
            return View();
        }
        [ActionName("themes")]
        public ActionResult themes()
        {
            return View();
        }


        [HttpPost] 
        [ValidateInput(false)] //if we manually handle  the xss(cross site scripting)
        [ValidateAntiForgeryToken] // CSRF cross site request forgery [need cookies enabled]
        public ActionResult create() 
        {
            //Do Operation
            return View();
        }
        public ActionResult footer() 
        {
            return Content("test Footer");
        }
    }
}
