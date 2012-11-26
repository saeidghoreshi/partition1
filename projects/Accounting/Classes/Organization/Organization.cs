using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace accounting.classes.organization
{
    public class Organization:Entity
    {
        public readonly int ENTITYTYPEID = (int)enums.entityType.Organization;

        public void createNew()
        {
            base.createNew((int)enums.entityType.Organization);
        }
        public new void addWalletMoney(decimal amount, string title, int currencyID) 
        {
            base.addWalletMoney(amount, title, currencyID);
        }
        public new void payInvoiceByInternal(classes.Invoice inv, decimal amount) 
        {
            base.payInvoiceByInternal(inv, amount) ;
        }
        public new void payInvoiceByInterac(classes.Invoice inv, decimal amount, int cardID)
        {
            base.payInvoiceByInterac(inv, amount, cardID);
        }
        public void payInvoiceByCC(classes.Invoice inv, decimal amount, int cardID, enums.ccCardType cardType)
        {
            base.payInvoiceByCC(inv, amount, cardID, cardType);
        }
    }
}
