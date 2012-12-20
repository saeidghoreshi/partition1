Class('workflow1ControllerClass',
{
    has:
        {
            config:
            {
                is: 'rw',
                init: {}
                //id  , Nodes , workflow    ,nodeConnections [sourcenode,Targetnode]  , nodeCounter   , pos
            }
        },


    methods:
        {
            initialize: function (config) {
                var me = this;

                me.config = config;
            },
            init: function () {
                var me = this;

                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Name');
                data.addColumn('string', 'Manager');
                data.addColumn('string', 'ToolTip');
                data.addRows([
                          [{ v: 'Carol1', f: '<div class="node" myId=1 style="width:50px;height:50px"></div>' }, '', ''],
                          [{ v: 'Carol2', f: '<div class="node" myId=2 style="width:50px;height:50px"></div>' }, 'Carol1', ''],
                          [{ v: 'Carol3', f: '<div class="node" myId=3 style="width:50px;height:50px"></div>' }, 'Carol1', ''],
                          [{ v: 'Carol4', f: '<div class="node" myId=4 style="width:50px;height:50px"></div>' }, 'Carol1', ''],
                          [{ v: 'Carol5', f: '<div class="node" myId=5 style="width:50px;height:50px"></div>' }, 'Carol3', ''],
                          [{ v: 'Carol6', f: '<div class="node" myId=6 style="width:50px;height:50px"></div>' }, 'Carol5', ''],
                          [{ v: 'Carol7', f: '<div class="node" myId=7 style="width:50px;height:50px"></div>' }, 'Carol5', ''],
                          [{ v: 'Carol8', f: '<div class="node" myId=8 style="width:50px;height:50px"></div>' }, 'Carol5', ''],
                          [{ v: 'Carol9', f: '<div class="node" myId=9 style="width:50px;height:50px"></div>' }, 'Carol5', ''],
                          [{ v: 'Carol10', f: '<div class="node" myId=10 style="width:50px;height:50px"></div>' }, 'Carol5', ''],
                          [{ v: 'Carol11', f: '<div class="node" myId=11 style="width:50px;height:50px"></div>' }, 'Carol5', ''],

                          [{ v: 'Carol12', f: '<div class="node" myId=7 style="width:50px;height:50px"></div>' }, 'Carol6', ''],
                          [{ v: 'Carol13', f: '<div class="node" myId=8 style="width:50px;height:50px"></div>' }, 'Carol6', ''],
                          [{ v: 'Carol14', f: '<div class="node" myId=9 style="width:50px;height:50px"></div>' }, 'Carol6', ''],
                          [{ v: 'Carol15', f: '<div class="node" myId=10 style="width:50px;height:50px"></div>' }, 'Carol6', ''],
                          [{ v: 'Carol16', f: '<div class="node" myId=11 style="width:50px;height:50px"></div>' }, 'Carol6', '']

                        ]);

                var chart = new google.visualization.OrgChart(document.getElementById(me.config.id));
                chart.draw(data, { allowHtml: true });

                $('.node').die("click").live({ click: function () {

                    var mee = this;
                    //alert($(this).attr("myId"));

                    var left = mee.x + 35;
                    var top = mee.y - 10;
                    if (o1 != null) return;

                    //get task Assigned user


                    var H = '';
                    for (var i = 0; i < me.config.taskUserSequence.length; i++) {
                        if (me.config.taskUserSequence[i].org_id == me.getNodeByGui(mee).org_id) {
                            var node = me.config.taskUserSequence[i];
                            H += node.fname + ' ' + node.lname + '<br/>';
                        }
                    }
                    if (H == '') return;


                    var c =
                            {
                                pId: "wf-1",
                                left: left,
                                top: top,
                                header: data.result[0].street + ', ' + data.result[0].city + ', ' + data.result[0].postalcode,
                                content: H
                            }

                    app.hideAllPopUpPanels();
                    //var o1 = new tooltip1Class(c);
                    //var o1 = new tooltip2Class(c);
                    //var o1 = new tooltip2Class(c);
                }
                });

                $('.node').die("mouseover").live({ mouseover: function () {


                }
                });


                return;
                //delete all layers
                me.deleteAll();

                $.ajax(
                {
                    url: "/workflow/json_readWorkFlow",
                    type: "get"

                }
                ).done(function (data) {

                    me.config.Nodes = data;




                    //                    me.buildTree(me.config.pos);
                    //                    me.pushTaskSequenceLayer();
                    //                    me.assignEvents();
                });
            }, //Function End



            //Visualize node connections
            buildNodeConnections: function () {

                var me = this;

                for (var i = 0; i < me.config.nodesConnection.length; i++) {

                    var c = new draw2d.Connection();
                    c.setSource(me.config.nodesConnection[i][0].inputPort);
                    c.setTarget(me.config.nodesConnection[i][1].inputPort);
                    me.config.workflow.addFigure(c);
                }



                if (me.config.enableDetails == true) {

                    draw2d.Person.prototype.onDoubleClick = function () {


                        app.hideAllPopUpPanels();

                        var mee = this;
                        $.ajax
                        (
                        {
                            url: "/home/json_getOfficeDetails",
                            type: "get",
                            data: { org_id: me.getNodeByGui(mee).org_id }
                        }
                        ).done(function (data) {

                            var left = mee.x + 35;
                            var top = mee.y - 10;
                            if (o1 != null) return;

                            //get task Assigned user


                            var H = '';
                            for (var i = 0; i < me.config.taskUserSequence.length; i++) {
                                if (me.config.taskUserSequence[i].org_id == me.getNodeByGui(mee).org_id) {
                                    var node = me.config.taskUserSequence[i];
                                    H += node.fname + ' ' + node.lname + '<br/>';
                                }
                            }
                            if (H == '') return;


                            var c =
                            {
                                pId: "wf-1",
                                left: left,
                                top: top,
                                header: data.result[0].street + ', ' + data.result[0].city + ', ' + data.result[0].postalcode,
                                content: H
                            }

                            app.hideAllPopUpPanels();
                            //var o1 = new tooltip1Class(c);
                            //var o1 = new tooltip2Class(c);
                            //var o1 = new tooltip2Class(c);
                        });

                    };

                }

            },
            buildTree: function () {
                //BFS
                var me = this;

                var basePos = me.config.pos;

                draw2d.Connection.setDefaultRouter(new draw2d.FanConnectionRouter());
                me.config.workflow = new draw2d.Workflow(me.config.id);


                var newNode = new draw2d.Person(me.config.Nodes[0].logo + '.png');
                newNode.setDeleteable(false);
                newNode.setSelectable(false);
                newNode.setCanDrag(false);


                var left = basePos.left + 400;
                var top = basePos.top;
                me.config.workflow.addFigure(newNode, left, top);

                //add tag
                me.pushOrgLayer(left, top, me.config.Nodes[0].org_name);


                me.config.nodeCounter = 0;
                me.config.nodesListCounter = 0;

                me.config.nodesConnection = [];
                me.config.nodesList = [];
                me.config.nodesList[0] = { dataNode: me.config.Nodes[0], gui: newNode }

                //start recursive iteration
                me.buildTreeRec({ dataNode: me.config.Nodes[0], gui: newNode }, 150/*base dist*/);

                //build Connections
                me.buildNodeConnections();

            },

            buildTreeRec: function (parent, dist) {
                var me = this;

                var guinodes = []
                for (var i = 0; i < parent.dataNode.children.length; i++) {


                    var newNode = new draw2d.Person(parent.dataNode.children[i].logo + '.png');
                    newNode.setDeleteable(false);
                    newNode.setSelectable(false);
                    newNode.setCanDrag(false);

                    //newNode.addClass('ter');

                    var childrenLength = parent.dataNode.children.length;

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

                    //add tag
                    me.pushOrgLayer(left, top, parent.dataNode.children[i].org_name);


                    guinodes[i] = newNode;
                    me.config.nodesConnection[me.config.nodeCounter++] = [parent.gui, newNode];
                }

                for (var i = 0; i < parent.dataNode.children.length; i++) {

                    me.config.nodesList[++me.config.nodesListCounter] = { dataNode: parent.dataNode.children[i], gui: guinodes[i] }
                    me.buildTreeRec({ dataNode: parent.dataNode.children[i], gui: guinodes[i] }, dist - 45/*indent*/);
                }
            },

            //Interfaces
            enableDetails: function (stat) {

                this.config.enableDetails = stat;
            },
            getNodeByGui: function (guiNode) {
                var me = this;

                for (var i = 0; i < me.config.nodesList.length; i++)
                    if (me.config.nodesList[i].gui == guiNode)
                        return me.config.nodesList[i].dataNode;
            },
            deleteAll: function () {

                var me = this;
                $("#" + me.config.id).html('');

                $(".tags").each(function () {
                    $(this).remove();
                });
                $(".Sequence-tags").each(function () {
                    $(this).remove();
                });
            },

            pushOrgLayer: function (left, top, title) {
                var me = this;
                var id = app.idGenerator(me.config.id);
                $('body').append('<div id="' + id + '"></div>');
                var tag = $('#' + id);

                tag.addClass('tags');
                tag.css("width", '60px');
                tag.css("height", '15px');
                tag.css("position", 'absolute');
                tag.css("padding", '2px');
                tag.css("left", (left).toString() + 'px');
                tag.css("top", (top + 40).toString() + 'px');
                tag.css("border", '1px solid gray');
                tag.css("background-color", '#f2f2f2');
                tag.css("font-family", 'verdana');
                tag.css("font-size", '10px');
                tag.css("opacity", '70');
                tag.css("filter", 'alpha(opacity = 70)');
                tag.css("z-index", '120');
                tag.html(title);
            },

            pushTaskSequenceLayer: function () {

                var me = this;

                var Data =
                {
                    task_id: me.config.task_id
                }
                $.ajax(
                {
                    url: "/workflow/json_getTaskAssignedUsers",
                    type: "get",
                    data: Data
                }).done(function (data) {




                    me.config.taskUserSequence = data.result;

                    //keep track of each node sequence tag count
                    var eachNodeSeqTagCounter = {}

                    for (var k = 0; k < data.result.length; k++) {

                        //find node then add Sequence-tag
                        var node = null;
                        for (var i = 0; i < me.config.nodesList.length; i++) {

                            if (me.config.nodesList[i].dataNode.org_id == data.result[k].org_id) {

                                if (eachNodeSeqTagCounter[data.result[k].org_id] == null)
                                    eachNodeSeqTagCounter[data.result[k].org_id] = 0;
                                else
                                    eachNodeSeqTagCounter[data.result[k].org_id]++;

                                node = me.config.nodesList[i].gui;


                                //build tag
                                var left = node.x;
                                var top = node.y;

                                var id = app.idGenerator(me.config.id );
                                $('body').append('<div id="' + id + '"></div>');
                                var tag = $('#' + id);

                                tag.addClass('Sequence-tags');
                                tag.css("width", '20px');
                                tag.css("height", '20px');
                                tag.css("position", 'absolute');
                                tag.css("left", (left + ((eachNodeSeqTagCounter[data.result[k].org_id]) * 15)).toString() + 'px');
                                tag.css("top", (top - 5).toString() + 'px');
                                tag.css("opacity", '70');
                                tag.css("filter", 'alpha(opacity = 70)');
                                tag.css("z-index", '120');
                                tag.html("<img src='/resources/components/workflow1/map/images/roundIconsSequence/" + (k + 1).toString() + ".png' />");

                                break;
                            }
                        }
                    }


                });
            },
            assignEvents: function () {

                var me = this;

                //                $('#'+me.config.id+':not(.ter)').live('click', function (e) {

                //                    app.hideAllPopUpPanels();
                //                });

            }
        }//Methods End
});
