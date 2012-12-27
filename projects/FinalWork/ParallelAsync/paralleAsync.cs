using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Threading.Tasks;
using System.Threading;

namespace ParallelAsync
{
    public partial class paralleAsync : Form
    {
        public paralleAsync()
        {
            InitializeComponent();
        }

        private void btn_testConcurrency_Click(object sender, EventArgs e)
        {
            
            /*RaceConditionConcurrency Options*/
            //1
            //RaceConditionConcurrency.Syncronization.Lock.Run();
            //2
            //RaceConditionConcurrency.LockFree.Run();


            /*Parallel Design Pattern*/
            /*using Map Reduce*/
            cts = new CancellationTokenSource();
            CancellationToken ct = cts.Token;
            ParallelDesignPattern.DesignPatterns1.mapReduce(ct);
        }
        public CancellationTokenSource cts = new CancellationTokenSource();
        private void btn_cancelmp_Click(object sender, EventArgs e)
        {
            //possible to cancel task connected with the token by calling CTS.Cancel
            cts.Cancel();
            //in this case all tasks will be cancelled not all
            //in this scenario all tasks will be cancelled but can change it to make only one be canceled
            
            Program.mainform.Controls["lbl_ConcurrencyResult"].Text = "Task Cancelled";
            
        }

    }
}
