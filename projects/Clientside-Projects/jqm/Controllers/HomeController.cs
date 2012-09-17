using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace javascript.Controllers
{
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
            
            Session["hits"] = ((int)Session["hits"])+1;
            ViewBag.hitcount = Session["hits"];
            return View();
        }

        public ActionResult link_1() {
            ViewBag.hitcount = Session["hits"];
            return  View("view1");  ///if ajaxEnabled is true then use partial because uses ajax
        }
        public ActionResult collapsible()
        {
            return View("collapsible");  
        }
        public ActionResult grid()
        {
            return View("grid");
        }
        public ActionResult listview()
        {
            return View("listview");
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
}
