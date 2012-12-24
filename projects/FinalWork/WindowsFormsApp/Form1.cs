using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

using System.Threading;
using System.Threading.Tasks;

namespace WindowsFormsApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //solution1();
            //solution2();
            //solution3();

            MessageBox.Show(Pattern2().ToList().Count.ToString()); 
        }
        int result = 0;
        void solution1() //this approach can be used to enhance UI responsiveness
        {
            label1.Text = (++result).ToString();
            Task<int> T = Task.Factory.StartNew(() =>//branch off thread
            {
                Thread.Sleep(2000);
                return 1000;
            });
            //Update UI
            //T2 is the main GUI Thread
            Task T2 = T.ContinueWith(t =>
            {
                label1.Text = (--result).ToString();
                MessageBox.Show(t.Result.ToString());
            }, TaskScheduler.FromCurrentSynchronizationContext());
            
        }

        //Solution 2
        void solution2()//blocking main thread by using wait because using shared variables in race condition situation
        {
            try
            {
                Task<int> t_error1 = Task.Factory.StartNew(() =>
                {
                    int x = 0;
                    var R = 10 / x;
                    return 1;
                });
                Task t_error2 = Task.Factory.StartNew(() => { var x = t_error1.Result; });
                Task t_error3 = Task.Factory.StartNew(() => { var x = t_error1.Result; });


                int CalResult1 = 0, CalResult2 = 0;
                Task t_Calculate1 = Task.Factory.StartNew(() =>
                {
                    Thread.Sleep(2000);
                    CalResult1 = 10;
                });
                Task t_Calculate2 = Task.Factory.StartNew(() =>
                {
                    t_Calculate1.Wait();
                    Thread.Sleep(3000);
                    CalResult2 = 20 / CalResult1;
                });


                //to make Exception handling works , """WAIT ALL""" needed [does not matter if using shared variable or result based pattern]
                Task.WaitAll(new Task[] { t_Calculate1, t_Calculate2, t_error1, t_error2, t_error3 });

                label1.Text = CalResult1 + " - " + CalResult2;
            }
            catch (AggregateException ae)
            {
                string total_Errors = string.Empty;
                ae = ae.Flatten();
                foreach (Exception ex in ae.InnerExceptions)
                    total_Errors += ex.Message + "\n";

                MessageBox.Show(total_Errors);

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        //Solution 3
        void solution3()
        {
            Task<double> t_Calculate1 = Task.Factory.StartNew(() =>
            {
                Thread.Sleep(3000);
                return 10.00d;
            });
            Task<double> t_Calculate2 = Task.Factory.StartNew(() =>
            {
                Thread.Sleep(1000);
                return 20.00 / t_Calculate1.Result;
            });

            label1.Text = t_Calculate1.Result + " - " + t_Calculate2.Result;

        }


        //*************************************************PATERNS*************************************************f
        //*********************************************************************************************************
        //*********************************************************************************************************
        //Pattern 1
        void Pattern1()
        {
            Task T1 = Task.Factory.StartNew(() =>{});
            Task T2 = Task.Factory.StartNew(() => { });

            Task[] tasks=new Task[]{T2,T1};
            Task.WaitAll(tasks);

            //OR

            int index=Task.WaitAny(tasks);
            Task T = tasks[index];
        }
        //Pattern 2  waitallonebyone


        //Not:L in case of using loop variable , need to be passed by valuye and be cloned otherwkise wiil be passed bu ref
        //Note : ++ is not atomic
        IEnumerable<Guid> Pattern2()
        {
            /*
             use in the case that some Task fails but does not matter
             */
            List<Task<Guid>> tasks = new List<Task<Guid>> { };

            for(int i=0;i<5;i++)
                tasks.Add(Task.Factory.StartNew<Guid>(() => { return Guid.NewGuid(); }));
            for (int i = 0; i < 2; i++)
                tasks.Add(Task.Factory.StartNew<Guid>(() => { throw new ApplicationException("fucked Series 1"); return Guid.NewGuid(); }));
            for (int i = 0; i < 5; i++)
                tasks.Add(Task.Factory.StartNew<Guid>(() => { return Guid.NewGuid(); }));
            for (int i = 0; i < 2; i++)
                tasks.Add(Task.Factory.StartNew<Guid>(() => { throw new ApplicationException("fucked Series 2"); return Guid.NewGuid(); }));

            while (tasks.Count > 0)
            {
                int index = Task.WaitAny(tasks.ToArray());   //So No exception will be cought
                Task<Guid> finished = tasks[index];
                //in the case that any result exception not matter
                if (finished.Exception == null)
                {
                    yield return finished.Result;
                }
                else
                    MessageBox.Show(finished.Exception.InnerException.Message); //catch Exception HERE


                tasks.RemoveAt(index); //or tasks=tasks.where(t=>t!=finished).toArray()

            }
        }
        //Pattern 3 many to one composition
        void Pattern3()
        {
            Task T1 = Task.Factory.StartNew(() => { });
            Task T2 = Task.Factory.StartNew(() => { });
            Task T3 = Task.Factory.StartNew(() => { });
            Task[] tasks = new Task[] { T1,T2,T3};

            Task.Factory.ContinueWhenAll(tasks,(args)=>{});
            //OR
            Task.Factory.ContinueWhenAny(tasks,(args)=>{});
        }
    }
}
