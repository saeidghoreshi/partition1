using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Accounting.Interfaces
{
    public interface  IInvoice
    {
        IOperationStat createNew();
        IOperationStat createNewDraft();
        IOperationStat createNewFromDraft(IInvoice Draft);
        IOperationStat Finalize();
        IOperationStat PayByCard();
        IOperationStat PayInternally();

        IOperationStat setCurrency(ICurrency currency);
    }
}
