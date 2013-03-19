var extjsGridFeatures;
(function ($) {

	extjsGridFeatures=cls.define(
    {
			id:null,
			
            init: function () 
            {
				var me = this;
                
                me.id = lib.helper.idGenerator('ctrl');
                $('<div id=' + me.id + ' />')
                .appendTo('#' + me.config.parentID)
                .css({ height: $('#' + me.config.parentID).height() });
				
				
				
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

                        //OPTIONS
						
						//XOR
                        rowEditable: true,
						cellEditable:false,
						
						//XOR
                        groupping: false,
						grouppingSummary: true,
						
                        bottomPaginator: true,
                        searchBar: true,
                        rowNumber: true,
                        
                        columns:
                        [
                            {
                                text: "First Name",
                                dataIndex: "fname",
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
                                //summaryType: 'count', //sum,max,average
                                summaryType: function (records) {
									var length = records.length;
									var total = 0;
									var record;

									for (var i=0; i < length; ++i) {
										record = records[i];
										total += record.get('value') ;
									}
									return total;
                                },
                                
                                summaryRenderer: function (value, summaryData, dataIndex) {
                                    return Ext.String.format('<b><small>{0} Record{1}</small></b>', value, value !== 1 ? 's' : '');
                                }

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
                                }
                             
                        ],
						
						topItems:
						[
							{
                                xtype: 'button',
                                id: 'id_grouping',
                                text: "Clear Grouping ",
                                pressed: true,
                                listeners:
                                {
                                    click: function () 
									{
										if(me.grid.getView().getFeature('groupingID')===undefined)
										{
											alert("Grouping Not Activated");
											return false;
										}
                                        me.grid.getView().getFeature('groupingID').disable();
                                    }
                                }

                            },
							{
                                xtype: 'button',
                                id: 'id_groupingsummary',
                                text: "Clear group summery ",
                                pressed: true,
                                listeners:
                                {
                                    click: function () 
									{
									
										if(me.grid.getView().getFeature('groupingsummaryID')===undefined)
										{
											alert("Grouping Summary Not Activated");
											return false;
										}
									
                                        var view = me.grid.getView();
                                        view.getFeature('groupingsummaryID').toggleSummaryRow(false);
                                        view.refresh();
                                    }
                                }
                            }
						],
						bottomLItems:
						[
							{
								text: "Start Row Edit",
								pressed:true,
								listeners:
								{
									click: function () {

										me.grid.rowEditing.startEdit(2, 0);
									}
								}
							},
							{
								text: "Start Cell Edit",
								pressed:true,
								listeners:
								{
									click: function () {

										me.grid.cellEditing.startEditByPosition({row: 0, column: 0});        
									}
								}
							}
						]
                    };

                me.grid = new Ext.gridPanelClass(config);
                me.grid.doLayout();
                me.grid.doComponentLayout();

                          
                
                me.grid.on("beforeedit", function (editor, e) {

					/*
					Set Defaults
					
                    var record = (parseInt(Ext.versions.extjs.shortVersion) >= 410) ? e.record : editor.record;
                    var lteValUnit = me.convertValue(record.data.value);
                    var gtValUnit = me.convertBandwidth(record.data.bandwidth);


                    
					Ext.getCmp('value_numberField').setValue(lteValUnit[0]);
                    Ext.getCmp('value_combo').setValue(lteValUnit[1]);
                    Ext.getCmp('bandwidth_numberField').setValue(gtValUnit[0]);
                    Ext.getCmp('bandwidth_combo').setValue(gtValUnit[1]);
					*/

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

					
                    //for comparison operation
                    //var bdate = new Date(record.dateField);
                    //newDate = new Date(bdate.getFullYear(), bdate.getMonth(), bdate.getDate());
                    //var now = new Date();
                    //No Compare them


                    //e.record.commit();
                    //e.record.reject();
                    
                });
                
                
                /*
				Select Grid Row
				
				
                    //var rec=store.getAt(1);
                    //me.grid.getSelectionModel().select(rec,true,false)    
                    //OR
                    //me.grid.getSelectionModel().selectRange(1, 1, true);
				
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
        
	});//CLASS DEFINITION
	
	
	
} (jQuery));

