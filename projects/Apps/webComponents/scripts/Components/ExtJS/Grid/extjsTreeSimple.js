var extjs4SampleTree;
(function ($) {

	extjs4SampleTree=cls.define(
    { 
			id:null,
			

            init: function () {

                var me = this;

				me.id = lib.helper.idGenerator('ctrl');
                $('<div id=' + me.id + ' />')
                .appendTo('#' + me.config.parentID)
                .css({ height: $('#' + me.config.parentID).height() });
				
				
                var config =
                {
                    id: lib.helper.idGenerator('grid'),
                    renderTo: me.id,
                    width: "100%",
                    height: 500,
                    collapsible: false,

                    fields: ['id', 'firstCol', 'secondCol'],
                    sorters: false,
                    url: "/extjs4/json_test_treeview",
                    extraParams: {},

                    //properties
                    useArrows: true,
                    rootVisible: false,
                    multiSelect: false,
                    singleExpand: true,
                    cellEditing:false,

                    searchBar: true,

                    columns:
                    [
                        {
                            xtype: 'treecolumn',
                            dataIndex: 'firstCol',
                            editor:
                            {
                                allowBlank: false,
                                xtype: 'textfield'
                            },
                            width: 200,
                            text: 'firstCol'

                        },
                        {
                            text: 'secondCol',
                            dataIndex: 'secondCol',
                            flex: 1
                        }
                    ],

                    bottomLItems:
                    [{
                        xtype: 'button',
                        text: 'Get Order',
                        pressed: true,
                        handler: function () {

                            //get id-parentId collection
                            var idparentCollection = '';
                            for (var i = 0; i < me.ids.length; i++) {

                                //for nodes who are disabled from top parents
                                if (me.tree.getStore().getNodeById(me.ids[i].ID) == undefined) continue;

                                var record = me.tree.getStore().getNodeById(me.ids[i].ID).data;


                                idparentCollection += record.parentId + '-' + record.id + ',';
                            }
                            if (idparentCollection != '')
                                idparentCollection = idparentCollection.substring(0, idparentCollection.length - 1);

                            console.log(idparentCollection);

                        }
                    }],
                    rightItems:
                        [
                            {
                                xtype: 'button',
                                id: 'rightButton',
                                text: "right",
                                pressed: true
                            }
                        ],
                    leftItems:
                        [
                            {
                                xtype: 'button',
                                id: 'rightButton',
                                text: "Left",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {

                                        var records = me.tree.getView().getChecked();
                                        console.log(records);

                                    }
                                }
                            }
                        ]
                }//tv Config


                
                me.tree = new Ext.treePanelClass(config);
                me.tree.doLayout();
                me.tree.doComponentLayout();
                


                me.tree.on("itemclick", function (a, b, c) {

                    //(1)Get Selcted Node
                    var dataId = me.tree.getSelectionModel().getSelection()[0].data.id;
                    var node = me.tree.getStore().getNodeById(dataId);



                    //(2)CHANGE STORE DATA AND REFRESH VIEW
                    node.data.firstCol = 'test data';
                    me.tree.getView().refresh();


                    //**********************************************
                    //find and select
                    //**********************************************
                    //var node = me.getRootNode().findChild("ID",value);
                    //me.getSeectionModel().select(node);

                    //**********************************************
                    //remove Node
                    //**********************************************
                    //node.remove();

                }); //item click

                me.tree.getStore().on("load", function () {


                    $.ajax(
                        {
                            url: "/extjs4/json_test_treeview_extra",
                            type: "get"
                        }).done(function (data) {

                            me.ids = data.ids;

                            for (var i = 0; i < me.ids.length; i++) {

                                //for nodes who are disabled from top parents
                                if (me.tree.getStore().getNodeById(me.ids[i].ID) == undefined) continue;


                                var description = me.tree.getStore().getNodeById(me.ids[i].ID).data.secondCol;
                                me.tree.getStore().getNodeById(me.ids[i].ID).data.secondCol = unescape(description);
                            }

                            me.tree.getView().refresh()
                        });

                }); //on store Load


            }
        
	});
} (jQuery));
