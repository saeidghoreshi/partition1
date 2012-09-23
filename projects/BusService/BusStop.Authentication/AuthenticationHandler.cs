using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using NServiceBus;

namespace BusStop.Authentication
{
    //install NServicebus reference
    public class AuthenticationHandler:IHandleMessages<IMessage>
    {
        //react to all messages comming in
        public IBus Bus { get; set; }
        public void Handle(IMessage message)
        {
            var token = message.GetHeader("access_token");
            if (token != "busstop") 
            {
                Console.WriteLine("User not authenticated");
                Bus.DoNotContinueDispatchingCurrentMessageToHandlers();
                return;
            }
            Console.WriteLine("User authenticated");
        }
    }
}
//after finished add its referenc to backend project and run backend