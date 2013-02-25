using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Themes
{
    /// <summary>
    /// Summary description for datasource1
    /// </summary>
    public class datasource1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string type= context.Request.QueryString["type"];
            string filename=string.Empty;

            if(type=="datagrid")
                filename="datagrid_data2.json";
            if(type=="treegrid")
                filename="treegrid.json";

            if (type == "chart1")
                filename = "jqw-chart.json";


            context.Response.ContentType = "text/plain";
            System.IO.StreamReader myFile =
            new System.IO.StreamReader(@"C:\projects\Partitions\partition1\projects\Apps\webcomponents\datasource\"+filename);
            string myString = myFile.ReadToEnd();
            myFile.Close();

            context.Response.Write(myString);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}