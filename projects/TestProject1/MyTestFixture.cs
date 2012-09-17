using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;



//ADD PROJECT CONTAINING MODELS
using ModelsProject.Models;

//USE OF NUNIT
//using NUnit.Framework;

//USE OF MS EMBEDDED TESTUNIT
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Diagnostics;




namespace consoleApplicationTest.Test
{
    [TestClass]
    public class MyTestFixture
    {
        [TestMethod()]
        public void myFirstTest1()
        {
            Assert.IsTrue(true, "Is true");
        }
        
        [TestMethod()]
        public void myFirstTest2()
        {
            //var x = new MvcApplication1.Controllers.PermissionController();
            using (context x = new context())
            {
                var m1 = x.test.ToList().Take(2);
                Assert.AreEqual(2, m1.Count(), m1.Count().ToString());
                foreach (var item in m1)
                {
                    Debug.WriteLine(item.id + " " + item.name);
                    Debug.WriteLine("\tReviews\t");
                    item.testreview.Load();
                    foreach (var subitem in item.testreview)
                        Debug.WriteLine(subitem.id + " " + subitem.rate);
                }
                    
    
            }
            
        }
        

    }

}
