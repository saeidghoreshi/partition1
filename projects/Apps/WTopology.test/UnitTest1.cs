using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;


using System.Web.Mvc;
using WTopology;
using WTopology.Controllers;

namespace WTopology.test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            homeController hc = new homeController();
            ViewResult result = hc.createNew() as ViewResult;
            Assert.IsNotNull(result );
        }
    }
}
