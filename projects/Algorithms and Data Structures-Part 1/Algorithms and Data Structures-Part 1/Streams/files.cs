using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


using System.IO;
using System.Xml.Serialization;

namespace NS1
{
    public class files
    {
        [XmlElement("NAME")]
        public string name;
        [XmlElement("LASTNAME")]
        public string lastname;

        public void createFile()
        {
            this.name = "saeid";
            this.lastname = "Goreshi";

            string path =  DateTime.Now.Ticks.ToString()+".xml";
            using (Stream st = File.Create(path))
            {
                XmlSerializer xmlser = new XmlSerializer(typeof(files)); //or here this.GetType()
                xmlser.Serialize(st, this);

                //using (StreamWriter w = new StreamWriter(st, Encoding.UTF8))
                //    try
                //    {

                //        w.WriteLine("Hi");
                //        w.WriteLine("world");

                //        w.Close();
                //        st.Close();
                //    }
                //    catch (Exception ex)
                //    {
                //        throw new Exception(ex.Message);

                //    }
            }

            
        }
    }
}
