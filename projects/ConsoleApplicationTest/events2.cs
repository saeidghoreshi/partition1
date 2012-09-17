using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApplication1.event2
{
    public delegate void customeHandler(object sender,EventArgs args);


    //in this example we build new collwection instead of customizing built in collection and overrride the beahavioias
    public class customCollection <T>
    {
        public event customeHandler addEvent;
        public event customeHandler removeEvent;
        public event customeHandler updateEvent;


        List<T> repository;
        public customCollection(List<T> input)
        {
            repository = input;
        }

        public void add()
        {
            //Do stuff
            addEvent(this, EventArgs.Empty);
        }
        public void update() 
        {
            //Do stuff
            updateEvent(this, EventArgs.Empty);
        }
        public void remove() 
        {
            //Do stuff
            removeEvent(this, EventArgs.Empty);
        }
    }

    public class consumer 
    {
        customCollection<string> myRepo;
        public consumer() 
        {
            myRepo = new customCollection<string>(new List<string>() { "data1", "Data2", "data3" });

            myRepo.addEvent+=new customeHandler(addedToRepo1);
            myRepo.addEvent += new customeHandler(addedToRepo2);
            myRepo.updateEvent+= new customeHandler(updateRepo);
            myRepo.removeEvent+= new customeHandler(removeRepo);



            //use
            myRepo.add();
            myRepo.update();
            myRepo.remove();

            //based on logic change Event binding
            myRepo.addEvent -= new customeHandler(addedToRepo2);
            myRepo.add();
        }


        //handlers Definitions
        public void addedToRepo1(object sender,EventArgs e) {Console.WriteLine("Something added to my repo firstone");}
        public void addedToRepo2(object sender, EventArgs e) { Console.WriteLine("Something added to my repo second one"); }
        public void updateRepo(object sender, EventArgs e) { Console.WriteLine("my repo updated"); }
        public void removeRepo(object sender, EventArgs e) { Console.WriteLine("my repo changed"); }

    }
}
