using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;

using newWCFService;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace WinServiceHost
{
    /*
     *add references
     *add installer and channge it yo local system
     *change dir to debug in comman prompt
     *installutil   xxx.dll file
     *services.msc  and run
     *check mex
     */
    public partial class winserviceHost : ServiceBase
    {
        ServiceHost host = new ServiceHost(typeof(HelloService));

        public winserviceHost()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            host.Open();
        }

        protected override void OnStop()
        {
            host.Close();
        }
    }
}
