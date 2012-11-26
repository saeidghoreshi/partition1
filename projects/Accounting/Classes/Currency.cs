using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;
using Accounting.Models;
using accounting.classes.enums;

namespace accounting.classes
{
    public class Currency 
    {
        public int currencyID;
        public readonly int CURRENCYTYPEID;

        public void create(string CurrencyName, int currencyTypeID)
        {
                using (var ctx = new AccContext())
                {
                    var newCur = new Accounting.Models.currency
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

                        this.currencyID = newCur.ID;
                    }
                }
           
        }

        
    }
}
