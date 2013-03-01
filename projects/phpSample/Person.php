<?php
   
namespace Accounting;

class Person extends Accounting\Entity
{
        const ENTITYTYPEID = \Accounting\Enums\entityType::Person;
        public $id;
        public $firstname;
        public $lastname;

        function _constructor()
        {
            parent::_constructor();
        }
        function _constructor($personEntityId)
        {
            parent::_constructor();
            loadPerson($personEntityId);
        }
        private function loadPerson($personEntityId) 
        {
            /*         
            var person = ctx.person
                    .Where(x => x.entityID == personEntityId)
                    .SingleOrDefault();

                if (person == null)
                    throw new Exception("no such a Person Exists");

                this.id = person.ID;
                this.firstname = person.firstName;
                this.lastname = person.lastName;
                base.ENTITYID = (int)person.entityID;                                    
                */
        }

        public function createNew($firstName,$lastName) 
        {
            /*
                base.New((int)enums.entityType.Person);

                var checkDuplication = ctx.person.Where(x => x.firstName == firstName && x.lastName == lastName).FirstOrDefault();
                if (checkDuplication != null)
                    throw new Exception("Person Duplicated");

                var newPerson = new AccountingLib.Models.person() 
                {
                    firstName=firstName,
                    lastName=lastName,
                    entityID = base.ENTITYID
                };
                ctx.person.AddObject(newPerson);
                ctx.SaveChanges();

                this.id = newPerson.ID;
                this.firstname = newPerson.firstName;
                this.lastname = newPerson.lastName;                                       
                */
        }
                
        public function createAccounts($currencyID) 
        {
            /*
            $accounts = new List<account>();

            accounts.Add(new APAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new ARAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new WAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new EXPAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new INCAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new CCCASHAccount().Create(base.ENTITYID, currencyID));
            accounts.Add(new DBCASHAccount().Create(base.ENTITYID, currencyID));

            return accounts;
            */
        }
        
        public function addWalletMoney($amount,$title, $currencyID)
        {
            //base.addWalletMoney(amount, title, currencyID);
        }

        public function payInvoiceByInternal($inv, $amount)
        {
            //base.payInvoiceByInternal(inv, amount);
        }
        public function payInvoiceByInterac($inv, $amount, $cardID)
        {
            //base.payInvoiceByInterac(inv, amount, cardID);
        }
        public function payInvoiceByCC($inv, $amount, $cardID, $cardType)
        {
            //base.payInvoiceByCC(inv, amount, cardID, cardType);
        }
    }         
