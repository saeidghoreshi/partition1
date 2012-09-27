Class('gridPanel3ControllerClass',
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

                
                //build Grid
                var config =
                    {
                        id: app.idGenerator('grid'),
                        url: "/home/json_test",
                        renderTo: me.getId(),
                        title: '',

                        //customized Components
                        rowEditable: true,
                        groupable: true,
                        bottomPaginator: true,
                        searchBar: true,

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
                                }
                        ],

                        
                        viewConfig:
                        {
                            plugins:
                            {
                                ptype: 'gridviewdragdrop',
                                ddGroup: 'GridExample',
                                enableDrop: false
                            },
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

                app.maskUI(me.config.parentId, "Loading ...");
                me.grid = new Ext.gridPanelClass(config);
                me.grid.doLayout();
                me.grid.doComponentLayout();
                app.tagReady(me.grid.getId(), function () { app.unmaskUI(me.config.parentId); });


            }, //init end
            convertValue: function (value) {

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
            convertBandwidth: function (value) {


                if (value >= 1000000000) {
                    return [value / 1000000000, "Gbps"];
                } else if (value >= 1000000) {
                    return [value / 1000000, "Mbps"];
                } else if (value >= 1000) {
                    return [value / 1000, "Kbps"];
                }
                return [value, 'bps'];
            },
            formatValue: function (value) {


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
            formatBandwidth: function (value) {

                if (value >= 1000000000) {
                    return (value / 1000000000).toFixed(2).toString() + "Gbps";
                } else if (value >= 1000000) {
                    return (value / 1000000).toFixed(2).toString() + "Mbps";
                } else if (value >= 1000) {
                    return (value / 1000).toFixed(2).toString() + "Kbps";
                }
                return (value).toFixed(2).toString() + "bps";
            }
        }
});
      