using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting.Models;
using Accounting.Classes.Enums;

namespace Accounting.Classes
{
    public class Controller
    {
        public static void SetupAccountTypes()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var allgltypes = ctx.glType.ToList();
                foreach (var item in allgltypes)
                    ctx.glType.DeleteObject(item);
                var allcattypes = ctx.categoryType.ToList();
                foreach (var item in allcattypes)
                    ctx.categoryType.DeleteObject(item);

                //Add fresh lookup values for GL
                var newglType = new glType()
                {
                    ID = ASSET.Value,
                    name = "ASSET"
                };
                ctx.glType.AddObject(newglType);
                newglType = new glType()
                {
                    ID = LIB.Value,
                    name = "LIB"
                };
                ctx.glType.AddObject(newglType);
                newglType = new glType()
                {
                    ID = OE.Value,
                    name = "OE"
                };
                ctx.glType.AddObject(newglType);
                ctx.SaveChanges();

                foreach (var item in AssetCategories.list)
                {
                    //add its Categories
                    var newCatType = new categoryType()
                    {
                        ID = item.Key,
                        name = item.Value,
                        glTypeID = ASSET.Value
                    };
                    ctx.categoryType.AddObject(newCatType);
                }
                foreach (var item in OECategories.list)
                {
                    //add its Categories
                    var newCatType = new categoryType()
                    {
                        ID = item.Key,
                        name = item.Value,
                        glTypeID = OE.Value
                    };
                    ctx.categoryType.AddObject(newCatType);
                }
                foreach (var item in LibCategories.list)
                {
                    //add its categories
                    var newCatType = new categoryType()
                    {
                        ID = item.Key,
                        name = item.Value,
                        glTypeID=LIB.Value
                    };
                    ctx.categoryType.AddObject(newCatType);
                }
                ctx.SaveChanges();

            }
        }
        public static void SetupEntityTypes()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.entityType.ToList();
                foreach (var item in alltypes)
                    ctx.entityType.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.entityType)))
                {
                    //add its Categories
                    var newEntityType = new Models.entityType()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.entityType), item),
                       name=item
                    };
                    ctx.entityType.AddObject(newEntityType);
                }
                
                ctx.SaveChanges();

            }
        }
        public static void SetupOfficeTypes()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.officeType.ToList();
                foreach (var item in alltypes)
                    ctx.officeType.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.officeType)))
                {
                    //add its Categories
                    var newType = new Models.officeType()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.officeType), item),
                        name = item
                    };
                    ctx.officeType.AddObject(newType);
                }

                ctx.SaveChanges();

            }
        }
        public static void SetupUserTypes()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.userType.ToList();
                foreach (var item in alltypes)
                    ctx.userType.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.userType)))
                {
                    //add its Categories
                    var newType = new Models.userType()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.userType), item),
                        name = item
                    };
                    ctx.userType.AddObject(newType);
                }

                ctx.SaveChanges();

            }
        }
        public static void SetupSysUserTypes()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.sysUserType.ToList();
                foreach (var item in alltypes)
                    ctx.sysUserType.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.sysUserType)))
                {
                    //add its Categories
                    var newType = new Models.sysUserType()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.sysUserType), item),
                        name = item
                    };
                    ctx.sysUserType.AddObject(newType);
                }

                ctx.SaveChanges();

            }
        }
        public static void SetupPaymentTypes()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.paymentType.ToList();
                foreach (var item in alltypes)
                    ctx.paymentType.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.paymentType)))
                {
                    //add its Categories
                    var newType = new Models.paymentType()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.paymentType), item),
                        name = item
                    };
                    ctx.paymentType.AddObject(newType);
                }

                ctx.SaveChanges();

            }
        }
        public static void SetupExtPaymentTypes()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.extPaymentType.ToList();
                foreach (var item in alltypes)
                    ctx.extPaymentType.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.extPaymentType)))
                {
                    //add its Categories
                    var newType = new Models.extPaymentType()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.extPaymentType), item),
                        name = item
                    };
                    ctx.extPaymentType.AddObject(newType);
                }

                ctx.SaveChanges();

            }
        }
        public static void SetupccCardTypes()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.ccCardType.ToList();
                foreach (var item in alltypes)
                    ctx.ccCardType.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.ccCardType)))
                {
                    //add its Categories
                    var newType = new Models.ccCardType()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.ccCardType), item),
                        name = item
                    };
                    ctx.ccCardType.AddObject(newType);
                }

                ctx.SaveChanges();

            }
        }
        public static void SetupCardTypes()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.cardType.ToList();
                foreach (var item in alltypes)
                    ctx.cardType.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.cardType)))
                {
                    //add its Categories
                    var newType = new Models.cardType()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.cardType), item),
                        name = item
                    };
                    ctx.cardType.AddObject(newType);
                }

                ctx.SaveChanges();

            }
        }
        public static void SetupInvoiceStat()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.invoiceStat.ToList();
                foreach (var item in alltypes)
                    ctx.invoiceStat.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.invoiceStat)))
                {
                    //add its Categories
                    var newType = new Models.invoiceStat()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.invoiceStat), item),
                        name = item
                    };
                    ctx.invoiceStat.AddObject(newType);
                }

                ctx.SaveChanges();

            }
        }
        public static void SetupCurrencyType()
        {
            using (var ctx = new AccContext())
            {
                //reset DB table
                var alltypes = ctx.currencyType.ToList();
                foreach (var item in alltypes)
                    ctx.currencyType.DeleteObject(item);

                //Add fresh lookup values
                foreach (var item in Enum.GetNames(typeof(Enums.currencyType)))
                {
                    //add its Categories
                    var newType = new Models.currencyType()
                    {
                        ID = (int)Enum.Parse(typeof(Enums.currencyType), item),
                        name = item
                    };
                    ctx.currencyType.AddObject(newType);
                }

                ctx.SaveChanges();

            }
        }

    }
}
