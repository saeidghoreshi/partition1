Class('form4Class',
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

            },

            getId: function () {
                var me = this;
                return me.config.id;
            },

            init: function () {

                var me = this;
                me.menu = Ext.create('Ext.menu.Menu', {
                    items:
                    [
                        {
                            text: 'I like Ext',
                            checked: true,
                            checkHandler: function () { }
                        },
                        '-',
                        {
                            text: 'Radio Options',
                            menu:
                            {
                                items:
                                [
                                    {
                                        text: 'Aero Glass',
                                        checked: true,
                                        group: 'theme',
                                        checkHandler: function () { }
                                    }, {
                                        text: 'Vista Black',
                                        checked: false,
                                        group: 'theme',
                                        checkHandler: function () { }
                                    }, {
                                        text: 'Gray Theme',
                                        checked: false,
                                        group: 'theme',
                                        checkHandler: function () { }
                                    }, {
                                        text: 'Default Theme',
                                        checked: false,
                                        group: 'theme',
                                        checkHandler: function () { }
                                    }
                                ]
                            }
                        },
                       {
                           text: 'Choose a Date',
                           iconCls: 'calendar',
                           menu: Ext.create('Ext.menu.DatePicker', { handler: function (dp, date) { } })
                       },
                       {
                           text: 'Choose a Color',
                           menu: Ext.create('Ext.menu.ColorPicker', { handler: function (cm, color) { } })
                       }
                    ]
                });

                var formConfig =
                {
                    autoHeight: true,
                    padding: 5,
                    width: me.config.width,

                    layout: 'column',
                    items:
                    [

                        {
                            columnWidth: 0.32,
                            xtype: 'fieldset',
                            title: 'Set 1',
                            defaults:
                            {
                                width: 300,
                                labelWidth: 90,
                                labelAlign: 'top'
                            },
                            items:
                                [
                                    {
                                        width: 200,
                                        height: 100,
                                        collapsible: true,
                                        collapseDirection: Ext.Component.DIRECTION_LEFT,
                                        listeners: {
                                            render: function (p) {
                                                p.body.mask('Loading...');
                                                setTimeout(function () { p.body.unmask(); }, 1000);
                                            },
                                            delay: 1
                                        }
                                    }

                                ]

                        }, //col1
                        {
                        columnWidth: 0.01,
                        bodyStyle: "border-color:transparent"
                    },
                        {
                            columnWidth: 0.32,
                            xtype: 'fieldset',
                            title: 'Set 2',
                            defaults:
                            {
                                width: 300,
                                labelWidth: 90,
                                labelAlign: 'top'
                            },
                            items:
                            [

                            ]
                        }, //col2
                        {
                        columnWidth: 0.01,
                        bodyStyle: "border-color:transparent"
                    },
                        {
                            columnWidth: 0.32,
                            xtype: 'fieldset',
                            title: 'Set 3',
                            defaults:
                            {
                                width: 200,
                                labelWidth: 90,
                                labelAlign: 'top'
                            },
                            items:
                            [

                            ]
                        } //col3
                    ],
                    topItems:
                        [
                        {
                            type: "splitbutton",
                            text: 'Button w/ Menu',
                            iconCls: 'bmenu',
                            menu: me.menu
                        },
                            {
                                xtype: "button",
                                text: "save",
                                pressed: true,
                                listeners:
                                {
                                    click: function () {
                                        form.getEl().mask();
                                        //Ext.get('ext-comp-1017').mask();
                                        setTimeout(function () { form.getEl().unmask(); }, 1000);
                                    }
                                }
                            }, '-',
                            {
                                xtype: "splitbutton",
                                width: 50,
                                text: "Test",
                                //arrowAlign: 'bottom',
                                menu:
                                         [
                                            {
                                                text: "Item1",
                                                listeners:
                                                {
                                                    click: function () {
                                                        alert('Item 1');
                                                    }
                                                }
                                            }
                                         ]
                            },
                        ],
                    bottomItems:
                        [

                            {
                                xtype: "progressbar",
                                id: "bar1",
                                width: 250,
                                text: '',
                                value: 0.5,
                                cls:"custom"
                            }
                        ]
                }//config

                var form = new Ext.formClass(formConfig);
                form.render(me.getId());
                
                Ext.getCmp("bar1").updateProgress( 1, "", true);
                
                return form;
            } //F

        }
});
      