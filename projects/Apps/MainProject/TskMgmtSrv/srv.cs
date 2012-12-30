using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using System.Net;
using System.Data;
using System.Data.SqlClient;

namespace TskMgmtNS
{
        
        [ServiceContract(SessionMode = SessionMode.Allowed)]
        public interface ITskMgmtservice
        {
            [OperationContract]
            List<organization> json_readWorkFlow();

            [OperationContract]
            void RecTree(organization node, DataTable dt);

            [OperationContract]
            dynamic json_saveNewTask(dynamic pars);

            [OperationContract]
            dynamic json_getOfficeUsers(dynamic pars);

            [OperationContract]
            dynamic json_saveUserSequence(dynamic pars);

            [OperationContract]
            dynamic json_getTaskAssignedUsers(dynamic pars);

            [OperationContract]
            dynamic json_updateTaskProgress(dynamic pars, int curPersonID);

            [OperationContract]
            dynamic json_saveNewTaskStat(dynamic pars, int curPersonID);

            [OperationContract]
            dynamic json_finalizeTaskPerson(dynamic pars, int curPersonID);

            [OperationContract]
            object getTaskInfo(int task_id);

            [OperationContract]
            IEnumerable<TskMgmtSrv.Models.task_person> getCurTaskPerson(int task_id, int person_id);

            [OperationContract]
            IEnumerable<dynamic> getCurUserTimeTrackerHistory(int task_id, int person_id);

            [OperationContract]
            string getTaskPersontimerStat(int task_id, int person_id);

            [OperationContract]
            IEnumerable<object> getTaskAssignedUsers(int task_id);

            [OperationContract]
            IEnumerable<object> getExistingOffices();

            [OperationContract]
            IEnumerable<object> getExistingOfficeUsers(int org_id);

            [OperationContract]
            IEnumerable<object> getUserCurrentTasks(int person_id);
           
        }

        [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerSession)]
        //[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)] //IIS Host
        public class TskMgmtservice : ITskMgmtservice
        {
            readonly string connString = "server=s06.winhost.com;uid=DB_40114_codeclub_user;pwd=p0$31d0n;database=DB_40114_codeclub";

            //build Organizations Hierarchy tree
            public List<organization> json_readWorkFlow()
            {
                sqlServer db = new sqlServer(connString);
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
                            logo = "/jsplugins/workflow/images/" + dt.Rows[i][6].ToString(),

                            children = new List<organization>(),
                            //assignedUsers = this.getTaskAssignedUsers(Convert.ToUInt16(dt.Rows[i][0]))
                        };
                        tree.Add(node);
                    }
                }

                for (int j = 0; j < tree.Count; j++)
                    this.RecTree(tree[j], dt);

                return tree;

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
                            logo = "/jsplugins/workflow/images/" + dt.Rows[j][6].ToString(),

                            children = new List<organization>(),
                            //assignedUsers = this.getTaskAssignedUsers(Convert.ToUInt16(dt.Rows[j][0]))
                        };
                        node.children.Add(_node);
                    }
                }
                for (int j = 0; j < node.children.Count; j++)
                    RecTree(node.children[j], dt);
            }

            
            public dynamic json_saveNewTask(dynamic pars)
            {
                string task_title = pars["Task_title"];
                string task_description = pars["Task_description"];
                string task_deadline = pars["task_deadline"];
                string filenames = pars["filenames"];


                using (TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities())
                {
                    TskMgmtSrv.Models.task newTask = new TskMgmtSrv.Models.task()
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


                return new { result = "done" };
            }

            public dynamic json_getOfficeUsers(dynamic pars)
            {
                int org_id = Convert.ToInt32(pars["org_id"]);

                return new { result = this.getExistingOfficeUsers(org_id) };

            }

            public dynamic json_saveUserSequence(dynamic pars)
            {
                int task_id = Convert.ToInt32(pars["task_id"]);
                string[] person_ids = pars["taskUsersSequence"].Split(',');


                using (TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities())
                {
                    foreach (var item in person_ids)
                    {
                        TskMgmtSrv.Models.task_person tp = new TskMgmtSrv.Models.task_person()
                        {
                            task_id = task_id,
                            person_id = Convert.ToInt32(item),
                            user_task_status_id = 1 /*Not Started*/
                        };
                        ctx.task_person.AddObject(tp);
                        ctx.SaveChanges();
                    }
                }

                return new { result = "done" };
            }

            public dynamic json_getTaskAssignedUsers(dynamic pars)
            {
                int task_id = Convert.ToInt32(pars["task_id"]);

                return new { result = this.getTaskAssignedUsers(task_id) };

            }

            //update timer
            public dynamic json_updateTaskProgress(dynamic pars,int curPersonID)
            {
                int task_id = Convert.ToInt32(pars["task_id"]);

                int person_id = Convert.ToInt32(curPersonID);

                int task_person_id = this.getCurTaskPerson(task_id, person_id).First().task_person_id;

                using (TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities())
                {

                    var cur_task_person =
                    (
                         from tp in ctx.task_person
                         where tp.task_person_id == task_person_id
                         select tp
                    ).First();


                    /* First check if there is any open timer then update end_timestamp else create new with open end_timestamp */
                    var q =
                    (
                        from tpt in ctx.tp_timer
                        where
                            tpt.task_person.task_person_id == task_person_id
                            && tpt.task_person.user_task_status_id != 3/*Not Finalized*/
                            && tpt.end_stamp == null /*open timer*/
                        select tpt
                    );
                    if (q.Count() != 0)
                    {
                        q.First().end_stamp = DateTime.Now;
                        q.First().is_commited = true;
                        q.First().task_person.user_task_status_id = 2 /*Progressing*/;
                        ctx.SaveChanges();

                    }
                    else
                    {
                        var newTimer = new TskMgmtSrv.Models.tp_timer()
                        {
                            t_p_id = task_person_id,
                            start_stamp = DateTime.Now,
                            end_stamp = null,
                            is_commited = false
                        };

                        ctx.tp_timer.AddObject(newTimer);
                        ctx.SaveChanges();

                    }
                }

                //return back current timer status after operation
                return new { result = this.getTaskPersontimerStat(task_id, person_id) };
            }

            //Adds new descriptive content for specific task person
            public dynamic json_saveNewTaskStat(dynamic pars,int curPersonID)
            {
                
                int task_id = Convert.ToInt32(pars["task_id"]);
                string description = pars["description"];

                int person_id = curPersonID;

                int task_person_id = this.getCurTaskPerson(task_id, person_id).First().task_person_id;

                using (TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities())
                {
                    var newTaskProgress = new TskMgmtSrv.Models.tp_progress()
                    {
                        t_p_id = task_person_id,
                        description = description,
                        datetime = DateTime.Now
                    };

                    ctx.tp_progress.AddObject(newTaskProgress);
                    ctx.SaveChanges();
                }

                return new { result = "done" };
            }

            //if tjhere is any open timer close it . and finalu task_person obect goes to finalize stat
            public dynamic json_finalizeTaskPerson(dynamic pars,int curPersonID)
            {
                int task_id = Convert.ToInt32(pars["task_id"]);
                int person_id = Convert.ToInt32(curPersonID);

                using (TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities())
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
                        var open_time_task_person = (
                            from tpt in ctx.tp_timer
                            where
                                tpt.task_person.task_person_id == cur_task_person.task_person_id
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

                return new { result = "done" };
            }

            //***********************************************************************************************
            //***************************************Data Sources********************************************
            //***********************************************************************************************

            public object getTaskInfo(int task_id)
            {
                TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities();

                var Q =
                (
                    from t in ctx.task

                    where t.task_id == task_id
                    select t

                );
                return Q.First();
            }
            //check wheter or not the current use has turn in this specific task
            public IEnumerable<TskMgmtSrv.Models.task_person> getCurTaskPerson(int task_id, int person_id)
            {
                TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities();

                var Q =
                (
                    from tp in ctx.task_person

                    where tp.task_id == task_id
                            && tp.person_id == person_id
                            && tp.user_task_status_id != 3 /*NOT (finalized)*/
                    orderby tp.task_person_id ascending
                    select tp
                );
                return Q;
            }

            //get list of specific task progress history
            public IEnumerable<dynamic> getCurUserTimeTrackerHistory(int task_id, int person_id)
            {
                TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities();

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
                using (TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities())
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
                TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities();

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
                TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities();

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
                TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities();

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
                TskMgmtSrv.Models.prjEntities ctx = new TskMgmtSrv.Models.prjEntities();

                var Q =
                (
                    from t in ctx.task
                    where t.is_active == true //&& tp.person_id == person_id
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

            
        }

        public class sqlServer
        {
            private SqlConnection conn;
            private string connstring;

            public sqlServer(string connStr)
            {
                this.connstring = connStr;
            }

            public SqlConnection sqlconnection
            {
                get { return this.conn; }
                set { this.conn = value; }
            }
            public DataSet fetch(string query)
            {
                using (this.sqlconnection = new SqlConnection(this.connstring))
                {
                    this.sqlconnection.Open();
                    //SqlTransaction trans = this.conn.BeginTransaction();
                    try
                    {
                        SqlDataAdapter da = new SqlDataAdapter(query, this.conn);
                        DataSet ds = new DataSet();
                        da.Fill(ds);
                        //trans.Commit();
                        conn.Close();
                        return ds;
                    }
                    catch (Exception ex)
                    {
                        try
                        {
                            if (this.sqlconnection.State != ConnectionState.Open)
                                throw new Exception("Connection Is Not Open" + ex.Message);
                            //else
                            //trans.Rollback();
                        }
                        catch (Exception ex1)
                        {
                            throw new Exception("Connection Is Not Open" + ex1.Message);
                        }
                        return (DataSet)null;
                    }
                    finally
                    {
                        if (this.sqlconnection.State != ConnectionState.Open)
                            this.conn.Close();
                    }
                }
            }

            public void exec(string query)
            {
                using (this.sqlconnection = new SqlConnection(this.connstring))
                {
                    this.sqlconnection.Open();
                    try
                    {
                        SqlCommand comm = new SqlCommand(query, this.conn);
                        comm.ExecuteNonQuery();
                        conn.Close();

                    }
                    catch (Exception ex)
                    {
                        try
                        {
                            if (this.sqlconnection.State != ConnectionState.Open)
                                throw new Exception("Connection Is Not Open" + ex.Message);
                            //else
                            //trans.Rollback();
                        }
                        catch (Exception ex1)
                        {
                            throw new Exception("Connection Is Not Open" + ex1.Message);
                        }

                    }
                    finally
                    {
                        if (this.sqlconnection.State != ConnectionState.Open)
                            this.conn.Close();
                    }
                }
            }

        }
    [DataContract(Namespace = "http://domain/Data")]
        public class organization
        {
        [DataMember]
            public string org_id { get; set; }
        [DataMember]
            public string org_name { get; set; }
        [DataMember]
            public string parent_org_id { get; set; }
        [DataMember]
            public string street { get; set; }
        [DataMember]
            public string city { get; set; }
        [DataMember]
            public string postalcode { get; set; }
        [DataMember]
            public string logo { get; set; }
        [DataMember]
            public List<organization> children;
        
            public IEnumerable<object> assignedUsers;

            public static IEnumerable<organization> toJson(DataTable dt)
            {
                List<organization> data = new List<organization> { };
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    data.Add(
                        new organization()
                        {
                            org_id = dt.Rows[i][0].ToString(),
                            parent_org_id = dt.Rows[i][1].ToString(),
                            org_name = dt.Rows[i][2].ToString()
                        });
                }
                return data;
            }
            public static organization getOrgDetails(string org_id)
            {
                sqlServer db = new sqlServer("");
                DataTable dt = db.fetch("select * from organization where org_id=" + org_id).Tables[0];

                organization data = new organization();
                data =
                        new organization()
                        {
                            org_id = dt.Rows[0][0].ToString(),
                            parent_org_id = dt.Rows[0][1].ToString(),
                            org_name = dt.Rows[0][2].ToString(),
                            street = dt.Rows[0][3].ToString(),
                            city = dt.Rows[0][4].ToString(),
                            postalcode = dt.Rows[0][5].ToString()
                        };
                return data;
            }
        }


    
}
