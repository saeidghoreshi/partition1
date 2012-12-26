using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Threading;
using ParallelAsync;

namespace ParallelDesignPattern.OtherPatterns
{
    public static class OtherPatterns1
    {   
        static int result = 0;
        //this approach can be used to enhance UI responsiveness
        public static void Sample1() 
        {
            Program.mainform.Controls["lbl_ConcurrencyResult"].Text = (++result).ToString();
            Task<int> T = Task.Factory.StartNew(() =>//branch off thread
            {
                Thread.Sleep(2000);
                return 1000;
            });
            //Update UI
            //T2 is the main GUI Thread
            Task T2 = T.ContinueWith(t =>
            {
                Program.mainform.Controls["lbl_ConcurrencyResult"].Text = (--result).ToString();
                MessageBox.Show(t.Result.ToString());
            }, TaskScheduler.FromCurrentSynchronizationContext());

        }

        //Solution 2
        public static void Sample2()//blocking main thread by using wait because using shared variables in race condition situation
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

                Program.mainform.Controls["lbl_ConcurrencyResult"].Text = CalResult1 + " - " + CalResult2;
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
        public static void Sample3()
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

            Program.mainform.Controls["lbl_ConcurrencyResult"].Text = t_Calculate1.Result + " - " + t_Calculate2.Result;

        }


        //*********************************************************************************************************
        //*************************************************PATTERNS************************************************
        //*********************************************************************************************************

        //Pattern 1
        public static void Sample4()
        {
            Task T1 = Task.Factory.StartNew(() => { });
            Task T2 = Task.Factory.StartNew(() => { });

            Task[] tasks = new Task[] { T2, T1 };
            Task.WaitAll(tasks);

            //OR

            int index = Task.WaitAny(tasks);
            Task T = tasks[index];
        }


        //Pattern 2  waitallonebyone
        public static IEnumerable<Guid> Sample5()
        {
            /*
             use in the case that some Task fails but does not matter
             */
            List<Task<Guid>> tasks = new List<Task<Guid>> { };

            for (int i = 0; i < 5; i++)
                tasks.Add(Task.Factory.StartNew<Guid>(() => { return Guid.NewGuid(); }));
            for (int i = 0; i < 2; i++)
                tasks.Add(Task.Factory.StartNew<Guid>(() => { throw new ApplicationException("fucked Series 1"); }));
            for (int i = 0; i < 5; i++)
                tasks.Add(Task.Factory.StartNew<Guid>(() => { return Guid.NewGuid(); }));
            for (int i = 0; i < 2; i++)
                tasks.Add(Task.Factory.StartNew<Guid>(() => { throw new ApplicationException("fucked Series 2"); }));

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
        
    }
}
