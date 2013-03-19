var orgChartVerticalClass;

(function ($$) {
    (function ($) {
        
        orgChartVerticalClass = Class.create({
            initialize: function (config) {
                this.config = config;
            },
			
            viewTasks: function () {
                var me = this;
                
                me.resetDrawing();
                
                $.ajax(
                {
                    url: "/workflow/json_readWorkFlow"
                }
                ).done(function(data)
                {
                    
                    me.RawNodes = data;
                    me.buildTree(me.config.pos);

                    var taskID=13;
                    me.pushTaskSequenceLayer(taskID);
                   
                });
            }, 

            
            //Build the Map using BFS
            buildTree: function () {
            
                
                var me = this;

                var basePos ={};
                basePos.left=500;
                basePos.top=50;

                draw2d.Connection.setDefaultRouter(new draw2d.FanConnectionRouter());
                me.config.workflow = new draw2d.Workflow(me.config.parentID);

                //var newNode = new draw2d.Person(me.RawNodes[0].logo + '.png');
                var newNode = new draw2d.Person('/jsplugins/workflow/images/logo3.png');
                newNode.setDeleteable(false);
                newNode.setSelectable(false);
                newNode.setCanDrag(false);
                

                var left = basePos.left ;
                var top = basePos.top;
                me.config.workflow.addFigure(newNode, left, top);
                
                me.pushOrgNameLayer(left, top, me.RawNodes[0].org_name);


                //initiate array of parent-child connection in form of [ [p,c],[p,c],... ]
                me.RawNodesConnection = [];
                
                /*  :::: That is how it works ::::
                    rawNodes flat data store will be fetched and in each iteration guiNode will be built and add to the the row Dynamically
                */
                me.RawNodes[0].gui=newNode;

                //Recursive iteration
                me.buildTreeRec(me.RawNodes[0], 150/*base dist*/);

                //build Connections
                me.buildNodeConnections();

            },

            //BFS
            buildTreeRec: function (parent, dist) {
                var me = this;

                //List Of Draw2D Nodes
                var guinodes = []

                for (var i = 0; i < parent.children.length; i++) {

                    //var newNode = new draw2d.Person(parent.children[i].logo + '.png');
                    var newNode = new draw2d.Person('/jsplugins/workflow/images/logo3.png');
                    
                    newNode.setDeleteable(false);
                    newNode.setSelectable(false);
                    newNode.setCanDrag(false);
                    //newNode.addClass('Possible Class');

                    var childrenLength = parent.children.length;

                    if (childrenLength % 2 == 1) {
                        var left = parent.gui.x + dist * (i - childrenLength / 2);
                        var top = parent.gui.y + 70;
                        me.config.workflow.addFigure(newNode, left, top);
                    }
                    
                    if (childrenLength % 2 == 0 && (dist * (i - childrenLength / 2)) < 0) {
                        var left = parent.gui.x + dist * (i - childrenLength / 2);
                        var top = parent.gui.y + 70;
                        me.config.workflow.addFigure(newNode, left, top);
                    }
                    else {
                        var left = parent.gui.x + dist * (i - childrenLength / 2 + 1);
                        var top = parent.gui.y + 70;
                        me.config.workflow.addFigure(newNode, left, top);
                    }

                    

                    guinodes[i] = newNode;

                    me.RawNodesConnection.push([parent.gui, newNode]);

                    me.pushOrgNameLayer(left, top, parent.children[i].org_name);
                }

                for (var i = 0; i < parent.children.length; i++) 
                {
                    //Add Extra Field
                    parent.children[i].gui=guinodes[i];
                    me.buildTreeRec(parent.children[i], dist - 45/*indent*/);
                }
            },

			//Visualize node connections
            buildNodeConnections: function () {

                var me = this;

                for (var i = 0; i < me.RawNodesConnection.length; i++) {

                    var c = new draw2d.Connection();
                    c.setSource(me.RawNodesConnection[i][0].inputPort);
                    c.setTarget(me.RawNodesConnection[i][1].inputPort);
                    me.config.workflow.addFigure(c);
                }
                //draw2d.Person.prototype.onDoubleClick = function () {};
            },
            
            //Adding Org Name One by One
            pushOrgNameLayer: function (left, top, title) {
                var me = this;


                //area around GUi Nodes to grab Clicking and other events
                var id = helperLib.idGenerator(me.config.parentID);
                var surrondArea=$('<div id="' + id + '"></div>');
                $('#'+me.config.parentID).append(surrondArea);
                surrondArea.css("width", 50);
                surrondArea.css("height", 50);
                surrondArea.css("border", '1px solid transparent');
                surrondArea.css("position", 'absolute');
                surrondArea.css("left", left );
                surrondArea.css("top", top );
                surrondArea.css("z-index", 99999999);

                //Nmae Tag
                var id = helperLib.idGenerator(me.config.parentID);
                $('#'+me.config.parentID).append('<div id="' + id + '"></div>');
                var tag = $('#' + id);

                tag.addClass('tags');
                tag.css("width", '60px');
                tag.css("height", '15px');
                tag.css("position", 'absolute');
                tag.css("padding", '2px');
                tag.css("left", left);
                tag.css("top", top+40 );
                tag.css("border", '1px solid #C6C6C6');
                tag.css("background-color", '#eee');
                tag.css("font-family", 'verdana');
                tag.css("font-size", '10px');
                tag.css("opacity", '70');
                tag.css("filter", 'alpha(opacity = 70)');
                tag.css("z-index", '120');
                tag.css("border-radius", 2);
                tag.html(title);


                surrondArea.attr('title',new Date());
                surrondArea.tipsy({title: 'title',gravity: 'nw'});
                
            },

			//push task Sequence per Task - user
            pushTaskSequenceLayer: function (taskID) {

                var me = this;

                //Clear sequence tags
                me.clearSeqTags();
                
                
                $.ajax(
                {
                    url: "/workflow/json_getTaskAssignedUsers",
                    type: "get",
                    data: {task_id: taskID}
                }).done(function (data) {

                    me.config.taskUserSequence = data;
                    
                    //keep track of each node sequence tag count
                    var eachNodeSeqTagCounter = {}
                    
                    for (var i = 0; i < data.length; i++) {

                        //find node then add Sequence-tag
                        var node = null;
                        if (eachNodeSeqTagCounter[data[i].org_id] == null)
                            eachNodeSeqTagCounter[data[i].org_id] = 0;
                        else
                            eachNodeSeqTagCounter[data[i].org_id]++;

                        for (var j = 0; j < me.RawNodes.length; j++) {
                        
                            if (me.RawNodes[j].org_id == data[i].org_id) {

                                node = me.RawNodes[j].gui;


                                //build tag
                                var id = helperLib.idGenerator(me.config.parentID);
                                $('#'+me.config.parentID).append('<div id="' + id + '"></div>');
                                var tag = $('#' + id);

                                tag.addClass('Sequence-tags');
                                tag.css("width", '20px');
                                tag.css("height", '20px');
                                tag.css("position", 'absolute');
                                tag.css("left", (node.x + ((eachNodeSeqTagCounter[data[i].org_id]) * 15)).toString() + 'px');
                                tag.css("top", (node.y - 5).toString() + 'px');
                                tag.css("opacity", '70');
                                tag.css("filter", 'alpha(opacity = 70)');
                                tag.css("z-index", '120');
                                tag.html("<img src='/components/index1/orgChartVertical/img/roundIconsSequence/" + (i + 1).toString() + ".png' />");
                                break;
                            }
                        }
                    }


                });
            },
            
            clearTags:function(){$('.tags').remove();},
            clearSeqTags:function(){$('.Sequence-tags').remove();},
            resetDrawing: function () {

                var me = this;
                me.clearTags();
                me.clearSeqTags();  
                delete $('#'+me.config.parentID).children();
                $('#'+me.config.parentID).children().remove();  
                $("#" + me.config.parentID).html('');
            },

            //build task List /User
            buildUserTasksList:function()
            {
                var me=this;
                $.ajax(
                {
                    url:"/workflow/buildUserTasksList",
                    type:"get"
                }).done(function(html)
                {
                    $("#List-1").html(html);
                    $('#tasksList').sortable
					(
						{
						    axis: "y",
						    placeholder: "placeholder"
						}
					).disableSelection();
                });
                
                $('body').undelegate(".task","click").delegate(".task","click",function(e)
                {
                    var taskID=$(this).attr("taskID");
                    
                    me.pushTaskSequenceLayer(taskID);

                    e.stopPropagation();
                    return false;
                });
            },


            /*List of all organization*/
            handleUserOrgTree:function()
            {
                $('#tree').tree({
	                onClick: function(node){
		                alert(node.id);  
	                }
                });
            },


            //Operations
            newTask:function()
            {
                var me=this;
                me.TskCreateAssignment=new TskCreateAssignmentClass({containerID:me.config.parentID}); 
            },
            myTasks:function(){}
        });

    } (jQuery));
} (Prototype));


