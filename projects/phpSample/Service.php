<?php    
namespace Accounting;

class Service
{
    public $serviceID;
    public $issuerEntityID; 
    public $receiverEntityID;
    public $serviceName;

    public function createNew()
    {
        //var giverPerson = ctx.person.Where(x => x.entityID == issuerEntityID).FirstOrDefault();
        //receiverPerson = ctx.person.Where(x => x.entityID == receiverEntityID).FirstOrDefault();
        //if (receiverPerson == null || giverPerson == null)throw new Exception("No entities defined");

        /*    var newService = new AccountingLib.Models.service()
            {
                issuerEntityID=issuerEntityID,
                receiverEntityID=receiverEntityID,
                name=serviceName
            };
            mapData(laodService);
        */
            
    }
    public function loadService($service)
    {
        /*
        this.serviceID = service.ID;
        this.receiverEntityID = (int)service.receiverEntityID;
        this.issuerEntityID = (int)service.issuerEntityID;
        this.serviceName = (string)service.name;
        */
    }
}
