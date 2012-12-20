Ext.define('Ext.formClass',
{
    extend: 'Ext.form.Panel',

    initComponent: function (config) {
        this.callParent(arguments);
    },

    constructor: function (config) {
        Ext.QuickTips.init();

        config.bodyStyle = "padding:5px;";

        //if any docked item defined then add border
        if (config.bottomItems != null || config.topItems != null || config.leftItems != null || config.rightItems != null)
            config.bodyStyle += "border: ;";
        else
            config.bodyStyle += "border:1px;";
         

        config.dockedItems = []
        if (config.bottomItems != null)
            config.dockedItems.push
                ({
                    xtype: "toolbar",
                    dock: "bottom",
                    items: config.bottomItems
                });
        if (config.topItems != null)
            config.dockedItems.push
                ({
                    xtype: "toolbar",
                    dock: "top",
                    items: config.topItems
                });

        if (config.leftItems != null)
            config.dockedItems.push
                ({
                    xtype: "toolbar",
                    dock: "left",
                    items: config.leftItems
                });
        if (config.rightItems != null)
            config.dockedItems.push
                ({
                    xtype: "toolbar",
                    dock: "right",
                    items: config.rightItems
                });

        this.config = config;
        this.callParent(arguments);
    },
    reset: function () {
        this.getForm().reset();
    }
});
