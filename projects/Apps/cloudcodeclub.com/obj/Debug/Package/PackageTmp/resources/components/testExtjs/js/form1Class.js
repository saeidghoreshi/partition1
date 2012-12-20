Class('form1Class',
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
                    //defaults: { labelAlign: 'top' },
                    
                    items:
                    [
                        {
                            xtype: "textfield",
                            id: "form1_email",
                            fieldLabel: 'Email',
                            afterLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
                            vtype: 'email',
                            allowBlank: false
                            //minLength: 6
                        },
                        {
                            fieldLabel: 'DOB',
                            xtype: 'datefield'
                        },
                        {
                            fieldLabel: 'Age',
                            xtype: 'numberfield',
                            minValue: 0,
                            maxValue: 100
                            /*
                            allowDecimals: true,
                            decimalPrecision: 1,
                            step: 0.4
                            */
                        },
                        {
                            xtype: 'timefield',
                            fieldLabel: 'Time',
                            minValue: '8:00am',
                            maxValue: '6:00pm'
                        },

                    //---------------------------------------------Tab Panel
                        {
                        xtype: 'tabpanel',
                        plain: true,
                        activeTab: 0,
                        defaults: { bodyPadding: 10 },
                        items:
                            [
                                {
                                    title: 'Personal Details',
                                    defaults: {
                                        width: 230
                                    },
                                    defaultType: 'textfield',

                                    items:
                                    [
                                        {
                                            fieldLabel: 'First Name',
                                            allowBlank: false,
                                            value: 'Jamie'
                                        }, 
                                        {
                                            fieldLabel: 'Last Name',
                                            value: 'Avins'
                                        }, 
                                        {
                                            fieldLabel: 'Company',
                                            value: 'Ext JS'
                                        }, 
                                        {
                                            fieldLabel: 'Email',
                                            vtype: 'email'
                                        }
                                   ]
                                },
                                {
                                    title: 'Phone Numbers',
                                    defaults: { width: 230 },
                                    defaultType: 'textfield',

                                    items:
                                    [
                                        {
                                            fieldLabel: 'Home',
                                            value: '(888) 555-1212'
                                        }, 
                                        {
                                            fieldLabel: 'Business'
                                        }, 
                                        {
                                            fieldLabel: 'Mobile'
                                        }, 
                                        {
                                            fieldLabel: 'Fax'
                                        }
                                   ]
                                },
                                {
                                    cls: 'x-plain',
                                    title: 'Biography',
                                    layout: 'fit',
                                    items:
                                    {
                                        xtype: 'htmleditor',
                                        fieldLabel: 'Biography'
                                    }
                                }
                                ]
                    },


                    //---------------------------------------------last Row
                        {
                        xtype: 'fieldset',
                        title: 'FieldSet1',
                        checkboxToggle: true,
                        collapsed: true,
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
                                            { xtype: 'textfield', width: 30, allowBlank: false, maskRe: /[a-z A-Z 0-9]/,maskRe: /[\d\-]/ , regex: /^\d{3}-\d{3}-\d{4}$/, },
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
                                                id: "form1_combo1",

                                                triggerAction: 'all',
                                                forceSelection: true,
                                                editable: false,
                                                allowBlank: false,
                                                emptyText: '',
                                                queryMode: 'local',
                                                typeAhead:true,
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
      