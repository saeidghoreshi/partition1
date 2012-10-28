using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;

namespace Accounting.Interfaces
{
    public enum ControllerOperationStatus { Approved=1,NotApproved=2}
    public interface IController
    {
        ControllerOperationStatus SetupGLTypes();
        ControllerOperationStatus SetupCurrencyTypes();
        ControllerOperationStatus SetupCategories();
    }
}
