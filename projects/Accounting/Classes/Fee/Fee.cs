using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Accounting.Models;

namespace accounting.classes
{
    public class Fee
    {
        public int feeID;
        public int bankID;
        public int cardTypeID;
        public decimal amount;
        public string deacription;

        public void createNew(int bankID,decimal amount,string description, int cardTypeID)
        {
            using(var ctx=new Accounting.Models.AccContexts())
            {
                var existingFee = ctx.fee
                    .Where(x => x.cardTypeID == cardTypeID && x.bankID == bankID).SingleOrDefault();

                if (existingFee != null)
                {
                    ctx.fee.DeleteObject(existingFee);
                    ctx.SaveChanges();
                }
                
                var _fee=new Accounting.Models.fee()
                {
                    bankID=(int)bankID,
                    amount=(decimal)amount,
                    description=description,
                    cardTypeID=(int)cardTypeID
                };

                ctx.fee.AddObject(_fee);
                ctx.SaveChanges();

                /*Reload Object*/
                this.loadFeeByID(_fee.ID);
            }
        }

        public void loadFeeByID(int feeID)
        {
            using (var ctx = new AccContexts())
            {   
                var _fee = ctx.fee
                    .Where(x => x.ID == feeID)
                    .SingleOrDefault();

                if (_fee == null)
                    throw new Exception("no such a Fee Exists");

                this.feeID = _fee.ID;
                this.bankID = (int)_fee.bankID;
                this.cardTypeID = (int)_fee.cardTypeID;
                this.amount = (decimal)_fee.amount;
                this.deacription = _fee.description;
            }
        }
        public void loadFeeByBankCardTypeID(int cardTypeID, int bankID)
        {
            using (var ctx = new AccContexts())
            {
                var fee = ctx.fee.Where(x => (int)x.cardTypeID == cardTypeID && x.bankID == bankID)
                        .SingleOrDefault();

                if (fee == null)
                    throw new Exception("fee does not Exists [load fee by CardTypeID]");

                this.loadFeeByID(fee.ID);
            }
        }
    }
}
