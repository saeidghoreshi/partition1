using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DocArchive.Models;


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

            return json_getTopics();
            

            /*
            List<string>header=new List<string>(){"Javascript","C#"};
            List<List<string>> content= new List<List<string>>() 
            { 
                new List<string>{"blah blah 1","blah blah 2","blah blah 3"}, 
                new List<string>{"blah blah 4","blah blah 5"}
            };
             * var data = new
                {
                    content = content,
                    header = header
                };
            */
        }
        public class _topic
        {
            public int type_id;
            public string type_title;
            public string type_detail;
            public int? parent_type_id;
            public string type_name;
            public bool? is_active;
            public string datetime;
        }
        public class _treeNode
        {
            public int id;
            public string iconCls;
            public string type_name;
            public int? parent_type_id;
            public string type_title;
            public string type_detail;

            public List<_treeNode> children;
        }
        public JsonResult json_getTopics()
        {   
            var context = new DOCContext();
            List<_topic> dt = context.topic.Select(x => new _topic()
                        {
                            type_id=x.topic_id,
                            type_title=x.topic_title, 
                            type_detail=x.topic_details,
                            parent_type_id =x.topic_parent_id,
                            type_name=x.topic_title,
                            is_active = x.is_active,
                            datetime = x.datetime 
                        })
                        .Where(x=>x.is_active==true)
                        .OrderBy(x=>x.datetime)
                        .ToList<_topic>();


            List<_treeNode> tree = new List<_treeNode> { };
            for (int i = 0; i < dt.Count; i++)
            {
                if (dt[i].parent_type_id.ToString() == "")
                {
                    var node = new _treeNode()
                    {
                        id = dt[i].type_id,
                        iconCls = "treei",
                        type_name = dt[i].type_name,
                        parent_type_id = dt[i].parent_type_id,
                        type_title = dt[i].type_title,
                        type_detail = dt[i].type_detail,

                        children = new List<_treeNode>()
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                Rec(tree[j], dt);

            return Json(tree, JsonRequestBehavior.AllowGet);

        }

        public void Rec(_treeNode node, List<_topic> dt)
        {
            for (int j = 0; j < dt.Count; j++)
            {
                if (Convert.ToInt32(dt[j].parent_type_id)  == node.id)
                {
                    var _node = new _treeNode() 
                    {
                        id = dt[j].type_id,
                        iconCls = "treei",
                        type_name = dt[j].type_name.ToString(),
                        parent_type_id = dt[j].parent_type_id,
                        type_title = dt[j].type_title.ToString(),
                        type_detail = dt[j].type_detail.ToString(),

                        children = new List<_treeNode>()
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                Rec(node.children[j], dt);
        }
        
    }
}
