using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;


namespace EventsDelegates
{
    public delegate void ChangedEventHandler(object sender, EventArgs e);

    public class ListWithChangedEvent : ArrayList
    {
        public event ChangedEventHandler Changed;

        protected virtual void OnChanged(EventArgs e)
        {
            if (Changed != null)
                Changed(this, e);
        }

        
        public override int Add(object value)
        {
            int i = base.Add(value);
            OnChanged(EventArgs.Empty);
            return i;
        }

        public override void Clear()
        {
            base.Clear();
            OnChanged(EventArgs.Empty);
        }

        public override object this[int index]
        {
            set
            {
                base[index] = value;
                OnChanged(EventArgs.Empty);
            }
        }
    }


    class EventListener
    {
        private ListWithChangedEvent List;

        public EventListener(ListWithChangedEvent list)
        {
            List = list;
            List.Changed += new ChangedEventHandler(ListChanged);
        }

        private void ListChanged(object sender, EventArgs e)
        {
            Console.WriteLine("This is called when the event fires.");
        }

        public void Detach()
        {
            
            List.Changed -= new ChangedEventHandler(ListChanged);
            List = null;
        }
    }

    
}


    
