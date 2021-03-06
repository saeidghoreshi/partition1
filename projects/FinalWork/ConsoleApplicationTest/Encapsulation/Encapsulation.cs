﻿using System;
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
    public class parts { }
    
    public abstract class car<T>: Icar , IEnumerable<T> where T :parts
    {
        //Fields
        List<T> parts = new List<T>() { };
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

        public IEnumerator<T> GetEnumerator()
        {
            return parts.GetEnumerator() as IEnumerator<T>;
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }
    }
    public class bmw : car<parts>
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

    public class mazda : car<parts>
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
/*
 //No casting
            BMWZ4 car1 = new BMWZ4("BMW");

            //casting to interface and upper class
            ICar   car1shadow1 = new BMWZ4("BMW");
            BMW car1shadow2 = new BMWZ4("BMW") as BMW;

            car1.start();
            car1shadow1.start();
            car1shadow2.start();

            car1shadow1.carStappoed += new EventHandler(onCarStopped);
            car1shadow2.carStappoed += new EventHandler(onCarStopped);

            car1shadow1.Break();
            car1shadow2.Break();
 */