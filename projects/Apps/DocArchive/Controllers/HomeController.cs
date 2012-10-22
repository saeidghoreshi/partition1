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


        
        public class _Foldering
        {
            public int id;
            public int? parent_id;
            public string title;
            public bool? is_active;
            public string datetime;
        }
        public class _topic
        {
            public int id;
            public int? parent_id;
            public string title;
            public string description;
            public bool? is_active;
            public string datetime;
            public int? foldering_id;
        }

        public class _treeNode
        {
            public int id;
            public int? parent_id;
            public string title;
            public string detail;
            public string iconCls;

            public List<_treeNode> children;
        }
        public JsonResult json_getTopicsFolderingIds()
        {
            var context = new DOCContext();
            List<_Foldering> dt = context.foldering.Select(x => new _Foldering()
            {
                id = x.ID,
                parent_id = x.parent_id,
                is_active=x.is_active,
                datetime=x.timestamp
            })
                        .Where(x => x.is_active == true)
                        .OrderBy(x => x.datetime)
                        .ToList<_Foldering>();

            
            return Json(dt, JsonRequestBehavior.AllowGet);

        }
        public JsonResult json_getTopicsFoldering()
        {   
            var context = new DOCContext();
            List<_Foldering> dt = context.foldering.Select(x => new _Foldering()
                        {
                            id=x.ID,
                            title=x.title, 
                            parent_id =x.parent_id,
                            is_active = x.is_active,
                            datetime = x.timestamp 
                        })
                        .Where(x=>x.is_active==true)
                        .OrderBy(x=>x.datetime)
                        .ToList<_Foldering>();


            List<_treeNode> tree = new List<_treeNode> { };
            for (int i = 0; i < dt.Count; i++)
            {
                if (dt[i].parent_id.ToString() == "")
                {
                    var node = new _treeNode()
                    {
                        id = dt[i].id,
                        iconCls = "treei",
                        parent_id = dt[i].parent_id,
                        title = dt[i].title,
                        children = new List<_treeNode>()
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                json_getTopicsFoldering_Rec(tree[j], dt);

            return Json(tree, JsonRequestBehavior.AllowGet);

        }

        public void json_getTopicsFoldering_Rec(_treeNode node, List<_Foldering> dt)
        {
            for (int j = 0; j < dt.Count; j++)
            {
                if (Convert.ToInt32(dt[j].parent_id)  == node.id)
                {
                    var _node = new _treeNode() 
                    {
                        id = dt[j].id,
                        iconCls = "treei",
                        parent_id = dt[j].parent_id,
                        title = dt[j].title.ToString(),
                        
                        children = new List<_treeNode>()
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                json_getTopicsFoldering_Rec(node.children[j], dt);
        }


        //Fetch 2 levels Foldering
        public JsonResult json_get2LevelsTopics()
        {
            int folderId=Convert.ToInt32(Request.QueryString["folderId"]);

            var context = new DOCContext();
            List<_topic> dt = context.topic.Select(x => new _topic()
            {
                id = x.id,
                parent_id = x.parent_id,
                title = x.title,
                description= x.description,
                is_active = x.is_active,
                datetime = x.datetime,
                foldering_id=x.foldering_id
            })
                        .Where(x => x.is_active == true && x.foldering_id==folderId )
                        .OrderBy(x => x.datetime)
                        .ToList<_topic>();


            List<_treeNode> tree = new List<_treeNode> { };
            for (int i = 0; i < dt.Count; i++)
            {
                if (dt[i].parent_id.ToString() == "")
                {
                    var node = new _treeNode()
                    {
                        id = dt[i].id,
                        iconCls = "treei",
                        parent_id = dt[i].parent_id,
                        title = dt[i].title,
                        detail = dt[i].description,

                        children = new List<_treeNode>()
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                json_get2LevelsTopics_Rec(tree[j], dt);

            return Json(tree, JsonRequestBehavior.AllowGet);

        }

        public void json_get2LevelsTopics_Rec(_treeNode node, List<_topic> dt)
        {
            for (int j = 0; j < dt.Count; j++)
            {
                if (Convert.ToInt32(dt[j].parent_id) == node.id)
                {
                    var _node = new _treeNode()
                    {
                        id = dt[j].id,
                        iconCls = "treei",
                        parent_id = dt[j].parent_id,
                        title = dt[j].title,
                        detail = dt[j].description,

                        children = new List<_treeNode>()
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                json_get2LevelsTopics_Rec(node.children[j], dt);
        }


        public PartialViewResult get_NewTopicPage() 
        {
            return PartialView("topics/newTopic");
        }
        public PartialViewResult get_SubTopicPage()
        {
            return PartialView("topics/SubTopic");
        }
        public PartialViewResult get_delTopicPage()
        {
            return PartialView("topics/delTopic");
        }

        public JsonResult saveNewTopic()
        {
            var pars=Request.Params;
            int folder_id = Convert.ToInt32(pars["folder_id"]);
            string title = Convert.ToString(pars["title"]);
            
            var context = new DOCContext();
            context.topic.AddObject
                (
                new topic() 
                {
                    foldering_id=folder_id,
                    is_active=true,
                    title=title
                }
                );


            context.SaveChanges();


            return Json(new {result=1 },JsonRequestBehavior.AllowGet);
        }
        public JsonResult saveNewSubTopic()
        {
            var pars = Request.Params;
            int folder_id = Convert.ToInt32(pars["folder_id"]);
            int parent_id = Convert.ToInt32(pars["parent_id"]);
            string title = Convert.ToString(pars["title"]);
            string description = Convert.ToString(pars["description"]);

            var context = new DOCContext();
            context.topic.AddObject
                (
                new topic()
                {
                    foldering_id = folder_id,
                    is_active = true,
                    title = title,
                    description = description,
                    parent_id=parent_id
                }
                );

            context.SaveChanges();

            return Json(new { result = 1 }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult delTopic()
        {
            var pars = Request.Params;
            int topic_id= Convert.ToInt32(pars["topic_id"]);
            
            var context = new DOCContext();
            var topic=context.topic.Where(x=>x.id==topic_id).Single();
            topic.is_active = false;

            context.SaveChanges();

            return Json(new { result = 1 }, JsonRequestBehavior.AllowGet);
        }
        public ContentResult getTopicDescription(){
            var pars = Request.Params;
            int topic_id = Convert.ToInt32(pars["topic_id"]);

            var context = new DOCContext();
            var topic = context.topic.Where(x => x.id == topic_id).Single();

            return Content(topic.description);
        }
        public ContentResult updateSubTopic() 
        {
            var pars = Request.Params;
            int folder_id = Convert.ToInt32(pars["folder_id"]);
            int topic_id = Convert.ToInt32(pars["topic_id"]);
            string title= Convert.ToString(pars["title"]);
            string description = Convert.ToString(pars["description"]);



            var context = new DOCContext();
            var topic = context.topic.Where(x => x.id == topic_id).Single();

            topic.title = title;
            topic.description = description;

            context.SaveChanges();

            return Content("Done");
        }
        public PartialViewResult createNewPage()
        {
            return PartialView("menu/newFolder");
        }
        public ContentResult saveNewFolder() 
        {
            var pars = Request.Params;
            int folder_id = Convert.ToInt32(pars["folder_id"]);
            string title= pars["title"];

            var ctx = new DOCContext();

            var newFoler=new Models.foldering
            {
                parent_id=folder_id,
                timestamp=DateTime.Now.ToString(),
                title=title,
                is_active=true
            };

            ctx.foldering.AddObject(newFoler);
            ctx.SaveChanges();
            
            return Content("Saved");
        }
        public ContentResult updateFolderTitle() 
        {
            var pars = Request.Params;
            int folder_id = Convert.ToInt32(pars["folder_id"]);
            string title = pars["title"];

            var ctx = new DOCContext();

            var folder = ctx.foldering.Where(x => x.ID == folder_id).SingleOrDefault();
            folder.title = title;

            ctx.SaveChanges();

            return Content("Updated");
        }
        public ContentResult treeMenuFolderingSaveOrdering() 
        {
            var pars = Request.Params;
            string[] ids = Convert.ToString(pars["ids"]).Split('-');
            

            var ctx = new DOCContext();

            var folders = ctx.foldering.Where(x => x.is_active==true)
                .OrderBy(x=>x.ID)
                .ToList();
            foreach (var item in ids) 
            {
                int parent_id = Convert.ToInt32(item.Split(',')[0]);
                int id = Convert.ToInt32(item.Split(',')[1]);

                var folderObject = folders.First(x => x.ID == id);
                folderObject.parent_id = parent_id;
                folderObject.timestamp = DateTime.Now.Ticks.ToString();
            }

            ctx.SaveChanges();

            return Content("Ordering Updated");
        }
        
        
    }
}
