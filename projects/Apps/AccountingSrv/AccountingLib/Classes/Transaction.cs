using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using accounting.classes;

using AccountingLib.Models;
using System.Data;
using System.Data.SqlClient;

namespace accounting.classes
{
    public class Transaction
    {
        
        public static int createNew(int entityID, int catTypeID, decimal amount, int currencyID)
        {
            
            sqlServer db=new sqlServer(sqlServer.connString1);
            
            var accountID = Account.getAccount(entityID, catTypeID, currencyID).ID;


            SqlConnection sqlconnection = new SqlConnection(sqlServer.connString1);
            sqlconnection.Open();
            SqlDataAdapter da = new SqlDataAdapter(
                //string.Format("exec Accounting.newTransaction @accountId={0},@amount={1}",accountID,amount)
                "accounting.test "
                , sqlconnection);
            
            
            DataSet ds = new DataSet();
            da.Fill(ds);
            sqlconnection.Close();
    
             


            return Convert.ToInt32(ds.Tables[0].Rows[0][0]);
        }    
    }
    
}
