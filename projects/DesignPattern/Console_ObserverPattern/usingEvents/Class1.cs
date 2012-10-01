using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console_ObserverPattern.observerUsingEvents
{
    public class SubjectChangeEventArgs : EventArgs 
    {
        public double Data{ get; set; }
        public SubjectChangeEventArgs(object data) 
        {
            this.Data = (double)data;
        }
    }
    public class Subject 
    {
        //sample Definition (1)
        private double price;
        public double Price
        {
            get { return price; }
            set
            {
                price = value;
                this.OnSubjectChange(new SubjectChangeEventArgs(this.price) );
            }
        }
        public event EventHandler<SubjectChangeEventArgs> subjectChange;
        protected virtual void OnSubjectChange(SubjectChangeEventArgs e)
        {
            if (subjectChange != null)
                subjectChange(this,e);
        }
        //Can define other sample definitions like above
    }

    public class googleMonitor
    {
        public googleMonitor(Subject s) 
        {
            s.subjectChange += new EventHandler<SubjectChangeEventArgs>(subject_change);
        }
        public void subject_change(object sender,SubjectChangeEventArgs e) 
        {
            Console.WriteLine("Google : "+e.Data*256/21);
        }

    }
    public class MicrosoftMonitor
    {
        public MicrosoftMonitor(Subject s)
        {
            s.subjectChange += new EventHandler<SubjectChangeEventArgs>(subject_change);
        }
        public void subject_change(object sender, SubjectChangeEventArgs e)
        {
            Console.WriteLine("MS : " + e.Data * 658 / 11);
        }

    }
    public class ObserverByEventsManager
    {
        public void run()
        {
            Subject subj = new Subject();

            new googleMonitor(subj);
            new MicrosoftMonitor(subj);


            foreach (var x in new double[] { 1022, 256, 1485, 258 })
                subj.Price = x;
        }
    }
}
