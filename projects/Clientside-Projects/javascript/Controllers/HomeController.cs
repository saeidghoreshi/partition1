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
            return View();
        }

        public JsonResult componentViewLoader()
        {
            string viewname = Request.Params["viewname"];

            string view=string.Empty;
            if (viewname == "viewport1")
                view = "viewport/viewport1";
            if (viewname == "viewport2")
                view = "viewport/viewport2";

            if (viewname == "viewport3")
                view = "viewport/viewport3";

            if (viewname == "viewport4")
                view = "viewport/viewport4";

            string html = this.getPureView(view).ToString();

            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }

        public RedirectToRouteResult json_test()
        {
            return RedirectToAction( "json_test2");
        }
        public JsonResult json_test2()
        {
            return Json(new { result="test2"},JsonRequestBehavior.AllowGet);
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
