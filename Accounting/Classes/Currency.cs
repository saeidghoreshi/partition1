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
        public void createNewCurrency(string CurrencyName, currencyType currencyType)
        {
            using(var ctx=new AccContext())
            {
                var newCur=new Models.Currency
                {
                    type=currencyType,
                    name=CurrencyName
                };
                ctx.Currency.AddObject(newCur);
                ctx.SaveChanges();
            }
        }

        public void setStatus(currencyStatus status)
        {
            throw new NotImplementedException();
        }
    }
}
