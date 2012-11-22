﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Models;
using accounting.classes.bank;
using System.Transactions;

namespace accounting.classes.bank
{
    public class Bank:Entity
    {
        public readonly int ENTITYTYPEID=(int)enums.entityType.bank;
        public int bankID;
        public string bankName;

        /// <summary>
        /// create new bank w/ optioanl addressing
        /// </summary>
        /// <param name="name"></param>
        /// <param name="address"></param>
        public void createNew(string name,Address address=null) 
        {
            using(var ctx=new AccContext())
            {
                base.createNew((int)enums.entityType.bank);

                var _newBank = new Accounting.Models.bank() 
                {
                    name=name
                };
                ctx.bank.AddObject(_newBank);
                ctx.SaveChanges();

                if (address != null) 
                {
                
                }

                /*Update Class props*/
                this.bankID = _newBank.ID;
                this.bankName = _newBank.name;
            }
        }

        /// <summary>
        /// Check if this card is not assigned to any other banks will register to this bank
        /// </summary>
        /// <param name="cardID"></param>
        public new void addCard(int cardID) 
        {
            using(var ts=new TransactionScope())
            {
                base.addCard(cardID);

                using (var ctx = new AccContext())
                {
                    var _bankCard = new bankCard() 
                    {
                        bankID=this.bankID,
                        cardID=cardID
                    };

                    ctx.bankCard.AddObject(_bankCard);
                    ctx.SaveChanges();
                }
                ts.Complete();
            }
        }
        
        /// <summary>
        /// set or replace fee for anycardtype assignr to the bank
        /// </summary>
        /// <param name="cardType"></param>
        /// <param name="feeID"></param>
        public void setFeeForIntracCardType(decimal amount,string description) 
        {
            using (var ts = new TransactionScope())
            {   
                using (var ctx = new AccContext())
                {
                    /*FIRST check see if fee defined for the cardType*/
                    var existingFee = ctx.fee
                        .Where(x => x.banklID == this.bankID).SingleOrDefault();

                    if (existingFee == null)
                    {
                        /*Create new Fee Entry*/
                        var _newFee = new Accounting.Models.fee()
                        {
                            cardTypeID=(int)enums.cardType.DebitCard,
                            amount=amount,
                            description=description,
                            banklID=this.bankID
                        };
                        ctx.fee.AddObject(_newFee);
                    }
                    else 
                    {
                        existingFee.amount = amount;
                        existingFee.description = description;
                    }
                    ctx.SaveChanges();
                }
                ts.Complete();
            }
        }

        public void setFeeForCreditCardType(enums.ccCardType ccCardType, decimal amount, string description)
        {
            using (var ts = new TransactionScope())
            {
                using (var ctx = new AccContext())
                {
                    /*FIRST check see if fee defined for the cardType*/
                    var existingFee = ctx.ccFee
                        .Where(x => x.banklID == this.bankID).SingleOrDefault();

                    if (existingFee == null)
                    {
                        /*Create new Fee Entry*/
                        var _newFee = new Accounting.Models.ccFee()
                        {
                            cccardTypeID = (int)ccCardType,
                            amount = amount,
                            description = description,
                            banklID = this.bankID
                        };
                        ctx.ccFee.AddObject(_newFee);
                    }
                    else
                    {
                        existingFee.amount = amount;
                        existingFee.description = description;
                    }
                    ctx.SaveChanges();
                }
                ts.Complete();
            }
        }

        /// <summary>
        /// assign a branch to the bank
        /// </summary>
        /// <param name="entityID"></param>
        public void createBranch(bankBranch branch) 
        {
            throw new NotImplementedException();
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
                this.bankName = _bank.name;
            }
        }
    }
}
