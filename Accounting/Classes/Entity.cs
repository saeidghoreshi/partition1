using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting;
using Accounting.Models;

namespace accounting.classes
{
    public abstract class Entity
    {
        private int entityID;
        public int ENTITYID { get { return entityID; } }
        public List<Accounting.Models.card> cards;

        public void create()
        {
            using (var ctx = new AccContext())
            {
                var newEntity = new Accounting.Models.entity() { };
                ctx.entity.AddObject(newEntity);
                ctx.SaveChanges();

                this.entityID = newEntity.ID;
            }
        }
        
        public  void addCard(int cardID)
        {
            int entityID = (int)this.ENTITYID;

            using (var ctx = new AccContext())
            {
                var person = ctx.person.Where(x => x.entityID == entityID).SingleOrDefault();
                var newEntityCard = new Accounting.Models.entityCard()
                {
                    entityID = this.ENTITYID,
                    CardID = cardID
                };
                ctx.entityCard.AddObject(newEntityCard);
                ctx.SaveChanges();

            }
        }

    }
}
