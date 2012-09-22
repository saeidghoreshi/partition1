using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using BusTop.Contract;

using NServiceBus;

namespace BusTop.api.Controllers
{
    public class ordersController : ApiController
    {
        public IBus Bus { get; set; }
        public Guid Get()
        {
            var order = new PlaceOrder() 
            {
                orderId=Guid.NewGuid(),
                customerId=Guid.NewGuid(),
                productId=Guid.NewGuid()

            };
            Bus.Send( order); //then use config file   add message to endpoint
            return order.orderId;
        }


    }
}
