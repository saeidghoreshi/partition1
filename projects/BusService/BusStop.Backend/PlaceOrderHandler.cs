using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NServiceBus;
using BusTop.Contract;

using Raven.Client.Document;
using Raven.Client;

namespace BusStop.Backend
{
    public class PlaceOrderHandler:IHandleMessages<PlaceOrder>
    {
        public IDocumentSession Session { get; set; }
        //the same session asking for unit of work

        public void Handle(PlaceOrder message)
        {
            //Fault tolerance
            //throw new Exception("Database is Down");


            Session.Store(new Order()
            {
                OrderId = message.orderId
            });


            //throw new Exception("Some Random Failure");
            //Note that because of exception, transaction wont be completed and be rollbacked

            //after tries defined in config file then msg goes to error box
            //then can use install package nservicebus.tools   on web.api project to return error messages to main queues for processing 
            //go to mpackages\NServiceBus.Tools.3.2.8\tools
            Console.WriteLine("Order Received : " + message.orderId);
        }
    }
    public class Order 
    {
        public Guid OrderId { get; set; }
    }
}
    