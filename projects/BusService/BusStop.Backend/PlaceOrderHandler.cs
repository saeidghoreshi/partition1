using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NServiceBus;
using BusTop.Contract;

namespace BusStop.Backend
{
    public class PlaceOrderHandler:IHandleMessages<PlaceOrder>
    {
        public void Handle(PlaceOrder message)
        {
            throw new Exception("Database is Down");
            //after tries defined in config file then msg goes to error box
            //then can use install package nservicebus.tools   on web.api project to return error messages to main queues for processing 
            //go to packages\NServiceBus.Tools.3.2.8\tools
            Console.WriteLine("Order Received : " +message.orderId);
        }
    }
}
    