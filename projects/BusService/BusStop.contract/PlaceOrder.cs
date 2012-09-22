using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NServiceBus;

namespace BusTop.Contract
{
    //[TimeToBeReceived("00:00:10")]//you are free to discard it in this period
    public class PlaceOrder:IMessage
    {
        public Guid productId { get;set; }
        public Guid customerId { get; set; }
        public Guid orderId { get; set; }
    }
}