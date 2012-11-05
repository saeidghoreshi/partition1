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
        protected int ID;
        protected int entityTypeID;
        protected Models.entity createEntity()
        {
            using (var ctx = new AccContext())
            {
                var newEntity = new Models.entity()
                {
                    entityTypeID = (int)Enums.entityType.Person
                };
                ctx.entity.AddObject(newEntity);
                ctx.SaveChanges();

                return newEntity;
            }
        }
    }
}
