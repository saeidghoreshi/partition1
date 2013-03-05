using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using realestateweb.Models;
using System.Data;

namespace webComponents.Controllers
{
    public class Extjs4Controller : Controller
    {
        readonly string connString = "server=s06.winhost.com;uid=DB_40114_codeclub_user;pwd=p0$31d0n;database=DB_40114_codeclub";

        

        List<dynamic> repo = new List<dynamic>();
        public JsonResult json_test()
        {
            var pars = Request.Params;
            var q = ((pars["query"] == null) ? "" : pars["query"].ToString());
            Random R=new Random();
            for (var i = 0; i < 100; i++)
            {
                repo.Add(new
                {
                    org_id = 1,
                    person_id = 1,
                    fname = "firstname-"+i,
                    lname = "lastname"+i,
                    value = R.Next(i*2000),
                    bandwidth = R.Next(i * 2000)
                });
            }
                
            string start = ((pars["start"] == null) ? "0" : pars["start"]);
            string limit = ((pars["limit"] == null) ? Int32.MaxValue.ToString() : pars["limit"]);

            return Json(new 
            { 
                    totalCount = repo.Count(), 
                    root = this.filterJson(repo, new { start = Convert.ToInt32(start), limit = Convert.ToInt32(limit) }) 
            }, 
            JsonRequestBehavior.AllowGet);

        }

        public object getTransactions()
        {
            string connString = "server=s06.winhost.com;uid=DB_40114_codeclub_user;pwd=p0$31d0n;database=DB_40114_codeclub";
            sqlServer db = new sqlServer(connString);
            var data = db.fetch("select * from accounting.categoryType ct " +
                        "inner join accounting.gltype t on t.id=ct.glTypeID " +
                        "inner join Accounting.account a on a.catTypeID=ct.ID " +
                        "full join Accounting.[transaction] trans on trans.accountid=a.ID")
                .Tables[0]
                .AsEnumerable()
                .Select(r => new
                {
                    catTypeID = r.ItemArray[0],
                    name = r.ItemArray[1]
                });

            return data;
        }

        public JsonResult transactionTypes()
        {
            sqlServer db = new sqlServer(connString);
            var data = db.fetch("select id,name from accounting.categoryType")
                .Tables[0]
                .AsEnumerable()
                .Select(r=>new
                {
                    id=r.ItemArray[0] ,
                    name = r.ItemArray[1]
                });

            return Json(data,JsonRequestBehavior.AllowGet);

        }
        public IEnumerable<dynamic> filterJson(IEnumerable<dynamic> obj, dynamic pars)
        {
            return obj.AsEnumerable().Where((o, index) => index >= pars.start && index <= pars.start + pars.limit - 1);
        }

        public ActionResult Index()
        {
            return View("guide");
        }
        public PartialViewResult grid_simple() 
        {
            return PartialView("grid/simple");
        }
        public PartialViewResult grid_features()
        {
            return PartialView("grid/features");
        }
        public PartialViewResult grid_roundTrim()
        {
            return PartialView("grid/roundTrim");
        }
        
        

    }
}
