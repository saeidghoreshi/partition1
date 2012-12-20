using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Npgsql;
using System.Data;

namespace ConsoleApplication1
{
    public class PGConnection
    {
        private NpgsqlConnection conn;
        private string connstring;

        public NpgsqlConnection plpgconnection
        {
            get { return this.conn; }
            set { this.conn = value; }
        }
        public void Connect()
        {

        }
        public DataSet fetch(string query)
        {
            using (this.plpgconnection = new NpgsqlConnection(this.connstring))
            {
                this.plpgconnection.Open();
                NpgsqlTransaction trans = this.conn.BeginTransaction();
                try
                {
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(query, this.conn);
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    trans.Commit();
                    conn.Close();
                    return ds;
                }
                catch (Exception ex)
                {
                    try
                    {
                        if (this.plpgconnection.FullState != ConnectionState.Open)
                            throw new Exception("Connection Is Not Open" + ex.Message);
                        else
                            trans.Rollback();
                    }
                    catch (Exception ex1)
                    {
                        throw new Exception("Connection Is Not Open" + ex1.Message);
                    }
                    return (DataSet)null;
                }
                finally
                {
                    if (this.plpgconnection.FullState != ConnectionState.Open)
                        this.conn.Close();
                }
            }
        }

    }
}
