Ext.define('Ext.viewPort1Class',
{
    extend: 'Ext.Panel',
    
    initComponent: function (config) {
        this.callParent(arguments);
    },

    getId: function () {
        var me = this;
        return me.config.id;
    },

    constructor: function (config) {

        var me = this;

        me.config = config;
        me.config.id = app.idGenerator('placeholder');
        $('#' + me.config.parentId).html('<div id=' + me.config.id + '></div>');


        //Load Tooltip
        Ext.QuickTips.init();

        //Clean PlaceHolder
        if (config.renderTo != null)
            Ext.getDom(config.renderTo).innerHTML = '';

        config.height = 500;
        
        config.bodyStyle = 'padding: 0;border-width:0px;';
        config.items =
            [
                 {
                     id: config.id + 'north',
                     region: 'north',
                     collapsible: true,
                     collapsed: false,
                     split: true,
                     width: "100%",
                     height: 300,
                     title: "Header",
                     items:
                     [
                            {
                                id: config.id + 'north-inner',
                                height: "100%",
                                width: "100%"
                            }
                     ]
                 },
                 {
                     region: 'center',
                     layout: 'border',
                     width: "100%",
                     height: 400,
                     collapsible: false,
                     split: true,
                     bodyStyle: 'padding: 0;border-width:0px;',

                     items:
                     [

                          {
                              id: config.id + 'west',
                              region: 'west',
                              collapsible: true,
                              split: true,
                              title: 'Google Maps',

                              width: 300,
                              height: 400,

                              items:
                              [
                              {
                                  id: config.id + 'west-inner',
                                  height: "100%",
                                  width: "100%"
                              }
                              ]
                          },

                          {
                              id: config.id + 'east',
                              region: 'east',
                              title: '',
                              width: 40,
                              height: 400,

                              split: false,
                              items:
                              [
                              {
                                  id: config.id + 'east-inner',
                                  height: "100%",
                                  width: "100%"
                              }
                              ]
                          },
                           {
                               id: config.id + 'center',
                               region: 'center',
                               collapsible: false,
                               split: true,

                               width: "100%",
                               height: 400,

                               items:
                               [
                                    {
                                        id: config.id + 'center-inner',
                                        height: "100%",
                                        width: "100%"
                                    }
                               ]
                           }
                     ]
                 },
                 {
                     id: config.id + 'south',
                     region: 'south',
                     collapsible: true,
                     split: true,
                     width: "100%",
                     height: "100%",
                     title: "Result",
                     items:
                     [
                         {
                             id: config.id + 'south-inner',
                             height: "100%",
                             width: "100%"
                         }
                     ]
                 }
            ];


        me.config = config;
        this.callParent(arguments);

    },
    getInnerSecId: function (sectionName) {
        var me = this;

        return me.config.id + sectionName + '-inner';
    },
    getSecId: function (sectionName) {
        var me = this;

        return me.config.id + sectionName;
    },

    //Layout-Object alignment
    //aligns Dom od Extjs Object
    alignmentViewPort: function (object, sourceArea, extraFunction) {
        var me = this;

        Ext.getCmp(me.getSecId(sourceArea)).on("resize", function (x, width, height, oldWidth, oldHeight, eOpts) {
            object.setWidth(width);

            if (extraFunction != null)
                extraFunction();

        });

    },

    afterRender: function () {
        var me = this;
        this.callParent(arguments);
    }
});











