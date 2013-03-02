<?php
  
namespace Accounting;

class ccFee
{
    public $ccfeeID;
    public $bankID;
    public $ccCardTypeID;
    public $amount;
    public $description;

    public function createNew($bankID, $amount, $description, $ccCardTypeID)
    {
            //check Where(x => x.ccCardTypeID == ccCardTypeID && x.bankID == bankID).SingleOrDefault();
            //if fee exists delete it
            
            //create new ccfee
            //Reload Object >> this.loadFeeByID(_ccFee.ID);
        
    }

    public function loadFeeByID($ccfeeID)
    {
        //load the fee by Where(x => x.ID == ccfeeID)
        /*
            this.ccfeeID = _fee.ID;
            this.bankID = (int)_fee.bankID;
            this.ccCardTypeID = (int)_fee.ccCardTypeID;
            this.amount = (decimal)_fee.amount;
            this.deacription = _fee.description;
            */
    }
    public function loadccFeeByBankCardTypeID($ccCardTypeID, $bankID)
    {
        //load the ccfee.Where(x => (int)x.ccCardTypeID == ccCardTypeID && x.bankID == bankID)
        //this.loadFeeByID(ccfee.ID);
    }
}