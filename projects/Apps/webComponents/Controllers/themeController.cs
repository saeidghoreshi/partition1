using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace webComponents.Controllers
{
    public class themeController : Controller
    {
        //
        // GET: /theme/

        public ActionResult Index()
        {
            return View("index");
        }

    }
}
