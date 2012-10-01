using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_ObserverPattern.observer
{
    
    public abstract class AbsObserver
    {
        public abstract void update();
    }
    public abstract class abstractSubject
    {
        List<AbsObserver> observers = new List<AbsObserver>();
        public void Register(AbsObserver observer)
        {
            observers.Add(observer);
        }
        public void Unregister(AbsObserver observer)
        {
            observers.Remove(observer);
        }
        public void Notify()
        {
            foreach (var o in observers)
                o.update();
        }
    }
    public class subject : abstractSubject
    {
        private double price;
        public double Price
        {
            get { return price; }
            set
            {
                price = value;
                this.Notify();
            }
        }
    }

    public class googleObserver : AbsObserver
    {
        subject s;
        public googleObserver(subject s)
        {
            this.s = s;
            s.Register(this);
        }
        public override void update()
        {
            Console.WriteLine("google price is : " + s.Price * 256 / 21);
        }
    }
    public class MicrosoftObserver : AbsObserver
    {
        subject s;
        public MicrosoftObserver(subject s)
        {
            this.s = s;
            s.Register(this);
        }
        public override void update()
        {
            Console.WriteLine("MS price is : " + s.Price * 658 / 11);
        }
    }
    public class ObserverPatternManager
    {
        public void run()
        {
            subject subj = new subject();

            new googleObserver(subj);
            new MicrosoftObserver(subj);


            foreach (var x in new double[] { 1022, 256, 1485, 258 })
                subj.Price = x;
        }
    }
}
