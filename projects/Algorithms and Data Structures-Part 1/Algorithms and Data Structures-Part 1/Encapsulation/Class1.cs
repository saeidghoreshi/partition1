using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NS1
{
    internal interface ICar
    {
        void start();
        void Break();

        event EventHandler carStappoed;
        
    }
    public class BMW:ICar
    {
        public string name{get;set;}
        public BMW(string name){this.name=name;}

        public void start() { Console.WriteLine(name+" Started"); }
        public void Break() { Console.WriteLine(name + " Breaked"); FireCarStopped(); }


        public event EventHandler carStappoed;//only can be access within this class scope
        protected void FireCarStopped() 
        {
            if (carStappoed != null)
                carStappoed(this,EventArgs.Empty);
        }

    }
    
    public class BMWZ4 :BMW
    {
        public BMWZ4(string name) : base(name) { }
        public new void  start() {Console.WriteLine(name + " SStarted"); }

        
    }
}
