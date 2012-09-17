Class('archiveClass',
{
    has:
        {
            config:
            {
                is: 'rw',
                init: {}
            }
        },


    methods:
        {

            initialize: function (config) {
                var me = this;
                
                me.config = config;
                me.config.id = app.idGenerator('placeholder');
                $('#' + me.config.parentId).html('<div id=' + me.config.id + '></div>');
            },
            getId: function () {
                var me = this;
                return me.config.id;
            },


            init: function () {

                var me = this;
                
                me.loadDocumentorACL();

            },


            findRecordById: function (source, id) {

                var me = this;
                for (var i = 0; i < source.length; i++) {
                    if (source[i].id == id)
                        return source[i];
                }
            },

            loadDocumentorACL: function () {

                var me = this;
                

                var D = app.openDialog('Enter Your Keyword', { width: 150, height: 80 });
                var ph1 = D.phId;

                $.ajax(
                    {
                        url: "/notebook/json_getDocumentorACLForm",
                        type: "get"
                    }).done(function (data) {


                        app.tagReady(ph1, function () {

                            $('#' + ph1).html(data.result);
                            $('#enterkeyword_btn').button().die("click").live({ click: function () {

                                var Data =
                                {
                                    keyword: $('#enterkeyword_name').val()
                                }
                                $.ajax(
                                {
                                    url: "/notebook/json_getFolderingForm",
                                    type: "post",
                                    data: Data
                                }).done(function (data) {

                                    app.closeDialog(D);

                                    $("#" + me.config.id).html(data.result);

                                    var leftpanel = "foldering_leftPanel";
                                    app.tagReady(leftpanel, function () {
                                        me.buildComponent(leftpanel);
                                    });

                                });

                            }

                            });
                        });

                    });
            },

            buildComponent: function (phId) {
                var me = this;

                //loading Block
                app.maskUI(me.config.parentId, "Loading ...");


                $.ajax({
                    url: "/notebook/json_getTopics",
                    type: "get"

                }).done(function (data) {

                    $('#' + phId).html("");
                    $('#' + phId).append("<ul id='dhtmlgoodies_tree2' class='dhtmlgoodies_tree'></ul>");
                    var root = $("#dhtmlgoodies_tree2");

                    me.config.records = data;
                    for (var i = 0; i < me.config.records.length; i++) {

                        root.append(
                        "<li noDrag='true' myId=" + me.config.records[i].id + " id='submenu_" + me.config.records[i].id + "'>"
                        + "<a class='foldering_subitem' id='submenu_a_" + me.config.records[i].id + "' myId=" + me.config.records[i].id + ">" + me.config.records[i].type_name + "</a>"
                        + "</li>"
                        );

                        var li = $("#submenu_" + me.config.records[i].id);

                        //Define Context Menu
                        me.defineContextMenu(me.config.records, li, me.config.records[i].id);

                        //Recursive Call
                        me.rec(me.config.records[i].children, li);

                    }
                    me.config.treeObj = new JSDragDropTree('../../resources/modules/folderTree/images/');
                    me.config.treeObj.setTreeId('dhtmlgoodies_tree2');
                    me.config.treeObj.setMaximumDepth(10);
                    me.config.treeObj.setMessageMaximumDepthReached('Maximum depth reached'); // If you want to show a message when maximum depth is reached, i.e. on drop.
                    me.config.treeObj.initTree();
                    me.config.treeObj.collapseAll();

                    //-----------Events Definitions
                    me.assignEventsProperties();


                    //Unblock Loading
                    app.unmaskUI(me.config.parentId);


                });
            },
            rec: function (children, li) {

                var me = this;
                var rendomId = app.idGenerator('item');

                li.append("<ul id=" + rendomId + "></ul>");
                var ul = $("#" + rendomId);


                //push children under UL
                for (var j = 0; j < children.length; j++) {
                    ul.append("<li  myId=" + children[j].id + " id='submenu_" + children[j].id + "'><a class='foldering_subitem' id='submenu_a_" + children[j].id + "' myId=" + children[j].id + ">" + children[j].type_name + "</a></li>");

                    var li = $("#submenu_" + children[j].id);

                    //Define Context Menu
                    me.defineContextMenu(children, li, children[j].id);

                    if (children[j].children.length != 0)
                        me.rec(children[j].children, li);
                }

            }, //End Recursive sub menu builder
            defineContextMenu: function (source, li, dataId) {
                var me = this;

                //define context Menu on Items
                var contextMenuConfig =
                        {
                            id: li.attr("id"),
                            menusubItems:
                            [
                                { dataId: dataId, title: "New",
                                    func: function (dataId) {

                                        //Build Form first
                                        var dialog = app.openDialog('Topic Details', { width: 650, height: 530 });
                                        var Id1 = dialog.phId;
                                        //Push Form
                                        $.ajax({
                                            url: "/notebook/json_getTopicDetailsForm",
                                            type: "get"
                                        }).done(function (data) {

                                            //load Edit panel 
                                            var parsedHtml = data.result.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '<br/>')
                                            $("#" + Id1).html(parsedHtml);


                                            //build YUI Rixch editor
                                            var Dom = YAHOO.util.Dom;
                                            var Event = YAHOO.util.Event;

                                            //The SimpleEditor config 
                                            var myConfig = {
                                                width: '600px',
                                                height: '300px',
                                                dompath: true,
                                                focusAtStart: true
                                            };

                                            //Now let's load the SimpleEditor.. 
                                            var myEditor = new YAHOO.widget.SimpleEditor('foldering_editPanel_detail', myConfig);
                                            myEditor.render();


                                            //assign events and properties
                                            var record = me.findRecordById(source, dataId);

                                            $("#foldering_editPanel_id").val(record.id);

                                            $("#foldering_editPanel_saveBtn").button();
                                            //save action on form
                                            $("#foldering_editPanel_saveBtn").click(function () {

                                                myEditor.saveHTML();
                                                var html = myEditor.get('element').value;


                                                var Data =
                                                {
                                                    foldering_editPanel_detail: escape(html),
                                                    foldering_editPanel_id: $("#foldering_editPanel_id").val(),
                                                    foldering_editPanel_title: $("#foldering_editPanel_title").val()
                                                }
                                                $.ajax(
                                                {
                                                    url: "/notebook/json_createNewTopic",
                                                    type: "post",
                                                    data: Data
                                                }).done(function (data) {

                                                    app.closeDialog(dialog);


                                                    var leftpanel = "foldering_leftPanel";
                                                    app.tagReady(leftpanel, function () {
                                                        me.buildComponent(leftpanel);
                                                    });
                                                });

                                            });
                                        });

                                    } //func end
                                },
                                { dataId: dataId, title: "Edit",
                                    func: function (dataId) {

                                        //Build Form first
                                        
                                        var dialog = app.openDialog('Topic Details', { width: 650, height: 530 });
                                        var Id1 = dialog.phId;

                                        //Push Form
                                        $.ajax({
                                            url: "/notebook/json_getTopicDetailsForm",
                                            type: "get"
                                        }).done(function (data) {

                                            //load Edit panel 
                                            var parsedHtml = data.result.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '<br/>')
                                            $("#" + Id1).html(parsedHtml);


                                            //build YUI Rixch editor
                                            var Dom = YAHOO.util.Dom;
                                            var Event = YAHOO.util.Event;

                                            //The SimpleEditor config 
                                            var myConfig = {
                                                width: '600px',
                                                height: '300px',
                                                dompath: true,
                                                focusAtStart: true
                                            };

                                            //Now let's load the SimpleEditor.. 
                                            var myEditor = new YAHOO.widget.SimpleEditor('foldering_editPanel_detail', myConfig);
                                            myEditor.render();





                                            //assign events and properties
                                            var record = me.findRecordById(source, dataId);

                                            $("#foldering_editPanel_title").val(record.type_title);
                                            $("#foldering_editPanel_detail").val(unescape(record.type_detail));
                                            $("#foldering_editPanel_id").val(record.id);

                                            $("#foldering_editPanel_saveBtn").button();
                                            $("#foldering_editPanel_saveBtn").click(function () {

                                                myEditor.saveHTML();
                                                var html = myEditor.get('element').value;

                                                var Data =
                                                {
                                                    foldering_editPanel_detail: escape(html),
                                                    foldering_editPanel_id: $("#foldering_editPanel_id").val(),
                                                    foldering_editPanel_title: $("#foldering_editPanel_title").val()
                                                }
                                                $.ajax(
                                                {
                                                    url: "/notebook/json_saveSelectedTopic",
                                                    type: "post",
                                                    data: Data
                                                }).done(function (data) {

                                                    app.closeDialog(dialog);


                                                    var leftpanel = "foldering_leftPanel";
                                                    app.tagReady(leftpanel, function () {
                                                        me.buildComponent(leftpanel);
                                                    });
                                                });

                                            });
                                        });
                                    }
                                }
                            ]
                        }

                me.config.contectMenu = new contextMenuClass(contextMenuConfig);

            },
            assignEventsProperties: function () {

                var me = this;
                //assign Buttons
                $("#foldering_saveorderingBtn").button();
                $("#foldering_deleteBtn").button();
                $("#foldering_rootBtn").button();
                $("#foldering_printBtn").button().die("click").live({ click: function () {

                    //show Alert
                   



                    var selectedNode = null;
                    $('.foldering_subitem').each(function () {
                        if ($(this).hasClass('treeViewComponentHighlightNode'))
                            selectedNode = $(this);
                    });



                    //fetch details an push in right side

                    $.ajax({
                        url: "/notebook/json_getTopicDetails",
                        type: "post",
                        data: { topic_id: $(selectedNode).attr("myId") }
                    }).done(function (data) {

                        var printWin = window.open('', '', 'height=400,width=600,scrollbars=yes,top=0,left=0,location=no');
                        var html =
                            '<html><head><title>Print</title>' +
                            '</head><body style="font-family:verdana;font-size:9.5px">' + unescape(data.result) +
                            '</body></html>';

                        printWin.document.write(html);
                        printWin.document.close();
                        printWin.print();

                    });
                }
                });



                $("#foldering_expandcollapseBtn").buttonset().click(function () { });


                //create root btn
                $("#foldering_rootBtn").die("click").live({ click: function () {

                    //Build Form first
                    var dialog = app.openDialog('Create Root Topic', { width: 650, height: 530 });
                    var Id1 = dialog.phId;

                    //Push Form
                    $.ajax({
                        url: "/notebook/json_getTopicDetailsForm",
                        type: "get"
                    }).done(function (data) {

                        //load Edit panel 
                        var parsedHtml = data.result.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '<br/>')
                        $("#" + Id1).html(parsedHtml);


                        //build YUI Rixch editor
                        var Dom = YAHOO.util.Dom;
                        var Event = YAHOO.util.Event;

                        //The SimpleEditor config 
                        var myConfig = {
                            width: '600px',
                            height: '300px',
                            dompath: true,
                            focusAtStart: true
                        };

                        //Now let's load the SimpleEditor.. 
                        var myEditor = new YAHOO.widget.SimpleEditor('foldering_editPanel_detail', myConfig);
                        myEditor.render();


                        $("#foldering_editPanel_saveBtn").button();
                        //save action on form
                        $("#foldering_editPanel_saveBtn").click(function () {

                            myEditor.saveHTML();
                            var html = myEditor.get('element').value;


                            var Data =
                                                {
                                                    foldering_editPanel_detail: escape(html),
                                                    foldering_editPanel_id: $("#foldering_editPanel_id").val(),
                                                    foldering_editPanel_title: $("#foldering_editPanel_title").val()
                                                }
                            $.ajax(
                                                {
                                                    url: "/notebook/json_createNewTopic",
                                                    type: "post",
                                                    data: Data
                                                }).done(function (data) {

                                                    app.closeDialog(dialog);

                                                    var leftpanel = "foldering_leftPanel";
                                                    app.tagReady(leftpanel, function () {
                                                        me.buildComponent(leftpanel);
                                                    });
                                                });

                        });
                    });
                }
                });

                //save ordering click
                $("#foldering_saveorderingBtn").die("click").live({ click: function () {

                    var newMapping = '';

                    $("#" + me.config.id + " li").each(function () {

                        var parent_id = '';
                        var id = '';


                        
                        if ($(this).parent().parent().attr("myId") == undefined)
                            parent_id = '';
                        else
                            parent_id = $(this).parent().parent().attr("myId");

                        id = $(this).attr("myId");

                        newMapping += parent_id + ',' + id + '-';

                    });

                    if (newMapping != '')
                        newMapping = newMapping.substring(0, newMapping.length - 1);


                    $.ajax(
                    {
                        url: "/notebook/json_saveOrdering",
                        type: "post",
                        data: { newOrdering: newMapping }
                    }
                    ).done(function (data) {

                        var leftpanel = "foldering_leftPanel";
                        app.tagReady(leftpanel, function () {
                            me.buildComponent(leftpanel);
                        });
                    });

                }
                });

                //Delete Button Action
                $("#foldering_deleteBtn").die("click").live({ click: function () {

                  

                    var isDeleteHappend = false;
                    $(".treeViewComponentHighlightNode").each(function () {

                        isDeleteHappend = true;
                        var Data =
                        {
                            topic_id: $(this).attr("myId")
                        }

                        $.ajax(
                        {
                            url: "/notebook/json_deleteTopic",
                            type: "post",
                            data: Data
                        }).done(function (data) {

                            var leftpanel = "foldering_leftPanel";
                            app.tagReady(leftpanel, function () {
                                me.buildComponent(leftpanel);
                            });
                        });
                    }); //Loop Finished
                    if (!isDeleteHappend)
                        alert('No Item Selected to be Deleted');
                }
                });

                //Node Click
                $(".foldering_subitem").click(function () {

                    $('.foldering_subitem').each(function () {
                        if ($(this).hasClass('treeViewComponentHighlightNode'))
                            $(this).removeClass('treeViewComponentHighlightNode');
                    });

                    $(this).addClass('treeViewComponentHighlightNode');


                    //fetch details an push in right side
                    $.ajax({
                        url: "/notebook/json_getTopicDetails",
                        type: "post",
                        data: { topic_id: $(this).attr("myId") }
                    }).done(function (data) {

                        //var parsedHtml = data.result.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, '<br/>')
                        $("#foldering_rightPanel").html(unescape(data.result));
                    });

                }); //End Click Evnt


                //Click on module area cloeses all contect menues related
                $('#' + me.config.parentId).die("click").live({ click: function (e) {

                    me.config.contectMenu.deleteAllContextMenu();
                    return false;
                }
                });

            }
        }//End Methods
});                                                                                                           //end Class