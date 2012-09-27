using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;


using Console_DP.AdapterDP;
using Console_DP.AdapterDP.implementations;

namespace Console_DP.Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void FirstTest()
        {
            var _component = new component<Iadapter>();
            Iadapter ada = _component.passAdapter();

            Assert.IsInstanceOfType(ada, typeof(adapterImplementationV2));
        }
    }
}
