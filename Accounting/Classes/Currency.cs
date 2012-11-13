using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting.Models;
using Accounting.Classes.Enums;

namespace Accounting.Classes
{
    public class Currency 
    {
        public Models.currency create(string CurrencyName, int currencyTypeID)
        {
                using (var ctx = new AccContext())
                {
                    var newCur = new Models.currency
                    {
                        currencyTypeID = currencyTypeID,
                        name = CurrencyName
                    };
                    var result = ctx.currency.FirstOrDefault(x => x.name == CurrencyName && x.currencyType.ID == currencyTypeID);
                    if (result != null)
                        throw new Exception("Currency Duplicated");
                    else
                    {   
                        ctx.currency.AddObject(newCur);
                        ctx.SaveChanges();
                    }
                    return newCur;
                }
           
        }

        
    }
}
