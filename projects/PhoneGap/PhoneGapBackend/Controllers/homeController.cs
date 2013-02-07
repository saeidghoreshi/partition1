using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PhoneGapBackend.Controllers
{
    public class homeController : Controller
    {

        public string Index()
        {
            return "";
        }
        public string upload()
        {

            var file = Request.Files["data"];

            //IE messup file.FileName then use your own >> [to cover all browser code like this]
            //var nameSections = file.FileName.Split(new char[] { '\\' });
            file.SaveAs(Server.MapPath("../uploads/") + file.FileName);
            return file.FileName;
            
        }
    }
}
