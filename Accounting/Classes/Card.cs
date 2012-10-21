using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Accounting.Interfaces;

namespace Accounting.Classes
{
    public abstract class Card
    {
        private int Id;
        public int ID { get { return Id; } }
        public string Number { get; set; }
        public DateTime expiryDate { get; set; }
    }
    
    public class CreditCard : Card,ICard
    {
        public IOperationStat Initiate(string CardNumber, DateTime expiryDate)
        {
            var cardStatus=new OperationStat();
            cardStatus.setStat(Status.Approved);
            return cardStatus;
        }

        public IOperationStat setFee(IFee fee)
        {
            
            throw new NotImplementedException();
        }
    }

    

}
