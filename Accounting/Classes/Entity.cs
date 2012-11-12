using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting;
using Accounting.Models;

namespace Accounting.Classes
{
    public class Entity
    {
        protected Models.entity create()
        {
            using (var ctx = new AccContext())
            {
                var newEntity = new Models.entity(){};
                ctx.entity.AddObject(newEntity);
                ctx.SaveChanges();

                return newEntity;
            }
        }
    }
}
