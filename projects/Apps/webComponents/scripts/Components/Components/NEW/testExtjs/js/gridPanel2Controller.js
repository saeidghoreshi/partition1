Class('gridPanel2ControllerClass',
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

                $('#' + me.config.id).css({ height: $('#' + me.config.parentId).height() });
            },
            getId: function () {
                var me = this;
                return me.config.id;
            },

            init: function () {

                var me = this;

                //buid store 
                var store1Config =
                {
                    url: "/home/json_test",
                    fields: ["fname", "fname"]
                }
                me.store1 = new Ext.StoreClass(store1Config).init();

                //Menu Items
                var menu_list = [];
                menu_list.push({ value: 1, text: 'Item 1', handler: function (o, e) { me.itemClick(o, e) }, iconCls: 'tick' })
                menu_list.push('-');
                menu_list.push({ value: 2, text: 'Item 2', handler: function (o, e) { me.itemClick(o, e) }, iconCls: 'plugin' })


                //build Grid
                var config =
                    {
                        id: app.idGenerator('grid'),
                        url: "/home/json_test2",
                        renderTo: me.config.id,
                        title: '',

                        //customized Components
                        rowEditable: true,
                        groupable: true,
                        bottomPaginator: true,
                        searchBar: true,

                        //properties
                        fields: ['fname', 'lname'],
                        pageSize: 5,
                        extraParams: { start: 0, limit: 5 },
                        height: '100%',
                        width: '100%',

                        //events
                        override_edit: false,
                        override_itemdblclick: false,
                        override_selectionchange: false,
                        override_expand: false,
                        override_collapse: false,

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

                                //
                                xtype: 'templatecolumn',
                                tpl: '{fname} {lname}',
                                flex: 1,
                                editor:
                                {
                                    xtype: 'textfield',
                                    allowBlank: false

                                    //xtype: 'datefield',
                                    //renderer: Ext.util.Format.dateRenderer('Y/m/d'),
                                    //disabledDays: [0, 6],
                                    //disabledDaysText: 'not available on the weekends'
                                },

                                //renderer: function(val) 
                                /*{
                                if (val =='ali') 
                                {
                                return '<span style="color:green;">' + val + '</span>';
                                } 
                                else 
                                return '<span style="color:red;">' + val + '</span>';
                                return val;
                                }*/
                                //renderer: Ext.util.Format.dateRenderer('Y/m/d'),

                                //Grouping Summary
                                summaryType: 'count',
                                summaryRenderer: function (value) {
                                    return Ext.String.format('{0} Record{1}', value, value !== 1 ? 's' : '');
                                }
                               
                                //editor:
                                //{
                                //  xtype: 'combo',
                                //  editable: false,
                                //  store: [['<img src=assets/silk/male.png />', 'male'], ['<img src=assets/silk/female.png />', 'female']]
                                //}    

                            }
                        ],

                        //Items
                        topItems:
                        [
                        {
                            xtype: 'combo',
                            id: "type_id",

                            triggerAction: 'all',
                            forceSelection: true,
                            editable: false,
                            allowBlank: false,
                            emptyText: '',
                            queryMode: 'local',
                            typeAhead: true,
                            flex: 1,
                            margins: { top: 4, right: 0, bottom: 0, left: 0 },

                            displayField: 'name',
                            valueField: 'value',

                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value'],
                                data: [
                                                        { name: 'Mr', value: 'mr' },
                                                        { name: 'Mrs', value: 'mrs' },
                                                        { name: 'Miss', value: 'miss' }
                                                    ]
                            }),

                            listeners:
                                                {
                                                    scope: this,
                                                    buffer: 100,
                                                    change: function (config, selectedId) {
                                                        me.grid.getStore().load({ params: { user_type_id: 1} });
                                                    }
                                                }

                        }

                        ],
                        bottomLItems:
                        [
                            {
                                xtype: 'button',
                                id: 'bottomlButton',
                                text: "bottom L",
                                pressed: true
                            }
                        ],
                        bottomRItems:
                        [
                            {
                                xtype: 'button',
                                id: 'bottomrButton',
                                text: "Bottom R",
                                pressed: true
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
                                text: "right",
                                pressed: true
                            }
                        ],
                        viewConfig:
                        {
                            plugins:
                            {
                                ptype: 'gridviewdragdrop',
                                dragGroup: 'firstGridDDGroup',
                                dropGroup: 'firstGridDDGroup'
                            },
                            listeners:
                            {
                                drop: function (node, data, dropRec, dropPosition) {
                                    return true;
                                },
                                beforedrop: function (node, data, dropRec, dropPosition) {

                                    //var dragRec = me.grid2.getSelectionModel().getSelection()[0].data;

                                    //load grid w/ static data
                                    //me.grid2.getStore().loadData([JSON objects], true);

                                    //Remove From Grid
                                    //me.grid1.getStore().removeAt(me.grid1.getStore().indexOf(gridNode));

                                    //Iterate through data Store
                                    //for (var i = 0; i < me.getStore().data.items.length; i++) 
                                    //me.getStore().data.items[i].data["user_id"]

                                    //chage grid Store and Refresh View
                                    //me.grid.getStore().data.items[0].data.username=Math.random();
                                    //OR
                                    //me.grid.getStore().data.getAt(0).username = Math.random();
                                    //me.grid.getView().refresh();
                                }
                            }
                        }


                    };

                me.grid = new Ext.gridPanelClass(config);
                me.grid.setWidth("100%");
                me.grid.doLayout();
                me.grid.doComponentLayout();


                me.store1.on("load", function () {

                    //select Grid Rows
                    //var rec=store.getAt(1);
                    //me.grid.getSelectionModel().select(rec,true,false)    
                    //OR
                    //me.grid.getSelectionModel().selectRange(1, 1, true);
                });


                me.grid.getView().on('render', function (view) { });
                me.grid.on("edit", function (e) {
                    //var record = e.record.data;
                    //e.record.data[e.field];  

                    //for comparison operation
                    //var bdate = new Date(record.dateField);
                    //newDate = new Date(bdate.getFullYear(), bdate.getMonth(), bdate.getDate());
                    //var now = new Date();
                    //No Compare them


                    //e.record.commit();
                    //e.record.reject();


                });
                me.grid.getSelectionModel().on(
                {
                    selectionchange: function (sm, selections) {
                        if (selections.length)
                        { }
                    },
                    itemclick: function () { }
                });
                me.grid.on("expand", function () { });
                me.grid.on("collapse", function () { });

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
                me.grid.on('itemcontextmenu', function (view, record, HTMLElement, index, e, Object) {
                    var contextMenu = new Ext.menu.Menu({
                        items:
                      [
                          {
                              text: 'Edit',
                              icon: 'http://springrainbow.ca/icons/silk/pencil.png',
                              handler: function () { }
                          }
                          , {
                              text: 'New',
                              icon: 'http://springrainbow.ca/icons/silk/add.png',
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

            }
        }
});
      