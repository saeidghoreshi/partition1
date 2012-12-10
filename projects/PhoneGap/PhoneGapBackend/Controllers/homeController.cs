using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PhoneGapBackend.Controllers
{
    public class homeController : Controller
    {

        public string Index()
        {
            string viewName = "index";

            return this.getPureView(viewName).ToString();
        }
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
