var extjsGridExtra;
(function ($) {

	extjsGridExtra=cls.define(
    {
			id:null,
			
            init: function () 
            {
				var me = this;
                
                me.id = lib.helper.idGenerator('ctrl');
                $('<div id=' + me.id + ' />')
                .appendTo('#' + me.config.parentID)
                .css({ height: $('#' + me.config.parentID).height() });
				
                //BUILD A STORE
                var store1Config =
                {
                    url: "/extjs4/transactionTypes",
                    fields: ["name", "id"]
                }
                me.store1 = new ExtStoreClass(store1Config).init();


                //BUILD THE GRID
                var config =
                    {
                        id: lib.helper.idGenerator('grid'),
                        url: "/extjs4/json_test",
                        renderTo: me.id,
                        title: 'Transactions',
                        fields: ['fname', 'lname', "value", "bandwidth"],
                        pageSize: 5,
                        extraParams: { start: 0, limit: 5 },
                        height: '100%',
                        width: '100%',

                        
                        columns:
                        [
                            {
                                text: "First Name",
                                dataIndex: "fname",
                                sortable: true,
                                width: 200
                            },
                            {
                                text: 'Value ($)',
                                sortable: true,
                                width: 150,
                                dataIndex: 'value'
                            }
                        ],

                        //Items
                        topItems:
                        [
                           {
                                xtype:'buttongroup',
                                items: 
                                [
                                
                                {
                                    xtype: 'combo',
                                    id: "combo1",
                                    iconCls: 'add16',
                                    scale: 'small',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    editable: false,
                                    allowBlank: false,
                                    emptyText: '',
                                    queryMode: 'local',
                                    flex: 1,
                                    margins: { top: 4, right: 0, bottom: 0, left: 0 },
                                    typeAhead: true,
                                    displayField: 'name',
                                    valueField: 'id',
                                    store: me.store1,

                                    listeners:
                                    {
                                        scope: this,
                                        buffer: 100,
                                        change: function (config, selectedId) {
                                            //me.grid.getStore().load({ params: { ID: selectedId} });

                                            //var recIndex=combo.store.find("fieldName",value,startIndex,anymatch,casesensetive,exactmatch);
                                            //var rec=me.store.getAt(recIndex);
                                            //OR
                                            //var rec=combo.store.findRecord("fieldName",value,startIndex,anymatch,casesensetive,exactmatch);

                                            var rec = Ext.getCmp("combo1").store.findRecord("fname", "Charlie", 0, true, false, true);
                                            Ext.getCmp("combo1").select(rec);
                                            //Ext.getCmp("combo1").select("value");

                                            alert(Ext.getCmp("combo1").getValue());
                                        }
                                    }

                                },
                                {
                                    text: 'Copy',
                                    iconCls: 'add16',
                                    scale: 'small'
                                }]
                            }
                        ],

                        leftItems:
                        [
                            {
                                xtype: "button",
                                id: 'toggleButton',
                                name: 'toggleButton',
                                text: 'Toggle Btn',
                                pressed: true,
                                enableToggle: true,
                                tooltip: "",

                                toggleHandler: function (button, pressed) {
                                    Ext.getCmp('toggleButton').removeCls("x-btn-default-toolbar-small-pressed");
                                }
                            },
                            {
                                xtype: 'checkbox',
                                id: 'cbButton',
                                name: 'cbButton',
                                fieldLabel: '',
                                checked: false,
                                width: 70,
                                listeners:
                                {
                                    change:
                                    {
                                        fn: function (a, checked) {
                                            alert(YAHOO.lang.dump(checked));
                                        },
                                        scope: this,
                                        buffer: 1
                                    }
                                }
                            },
                            {

                                xtype: "button",
                                id: 'menuButton',
                                name: 'menuButton',
                                text: "Select ...",
                                menu: Ext.create('Ext.menu.Menu', { items: 
                                [
                                    { value: 1, text: 'Item 1', handler: function (o, e) { me.itemClick(o, e) }, iconCls: 'tick' },
                                    '-',
                                    { value: 2, text: 'Item 2', handler: function (o, e) { me.itemClick(o, e) }, iconCls: 'plugin' }
                                ] }),

                                width: 70,
                                pressed: true
                            }
                        ],
                        rightItems:
                        [
                            {
                                xtype: 'button',
                                id: 'rightButton',
                                text: "toggle Preview",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {
                                        //toggle preview
                                        var preview = me.grid.getView().getPlugin('previewID');
                                        preview.toggleExpanded(false);
                                        return;

                                        Ext.MessageBox.alert({ title: "Title", msg: "Message", icon: Ext.Msg.INFO, buttons: Ext.MessageBox.OK });
                                    }
                                }
                            }
                        ],
                        bottomLItems:
                        [
                        
                            {
                                xtype: 'button',
                                id: 'bottomlButton',
                                text: "Clear GS OR G",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {

                                        //reset Grouping [G]
                                        me.grid.getView().getFeature('groupingID').disable();

                                        return;
                                        //reset Grouping summery [GS]
                                        var view = me.grid.getView();
                                        view.getFeature('groupingsummaryID').toggleSummaryRow(false);
                                        view.refresh();
                                    }
                                }

                            }
                        ],
                        bottomRItems:
                        [
                            {
                                xtype: 'button',
                                text: "Iterate store",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {

                                        //**********************************************
                                        //Iterate through data Store
                                        //**********************************************
                                        var result = '';
                                        for (var i = 0; i < me.grid.getStore().data.items.length; i++)
                                            result += me.grid.getStore().data.items[i].data["fname"] + '  ';
                                        alert(result);
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                text: "Add to store",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {
                                        //**********************************************
                                        //Add to Store 
                                        //**********************************************
                                        me.grid.getStore().add({ fname: "Ali", lname: "New Lname", value: 2020202, bandwidth: 4645564 });
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                text: "find & remove",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {
                                        //**********************************************
                                        //Remove From Grid
                                        //**********************************************

                                        //var recIndex=store.find("fieldName",value,startIndex,anymatch,casesensetive,exactmatch);
                                        //var rec=store.findRecord("fieldName",value,startIndex,anymatch,casesensetive,exactmatch);

                                        var rec = me.grid.getStore().findRecord("fname", "Charlie", 0, true, false, true);
                                        var index = me.grid.getStore().indexOf(rec);
                                        me.grid.getStore().removeAt(index);
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                text: "Change Store Value",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {
                                        //**********************************************
                                        //change grid Store and Refresh View
                                        //**********************************************
                                        me.grid.getStore().getAt(0).data.fname = Math.random();
                                        me.grid.getView().refresh();

                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                text: "Select 1st row",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {
                                        //**********************************************
                                        //make new and select
                                        //**********************************************
                                        //me.grid.getSelectionModel().select(Ext.data.Model[]/Number, keepExisting, suppressEvent[false]); 

                                        //(1)
                                        var rec = me.grid.getStore().getAt(2);
                                        me.grid.getSelectionModel().select(rec, true, false);

                                        //(2)
                                        //me.grid.getSelectionModel().select(2, true, false); 
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                text: "strat row Edit",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {

                                        //**********************************************
                                        //strat row edit
                                        //**********************************************
                                        me.grid.rowEditing.startEdit(2, 0);
                                        //me.grid.cellEditing.startEditByPosition({row: 0, column: 0});        
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                text: "Load[perm/temp]",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {

                                        //**********************************************
                                        //load grid data store w/ temp or permenant values
                                        //**********************************************

                                        //temporary
                                        //me.grid.getStore().load({ params: {id:1} });

                                        //permenent
                                        me.grid.getStore().proxy.extraParams = { id: 1 }
                                        me.grid.getStore().load();

                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                text: "Load bulk",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {

                                        //**********************************************
                                        //load grid w/ static data
                                        //**********************************************

                                        var bulk =
                                        [
                                            { fname: "Ali1", lname: "", value: 0, bandwidth: 0 },
                                            { fname: "Ali2", lname: "", value: 0, bandwidth: 0 },
                                            { fname: "Ali3", lname: "", value: 0, bandwidth: 0 }
                                        ]

                                        me.grid.getStore().loadData(bulk, true);

                                    }
                                }
                            }


                        ]
                    };

                me.grid = new Ext.gridPanelClass(config);
                me.grid.doLayout();
                me.grid.doComponentLayout();

               

                //**********************************************
                //one time store loading   [happens once]
                //**********************************************
                var onetimeAfterLoad = function () {

                    //one time operation
                    me.store1.add({ fname: 'xxx', fname: 'xxx' });
                    //one time operation End

                    me.grid.getStore().removeListener("load", onetimeAfterLoad);
                }
                me.grid.getStore().on("load", onetimeAfterLoad);

                
                /*var contextMenu = new Ext.menu.Menu({
                items: [{
                text: 'Edit',
                iconCls: 'edit',
                handler: function(){}
                }]
                });

                me.grid.getEl().on('contextmenu', function(e)
                {
                e.preventDefault();
                contextMenu.show(Ext.getCmp or view .getEl());
                });
                */




            } //init end
            
	});//CLASS DEFINITION
	
	
	
} (jQuery));

