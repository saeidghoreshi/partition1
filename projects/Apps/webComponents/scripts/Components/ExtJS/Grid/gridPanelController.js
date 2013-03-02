var extjsGrid;
(function ($) {

	extjsGrid=cls.define(
    {
			id:null,
			
            init: function () 
            {
				var me = this;
                
                me.id = lib.helper.idGenerator('ctrl');
                $('<div id=' + me.id + ' />').appendTo('#' + me.config.parentID);
                $('#' + me.id).css({ height: $('#' + me.config.parentID).height() });
				
                //buid store 
                var store1Config =
                {
                    url: "/extjs4/json_test",
                    fields: ["fname", "id"]
                }
                me.store1 = new ExtStoreClass(store1Config).init();

                
                //Menu Items
                var menu_list = [];
                menu_list.push({ value: 1, text: 'Item 1', handler: function (o, e) { me.itemClick(o, e) }, iconCls: 'tick' })
                menu_list.push('-');
                menu_list.push({ value: 2, text: 'Item 2', handler: function (o, e) { me.itemClick(o, e) }, iconCls: 'plugin' })


                //build Grid
                var config =
                    {
                        id: lib.helper.idGenerator('grid'),
                        url: "/extjs4/json_test",
                        renderTo: me.id,
                        title: 'Transactions',

                        //customized Components
                        rowEditable: true,
                        groupable: false,
                        bottomPaginator: true,
                        searchBar: true,
                        rowExpand: false,
                        rowNumber: false,

                        //properties
                        fields: ['fname', 'lname', "value", "bandwidth"],
                        pageSize: 5,
                        extraParams: { start: 0, limit: 5 },
                        height: '100%',
                        width: '100%',

                        // multiSelect: true,

                        //plugins
                        selModel: Ext.create('Ext.selection.CheckboxModel',
                        {
                            mode: 'MULTI',
                            listeners: { selectionchange: function (sm, selections) { } }
                        }),

                        columns:
                        [
                            {
                                text: "First Name",
                                dataIndex: "fname",

                                //xtype: 'templatecolumn',
                                //tpl: '{fname} {lname}',


                                sortable: true,
                                width: 200,
                                field:
                                {
                                    xtype: 'combo',
                                    id: "form2_combo1",

                                    triggerAction: 'all',
                                    forceSelection: true,
                                    editable: false,
                                    allowBlank: false,
                                    emptyText: '',
                                    queryMode: 'local',
                                    typeAhead: true,
                                    width: 70,
                                    margins: { top: 4, right: 0, bottom: 0, left: 0 },

                                    displayField: 'name',
                                    valueField: 'value',

                                    store: Ext.create('Ext.data.Store',
                                    {
                                        fields: ['name', 'value'],
                                        data:
                                                    [
                                                        { name: 'Ryan', value: 'Ryan' },
                                                        { name: 'Ali', value: 'Ali' },
                                                        { name: 'Saman', value: 'Saman' }
                                                    ]
                                    }),
                                    listeners:
                                    {
                                        scope: this,
                                        buffer: 100,
                                        change: function (config, selectedId) {
                                        }
                                    }
                                },
                                //Grouping Summary
                                summaryType: 'count', //sum,max,average
                                /*summaryType: function (records) {
                                var i = 0, length = records.length, total = 0, record;

                                for (; i < length; ++i) {
                                record = records[i];
                                total += record.get('estimate') * record.get('rate');
                                }
                                return total;
                                },
                                */
                                summaryRenderer: function (value, summaryData, dataIndex) {
                                    return Ext.String.format('<b><small>{0} Record{1}</small></b>', value, value !== 1 ? 's' : '');
                                }

                                //renderer OR summaryRenderer: Ext.util.Format.dateRenderer('Y/m/d'),Ext.util.Format.usMoney


                                //xtype: 'datefield',
                                //renderer: Ext.util.Format.dateRenderer('Y/m/d'),
                                //disabledDays: [0, 6],
                                //disabledDaysText: 'not available on the weekends'

                            },
                            {
                                text: 'Value ($)',
                                sortable: true,
                                width: 150,
                                dataIndex: 'value',
                                renderer: me.formatValue,
                                field:
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    flex: 1,

                                    items:
                                        [
                                            {
                                                xtype: 'numberfield',
                                                id: 'value_numberField',

                                                allowBlank: false,
                                                allowNegative: false,

                                                width: 75,
                                                margins: { top: 4, right: 0, bottom: 0, left: 0 }

                                            },
                                            {
                                                xtype: 'combo',
                                                id: "value_combo",

                                                triggerAction: 'all',
                                                forceSelection: true,
                                                editable: false,
                                                allowBlank: false,
                                                emptyText: '',
                                                queryMode: 'local',
                                                width: 50,
                                                margins: { top: 4, right: 0, bottom: 0, left: 0 },
                                                typeAhead: true,

                                                displayField: 'name',
                                                valueField: 'value',

                                                store: Ext.create('Ext.data.Store', {
                                                    fields: ['name', 'value'],
                                                    data: [
                                                            { name: 'B', value: 'B' },
                                                            { name: 'T', value: 'T' },
                                                            { name: 'M', value: 'M' },
                                                            { name: 'K', value: 'K' }
                                                        ]
                                                }),

                                                listeners:
                                                    {
                                                        scope: this,
                                                        buffer: 100,
                                                        change: function (config, selectedId) { }
                                                    }

                                            }
                                          ]
                                }
                            },
                                {
                                    text: 'Value ($)',
                                    dataIndex: 'value',
                                    sortable: true,
                                    width: 150,
                                    renderer: me.formatValue,
                                    field:
                                    {
                                        xtype: 'numberfield'
                                    }
                                },
                                {
                                    text: 'Bandwidth (bps)',
                                    dataIndex: 'bandwidth',
                                    flex: 1,
                                    sortable: true,
                                    renderer: me.formatBandwidth,
                                    field:
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        flex: 1,
                                        items:
                                        [
                                            {
                                                xtype: 'numberfield',
                                                id: 'bandwidth_numberField',

                                                allowBlank: false,
                                                allowNegative: false,

                                                width: 75,
                                                margins: { top: 4, right: 0, bottom: 0, left: 0 }

                                            },
                                            {
                                                xtype: 'combo',
                                                id: "bandwidth_combo",

                                                triggerAction: 'all',
                                                forceSelection: true,
                                                editable: false,
                                                allowBlank: false,
                                                emptyText: '',
                                                queryMode: 'local',
                                                width: 50,
                                                margins: { top: 4, right: 0, bottom: 0, left: 0 },
                                                typeAhead: true,

                                                displayField: 'name',
                                                valueField: 'value',

                                                store: Ext.create('Ext.data.Store', {
                                                    fields: ['name', 'value'],
                                                    data: [
                                                            { name: 'Gbps', value: 'Gbps' },
                                                            { name: 'Mbps', value: 'Mbps' },
                                                            { name: 'Kbps', value: 'Kbps' },
                                                            { name: 'bps', value: 'bps' }
                                                        ]
                                                }),

                                                listeners:
                                                    {
                                                        scope: this,
                                                        buffer: 100,
                                                        change: function (config, selectedId) { }
                                                    }

                                            }
                                          ]
                                    }
                                },
                                {
                                    text: 'Bandwidth (bps)',
                                    dataIndex: 'bandwidth',
                                    width: 150,
                                    sortable: true,
                                    renderer: me.formatBandwidth,
                                    field:
                                    {
                                        xtype: 'numberfield'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    items:
                                    [
                                        {
                                            icon: 'http://dev.sencha.com/deploy/ext-4.1.0-gpl/examples/shared/icons/fam/delete.gif',
                                            tooltip: 'Delete Plant',
                                            handler: function (grid, rowIndex, colIndex) {
                                                me.grid.getStore().removeAt(rowIndex);
                                            }
                                        },
                                        {
                                            getClass: function (v, meta, rec) {
                                                if (rec.get('value') < 0) {
                                                    this.items[1].tooltip = 'Hold stock';
                                                    return 'alert-col';
                                                } else {
                                                    this.items[1].tooltip = 'Buy stock';
                                                    return 'buy-col';
                                                }
                                            },
                                            handler: function (grid, rowIndex, colIndex) {
                                                var rec = me.grid.getStore().getAt(rowIndex);
                                                alert((rec.get('value') < 0 ? "Hold " : "Buy ") + rec.get('company'));
                                            }
                                        }
                                    ]
                                }
                        ],

                        //Items
                        topItems:
                        [
                            {
                                xtype: 'combo',
                                id: "combo1",

                                triggerAction: 'all',
                                forceSelection: true,
                                editable: false,
                                allowBlank: false,
                                emptyText: '',
                                queryMode: 'local',
                                flex: 1,
                                margins: { top: 4, right: 0, bottom: 0, left: 0 },
                                typeAhead: true,

                                displayField: 'fname',
                                valueField: 'fname',

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
                                menu: Ext.create('Ext.menu.Menu', { items: menu_list }),

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


                        ],
                        viewConfig:
                        {
                            plugins:
                            [
                                //add preview row in each row and bind to a field
                                {
                                    ptype: 'preview',
                                    bodyField: 'bandwidth',
                                    expanded: true,
                                    pluginId: 'previewID'
                                },
                                {
                                    ptype: 'gridviewdragdrop',
                                    dragGroup: 'firstGridDDGroup',
                                    dropGroup: 'firstGridDDGroup'
                                    //enableDrop: false
                                }
                            ],
                            listeners:
                            {
                                drop: function (node, data, dropRec, dropPosition) {
                                    return true;
                                },
                                beforedrop: function (node, data, dropRec, dropPosition) {

                                    //var dragRec = me.grid2.getSelectionModel().getSelection()[0].data;
                                }
                            }
                        }
                    };

                //lib.helper.maskUI(me.config.parentID, "Loading ...");
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




                me.grid.on("beforeedit", function (editor, e) {

                    var record = (parseInt(Ext.versions.extjs.shortVersion) >= 410) ? e.record : editor.record;
                    var lteValUnit = me.convertValue(record.data.value);
                    var gtValUnit = me.convertBandwidth(record.data.bandwidth);


                    Ext.getCmp('value_numberField').setValue(lteValUnit[0]);
                    Ext.getCmp('value_combo').setValue(lteValUnit[1]);
                    Ext.getCmp('bandwidth_numberField').setValue(gtValUnit[0]);
                    Ext.getCmp('bandwidth_combo').setValue(gtValUnit[1]);

                });
                me.grid.on("edit", function (e) {

                    var record = e.record.data;
                    //e.record.data[e.field]; for cellediting plugin

                    //sync store record for filed value
                    var factor;
                    var number = Ext.getCmp('value_numberField').getValue();
                    var sign = Ext.getCmp('value_combo').getValue();

                    switch (sign) {
                        case 'T':
                            factor = 1000000000000;
                            break;
                        case 'B':
                            factor = 1000000000;
                            break;
                        case 'M':
                            factor = 1000000;
                            break;
                        case 'K':
                            factor = 1000;
                            break;
                        default:
                            factor = 1;
                    }
                    record.value = Ext.getCmp('value_numberField').getValue() * factor;

                    //sync store record for filed bandwidth
                    var factor;
                    var number = Ext.getCmp('bandwidth_numberField').getValue();
                    var sign = Ext.getCmp('bandwidth_combo').getValue();

                    switch (sign) {
                        case 'Gbps':
                            factor = 1000000000;
                            break;
                        case 'Mbps':
                            factor = 1000000;
                            break;
                        case 'Kbps':
                            factor = 1000;
                            break;
                        default:
                            factor = 1;
                    }
                    record.bandwidth = Ext.getCmp('bandwidth_numberField').getValue() * factor;

                    e.record.commit();
                    //e.record.reject();
                });
                me.grid.getSelectionModel().on(
                {
                    selectionchange: function (sm, records) {
                        if (records.length) { }
                    }
                });
                me.grid.getView().on('render', function (view) { });
                me.grid.on("expand", function () { });
                me.grid.on("collapse", function () { });
                me.grid.on("itemclick", function (View, record, item, index, e, eOpts) { });

                /*
                me.grid.on('itemmouseenter', function (view, record, HTMLElement, index, e, Object) {
                view.tip = Ext.create('Ext.tip.ToolTip',
                {
                target: view.getEl(),
                delegate: view.itemSelector,
                trackMouse: true,
                anchor: 'right',
                listeners:
                {
                beforeshow: function (tip) {
                                
                var record = view.getRecord(tip.triggerElement).data;
                tip.update('Customized Tooltip');
                //or return false;
                }
                }
                });
                });
                */
                me.grid.on('itemcontextmenu', function (view, record, HTMLElement, index, e, Object) {
                    var contextMenu = new Ext.menu.Menu({
                        items:
                      [
                          {
                              text: 'Edit',
                              icon: '',
                              handler: function () { }
                          }
                          , {
                              text: 'New',
                              icon: '',
                              handler: function () { }
                          }
                      ]
                    });

                    e.stopEvent();
                    e.preventDefault();
                    contextMenu.showAt(e.getXY());
                    return false;
                });
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




            }, //init end
            convertValue: function (value, metaData, record, rowIdx, colIdx, store, view) {

                if (value >= 1000000000000) {
                    return [value / 1000000000000, "T"];

                } else if (value >= 1000000000) {
                    return [value / 1000000000, "B"];
                } else if (value >= 1000000) {
                    return [value / 1000000, "M"];
                } else if (value >= 1000) {
                    return [value / 1000, "K"];
                }
                return [value, ' '];

            },
            convertBandwidth: function (value, metaData, record, rowIdx, colIdx, store, view) {


                if (value >= 1000000000) {
                    return [value / 1000000000, "Gbps"];
                } else if (value >= 1000000) {
                    return [value / 1000000, "Mbps"];
                } else if (value >= 1000) {
                    return [value / 1000, "Kbps"];
                }
                return [value, 'bps'];
            },
            formatValue: function (value, metaData, record, rowIdx, colIdx, store, view) {


                if (value >= 1000000000000) {
                    return (value / 1000000000000).toFixed(2).toString() + "T";

                } else if (value >= 1000000000) {
                    return (value / 1000000000).toFixed(2).toString() + "B";
                } else if (value >= 1000000) {
                    return (value / 1000000).toFixed(2).toString() + "M";
                } else if (value >= 1000) {
                    return (value / 1000).toFixed(2).toString() + "K";
                }
                return (value).toFixed(2).toString();

            },
            formatBandwidth: function (value, metaData, record, rowIdx, colIdx, store, view) {

                if (value >= 1000000000) {
                    return (value / 1000000000).toFixed(2).toString() + "Gbps";
                } else if (value >= 1000000) {
                    return (value / 1000000).toFixed(2).toString() + "Mbps";
                } else if (value >= 1000) {
                    return (value / 1000).toFixed(2).toString() + "Kbps";
                }
                return (value).toFixed(2).toString() + "bps";
            }
        
	});
	
	
} (jQuery));

