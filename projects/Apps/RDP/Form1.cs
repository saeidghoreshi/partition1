using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

using MSTSCLib;
using CustomizedTabControl;

namespace RdpProject
{
    
    public partial class Form1 : Form
    {
        List<RDP> repo = new List<RDP>();
        ImageList myImageList = new ImageList();

        public Form1()
        {
            InitializeComponent();

            rdpTabs.TabPages.Clear();
            FillRepository();

            buildTree();
            
        }
        public void buildTree() 
        {
            FillRepository();
            treeView1.Nodes.Clear();
            
            foreach (var item in repo)
            {
                if (item.parentID == -1)
                {
                    TreeNode node = new TreeNode(item.serverName);
                    node.ImageIndex = 0;
                    node.SelectedImageIndex = 0;

                    treeView1.Nodes.Add(node);
                    buildTreeRecDFS(node,item);
                }                    
            }
            treeView1.ExpandAll();
        }
        void buildTreeRecDFS(TreeNode parentNode,RDP parentNodeData) 
        {
            foreach (var item in repo)
            {
                if (parentNodeData.ID == item.parentID)
                {
                    TreeNode node = new TreeNode(item.serverName);
                    node.ImageIndex = 0;
                    node.SelectedImageIndex= 0;

                    parentNode.Nodes.Add(node);
                    buildTreeRecDFS(node, item);
                }
            }
        }
        
        AxMSTSCLib.AxMsTscAxNotSafeForScripting rdp = null;
        private void treeView1_NodeMouseDoubleClick(object sender, TreeNodeMouseClickEventArgs e)
        {
            //Create New RDP Object
            rdp=null;
            rdp = new AxMSTSCLib.AxMsTscAxNotSafeForScripting();
            rdp.Size = new Size(1430, this.Height-80);
         
            //Get Selected Node
            TreeNode nodClicked = e.Node;
            RDP selectedRDP = repo.Find(x => x.serverName == nodClicked.Text);
            if (selectedRDP.serverIP == "-1")
                return;
            
            try
            {
                //Check if connection is already open
                foreach (TabPage t in rdpTabs.TabPages)
                    if (t.Text == nodClicked.Text)
                        throw new InvalidConstraintException("connection is already up");

                //Building the tab
                TabPage tab = new TabPage(selectedRDP.serverName);
                
                tab.Controls.Add(rdp);
                rdpTabs.TabPages.Add(tab);
                
                rdpTabs.SelectedIndex = rdpTabs.TabPages.Count - 1;
                IMsTscNonScriptable secured = (IMsTscNonScriptable)rdp.GetOcx();
                rdp.Server = selectedRDP.serverIP;
                rdp.UserName = selectedRDP.username;
                secured.ClearTextPassword = selectedRDP.password;

                rdp.Connect();
            }
            catch (InvalidConstraintException x)
            {
                MessageBox.Show(x.Message, x.Message + " for " + selectedRDP.serverName, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch{}
            /*
            try
            {
                // Check if connected before disconnecting
                if (rdp.Connected.ToString() == "1")
                    rdp.Disconnect();
            }
            catch (Exception Ex)
            {
                MessageBox.Show("Error Disconnecting", "Error disconnecting from remote desktop " + txtServer.Text + " Error:  " + Ex.Message, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            */
        }
        public void FillRepository()
        {
            myImageList.Images.Add(Image.FromFile(Environment.CurrentDirectory+ @"\rdp.png"));
            treeView1.ImageList = myImageList;

            repo = lib.RdpListFromXml(Environment.CurrentDirectory + @"\rdps.xml");

        }

        private void Form1_SizeChanged(object sender, EventArgs e)
        {
            if (this.WindowState == FormWindowState.Maximized)
            {
                treeView1.Height = this.Height-50;
                rdpTabs.Height = this.Height - 50;
            }
        }

        private void newToolStripMenuItem_Click(object sender, EventArgs e)
        {
            NewRdp f = new NewRdp();
            f.ShowDialog();
        }


        
    }
   


}