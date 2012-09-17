using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Collections;

namespace NS1
{
    
    class delegates
    {
        public delegates() 
        {
            
        }
        //says "Accepts this type of function" 
        public delegate void keyPressDelegate ();

        //instantiate a new hook for future assignment and now ready to be used here
        //means I expect new function from outside class to be attached to my class method

        //public keyPressDelegate onKey;
        public event keyPressDelegate onKey;

        public void keyStrokHandler()
        {
            Console.WriteLine("pres q to quite");
            while (true)
            {
                char key = Console.ReadKey(true).KeyChar;
                Console.WriteLine(key);
                if (key == 'q')
                    break;

                //if "onkey" function pointer assigned
                if (onKey != null)
                    onKey();
                    //onKey.GetInvocationList();
            }
        }
    }
}
