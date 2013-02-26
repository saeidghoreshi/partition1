using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.SqlClient;

namespace WTopology.Classes
{

    public class resource
    {
        public int ID;
        public int parentID;
        public string title;
        public string description;
        /// <summary>
        /// get data table of  resource table from database and make Enumerable from it
        /// </summary>
        /// <param name="dt"></param>
        public static List<resource> getResourceList(DataTable dt)
        {
            List<resource> result = new List<resource> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                var node = new resource()
                {
                    ID= Convert.ToInt32(dt.Rows[i][0]),
                    parentID= Convert.ToInt32(dt.Rows[i][1]),
                    title= Convert.ToString(dt.Rows[i][2]),
                    description= Convert.ToString(dt.Rows[i][3])
                };
                result.Add(node);
                
            }
            return result;
        }
    }
    public class treeNode
    {
        public Nullable<int> ID;
        public Nullable<int> parentID;
        public string title;
        public string colorCode;
        public string description;

        public List<treeNode> children;
    }
    public class flatNode
    {
        public Nullable<int> ID;
        public Nullable<int> parentID;
        public string title;
        public string colorCode;
        public string description;
    }
    public static class library
    {
        public static List<treeNode> categorizeTree(DataTable dt)
        {
            List<treeNode> tree = new List<treeNode> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (string.IsNullOrEmpty(dt.Rows[i]["parentID"].ToString()))
                {
                    var node = new treeNode()
                    {
                        ID = dt.Rows[i]["ID"] as Nullable<int>,
                        parentID = dt.Rows[i]["parentID"] as Nullable<int>,
                        title = dt.Rows[i]["title"] as string,
                        colorCode = dt.Rows[i]["colorCode"] as string,
                        description = dt.Rows[i]["description"] as string,

                        children = new List<treeNode>() { }
                    };
                    tree.Add(node);
                }
            }


            foreach (var item in tree)
                library.categorizeTreeRec(item, dt);

            return tree;
        } //BFS

        public static void categorizeTreeRec(treeNode node, DataTable dt)
        {
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (dt.Rows[j]["parentID"] as Nullable<int> == node.ID)
                {
                    var _node = new treeNode()
                    {
                        ID = dt.Rows[j]["ID"] as Nullable<int>,
                        parentID = dt.Rows[j]["parentID"] as Nullable<int>,
                        title = dt.Rows[j]["title"].ToString(),
                        colorCode = dt.Rows[j]["colorCode"] as string,
                        description = dt.Rows[j]["description"].ToString(),

                        children = new List<treeNode>()
                    };
                    node.children.Add(_node);
                }
            }
            for (int j = 0; j < node.children.Count; j++)
                categorizeTreeRec(node.children[j], dt);
        }

        public static List<flatNode> categorizeFlat(DataTable dt)   //DFS
        {
            List<flatNode> Flat = new List<flatNode> { };
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (string.IsNullOrEmpty(dt.Rows[i]["parentID"].ToString()))
                {
                    var node = new flatNode()
                    {
                        ID = dt.Rows[i]["ID"] as Nullable<int>,
                        parentID = dt.Rows[i]["parentID"] as Nullable<int>,
                        title = dt.Rows[i]["title"] as string,
                        colorCode = dt.Rows[i]["colorCode"] as string,
                        description = dt.Rows[i]["description"] as string
                    };
                    Flat.Add(node);
                    library.categorizeFlatRec(Flat, node, dt);
                }
            }

            return Flat;
        }

        public static void categorizeFlatRec(List<flatNode> Flat, flatNode node, DataTable dt)
        {
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                if (dt.Rows[j]["parentID"] as Nullable<int> == node.ID)
                {
                    var _node = new flatNode()
                    {
                        ID = dt.Rows[j]["ID"] as Nullable<int>,
                        parentID = dt.Rows[j]["parentID"] as Nullable<int>,
                        title = dt.Rows[j]["title"] as string,
                        colorCode = dt.Rows[j]["colorCode"] as string,
                        description = dt.Rows[j]["description"] as string
                    };
                    Flat.Add(_node);
                    library.categorizeFlatRec(Flat, _node, dt);
                }
            }
        }
    }
}