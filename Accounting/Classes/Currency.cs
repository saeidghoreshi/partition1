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
        public currencyOperationStatus createNewCurrency(string CurrencyName, int currencyTypeID)
        {
            try
            {
                using (var ctx = new AccContext())
                {
                    var result = ctx.currency.FirstOrDefault(x => x.name == CurrencyName && x.currencyType.ID == currencyTypeID);
                    if (result != null)
                        return currencyOperationStatus.Duplicated;
                    else
                    {
                        var newCur = new Models.currency
                        {
                            currencyTypeID = currencyTypeID,
                            name = CurrencyName
                        };
                        ctx.currency.AddObject(newCur);
                        ctx.SaveChanges();
                    }
                    return currencyOperationStatus.Approved;
                }
            }
            catch (CurrencyException ex)
            {
                Console.WriteLine(ex.Message);
                return currencyOperationStatus.NotApproved;
            }
            
        }

        
    }
}
