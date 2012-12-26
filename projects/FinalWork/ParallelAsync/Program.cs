using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace ParallelAsync
{
    public static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        public static paralleAsync mainform ;

        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            mainform = new paralleAsync();
            Application.Run(mainform);
        }
    }
}
