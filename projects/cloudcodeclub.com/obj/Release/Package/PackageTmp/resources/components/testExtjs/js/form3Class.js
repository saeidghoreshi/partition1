Class('form3Class',
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

                    layout: 'column',
                    items:
                    [
                        {
                            columnWidth: 0.32,
                            xtype: 'fieldset',
                            title: 'Radio [set/H/V]',
                            defaults:
                            {
                                width: 300,
                                labelWidth: 90,
                                labelAlign: 'top'
                            },
                            items:
                            [
                            //RADIO
                                {
                                xtype: 'fieldset',
                                flex: 1,
                                title: 'Individual Radios',
                                items:
                                    [
                                        {
                                            xtype: 'radiogroup',
                                            fieldLabel: '',

                                            columns: 3, //use column to make cols or vertical
                                            //columns: [150, 100 ,100],
                                            items:
                                            [
                                                { inputValue: '0', name: 'rating', boxLabel: 'A' },
                                                { inputValue: '1', name: 'rating', boxLabel: 'B' },
                                                { inputValue: '2', name: 'rating', boxLabel: 'C' },
                                                { inputValue: '0', name: 'rating', boxLabel: 'D' },
                                                { inputValue: '4', name: 'rating', boxLabel: 'F' }
                                            ]
                                        }
                                    ]
                            },
                            //CHECKBOX
                            {
                            xtype: 'checkboxgroup',
                            fieldLabel: '',
                            columns: 3, //use column to make cols or vertical
                            //columns: [150, 100 ,100],
                            items:
                                    [
                                        { boxLabel: 'Item 1', name: 'cb-h' },
                                        { boxLabel: 'Item 2', name: 'cb-h', checked: true },
                                        { boxLabel: 'Item 3', name: 'cb-h' },
                                        { boxLabel: 'Item 4', name: 'cb-h' },
                                        { boxLabel: 'Item 5', name: 'cb-h' }
                                    ]
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
                            title: 'Groupped Radios',
                            defaults:
                            {
                                width: 300,
                                labelWidth: 90,
                                labelAlign: 'top'
                            },
                            items:
                            [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',

                                    anchor: '0',
                                    layout: 'column',
                                    defaultType: 'container',
                                    items:
                                    [
                                        {
                                            columnWidth: .25,
                                            items:
                                            [
                                                { xtype: 'component', html: 'Head 1' },
                                                { xtype: 'radiofield', boxLabel: 'Item 1', name: 'rb-cust', inputValue: 1 },
                                                { xtype: 'radiofield', boxLabel: 'Item 2', name: 'rb-cust', inputValue: 2 }
                                            ]
                                        },
                                        {
                                            columnWidth: .5,
                                            items:
                                            [
                                                { xtype: 'component', html: 'Head 2' },
                                                { xtype: 'radiofield', boxLabel: 'A long item ', name: 'rb-cust', inputValue: 3 }
                                            ]
                                        },
                                        {
                                            columnWidth: .25,
                                            items:
                                            [
                                                { xtype: 'component', html: 'Head 3' },
                                                { xtype: 'radiofield', boxLabel: 'Item 4', name: 'rb-cust', inputValue: 4 },
                                                { xtype: 'radiofield', boxLabel: 'Item 5', name: 'rb-cust', inputValue: 5 }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, //col2
                        {
                        columnWidth: 0.01,
                        bodyStyle: "border-color:transparent"
                    },
                        {
                            columnWidth: 0.32,
                            xtype: 'fieldset',
                            title: 'Others',
                            defaults:
                            {
                                width: 200,
                                labelWidth: 90,
                                labelAlign: 'top'
                            },
                            items:
                            [
                                //password
                                {
                                    xtype: "textfield",
                                    inputType: 'password'
                                },
                                {
                                    xtype: 'filefield',
                                    name: 'file1',
                                    buttonOnly: true,
                                    hideLabel: true,
                                    emptyText: 'Select an image',
                                    fieldLabel: 'File upload',
                                    listeners:
                                    { 
                                        change: function (fb, v) {
                                            Ext.get('fff').update(v);
                                        }
                                    }
                                },
                                {
                                    id: "fff",
                                    height: 30
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'date1',
                                    fieldLabel: 'Date Field'
                                },
                                {
                                    xtype: 'timefield',
                                    name: 'time1',
                                    fieldLabel: 'Time Field',
                                    minValue: '1:30 AM',
                                    maxValue: '9:15 PM'
                                },
                                {
                                    xtype: "sliderfield",
                                    items:
                                    [
                                        {
                                            fieldLabel: 'Sound Effects',
                                            value: 50,
                                            name: 'fx'
                                        },
                                        {
                                            fieldLabel: 'Ambient Sounds',
                                            value: 80,
                                            name: 'ambient'
                                        },
                                        {
                                            fieldLabel: 'Interface Sounds',
                                            value: 25,
                                            name: 'iface'
                                        }
                                    ]
                                }

                            ]
                        } //col3

                    ]
                }//config
                var form = new Ext.formClass(formConfig);
                //form.render(me.getId());
                return form;
            } //F
        }
});
      