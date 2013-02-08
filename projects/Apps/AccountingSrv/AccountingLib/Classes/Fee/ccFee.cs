using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AccountingLib.Models;

namespace accounting.classes
{
    public class ccFee
    {
        public int ccfeeID;
        public int bankID;
        public int ccCardTypeID;
        public decimal amount;
        public string deacription;

        public void createNew(int bankID, decimal amount, string description, int ccCardTypeID)
        {
            using (var ctx = new AccountingLib.Models.AccContexts())
            {
                var existingFee = ctx.ccFee
                    .Where(x => x.ccCardTypeID == ccCardTypeID && x.bankID == bankID).SingleOrDefault();

                if (existingFee != null)
                {
                    ctx.ccFee.DeleteObject(existingFee);
                    ctx.SaveChanges();
                }

                var _ccFee = new AccountingLib.Models.ccFee()
                {
                    bankID = (int)bankID,
                    ccCardTypeID = (int)ccCardTypeID,
                    amount = (decimal)amount,
                    description = description
                };
                ctx.ccFee.AddObject(_ccFee);
                ctx.SaveChanges();

                /*Reload Object*/
                this.loadFeeByID(_ccFee.ID);
            }
        }

        public void loadFeeByID(int ccfeeID)
        {
            using (var ctx = new AccContexts())
            {
                var _fee = ctx.ccFee
                    .Where(x => x.ID == ccfeeID)
                    .SingleOrDefault();

                if (_fee == null)
                    throw new Exception("no such a CCFee Exists");

                this.ccfeeID = _fee.ID;
                this.bankID = (int)_fee.bankID;
                this.ccCardTypeID = (int)_fee.ccCardTypeID;
                this.amount = (decimal)_fee.amount;
                this.deacription = _fee.description;
            }
        }
        public void loadccFeeByBankCardTypeID(int ccCardTypeID, int bankID)
        {
            using (var ctx = new AccContexts())
            {
                var ccfee = ctx.ccFee.Where(x => (int)x.ccCardTypeID == ccCardTypeID && x.bankID == bankID)
                        .SingleOrDefault();

                if (ccfee == null)
                    throw new Exception("CC fee does not Exists [loadccFeeByBankCardTypeID]");

                this.loadFeeByID(ccfee.ID);
            }
        }
    }
}
