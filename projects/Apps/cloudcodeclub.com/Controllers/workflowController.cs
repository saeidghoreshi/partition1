using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace MvcApplication1.Controllers
{
    public class workflowController : Controller
    {
        //
        // GET: /workflow/

        public ActionResult Index()
        {
            return View();
        }

        //build Organizations Hierarchy tree
        public JsonResult json_readWorkFlow()
        {
            sqlServer db = new sqlServer(ConfigurationManager.ConnectionStrings["winhostConnection"].ConnectionString);
            DataTable dt = db.fetch("select * from dbo.organization").Tables[0];

            //build tree
            List<organization> tree = new List<organization> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (dt.Rows[i]["parent_org_id"].ToString() == "")
                {
                    var node = new organization()
                    {
                        org_id = dt.Rows[i][0].ToString(),
                        parent_org_id = dt.Rows[i][1].ToString(),
                        org_name = dt.Rows[i][2].ToString(),
                        logo = "/resources/modules/workflow/images/" + dt.Rows[i][6].ToString(),

                        children = new List<organization>(),
                        //assignedUsers = this.getTaskAssignedUsers(Convert.ToUInt16(dt.Rows[i][0]))
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                this.RecTree(tree[j], dt);

            return Json(tree, JsonRequestBehavior.AllowGet);

        }

        public void RecTree(organization node, DataTable dt)
        {
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (dt.Rows[j]["parent_org_id"].ToString() == node.org_id)
                {
                    var _node = new organization()
                    {
                        org_id = dt.Rows[j][0].ToString(),
                        parent_org_id = dt.Rows[j][1].ToString(),
                        org_name = dt.Rows[j][2].ToString(),
                        logo = "/resources/modules/workflow/images/" + dt.Rows[j][6].ToString(),

                        children = new List<organization>(),
                        //assignedUsers = this.getTaskAssignedUsers(Convert.ToUInt16(dt.Rows[j][0]))
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                RecTree(node.children[j], dt);
        }

        public JsonResult json_uploadTaskDoc() 
        {
            string timestamp = DateTime.Now.Ticks.ToString();
            var file = Request.Files["createNewtask_file"];
            file.SaveAs(Server.MapPath("../../resources/components/workflow1/Task/define/upload/") + timestamp+"-"+file.FileName);

            var docId=1;
            return Json(new { result = new {filename=file.FileName,docId=docId} }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult json_saveNewTask()
        {
            var pars = Request.Params;
            string task_title = pars["Task_title"];
            string task_description = pars["Task_description"];
            string task_deadline = pars["task_deadline"];
            string filenames=pars["filenames"];


            using (Models.prjEntities ctx = new Models.prjEntities())
            {
                Models.task newTask = new Models.task()
                {

                    title = task_title,
                    description = task_description,
                    task_status_id = 2,/*Progressing*/
                    stamp = DateTime.Now,
                    is_active = true
                };
                ctx.task.AddObject(newTask);
                ctx.SaveChanges();
            }

            //(2) add document objects for Task


            return Json(new { result = "done" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult json_getOfficeUsers() 
        {
            var pars = Request.Params;
            int org_id=Convert.ToInt32(pars["org_id"]);

            return Json(new { result = this.getExistingOfficeUsers(org_id) }, JsonRequestBehavior.AllowGet);
            
        }

        public JsonResult json_saveUserSequence()
        {
            var pars = Request.Params;
            int task_id = Convert.ToInt32(pars["task_id"]);
            string[] person_ids = pars["taskUsersSequence"].Split(',');


            using (Models.prjEntities ctx = new Models.prjEntities())
            {
                foreach (var item in person_ids)
                {
                    Models.task_person tp = new Models.task_person()
                    {
                        task_id=task_id,
                        person_id = Convert.ToInt32(item),
                        user_task_status_id=1 /*Not Started*/
                    };
                    ctx.task_person.AddObject(tp);
                    ctx.SaveChanges();
                }
            }
            
            return Json(new { result = "done" }, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult json_getTaskAssignedUsers()
        {
            var pars = Request.Params;
            int task_id = Convert.ToInt32(pars["task_id"]);

            return Json(new { result = this.getTaskAssignedUsers(task_id)}, JsonRequestBehavior.AllowGet);

        }

        //update timer
        public JsonResult json_updateTaskProgress()
        {
            var pars = Request.Params;
            int task_id = Convert.ToInt32(pars["task_id"]);

            var curUser = Session["user"];
            int person_id = Convert.ToInt32(((Models.user)curUser).person_id);
            
            int task_person_id = this.getCurTaskPerson(task_id, person_id).First().task_person_id;

            using (Models.prjEntities ctx = new Models.prjEntities())
            {
                
                var cur_task_person=
                (
                     from tp in ctx.task_person
                     where tp.task_person_id== task_person_id
                     select tp   
                ).First();

                
                /* First check if there is any open timer then update end_timestamp else create new with open end_timestamp */
                var q =
                (
                    from tpt in ctx.tp_timer
                    where
                        tpt.task_person.task_person_id==task_person_id
                        && tpt.task_person.user_task_status_id != 3/*Not Finalized*/
                        && tpt.end_stamp == null /*open timer*/
                    select tpt
                );
                if (q.Count() != 0)
                {
                    q.First().end_stamp = DateTime.Now;
                    q.First().is_commited = true;
                    q.First().task_person.user_task_status_id =2 /*Progressing*/;
                    ctx.SaveChanges();
                    
                }
                else 
                {
                    var newTimer = new Models.tp_timer()
                    {
                        t_p_id = task_person_id,
                        start_stamp=DateTime.Now,
                        end_stamp=null,
                        is_commited=false
                    };

                    ctx.tp_timer.AddObject(newTimer);
                    ctx.SaveChanges();
                    
                }
            }

            //return back current timer status after operation
            return Json(new { result = this.getTaskPersontimerStat (task_id,person_id)}, JsonRequestBehavior.AllowGet);
        }

        //Adds new descriptive content for specific task person
        public JsonResult json_saveNewTaskStat()
        {
            var pars = Request.Params;

            int task_id = Convert.ToInt32(pars["task_id"]);
            string description = pars["description"];

            var curUser = Session["user"];
            int person_id = Convert.ToInt32(((Models.user)curUser).person_id);

            int task_person_id = this.getCurTaskPerson(task_id, person_id).First().task_person_id;

            using (Models.prjEntities ctx = new Models.prjEntities())
            {
                var newTaskProgress = new Models.tp_progress()
                {
                    t_p_id = task_person_id,
                    description = description,
                    datetime=DateTime.Now
                };

                ctx.tp_progress.AddObject(newTaskProgress);
                ctx.SaveChanges();
            }
            
            return Json(new { result = "done" }, JsonRequestBehavior.AllowGet);
        }

        //if tjhere is any open timer close it . and finalu task_person obect goes to finalize stat
        public JsonResult json_finalizeTaskPerson() 
        {
            var pars = Request.Params;

            int task_id = Convert.ToInt32(pars["task_id"]);
            var curUser = Session["user"];
            int person_id = Convert.ToInt32(((Models.user)curUser).person_id);

            using (Models.prjEntities ctx = new Models.prjEntities())
            {
                var cur_task_person =
                (
                    from tp in ctx.task_person

                    where tp.task_id == task_id && tp.user_task_status_id != 3 /*NOT (finalized)*/
                    orderby tp.task_person_id ascending
                    select tp
                ).First();
                

                
                if (this.getTaskPersontimerStat(task_id, person_id) == "pause")   //timer open
                {
                    //close timer
                    var open_time_task_person=(
                        from tpt in ctx.tp_timer
                        where
                            tpt.task_person.task_person_id==cur_task_person.task_person_id
                            && tpt.task_person.user_task_status_id == 2/*Progressing*/
                            && tpt.end_stamp == null /*open timer*/
                        select tpt
                    ).First();
                    open_time_task_person.end_stamp = DateTime.Now;
                }
                //finally finalize task person
                cur_task_person.user_task_status_id = 3;
                ctx.SaveChanges();
            }

            return Json(new { result = "done" }, JsonRequestBehavior.AllowGet);
        }

        
        
        
        //***********************************************************************************************
        //***************************************Forms***************************************************
        //***********************************************************************************************
        public JsonResult json_getAssignmentform()
        {
            ViewBag.existingOffices = this.getExistingOffices();

            var html = this.getPureView("taskAssignment");
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult json_getCreateNewTaskForm()
        {
            var html = this.getPureView("createNewTask");
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult json_getUserCurrentTasksForm()
        {
            ViewBag.getUserCurrentTasks = this.getUserCurrentTasks(1);
            var html = this.getPureView("userCurrentTasksForm");
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult json_getCurUserTimeTrackerForm() 
        {
            if (Session["user"] == null)
                return Json(new { result = "Login Required to access your Tracker" }, JsonRequestBehavior.AllowGet);

            var pars = Request.Params;
            int task_id = Convert.ToInt32(pars["task_id"]);


            var curUser = Session["user"];
            int person_id = Convert.ToInt32(((Models.user)curUser).person_id);

            var html = "";


            if (this.getCurTaskPerson(task_id, person_id).Count() == 0)
            {
                return Json(new { result = "No task defined for you at this moment"}, JsonRequestBehavior.AllowGet);
            }

            //Fill in view bag
            ViewBag.CurUserTimeTrackerHistory = this.getCurUserTimeTrackerHistory(task_id, person_id);
            ViewBag.taskInfo = this.getTaskInfo(task_id) ;
            //get Played/pauses ststus
            ViewBag.getTaskPersontimerStat = this.getTaskPersontimerStat(task_id, person_id);

            html = this.getPureView("curUserTimeTrackerForm").ToString();
            return Json(new { result = html }, JsonRequestBehavior.AllowGet);
        }
        
        
        //***********************************************************************************************
        //***************************************Data Sources********************************************
        //***********************************************************************************************

        /**/
        
        public object getTaskInfo(int task_id)
        {
            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
            (
                from t in ctx.task

                where t.task_id== task_id
                select t

            );
            return Q.First();
        }
        //check wheter or not the current use has turn in this specific task
        public IEnumerable<Models.task_person> getCurTaskPerson(int task_id, int person_id)
        {
            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
            (
                from tp in ctx.task_person

                where   tp.task_id == task_id 
                        && tp.person_id==person_id
                        && tp.user_task_status_id!=3 /*NOT (finalized)*/
                orderby tp.task_person_id ascending
                select tp
            );
            return Q;
        }
        
        //get list of specific task progress history
        public IEnumerable<dynamic> getCurUserTimeTrackerHistory(int task_id, int person_id)
        {
            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
            (
                from tp in ctx.tp_progress

                where tp.task_person.task_id == task_id
                orderby tp.t_p_p_id descending

                select tp

            );
            return Q;
        }
        

        //get task_person timer status
        public string getTaskPersontimerStat(int task_id, int person_id)
        {
            using (Models.prjEntities ctx = new Models.prjEntities())
            {
                string paused_played = "";

                var cur_task_person =
                (
                     from tp in ctx.task_person
                     where tp.person_id == person_id
                         && tp.task_id == task_id
                         &&
                         (
                            tp.user_task_status_id == 2 /*Progressing*/
                            || tp.user_task_status_id == 1 /*Not Started*/
                         )
                     select tp
                ).First();

                var q =
                (
                        from tpt in ctx.tp_timer
                        where
                            tpt.task_person.task_person_id == cur_task_person.task_person_id
                            && tpt.task_person.user_task_status_id == 2/*Progressing*/
                            && tpt.end_stamp == null /*open timer*/
                        select tpt
                );

                if (q.Count() != 0)
                    paused_played = "pause";
                else
                    paused_played = "play";

                return paused_played;
            }
        }

        //get Users assigned to Task
        public IEnumerable<object> getTaskAssignedUsers(int task_id)
        {
            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
            (
                from tp in ctx.task_person
                join p in ctx.person on tp.person_id equals p.person_id into joint1

                from jointItem1 in joint1
                join po in ctx.person_org on jointItem1.person_id equals po.person_id into joint2

                from jointItem2 in joint2

                where tp.task_id == task_id
                orderby tp.task_person_id, jointItem2.org_id ascending
                select new
                {
                    org_id = jointItem2.org_id,
                    person_id = jointItem1.person_id,
                    fname = jointItem1.fname,
                    lname = jointItem1.lname
                }
            );
            return Q;
        }

        //get Existing office List
        public IEnumerable<object> getExistingOffices()
        {
            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
            (
                from r in ctx.organization
                select r
            );
            return Q;
        }

        //get User by OfficeId
        public IEnumerable<object> getExistingOfficeUsers(int org_id)
        {
            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
            (
                from p in ctx.person
                join po in ctx.person_org on p.person_id equals po.person_id into joint
                from leftjoint in joint
                where leftjoint.org_id == org_id
                select new
                {
                    person_id = p.person_id,
                    fname = p.fname,
                    lname = p.lname,
                    thumbnail = "/resources/components/workflow1/task/assignment/images/user.png"
                }
            );
            return Q;
        }
        /*
         * get User Current tasks
         * Details : fetch all tasks that is user turn and not completed
          
        */
        
        public IEnumerable<object> getUserCurrentTasks(int person_id)
        {
            Models.prjEntities ctx = new Models.prjEntities();

            var Q =
            (
                from t in ctx.task 
                where t.is_active==true //&& tp.person_id == person_id
                select t
                //select new
                //{
                //    task_id=t.task_id,
                //    title=t.title,
                //    description=t.description,
                //    deadline=t.deadline,
                //    task_status_id=t.task_status_id,
                //    task_status_name=t.lu_task_status.type_name
                //}
            );
            return Q;
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
