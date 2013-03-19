var extjsGridSimple;
(function ($) {

	extjsGridSimple=cls.define(
    {
			id:null,
			
            init: function () 
            {
				var me = this;
                
                me.id = lib.helper.idGenerator('ctrl');
                $('<div id=' + me.id + ' />')
                .appendTo('#' + me.config.parentID)
                .css({ height: $('#' + me.config.parentID).height() });
				
                
                //build Grid
                var config =
                    {
                        id: lib.helper.idGenerator('grid'),
                        url: "/extjs4/json_test",
                        renderTo: me.id,
                        title: 'Transactions',
						multiSelect: true,
						
                        //PROPERTIES
                        fields: ['fname', 'lname', "value", "bandwidth"],
                        pageSize: 5,
                        extraParams: { start: 0, limit: 5 },
                        height: 300,
                        width: '100%',

                        //PLUGINS
                        selModel: Ext.create('Ext.selection.CheckboxModel',
                        {
                            mode: 'MULTI',
                            listeners: { selectionchange: function (sm, selections) { } }
                        }),

                        columns:
                        [
							{
                                text: "Template Column",
                                xtype: 'templatecolumn',
                                tpl: '{fname} {lname}',
								sortable: true,
                                width: 200
                            },
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
                            },
                                
							//Bandwidth
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
                            
  							//Action Column
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
                        viewConfig:
                        {
                            plugins:
                            [
                                {
                                    ptype: 'gridviewdragdrop',
                                    dragGroup: 'firstGridDDGroup',
                                    dropGroup: 'firstGridDDGroup'
                                    //enableDrop: false
                                }
                            ],
                            listeners:
                            {
                                drop: function (node, data, dropRec, dropPosition) {return true;},
                                beforedrop: function (node, data, dropRec, dropPosition) 
								{
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
                me.grid.doLayout();
                me.grid.doComponentLayout();
				
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

					contextMenu.showAt(e.getXY());
                    e.stopEvent();
                    e.preventDefault();
                    return false;
                });
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

