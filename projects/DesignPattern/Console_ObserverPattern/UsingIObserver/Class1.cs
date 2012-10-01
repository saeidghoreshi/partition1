using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_ObserverPattern.UsingIObserver
{
    
    public class Subject 
    {
        public double price { set; get; }
    }//class end

    
    public class SubjectTicker :IObservable<Subject>
    {
        List<IObserver<Subject>> observers = new List<IObserver<Subject>>();
        private Subject subject;
        public Subject Subject 
        {
            get { return subject; }
            set 
            {
                subject = value;
                this.Notify(subject);
            }
        }
        void Notify(Subject s) 
        {
            foreach(var o in observers)
            {
                if (s.price < 0)
                    o.OnError(new Exception("Bad subject Data"));
                else
                    o.OnNext(s);
            }
        }
        void stop() 
        {
            foreach (var ob in observers.ToArray())
                if (observers.Contains(ob))
                    ob.OnCompleted();
            observers.Clear();
        }
        public IDisposable Subscribe(IObserver<Subject> observer) 
        {
            if (!observers.Contains(observer))
                observers.Add(observer);
            return new Unsubscriber(observers,observer);
        }
    }
    public class Unsubscriber : IDisposable
    {
        List<IObserver<Subject>> _observers;
        IObserver<Subject> _observer;

        public Unsubscriber(List<IObserver<Subject>> observers,IObserver<Subject> observer) 
        {
            _observers = observers;
            _observer = observer;
        }

        public void Dispose()
        {
            if (_observer != null && _observers.Contains(_observer))
                _observers.Remove(_observer);
        }
    }

    //Monitors
    public class googleMonitor : IObserver<Subject> 
    {
        public void OnCompleted()
        {
            Console.WriteLine("G Ended");
        }

        public void OnError(Exception error)
        {
            Console.WriteLine("G Error Happend");
        }

        public void OnNext(Subject value)
        {
            Console.WriteLine("G price : "+value.price);
        }
    }
    public class MicrosoftMonitor : IObserver<Subject>
    {
        public void OnCompleted()
        {
            Console.WriteLine("MS Ended");
        }

        public void OnError(Exception error)
        {
            Console.WriteLine("MS Error Happend");
        }

        public void OnNext(Subject value)
        {
            Console.WriteLine("MS price : " + value.price);
        }
    }



    public class ObserverUsingIObserver
    {
        public void run()
        {
            SubjectTicker subjTicker = new SubjectTicker();

            var go = new googleMonitor();
            var mso = new MicrosoftMonitor();

            var subjects=new Subject[] 
            { 
                new Subject() { price = 1000 }, 
                new Subject() { price = 2000 } 
            };
            using (subjTicker.Subscribe(go))
            using (subjTicker.Subscribe(mso))
            {

                foreach (var x in subjects)
                    subjTicker.Subject = x;
            }

        }
    }//class end
}
