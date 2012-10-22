(function ($) {
    Class('rightTabsControllerClass',
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
                },
                init: function () {

                    var me = this;

                    var c = { parentId: me.config.parentId, tabs: ["Apps", 'Modules', 'Users'] }
                    me.rightTabs = new tabsModuleClass(c);
                    me.rightTabs.init();

                    //load tabs one by one
                    me.loadKendoTreeView(me.rightTabs.getTab(0));
                    me.loadExtJSAccordion(me.rightTabs.getTab(1));
                    me.loadUserOrgSlider(me.rightTabs.getTab(2));



                    //select Tab 1
                    me.rightTabs.selectTab(1);

                }, //Init

                loadKendoTreeView: function (PH) {
                    var me = this;

                    app.tagReady(PH, function () {

                        var tvConfig =
                        {
                            id: app.idGenerator('tree'),
                            renderTo: PH,
                            width: "100%",
                            height: 500,
                            collapsible: false,
                            border: 0,

                            fields: ['id', 'parent_id ', 'title', 'description'],
                            sorters: false,
                            url: "/home/json_getAppFeatures",
                            extraParams: {},

                            //properties
                            useArrows: true,
                            rootVisible: false,
                            multiSelect: false,
                            singleExpand: true,
                            searchBar: false,

                            columns:
                            [
                                {
                                    xtype: 'treecolumn',
                                    dataIndex: 'title',
                                    editor:
                                    {
                                        allowBlank: false,
                                        xtype: 'textfield'
                                    },
                                    flex: 1,
                                    text: ''
                                }
                            ]

                        }//tv Config


                        app.maskUI(PH, "Loading ...");
                        me.tree = new Ext.treePanelClass(tvConfig);
                        app.unmaskUI(PH);



                        me.tree.on("itemclick", function (a, b, c) {

                            //(1)Get Selcted Node
                            var dataId = me.tree.getSelectionModel().getSelection()[0].data.id;
                            var node = me.tree.getStore().getNodeById(dataId);



                        }); //item click

                        me.tree.on('itemcontextmenu', function (view, record, HTMLElement, index, e, Object) {
                            var rec = record;
                            var contextMenu = new Ext.menu.Menu({
                                items:
                                  [
                                      {
                                          text: 'View',
                                          icon: '',
                                          handler: function () { }
                                      },
                                      {
                                          text: 'Edit',
                                          icon: '',
                                          handler: function () { }
                                      },
                                      {
                                          text: 'Pdf',
                                          icon: '',
                                          handler: function () { }
                                      }
                                  ]
                            });

                            e.stopEvent();
                            e.preventDefault();
                            contextMenu.showAt(e.getXY());
                            return false;
                        });
                    });

                },


                loadUserOrgSlider: function (PH) {
                    var me = this;

                    app.tagReady(PH, function () {

                        //load DVS and then Slider Inorder

                        //load DVS 
                        var config =
                            {
                                parentId: PH,
                                url: '/home/json_getSliderData',
                                colCount: 3,
                                cellWidth: "50",
                                cellHeight: "50",
                                bmpSum: "6",
                                path: "",
                                cascadingContainers: ["office", "employees"],
                                width: 170
                            }
                        var dvs1 = new dataViewSliderClass(config);
                        dvs1.setGrouping(true, null);
                        dvs1.setSelctionMode("single");
                        dvs1.init();

                        //load Slider
                        $('#' + dvs1.getId()).slimScroll({
                            position: 'right',
                            height: 320,
                            color: '#2F4F4F', //#800000  #2F4F4F  gray
                            size: '8px',
                            railVisible: false,
                            alwaysVisible: false
                        });


                    });
                },
                loadKenoAccordion: function (PH) {
                    var me = this;

                    app.tagReady(PH, function () {


                        $.ajax(
                        {
                            url: "/home/json_getModuleFeatures",
                            type: "get"
                        }).done(function (data) {

                            var c =
                            {
                                parentId: PH,
                                data: data,
                                events:
                                {
                                    select: function (e) {
                                        
                                        console.log(app.dump(e));
                                    }
                                }
                            }
                            me.accordion = new kendoAccordionModuleClass(c);
                            me.accordion.init();

                        });


                    });
                },

                loadExtJSAccordion: function (PH) {
                    var me = this;

                    app.tagReady(PH, function () {


                        $.ajax(
                        {
                            url: "/home/json_getModuleFeatures",
                            type: "get"
                        }).done(function (data) {

                            var items = []
                            for (var i = 0; i < data.length; i++) {
                                items.push
                                (
                                    Ext.create('Ext.Panel', {
                                        title: data[i].text,
                                        html: '<img src="/resources/components/rightTabsComponent/images/' + data[i].text + '.png" />'
                                    })

                                );
                                }

                            
                            var accordion = Ext.create('Ext.Panel', {
                                renderTo: PH,
                                height: 400,
                                border: 0,
                                layout: 'accordion',
                                items: items
                            });
                        });
                    });
                }

            }
    });
})(jQuery);