using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1
{
    public interface Icar
    {
        void start();
        void terminate();
    }
    public abstract class car : Icar
    {
        //Fields
        private string name;

        //Properties
        public string Name
        {
            get
            {
                return this.name;
            }
            set
            {
                this.name = value;
            }
        }

        //Methods
        public car(string name)
        {
            this.Name = name;
        }
        public virtual void start()
        {
            Console.WriteLine(this.Name + " Started [Call from Base]");
        }
        public virtual void terminate()
        {
            Console.WriteLine(this.Name + " terminated [Call from Base]");
        }
    }
    public class bmw : car
    {
        //Methods
        public bmw(string name) : base(name) { }
        public override void start()
        {
            Console.WriteLine(this.Name + " Started");
        }
        public override void terminate()
        {
            Console.WriteLine(this.Name + " Terminated");
        }
    }

    public class mazda : car
    {
        //Methods
        public mazda(string name) : base(name) { }
        public new void start()
        {
            Console.WriteLine(this.Name + " Started");
        }
        public new void terminate()
        {
            Console.WriteLine(this.Name + " Terminated");
        }
    }
}
