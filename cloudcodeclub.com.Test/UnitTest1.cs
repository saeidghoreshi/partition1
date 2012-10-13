using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using MvcApplication1;
using MvcApplication1.Controllers;
using System.Web.Mvc;

namespace cloudcodeclub.com.Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            HomeController home = new HomeController();

            ViewResult r = home.Index() as ViewResult;
            if (r.ViewData["xxx"] == "") { }
        }
    }
}
