using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Models;
using accounting.classes.bank;

namespace accounting.classes.bank
{
    public class Bank:Entity
    {
        public int bankID;
        public string name;
        /// <summary>
        /// create new bank w/ optioanl addressing
        /// </summary>
        /// <param name="name"></param>
        /// <param name="address"></param>
        public void createNew(string name,Address address=null) 
        {
            using(var ctx=new AccContext())
            {
                
            }
        }
        /// <summary>
        /// check if this card is not assigned to any other banks will register to this bank
        /// </summary>
        /// <param name="cardID"></param>
        public void registerCard(int cardID) 
        {
        
        }
        /// <summary>
        /// set or replace fee for anycardtype assignr to the bank
        /// </summary>
        /// <param name="cardType"></param>
        /// <param name="feeID"></param>
        public void setFeeNCardType(int cardType,int feeID) 
        {
        
        }

        /// <summary>
        /// assign a branch to the bank
        /// </summary>
        /// <param name="entityID"></param>
        public void createBranch(bankBranch branch) 
        {
        
        }

        /// <summary>
        /// load the bank class params from DB by bankID
        /// </summary>
        /// <param name="bankID"></param>
        private void loadBankByBankID(int bankID)
        {
            using (var ctx = new AccContext())
            {
                var _bank = ctx.bank
                    .Where(x => x.ID == bankID).SingleOrDefault();
                if (_bank == null)
                    throw new Exception("bank has not found");

                this.bankID = _bank.ID;
                this.name = _bank.name;
            }
        }
    }
}
