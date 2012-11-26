using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;


namespace WTopology.Classes
{
    public class sqlServerPar 
    {
        public string name;
        public SqlDbType dbType;
        public dynamic value;
    }
    public class sqlServer
    {
        public DataSet runSP(string spName, List<sqlServerPar> pars) 
        {
            string connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["db1"].ToString();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                using (SqlCommand spcmd = new SqlCommand(spName, con))
                {
                    spcmd.CommandType = CommandType.StoredProcedure;

                    foreach(var item in pars)
                    {
                        SqlParameter newPar = new SqlParameter("@"+item.name, item.dbType);
                        newPar.Value = item.value;
                        spcmd.Parameters.Add(newPar);
                    }
                    
                    using (SqlDataAdapter a = new SqlDataAdapter(spcmd))
                    {
                        DataSet ds = new DataSet();
                        a.Fill(ds);
                        return ds;
                    }
                }
            }
        }
    }
}