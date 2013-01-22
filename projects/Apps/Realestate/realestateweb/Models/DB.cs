using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;

namespace realestateweb.Models
{
    public class sqlServerPar
    {
        public string name;
        public SqlDbType dbType;
        public dynamic value;
    }
    //sqlserver Class
    public class sqlServer
    {
        private SqlConnection conn;
        private string connstring;

        public sqlServer(string connStr)
        {
            this.connstring = connStr;
        }

        public SqlConnection sqlconnection
        {
            get { return this.conn; }
            set { this.conn = value; }
        }
        public DataSet fetch(string query)
        {
            using (this.sqlconnection = new SqlConnection(this.connstring))
            {
                this.sqlconnection.Open();
                //SqlTransaction trans = this.conn.BeginTransaction();
                try
                {
                    SqlDataAdapter da = new SqlDataAdapter(query, this.conn);
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    //trans.Commit();
                    conn.Close();
                    return ds;
                }
                catch (Exception ex)
                {
                    try
                    {
                        if (this.sqlconnection.State != ConnectionState.Open)
                            throw new Exception("Connection Is Not Open" + ex.Message);
                        //else
                        //trans.Rollback();
                    }
                    catch (Exception ex1)
                    {
                        throw new Exception("Connection Is Not Open" + ex1.Message);
                    }
                    return (DataSet)null;
                }
                finally
                {
                    if (this.sqlconnection.State != ConnectionState.Open)
                        this.conn.Close();
                }
            }
        }

        public void exec(string query)
        {
            using (this.sqlconnection = new SqlConnection(this.connstring))
            {
                this.sqlconnection.Open();
                try
                {
                    SqlCommand comm = new SqlCommand(query, this.conn);
                    comm.ExecuteNonQuery();
                    conn.Close();

                }
                catch (Exception ex)
                {
                    try
                    {
                        if (this.sqlconnection.State != ConnectionState.Open)
                            throw new Exception("Connection Is Not Open" + ex.Message);
                        //else
                        //trans.Rollback();
                    }
                    catch (Exception ex1)
                    {
                        throw new Exception("Connection Is Not Open" + ex1.Message);
                    }

                }
                finally
                {
                    if (this.sqlconnection.State != ConnectionState.Open)
                        this.conn.Close();
                }
            }
        }

        public DataSet runSP(string spName, List<sqlServerPar> pars)
        {
            string connectionString = this.connstring;

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                using (SqlCommand spcmd = new SqlCommand(spName, con))
                {
                    spcmd.CommandType = CommandType.StoredProcedure;

                    foreach (var item in pars)
                    {
                        SqlParameter newPar = new SqlParameter("@" + item.name, item.dbType);
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