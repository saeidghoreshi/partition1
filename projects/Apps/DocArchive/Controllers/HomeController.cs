using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DocArchive.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            
            return View();
        }


        public JsonResult getdata() 
        {
            List<string>header=new List<string>(){"Javascript","C#"};
            List<List<string>> content= new List<List<string>>() 
            { 
                new List<string>{"blah blah 1","blah blah 2","blah blah 3"}, 
                new List<string>{"blah blah 4","blah blah 5"}
            };
            var data=new
            {
                content=content,
                header=header
            };
            return Json(data,JsonRequestBehavior.AllowGet);
        }
        
    }
}
