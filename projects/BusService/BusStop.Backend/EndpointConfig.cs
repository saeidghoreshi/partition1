﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using NServiceBus;

namespace BusStop.Backend
{
    [EndpointName("busstop.backend3")]
    public class EndpointConfig:IConfigureThisEndpoint,AsA_Server
    {
    }
}
