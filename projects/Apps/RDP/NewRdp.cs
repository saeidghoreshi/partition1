using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;


namespace RdpProject
{
    public partial class NewRdp : Form
    {
        public NewRdp()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var list=lib.RdpListFromXml(Environment.CurrentDirectory + @"\rdps.xml");

            list.Add(new RDP() 
            {
                ID=list.Count+1,
                parentID=-1,
                serverName=txt_server.Text.Trim(),
                serverIP=txt_ip.Text.Trim(),
                username=txt_uname.Text.Trim(),
                password=txt_pass.Text.Trim()
            });

            System.Xml.Serialization.XmlSerializer writer =new System.Xml.Serialization.XmlSerializer(list.GetType());
            System.IO.StreamWriter file =new System.IO.StreamWriter( Environment.CurrentDirectory+"\\rdps.xml");

            writer.Serialize(file, list);
            file.Close();

            Program.form1.buildTree();
            Program.form1.Controls["treeView1"].Refresh();
            this.Close();
        }
    }
}
