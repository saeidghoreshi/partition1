<?php     
namespace Accounting;
                     
class Bank extends \Accounting\Entity
{
    const ENTITYTYPEID=\Accounting\Enums\entityType::bank;
    public $bankID;
    public $bankName;

    function __construct() 
    {
        parent::__construct();
        echo "Bank initiated";
    }
    function  __construct($bankId)
    {   
        parent::__construct();
        loadBankByBankID(bankId);
    }        
    
    public function createNew($name) 
    {
            parent::createNew((int)enums.entityType.bank);
            //CREATE NEW BADNK entityID=base.ENTITYID
            //AND LOAD THE BANK INFO
    }
    
    public function setFeeForIntracCardType($amount,$description) 
    {
        $fee = new \Accounting\Fee();
        $fee->createNew($this->bankID, $amount, $description, \Accounting\Enums\cardType::DebitCard);
    }

    public function setFeeForCreditCardType(\Accounting\Enums\ccCardType $ccCardType, $amount, $description)
    {
        $ccFee = new \Accounting\ccFee();
        ccFee.createNew(this.bankID, amount, description, (int)ccCardType);
    }

    private function loadBankByBankID($bankID)
    {
        //load the bank by bank id

        /*
            this.bankID = _bank.ID;
            this.bankName = _bank.name;
            base.ENTITYID = (int)_bank.entityID;
        */
    }
    public function loadBankByEntityID($entityID)
    {
        
        //load the bank by .Where(x => x.entityID == entityID).SingleOrDefault();
        /*
            this.bankID = _bank.ID;
            this.bankName = _bank.name;
            base.ENTITYID = (int)_bank.entityID;
            */
    }
}         