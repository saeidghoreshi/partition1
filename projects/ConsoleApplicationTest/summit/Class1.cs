using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Text;
using System.IO;

/*OLEDB*/
using System.Data.OleDb;

/*Regular expression*/
using System.Text.RegularExpressions;

/*MS Access FileStream*/
using ADOX;


using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;
using System.Xml.XPath;
using System.Xml.Xsl;
using System.Xml.Linq;

namespace ConsoleApplication1.summit
{

    public partial class sampleForm1 
    {
        //Properties
        private string excelFilePath = Environment.CurrentDirectory + "\\..\\..\\sample.xls";
        private string accessFilePath = Environment.CurrentDirectory + "\\..\\..\\result.mdb";

        int firstMatchCounter = 0;
        int secondMatchCounter = 0;


        
        private void Run()
        {
            //load Excel File
            library.oledbConn excelFile = new library.oledbConn(this.excelFilePath, "xls");
            DataSet ds = excelFile.fetch("SELECT * FROM Wk_1_1996");
            excelFile.terminate();

            //rebuild access File and tables
            this.buildAccessFile();

            //do Procesing based on logic
            this.process(ds.Tables[0]);
        }

        public void buildAccessFile()
        {
            if (File.Exists(accessFilePath))
                File.Delete(accessFilePath);

            /* NOTE */
            //COM MS ADO EXT and disable embeded type
            /* NOTE */


            CatalogClass catalog = new CatalogClass();
            catalog.Create("Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + accessFilePath);

            //Build tables
            library.oledbConn accessFile = new library.oledbConn(this.accessFilePath, "mdb");

            accessFile.execute("create table Sites "
            + " ( "
            + " [siteId]    integer,"
            + " [siteName]  TEXT"
            + " ) "
            );

            accessFile.execute("create table Data"
            + " ( "
            + " [dataId]    AUTOINCREMENT(1, 1) PRIMARY KEY,"
            + " [siteId]    integer,"
            + " [_weekNum]  integer,"
            + " [_year]     integer,"
            + " [_calValue] TEXT"
            + " ) "
            );

            accessFile.terminate();

        }

        private string applyFiltering(string word)
        {
            List<string> chars = new List<string>();
            chars.Add("<>");
            chars.Add("summit");

            //Apply Filter
            MatchCollection mc1 = library.library.findeMathes(chars[0], word.ToString());
            MatchCollection mc2 = library.library.findeMathes(chars[1], word.ToString());

            this.firstMatchCounter += mc1.Count;
            this.secondMatchCounter += mc2.Count;

            if (mc1.Count != 0)
                library.library.replaceMatches(chars[0], "", word.ToString());
            if (mc2.Count != 0)
                library.library.replaceMatches(chars[1], "", word.ToString());
            return word;
        }
        public void process(DataTable dt)
        {
            library.oledbConn accessFile = new library.oledbConn(this.accessFilePath, "mdb");

            //Per each Column [1-~]
            for (int colIndex = 1; colIndex < dt.Columns.Count; colIndex++)
            {
                DataColumn curCol = dt.Columns[colIndex];

                string[] colNameCombo = curCol.ColumnName.ToString().Split(new char[] { '\\' });
                string siteId = colNameCombo[0].Trim();
                string siteName = colNameCombo[1].Trim();

                if (siteName == "Reach")
                    continue;

                siteName = this.applyFiltering(siteName);

                //if site Id repeated then override the record
                int exisingSiteId = accessFile.fetch("select 1 from sites where siteId=" + siteId).Tables[0].Rows.Count;
                if (exisingSiteId != 0)
                {
                    //if (MessageBox.Show("Want to Override ? siteId=" + siteId + " siteName=" + siteName, "", MessageBoxButtons.YesNo) == DialogResult.Yes)
                    //{
                    //    accessFile.execute("update Sites set siteName='" + siteName + "' where siteId=" + siteId);
                    //}
                    //else
                    //{
                    //    //Do nothing and keep old record
                    //}
                }
                else
                {
                    accessFile.execute("insert into Sites (siteId,siteName) values"
                    + "( "
                    + "'" + siteId + "',"
                    + "'" + siteName + "'"
                    + ")"
                    );
                }







                //Per each Row[0-~]
                for (int rowIndex = 0; rowIndex < dt.Rows.Count; rowIndex++)
                {
                    DataRow curRow = dt.Rows[rowIndex];
                    string[] dateCombo = curRow[0].ToString().Split(' ');

                    //check if got to the end of file
                    if (dateCombo.Length == 1)
                        break;

                    string week = dateCombo[1].Trim();
                    string year = dateCombo[2].Trim();
                    string value = dt.Rows[rowIndex][colIndex].ToString().Trim();

                    float calValue;
                    if (value == "")
                        calValue = 0;
                    else
                    {
                        //Apply Filter
                        calValue = float.Parse(this.applyFiltering(value.ToString()));

                        if (float.Parse(value) > 0)
                            calValue = float.Parse(value) * float.Parse("3.986") / float.Parse("2.1");
                        if (float.Parse(value) < 0)
                            calValue = float.Parse(value) / float.Parse("1.253");
                    }




                    accessFile.execute("insert into Data (siteId,_weekNum,_year,_calValue) values"
                    + "( "
                    + "'" + siteId + "',"
                    + "'" + week + "',"
                    + "'" + year + "',"
                    + "'" + calValue + "'"
                    + ")"
                    );
                }//column iteraton End
            }//Row Itteration End

            accessFile.terminate();

            //MessageBox.Show("'<>' # : " + this.firstMatchCounter.ToString());
            //MessageBox.Show("'summit' # : " + this.secondMatchCounter.ToString());

            //Load access File data 
            library.oledbConn accessFile2 = new library.oledbConn(this.accessFilePath, "mdb");
            DataSet ds = accessFile2.fetch("SELECT * FROM Data d inner join Sites s on s.siteId=d.siteId");
            //dataGridView2.DataSource = ds.Tables[0].DefaultView;
            accessFile2.terminate();
        }


    }
}
namespace library
{
    public class library
    {
        public library() { }
        public static MatchCollection findeMathes(string ch, string input)
        {
            return Regex.Matches(input, @"[\'" + ch + "']", RegexOptions.IgnoreCase);
        }
        public static string replaceMatches(string ch, string replaceCh, string input)
        {
            return Regex.Replace(input, @"[\'" + ch + "']", replaceCh, RegexOptions.IgnoreCase);
        }
    }
    public class oledbConn : library
    {
        private OleDbConnection conn;

        public oledbConn(string path, string fileType)
        {
            string connectionstring = "";

            if (fileType == "xls")
                connectionstring = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + path + ";" + "Extended Properties=Excel 8.0;";
            if (fileType == "mdb")
                connectionstring = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + path + ";";

            this.conn = new OleDbConnection(connectionstring);
            this.conn.Open();
        }

        public DataSet fetch(string query)
        {
            OleDbTransaction trans = this.conn.BeginTransaction();

            OleDbCommand comm = new OleDbCommand();
            comm.CommandText = query;
            comm.Connection = this.conn;
            comm.Transaction = trans;

            OleDbDataAdapter adapter = new OleDbDataAdapter();
            adapter.SelectCommand = comm;
            DataSet ds = new DataSet();
            adapter.Fill(ds, "tbl_0");

            trans.Commit();

            return ds;
        }
        public void execute(string query)
        {
            OleDbTransaction trans = this.conn.BeginTransaction();

            OleDbCommand comm = new OleDbCommand();
            comm.Connection = this.conn;
            comm.CommandText = query;
            comm.Transaction = trans;

            comm.ExecuteNonQuery();

            trans.Commit();
        }
        public void terminate()
        {
            this.conn.Close();
            this.conn.Dispose();
        }
    }
}
