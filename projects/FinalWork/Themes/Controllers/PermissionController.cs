using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Transactions;
using Themes.Models;
//using System.Transactions;

namespace MvcApplication1.Controllers
{
    public class PermissionController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult changeUserPasswordForm() 
        {
            string viewName = "changeUserPasswordForm";
            var html = this.getPureView(viewName);

            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]                    
        public JsonResult assignPermissionsForm()
        {
            int user_id = 1;
            ViewBag.existingUserAssignedRoles   = this.getUserAssignedRoles(user_id);
            ViewBag.existingRoles = this.getExistingRoles(user_id);


            string viewName = "assignPermissionForm";
            var html = this.getPureView(viewName);

            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }


        public IEnumerable<object> getUserAssignedRoles(int user_id)
        {
            Themes.Models.prjEntities ctx = new Themes.Models.prjEntities();

            var Q =
            (
                from r in ctx.lu_role
                from p in r.permissions
                where p.user_id==user_id && r.permissions.Any()
                select r
            );
            return Q;
        }

        [HttpPost]
        public JsonResult json_savePermissions()
        {
            var pars = Request.Params;

            string roleIds = pars["roleIds"];


            using (TransactionScope t = new TransactionScope())
            {
                using (Themes.Models.prjEntities ctx = new Themes.Models.prjEntities())
                {
                    //Delete all related permissions first
                    var allUserPermissions =
                    (
                            from p in ctx.permission
                            select p
                    );
                    foreach (var pi in allUserPermissions)
                    {
                        ctx.permission.DeleteObject(pi);
                        ctx.SaveChanges();
                    }
                    if (!String.IsNullOrEmpty(roleIds))
                    {
                        string[] roles = roleIds.Split(',');
                        foreach (var role in roles)
                        {
                            var roleId = Convert.ToInt32(role);
                            //Check if already exists
                            var roleUserExists =
                            (
                               from p in ctx.permission
                               where p.user_id == 1 && p.role_id == (int)roleId
                               select new { temp = 1 }
                            );

                            if (roleUserExists.Count() != 0)
                                continue;

                            //Build New Permission Object
                            var newPermission = new Themes.Models.permission()
                            {
                                user_id = 1,
                                role_id = roleId
                            };

                            ctx.permission.AddObject(newPermission);
                            ctx.SaveChanges();
                        }
                    }

                    t.Complete();
                }

            }

            return Json(new { result = "Done" }, JsonRequestBehavior.AllowGet);
        }

        //get Remaining unassigned Roles for selected user
        public class x 
        {
            public int role_id;
            public string role_name;
        }
        public IEnumerable<object> getExistingRoles(int user_id) 
        {
            Themes.Models.prjEntities ctx = new Themes.Models.prjEntities();


            var Q2 =
                ctx.lu_role
                .GroupJoin(ctx.permission, r => r.role_id, p => p.role_id, (r, p) => new { r, p })
                    .Where(x => x.p.All(x2 => x2.user_id == user_id))
                    .Where(x => x.p.All(x2 => x2.permission_id == null))
                    .Select(x=>new x(){role_id=x.r.role_id,role_name=x.r.role_name});
                    ;
            
            return Q2;
        }


        [HttpGet]
        public JsonResult json_getLoginForm()
        {
            
            string viewName = "loginForm";
            var html = this.getPureView(viewName);

            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult json_login()
        {
            var pars = Request.Params;

            string username = pars["username"];
            string password = pars["password"];

            
            
            Themes.Models.prjEntities ctx = new Themes.Models.prjEntities();
                var curUser =
                (
                     from u in ctx.user
                     where u.username == username && u.password == password
                     select u
                );
                if (curUser.Count() == 1)
                {
                    Session["user"] = curUser.First();
                    return Json(new { result = 1 }, JsonRequestBehavior.AllowGet);
                }

                else
                    return Json(new { result = 0 }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult json_logout()
        {
            Session.Abandon();
            return Json(new { result = 1 }, JsonRequestBehavior.AllowGet);
        }
        

        public JsonResult json_extendSession()
        {
            Session.Timeout = 4;
            return Json(new { result = "Extended" }, JsonRequestBehavior.AllowGet);
        }
        
        

        //get real View Content
        public object getPureView(string viewName)
        {
            var sw = new System.IO.StringWriter();
            var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
            var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
            viewResult.View.Render(viewContext, sw);
            viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);

            return sw.GetStringBuilder().ToString();
        }

        //-------------------------------------Classes
        public class ux
        {
            public string username { get; set; }
            public string password { get; set; }
        }
        public class px
        {
            public int person_id { get; set; }
            public string fname { get; set; }
            public string lname { get; set; }
            public IEnumerable<ux> userInfo { get; set; }
        }
        public IEnumerable<object> getExistingUsers()
        {
            Themes.Models.prjEntities ctx = new Themes.Models.prjEntities();

            //Note to paor new ss any object to view we need to use built-in types or newly defined types
            var Q =
            (
                from p in ctx.person
                where p.users.Any() 
                select new px()
                {
                    person_id = p.person_id,
                    fname = p.fname,
                    lname = p.lname,
                    userInfo =
                    (
                        from u in p.users
                        where u.person_id == p.person_id
                        select new ux()
                        {
                            username=u.username,
                            password=u.password
                        }
                    )
                }
            );
            return Q;

        }

    }
}
