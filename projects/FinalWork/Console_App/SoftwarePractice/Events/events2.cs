using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace EventsDelegates
{
    /*
        Not important to define delegate for events
        public delegate void customeHandler(object sender,EventArgs args);
    */

    /*That s how it works*/
    /*
     1-Define class bondable events
     2-Define class operation which uses events;
     * 
     3-Instantiate Object
     4-bind Events to functions
     5-Call object's operations
    */

    public class customEventArgs : EventArgs 
    {
        public string message{get;set;}
    }


    //in this example we build new collwection instead of customizing built in collection and overrride the beahavioias
    public class customCollection <T>
    {
        public event EventHandler addEvent;
        public event EventHandler removeEvent;
        public event EventHandler updateEvent;


        List<T> repository;
        public customCollection(List<T> input)
        {
            repository = input;
        }
        //Indexer
        public T this[int index]
        {
            set
            {
                repository[index] = value;
                updateEvent(this,EventArgs.Empty);
            }
            get 
            {
                return repository[index];
            }
        }

        public void add()
        {
            //Do stuff
            addEvent(this, EventArgs.Empty);
        }
        public void update(EventArgs e) 
        {
            //Do stuff
            updateEvent(this, e);
        }
        public void remove() 
        {
            //Do stuff
            removeEvent(this, EventArgs.Empty);
        }
    }

    public static class TESTEVENT 
    {
        static customCollection<string> myRepo;
        public static void RUN() 
        {
            myRepo = new customCollection<string>(new List<string>() { "data1", "Data2", "data3" });

            myRepo.addEvent += new EventHandler(addedToRepo1);
            myRepo.addEvent += new EventHandler(addedToRepo2);
            myRepo.addEvent += delegate(object o, EventArgs e) { Console.WriteLine("anonymous add function added"); };
            myRepo.addEvent += ((object o, EventArgs e) => { Console.WriteLine("anonymous add function added using lambda Expression");  });

            myRepo.updateEvent += new EventHandler(updateRepo);
            myRepo.removeEvent += new EventHandler(removeRepo);



            //use
            myRepo.add();
            myRepo.update(new customEventArgs() { message = " 'Updated Message '" });
            myRepo.remove();

            //based on logic change Event binding
            myRepo.addEvent -= new EventHandler(addedToRepo2);
            myRepo.add();
        }


        //handlers Definitions
        static void addedToRepo1(object sender,EventArgs e) {Console.WriteLine("Something added to my repo firstone");}
        static void addedToRepo2(object sender, EventArgs e) { Console.WriteLine("Something added to my repo second one"); }
        static void updateRepo(object sender, EventArgs e) { Console.WriteLine("my repo updated" + ((customEventArgs)e).message); }
        static void removeRepo(object sender, EventArgs e) { Console.WriteLine("my repo changed"); }

    }
}
