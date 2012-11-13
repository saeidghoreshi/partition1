using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting;
using Accounting.Models;

namespace Accounting.Classes
{
    public abstract class Entity
    {
        private int entityID;
        public int ENTITYID { get { return entityID; } }

        protected Models.entity create()
        {
            using (var ctx = new AccContext())
            {
                var newEntity = new Models.entity(){};
                ctx.entity.AddObject(newEntity);
                ctx.SaveChanges();

                fieldsMapping(newEntity);
                return newEntity;
            }
        }
        private void fieldsMapping(Models.entity e) 
        {
            this.entityID = e.ID;
        }

    }
}
