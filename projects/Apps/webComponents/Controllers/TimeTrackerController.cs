using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using Themes.Models;
using Classes;
using realestateweb.Models;
using Models;
namespace MvcApplication1.Controllers
{
    public class TimeTrackerController : Controller
    {
        readonly string connString = "server=s06.winhost.com;uid=DB_40114_codeclub_user;pwd=p0$31d0n;database=DB_40114_codeclub";

        public ActionResult Index()
        {
            return View();
        }

        //build Organizations Hierarchy tree
        public JsonResult json_readWorkFlow()
        {   
            sqlServer db = new sqlServer(connString);
            DataTable dt = db.fetch("select * from dbo.organization").Tables[0];

            //build tree
            List<Classes.organization> tree = new List<Classes.organization> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (dt.Rows[i]["parent_org_id"].ToString() == "")
                {
                    var node = new Classes.organization()
                    {
                        org_id = dt.Rows[i][0].ToString(),
                        parent_org_id = dt.Rows[i][1].ToString(),
                        org_name = dt.Rows[i][2].ToString(),
                        logo = "/jsplugins/workflow/images/" + dt.Rows[i][6].ToString(),

                        children = new List<Classes.organization>(),
                        //assignedUsers = this.getTaskAssignedUsers(Convert.ToUInt16(dt.Rows[i][0]))
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                this.RecTree(tree[j], dt);

            return Json(tree, JsonRequestBehavior.AllowGet);

        }

        public void RecTree(Classes.organization node, DataTable dt)
        {
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (dt.Rows[j]["parent_org_id"].ToString() == node.org_id)
                {
                    var _node = new Classes.organization()
                    {
                        org_id = dt.Rows[j][0].ToString(),
                        parent_org_id = dt.Rows[j][1].ToString(),
                        org_name = dt.Rows[j][2].ToString(),
                        logo = "/jsplugins/workflow/images/" + dt.Rows[j][6].ToString(),

                        children = new List<Classes.organization>(),
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


            using (Themes.Models.prjEntities ctx = new Themes.Models.prjEntities())
            {
                Themes.Models.task newTask = new Themes.Models.task()
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


            using (Themes.Models.prjEntities ctx = new Themes.Models.prjEntities())
            {
                foreach (var item in person_ids)
                {
                    Themes.Models.task_person tp = new Themes.Models.task_person()
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

            return Json(this.getTaskAssignedUsers(task_id), JsonRequestBehavior.AllowGet);

        }

        //update timer
        public JsonResult json_updateTaskProgress()
        {
            var pars = Request.Params;
            int task_id = Convert.ToInt32(pars["task_id"]);

            var curUser = Session["user"];
            int person_id = Convert.ToInt32(((Themes.Models.user)curUser).person_id);
            
            int task_person_id = this.getCurTaskPerson(task_id, person_id).First().task_person_id;

            using (Themes.Models.prjEntities ctx = new Themes.Models.prjEntities())
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
                    var newTimer = new Themes.Models.tp_timer()
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
            int person_id = Convert.ToInt32(((Themes.Models.user)curUser).person_id);

            int task_person_id = this.getCurTaskPerson(task_id, person_id).First().task_person_id;

            using (Themes.Models.prjEntities ctx = new Themes.Models.prjEntities())
            {
                var newTaskProgress = new Themes.Models.tp_progress()
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
            int person_id = Convert.ToInt32(((Themes.Models.user)curUser).person_id);

            using (Themes.Models.prjEntities ctx = new Themes.Models.prjEntities())
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
        public PartialViewResult json_getAssignmentform()
        {
            ViewBag.existingOffices = this.getExistingOffices();

            return PartialView("taskAssignment");
        }

        public PartialViewResult json_getCreateNewTaskForm()
        {
            return PartialView("createNewTask");
        }

        public PartialViewResult json_getUserCurrentTasksForm()
        {
            ViewBag.getUserCurrentTasks = this.getUserCurrentTasks(1);
            return PartialView("userCurrentTasksForm");
        }
        public PartialViewResult json_getCurUserTimeTrackerForm() 
        {
            if (Session["user"] == null)
                return PartialView("");

            var pars = Request.Params;
            int task_id = Convert.ToInt32(pars["task_id"]);


            var curUser = Session["user"];
            int person_id = Convert.ToInt32(((Themes.Models.user)curUser).person_id);

            var html = "";


            if (this.getCurTaskPerson(task_id, person_id).Count() == 0)
            {
                return PartialView("");
            }

            //Fill in view bag
            ViewBag.CurUserTimeTrackerHistory = this.getCurUserTimeTrackerHistory(task_id, person_id);
            ViewBag.taskInfo = this.getTaskInfo(task_id) ;
            //get Played/pauses ststus
            ViewBag.getTaskPersontimerStat = this.getTaskPersontimerStat(task_id, person_id);

            return PartialView("curUserTimeTrackerForm");
        }
        
        
        //***********************************************************************************************
        //***************************************Data Sources********************************************
        //***********************************************************************************************

        /**/
        
        public object getTaskInfo(int task_id)
        {
            Themes.Models.prjEntities ctx = new Themes.Models.prjEntities();

            var Q =
            (
                from t in ctx.task

                where t.task_id== task_id
                select t

            );
            return Q.First();
        }
        //check wheter or not the current use has turn in this specific task
        public IEnumerable<Themes.Models.task_person> getCurTaskPerson(int task_id, int person_id)
        {
            Themes.Models.prjEntities ctx = new Themes.Models.prjEntities();

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
            Themes.Models.prjEntities ctx = new Themes.Models.prjEntities();

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
            using (Themes.Models.prjEntities ctx = new Themes.Models.prjEntities())
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
            sqlServer db=new  sqlServer(connString);
            return db.fetch("exec [workflow].[getTaskAssignedUsers] @taskID="+task_id).Tables[0].AsEnumerable()
                .Select(x => new 
                {
                    org_id=x["org_id"].ToString(),
                    person_id = x["person_id"].ToString(),
                    fname = x["fname"].ToString(),
                    lname = x["lname"].ToString()
                });
        }

        //get Existing office List
        public IEnumerable<object> getExistingOffices()
        {
            Themes.Models.prjEntities ctx = new Themes.Models.prjEntities();

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
            Themes.Models.prjEntities ctx = new Themes.Models.prjEntities();

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
            sqlServer db = new sqlServer(connString);
            return db.fetch("exec [workflow].[getUserCurrentTasks]  @personID=" + person_id).Tables[0].AsEnumerable();
            
        }
        public PartialViewResult buildUserTasksList()
        {
            ViewBag.tasks = this.getUserCurrentTasks(22);
            return PartialView("TasksList");
        }

        public JsonResult getUsers() 
        {
            sqlServer db = new sqlServer(connString);
            var dt = db.fetch("exec workflow.getUserOrg").Tables[0];

            //build tree
            List<dynamic> tree = new List<dynamic> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (dt.Rows[i]["parentId"].ToString() == "")
                {
                    var node = new
                    {
                        id = dt.Rows[i][0].ToString(),
                        parentId = dt.Rows[i][1].ToString(),
                        text = dt.Rows[i][2].ToString(),
                        title = dt.Rows[i][2].ToString(),
                        state = "",//closed
                        iconCls="",
                        children = new List<dynamic>()
                    };
                    tree.Add(node);
                }
            }

            for (int j = 0; j < tree.Count; j++)
                this.getUsersRec(tree[j], dt);

            return Json(tree, JsonRequestBehavior.AllowGet);
        }
        public void getUsersRec(dynamic node, DataTable dt)
        {
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (dt.Rows[j]["parentId"].ToString() == node.id)
                {
                    var _node = new 
                    {
                        id = dt.Rows[j][0].ToString(),
                        parentId = dt.Rows[j][1].ToString(),
                        text = dt.Rows[j][2].ToString(),
                        title = dt.Rows[j][2].ToString(),
                        state = "",
                        iconCls = "",
                        children = new List<dynamic>()
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                getUsersRec(node.children[j], dt);
        }


        public PartialViewResult Form_createAssignTask() 
        {
            return PartialView("Form_createAssignTask");
        }
        public JsonResult getOrgUsers() 
        {
            var pars = Request.Params;
            int orgID=Convert.ToInt32(pars["orgID"]);

            sqlServer db = new sqlServer(connString);
            var data= db.fetch("exec workflow.getOrgUsers @orgID =" + orgID).Tables[0].AsEnumerable();
            List<dynamic> result = new List<dynamic>();
            foreach (var item in data)
                result.Add(new 
                {
                    person_id=item["person_id"],
                    name = item["name"]
                });
            return Json(result,JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult tt_task_new_form() 
        {
            return PartialView("task_new_form");
        }
        public PartialViewResult tt_task_assignment_form()
        {
            return PartialView("task_assignment_form");
        }
        public PartialViewResult tt_task_history_form()
        {
            return PartialView("task_history_form");
        }
        public JsonResult tt_userList()
        {
            var pars = Request.Params;
            var officeID = pars["officeID"];
            var max = 0;
            List<dynamic> userList = new List<dynamic>();

            if (officeID == "1")
                max = 50;
            else
                max = 100;
            for(var i=0;i<max;i++)
            {
                userList.Add(new {
                    personID=i,
                    userID=i,
                    name="name-"+i
                });
            }
            return Json(userList,JsonRequestBehavior.AllowGet);
        }
        public PartialViewResult tt_task_history() 
        {
            sqlServer db = new sqlServer(connString);
            DataTable dt = db.fetch("select * from dbo.organization").Tables[0];

            List<dynamic> repo = new List<dynamic>();
            for (var i = 0; i < 100;i++ )
                repo.Add(new tt_history()
                {

                    ID   = i,
                    label="name-"+i
                });

            ViewBag.data = repo;
            return PartialView("task_history");

        }
        public PartialViewResult tt_task_chart_form()
        {
            return PartialView("task_chart_form");
        }
        
    }
    
}
