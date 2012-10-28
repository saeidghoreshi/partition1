using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting.Models;

namespace Accounting.Classes
{
    public class Controller:IController
    {
        public ControllerOperationStatus SetupGLTypes()
        {
            using (var ctx = new AccContext())
            {

                var allgltypes = ctx.GLType.ToList();
                foreach (var item in allgltypes)
                    ctx.GLType.DeleteObject(item);

                foreach (var type in Enum.GetNames(typeof(GLTYPE)))
                {
                    var newone = new GLType()
                    {
                        ID = (int)Enum.Parse(typeof(GLTYPE), type),
                        name = type
                    };
                    ctx.GLType.AddObject(newone);
                }
                ctx.SaveChanges();

                return ControllerOperationStatus.Approved;
            }
        }

        public ControllerOperationStatus SetupCurrencyTypes()
        {
            using (var ctx = new AccContext())
            {
                var allCurrencies= ctx.CurrencyType.ToList();
                foreach (var item in allCurrencies)
                    ctx.CurrencyType.DeleteObject(item);

                foreach (var type in Enum.GetNames(typeof(currencyType)))
                {
                    var newone = new Models.CurrencyType()
                    {
                        ID = (int)Enum.Parse(typeof(currencyType), type),
                        name = type
                    };
                    ctx.CurrencyType.AddObject(newone);
                }
                ctx.SaveChanges();

                return ControllerOperationStatus.Approved;
            }
        }

        public ControllerOperationStatus SetupCategories()
        {
            using (var ctx = new AccContext())
            {
                var allCategories = ctx.CategoryType.ToList();
                foreach (var item in allCategories
                    )
                    ctx.CategoryType.DeleteObject(item);

                foreach (var type in Enum.GetNames(typeof(CATEGORYTYPE)))
                {
                    var newone = new Models.CategoryType()
                    {
                        ID = (int)Enum.Parse(typeof(CATEGORYTYPE), type),
                        name = type
                    };
                    ctx.CategoryType.AddObject(newone);
                }
                ctx.SaveChanges();

                return ControllerOperationStatus.Approved;
            }
        }
    }
}
