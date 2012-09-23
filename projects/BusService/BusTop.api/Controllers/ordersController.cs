using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using BusTop.Contract;

using NServiceBus;
using System.Web;

namespace BusTop.api.Controllers
{
    public class ordersController : ApiController
    {
        //keep this class clean
        public Guid Get()
        {
            var order = new PlaceOrder() 
            {
                orderId=Guid.NewGuid(),
                customerId=Guid.NewGuid(),
                productId=Guid.NewGuid()

            };

            
            //order.SetHeader("access_token", HttpContext.Current.Request.Params["access_token"]);
            //URL : http://localhost:1350/api/orders?access_token=busstop
            //sending messages with authentication each time , instead we can send multiple messages in one message in form of mutator
            //then move it to other partiotion 

            WebApiApplication.Bus.Send( order); //then use config file   add message to endpoint
            return order.orderId;
        }


    }
}
