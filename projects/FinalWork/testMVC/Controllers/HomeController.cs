using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


using System.Diagnostics;

using testMVC.Models;
using MvcContrib.Pagination;

namespace javascript.Controllers
{
    //[Authorize]
    public class HomeController : AsyncController
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

            string html = this.getPureView(view).ToString();

            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }
        public string process()
        {
            return "sadasdasdsadas";
            //HttpContext.Response.Write("czxcc");
            var procs = from p in Process.GetProcesses()
                        select p;

            ViewData.Model = procs;
            //return View();
        }
        public ContentResult process2()
        {
            return Content("sadasdasdsadas");
        }

        public ActionResult main()
        {
            return View("main");
        }
        //[AcceptVerbs(HttpVerbs.Get)]
        public ActionResult Users()
        {
            var pars = Request.Params;

            int page=1;
            if (string.IsNullOrEmpty(pars["page"]))
                page = 1;
            else 
                page= Convert.ToInt32(pars["page"]);
            string q= pars["q"];


            var ctx = new model1Context();
            if (ModelState.IsValid)
            {
                    //data 1
                    var data1 = ctx.test
                        .OrderByDescending(t => t.name)
                        .OrderBy(p => p.testreviews.Average(tr => tr.rate))
                        .AsPagination(page, 5)
                        .Select(t => new view1()
                        {
                            id=t.id,
                            name=t.name,
                            avgrate=t.testreviews.Average(tr=>tr.rate)
                        });

                    //data2 eager load
                    var data2 = ctx.test
                        //.Include("testreviews")  //loads relate reviews records associated to current movie
                        .OrderByDescending(t => t.name)
                        .OrderBy(p => p.testreviews.Average(tr => tr.rate))
                        .AsPagination(page, 5)
                        .Where(t => q == null || t.name.StartsWith(q))
                        .Select(t => new view1()
                        {
                            id = t.id,
                            name = t.name,
                            avgrate = t.testreviews.Average(tr => tr.rate),
                            tr = t.testreviews

                        });

                    ViewBag.data = data2;
                    ViewBag.status=pars["status"];
                    ViewBag.msg = pars["msg"];
                    return View();
                
            }
            return View();

        }
        [HttpPost]
        public ActionResult deleteUsers() 
        {
            var pars = Request.Params;
            if (string.IsNullOrEmpty(pars["pid"]))
                return RedirectToAction("Users", "Home", new { status = false, msg = "No Product id Provided" });

            int pid = Convert.ToInt32(pars["pid"]);
                


            using (var ctx = new model1Context())
            {
                var deletedObject = ctx.test.Where(p=>p.id==pid).First();
                ctx.test.DeleteObject(deletedObject);
                ctx.SaveChanges();

                return RedirectToAction("Users", "Home", new { status=true , msg = "" });
            }
        }

        //public void editAsync()
        //{
        //    var pars = Request.Params;
        //    //if (string.IsNullOrEmpty(pars["pid"]))
        //      //  return RedirectToAction("Users", "Home", new { status = false, msg = "No Product id Provided" });

        //    int pid = Convert.ToInt32(pars["pid"]);
            

        //    var ctx = new model1Context();
        //    var _object = ctx.test.Where(p => p.id == pid).First();
        //    ViewBag.status = pars["status"];
        //    ViewBag.user = _object;


        //    //sample async webservice calling
        //    var client = new Asp.net25.ServiceReference1.Service1Client();
        //    client.GetDataCompleted += (sender, args) =>
        //        {
        //            AsyncManager.Parameters["pars"] = args.Result;
        //            AsyncManager.OutstandingOperations.Decrement();
        //        };
        //    AsyncManager.OutstandingOperations.Increment();
        //    client.GetDataAsync(2);
        //}
        //public ActionResult editCompleted(object pars)//must be the same name
        //{
        //    ViewBag.data = pars;
        //    return View("editUser");
        //}
        public ActionResult edit()
        {
            var pars = Request.Params;
            //if (string.IsNullOrEmpty(pars["pid"]))
            //  return RedirectToAction("Users", "Home", new { status = false, msg = "No Product id Provided" });

            int pid = Convert.ToInt32(pars["pid"]);


            var ctx = new model1Context();
            var _object = ctx.test.Where(p => p.id == pid).First();
            ViewBag.status = pars["status"];
            ViewBag.user = _object;


            
            return View("editUser");
        }

        public ActionResult update()
        {
            var pars = Request.Params;

            //handle back
            if (!string.IsNullOrEmpty(pars["back-btn"]))
                return RedirectToAction("Users", "Home", new { status = true, msg = "Back Button Pressed" });

            if (string.IsNullOrEmpty(pars["pid"]))
                return RedirectToAction("Users", "Home", new { status = false, msg = "No Product id Provided" });

            int pid = Convert.ToInt32(pars["pid"]);
            string name = pars["name"];


            using (var ctx = new model1Context())
            {
                var _object = ctx.test.Where(p => p.id == pid).First();
                _object.name = name;
                ctx.SaveChanges();

                return RedirectToAction("Users", "Home", new { status = true, msg = "" });
            }
        }
        public ActionResult newUser() 
        {
            return View("newUser");
        }
        public ActionResult createNewUser()
        {
            var pars = Request.Params;

            //handle back
            if (!string.IsNullOrEmpty(pars["back-btn"]))
                return RedirectToAction("Users", "Home", new { status = true, msg = "Back Button Pressed" });

            if (string.IsNullOrEmpty(pars["name"]))
                return RedirectToAction("Users", "Home", new { status = false, msg = "No Product Name Provided" });

            string name = pars["name"];
        
            using (var ctx = new model1Context()) 
            {
                var obj = new test()
                {
                    name = name
                };
                ctx.test.AddObject(obj);
                ctx.SaveChanges();

                return RedirectToAction("Users", "Home", new { status = true, msg = "" });
            }
        }
        public ActionResult editRating()
        {
            return View("editRating");
        }

        [ChildActionOnly] //only respond to html.renderAction
        public PartialViewResult partialview() //  (renderAction ,partialview ) combination
        {
            return PartialView("error/error_bottom");
        }
    
        
















        //GET PURE VIEW
        public string getPureView(string viewName)
        {
            var sw = new System.IO.StringWriter();
            var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
            var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
            viewResult.View.Render(viewContext,sw);
            viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);

            return sw.GetStringBuilder().ToString();
        }

    }//Class Definition
    public class view1
    {
        public int id;
        public string name;
        public double? avgrate;
        public IEnumerable<testreview> tr;
    }
    
}
