Ext.define('Ext.treePanelClass',
{
    extend: 'Ext.tree.Panel',

    initComponent: function (config) {
        this.callParent(arguments);
    },

    getId: function () {
        var me = this;
        return me.config.id;
    },

    constructor: function (config) {

        var me = this;

        //Load Tooltip
        Ext.QuickTips.init();

        //Clean PlaceHolder
        if (config.renderTo != null)
            Ext.getDom(config.renderTo).innerHTML = '';

        //set Generator
        config.generator = baseClass.idGenerator("Model");

        //Define Model
        Ext.define(config.generator, { extend: 'Ext.data.Model', fields: config.fields });

        //Define Store
        config.store = Ext.create('Ext.data.TreeStore',
        {
            model: config.generator,
            proxy: {
                type: 'rest',
                url: config.url,
                reader: { type: 'json' }
            },
            folderSort: false
        });

        //Properties
        config.width = "100%";
        config.useArrows = false;
        config.rootVisible = false;
        config.multiSelect = false;
        config.singleExpand = false;
        config.autoSync = true;
        config.lines = false;
        config.floatable = false;





        if (config.topItems == null) config.topItems = [];
        if (config.bottomLItems == null) config.bottomLItems = [];
        if (config.bottomRItems == null) config.bottomRItems = [];
        if (config.leftItems == null) config.leftItems = [];
        if (config.rightItems == null) config.rightItems = [];

        if (config.topItems && config.bottomItems && config.leftItems && config.rightItems) {

            config.dockedItems =
            [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    items: config.topItems
                }
                , {
                    dock: 'bottom',
                    xtype: 'toolbar',
                    items: config.bottomLItems.concat(['->'], config.bottomRItems)
                }
                , {
                    dock: 'left',
                    xtype: 'toolbar',
                    items: config.leftItems
                }
                , {
                    dock: 'right',
                    xtype: 'toolbar',
                    items: config.rightItems
                }
            ]
            //Search
            if (config.searchBar == true) {

                config.dockedItems[0].items.push('->');
                config.dockedItems[0].items.push(
                {
                    width: 200,
                    fieldLabel: '',
                    labelWidth: 50,
                    xtype: 'searchfield',
                    store: config.store,
                    emptyText: 'Search'
                });

            }   
        }
     
        // TREE EDITING PLUGIN
        if (me.config.cellEditing) {
            config.plugins =
            [
                Ext.create('Ext.ux.tree.TreeEditing', { clicksToEdit: 1 })
            ];
        }

        //*************************************************************************************
        //***********************  Darag and Drop *********************************************
        //*************************************************************************************
        config.viewConfig =
        {
            plugins:
            {
                ptype: 'treeviewdragdrop'
            },

            listeners:
            {

                beforedrop: function (node, data, dropRec, dropPosition) {

                    /*
                    var dragData = me.getSelectionModel().getSelection()[0].data;
                    var dragRecord = me.getStore().getNodeById(dragData.id);
                    var dropRecord = me.getStore().getNodeById(dropRec.data.id)
                    me.getStore().getNodeById(dragData.id).data.parentId = dropRec.data.id;
                    */

                    return true;
                },

                drop: function (node, data, dropRec, dropPosition) { },

                itemmouseenter: function (view, record, item, index, e, eOpts) {

                    //view, record , index
                    //record  ~ me.getStore().getNodeById(record.internalId);
                }
            }
        };


        me.config = config;
        this.callParent(arguments);
    },
    afterRender: function () {
        var me = this;


        this.callParent(arguments);
    }
});