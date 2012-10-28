using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;
using Accounting.Models;

namespace Accounting.Classes
{
    public class Currency : ICurrency
    {
        public void createNewCurrency(string CurrencyName, int currencyType)
        {
            try
            {
                using (var ctx = new AccContext())
                {
                    var newCur = new Models.Currency
                    {
                        type_id = currencyType,
                        name = CurrencyName
                    };
                    var result = ctx.Currency.FirstOrDefault(x => x.name == CurrencyName);
                    if (result == null)
                    {
                        ctx.Currency.AddObject(newCur);
                        ctx.SaveChanges();
                    }
                    else
                        throw new CurrencyException("Currency is duplicated");
                }
            }
            catch(CurrencyException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void setStatus(currencyStatus status)
        {
            throw new NotImplementedException();
        }

        
    }
}
