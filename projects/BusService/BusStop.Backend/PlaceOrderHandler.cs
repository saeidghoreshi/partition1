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
            Console.WriteLine("Order Received : " +message.orderId);
        }
    }
}
    