Class('form2Class',
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

                var formConfig =
                {
                    autoHeight: true,
                    padding: 5,
                    width: me.config.width,
                    items:
                    [
                        {
                            id: "form2_firstname",
                            xtype: "textfield",
                            fieldLabel: 'First Name',

                            name: 'first',
                            allowBlank: false
                        }, {
                            xtype: "textfield",
                            fieldLabel: 'Last Name',

                            name: 'last'
                        }, {
                            xtype: "textfield",
                            fieldLabel: 'Company',
                            name: 'company'
                        }, {
                            xtype: "textfield",
                            fieldLabel: 'Email',

                            name: 'email',
                            vtype: 'email'
                        }, {
                            fieldLabel: 'DOB',
                            name: 'dob',
                            xtype: 'datefield'
                        }, {
                            fieldLabel: 'Age',
                            name: 'age',
                            xtype: 'numberfield',
                            minValue: 0,
                            maxValue: 100
                        }, {
                            xtype: 'timefield',
                            fieldLabel: 'Time',
                            name: 'time',
                            minValue: '8:00am',
                            maxValue: '6:00pm'
                        },
                        {
                            xtype: 'fieldset',
                            title: 'FieldSet1',
                            collapsible: true,
                            defaults: {
                                labelWidth: 90,
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: { top: 0, right: 5, bottom: 0, left: 0 }
                                }
                            },
                            items:
                            [
                                    {
                                        xtype: 'fieldcontainer',
                                        fieldLabel: 'Component',
                                        layout: 'hbox',
                                        items:
                                                [
                                                   { xtype: 'component', html: 'Component Loaded', flex: 1 },
                                                ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        fieldLabel: 'Phone',
                                        layout: 'hbox',
                                        items:
                                        [
                                            { xtype: 'displayfield', value: '(' },
                                            { xtype: 'textfield', width: 30, allowBlank: false, maskRe: /\d/ },
                                            { xtype: 'displayfield', value: ')' },
                                            { xtype: 'textfield', width: 30, allowBlank: false, maskRe: /[a-z A-Z 0-9]/ },
                                            { xtype: 'displayfield', value: '-' },
                                            { xtype: 'textfield', width: 50, allowBlank: false, maxLength: 5, minLength: 5, enforceMaxLength: true }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        fieldLabel: 'Time worked',
                                        layout: 'hbox',
                                        items:
                                        [
                                           { xtype: 'numberfield', width: 50, allowBlank: false },
                                           { xtype: 'displayfield', value: 'hours' },
                                           { xtype: 'numberfield', width: 50, allowBlank: false },
                                           { xtype: 'displayfield', value: 'mins' }
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        fieldLabel: 'Full Name',
                                        layout: 'hbox',
                                        items:
                                        [
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
                                                    }
                                                }

                                            }
                                        ]
                                    }
                                ]
                        }
                    ]
                }//config
                var form = new Ext.formClass(formConfig);
                form.render(me.getId());
                return form;
            } //F
        }
});
      