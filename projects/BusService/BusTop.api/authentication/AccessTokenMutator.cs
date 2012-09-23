using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NServiceBus.MessageMutator;
using NServiceBus.Config;
using NServiceBus;

namespace BusTop.api.authentication
{
    public class AccessTokenMutator:IMutateOutgoingTransportMessages , INeedInitialization
    {
        void IMutateOutgoingTransportMessages.MutateOutgoing(object[] messages, NServiceBus.Unicast.Transport.TransportMessage transportMessage)
        {
            //gets it from Url or manually
            transportMessage.Headers["access_token"] = "busstop";//HttpContext.Current.Request.Params["access_token"];
        }

        void INeedInitialization.Init()
        {
            Configure.Instance.Configurer.ConfigureComponent<AccessTokenMutator>
                (
                    DependencyLifecycle.InstancePerCall
                );
        }
    }
}