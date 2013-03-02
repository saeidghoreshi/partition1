<?php        
namespace Accounting;

class Fee
{
    public $feeID;
    public $bankID;
    public $cardTypeID;
    public $amount;
    public $deScription;

    public function createNew($bankID,$amount,$description, $cardTypeID)
    {                  
        //check for existing fee if exisrts delete that
        //create new fee object and save in DB
        //Reload Object >> $this->loadFeeByID(_fee.ID);
    }

    public function loadFeeByID($feeID)
    {
        //LOAD THE FEE IF EXTSTS IF NOT THROW THE EXCEPTION AND FILL IN PARAMS
    }
    public  function loadFeeByBankCardTypeID($cardTypeID, $bankID)
    {
        //LOAD THE FEE BY Where(x => (int)x.cardTypeID == cardTypeID && x.bankID == bankID)
        //$this->loadFeeByID(fee.ID);
        
    }
}
