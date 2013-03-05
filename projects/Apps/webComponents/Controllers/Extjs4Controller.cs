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
        public JsonResult json_test_treeview_extra()
        {
            List<dynamic> repo = new List<dynamic>();
            repo.Add(new { ID = 1, parentID = -1, name = "ID1", name2 = "ID1" });
            repo.Add(new { ID = 2, parentID = -1, name = "ID2", name2 = "ID2" });
            repo.Add(new { ID = 3, parentID = 1, name = "ID3", name2 = "ID3" });
            repo.Add(new { ID = 4, parentID = 1, name = "ID4", name2 = "ID4" });


            return Json(new { ids = repo }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult json_test_treeview()
        {
            
            List<dynamic> repo = new List<dynamic>();
            repo.Add(new {ID=1,parentID=-1,name="ID1",name2 = "ID1"});
            repo.Add(new { ID = 2, parentID = -1, name = "ID2", name2 = "ID2"});
            repo.Add(new { ID = 3, parentID = 1, name = "ID3", name2 = "ID3"});
            repo.Add(new { ID = 4, parentID = 1, name = "ID4", name2 = "ID4"});

            List<dynamic> tree = new List<dynamic> { };
            for (int i = 0; i < repo.Count; i++)
            {
                if (Convert.ToInt32(repo[i].parentID) == -1)
                {
                    var node = new 
                    {
                        id = repo[i].ID.ToString(),
                        firstCol = repo[i].name.ToString(),
                        secondCol = repo[i].name2.ToString(),
                        leaf = false,
                        @checked = false,
                        //cls = "testClass"
                        children = new List<dynamic>()
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                Rec(tree[j], repo);


            return Json(new { root = "", children = tree }, JsonRequestBehavior.AllowGet);

        }
        public void Rec(dynamic node, List<dynamic> repo)
        {
            
            for (int j = 0; j < repo.Count; j++)
            {
                if (repo[j].parentID.ToString() == node.id)
                {
                    var _node = new 
                    {
                        id = repo[j].ID.ToString(),
                        firstCol = repo[j].name.ToString(),
                        secondCol = repo[j].name2.ToString(),
                        leaf = false,
                        @checked = false,
                        cls = "testClass",
                        children = new List<dynamic>()
                    };

                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                Rec(node.children[j], repo);
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
        public PartialViewResult tree_simple()
        {
            return PartialView("tree/simple");
        }
        
        

    }
}
