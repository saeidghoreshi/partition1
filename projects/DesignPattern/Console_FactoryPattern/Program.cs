using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

namespace Console_FactoryPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            new factoryManagement().create("bmw");

            Console.WriteLine("please enter to Quit");
            Console.ReadLine();
        }
    }
    public class factoryManagement 
    {
        public void create(string typeName)
        {
            modelFactory model = new modelFactory();
            
            IModel m = model.createInstance(typeName);

            m.turnOn();
            m.turnOff();
        }   
    }
    public interface IModel
    {
        void turnOn();
        void turnOff();
    }
    public class modelFactory 
    {
        Dictionary<string, Type> models;
        public IModel createInstance(string typename) 
        {
            loadModelTypes();
            Type model = getModelToCreate(typename);
            if (model != null)
                return Activator.CreateInstance(model) as IModel;
            else
                return new NullModel();

        }

        void loadModelTypes() 
        {
            models = new Dictionary<string, Type>();
            Type[]typesInAssembly=Assembly.GetExecutingAssembly().GetTypes();
            foreach (Type type in typesInAssembly)
            {
                if (type.GetInterface(typeof(IModel).ToString()) != null)
                    models.Add(type.Name.ToLower(),type);
            }
        }
        Type getModelToCreate(string modelName) 
        {
            foreach(var model in models)
                if(model.Key.Contains(modelName))
                    return models[model.Key];
            return null;
        }
    }

    //model List classes
    public class NullModel : IModel
    {
        public void turnOn()
        {
            
        }

        public void turnOff()
        {
            
        }
    }

    public class bmw : IModel
    {
        public void turnOn()
        {
            Console.WriteLine("bmw started");
        }

        public void turnOff()
        {
            Console.WriteLine("bmw shutdown");
        }
    }
    public class benz : IModel
    {
        public void turnOn()
        {
            Console.WriteLine("benz started");
        }

        public void turnOff()
        {
            Console.WriteLine("benz shut down");
        }
    }


}
