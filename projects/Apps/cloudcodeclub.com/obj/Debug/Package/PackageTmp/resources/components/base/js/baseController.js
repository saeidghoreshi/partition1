Class('baseControllerClass',
{
    has:
        {
            config:
            {
                is: 'rw',
                init: {}
            },
            controls:
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

                padding = -10;
                me.window = { width: window.innerWidth, height: window.innerHeight }
                $('#theme1_maintable').css('height', me.window.height + padding + 'px');



                $(window).resize(function () {
                    me.window = { width: window.innerWidth, height: window.innerHeight }
                    $('#theme1_maintable').css('height', me.window.height+padding + 'px');


                });

                me.buildGUI();
                me.keyEvents();

                //me.loadWorkFlow();
                me.loadRightSideTabs();
                me.buildContextMenu();


                //Load Top Menu
                var ph1 = "topContainer";
                var callback = function () {
                    var config = { parentId: ph1 }

                    me.controls.menu = new mainMenuControllerClass(config);
                    me.controls.menu.init();
                }
                app.tagReady(ph1, function () { app.loader("MainMenuComponent", callback, { PHId: ph1 }); });



                me.loadExtJSFunction();
                return;
                //load testUI
                var phId = me.getLeft();
                var tucallback = function (id) {

                    var c = { parentId: phId }
                    var x = new testUIControllerClass(c);
                    x.init();
                }
                app.tagReady(phId, function () { app.loader("testUI", tucallback, { PHId: phId }); });


            },
            testCurl: function (ph) {
                $.ajax(
                {
                    url: "/facebook/testCurl",
                    type: "get"
                }).done(function (data) {
                    alert(app.dump(data.result));
                });
            },

            keyEvents: function () {

                var me = this;
                //Keyboard events
                var keyList = []
                var keyListCounter = 0;

                $('body').die("keydown").live({ "keydown":

                    function (event) {
                        keyList[keyListCounter++] = event.keyCode;

                        if (keyList.length == 3) {

                            if (
                                String.fromCharCode(keyList[0]) == 'D'
                                && String.fromCharCode(keyList[1]) == 'O'
                                && String.fromCharCode(keyList[2]) == 'C'
                            )
                                me.loadDocumentor();
                        }

                        setTimeout(function () { keyList = []; keyListCounter = 0; }, 3000);

                    }
                });
            },
            sideSelectorWidth: function () {

                var defaultWidth = 70;
                if (app.isBrowser("mozilla"))
                    return (defaultWidth + 1).toString() + "px";
                if (app.isBrowser("chrome"))
                    return (defaultWidth + 2).toString() + "px";
                if (app.isBrowser("msie"))
                    return (defaultWidth + 7).toString() + "px";
                if (app.isBrowser("safari"))
                    return (defaultWidth + 3).toString() + "px";
            },
            buildGUI: function () {
                var me = this;

                $("#side1").die("click").live({ click:
                function () {

                    //$('#side-selector').css({ "left": me.sideSelectorWidth(), "top": "80px", "display": "block" });

                    //Load WorkFlow
                    //$("#" + me.getLeft()).html('');
                    //app.loadWorkFlow();

                    //building placeholder and load sub-components
                    var dialog = app.openDialog('Create New Office', { width: 300, height: 270 });
                    var Id1 = dialog.phId;

                    app.tagReady(Id1, function () {
                        var c = { parentId: Id1, dialog: dialog }
                        var newOfficeForm = new newOfficeClass(c);
                        newOfficeForm.buildForm();
                    });
                }
                });

                $("#side2").die("click").live({ click:
                function () {
                    //$('#side-selector').css({ "left": me.sideSelectorWidth(), "top": "140px", "display": "block" });

                    //building placeholder and load sub-components

                    var dialog = app.openDialog('Create New User', { width: 250, height: 130 });
                    var Id1 = dialog.phId;


                    app.tagReady(Id1, function () {
                        var c = { parentId: Id1, dialog: dialog }
                        var newUserForm = new newUserClass(c);
                        newUserForm.buildForm();
                    });


                }
                });

                //permissions
                $("#side3").die("click").live({ click:
                function () {
                    //$('#side-selector').css({ "left": me.sideSelectorWidth(), "top": "200px", "display": "block" });
                    //building placeholder and load sub-components

                    var dialog = app.openDialog('Manage Permissions', { width: 520, height: 400 });
                    var ph1 = dialog.phId;

                    app.tagReady(ph1, function () {
                        var config = { parentId: ph1, dialog: dialog }
                        var permissionsController = new permissionsControllerClass(config);
                        permissionsController.assignPermissionsForm();

                    });
                }
                });

                //Foldering
                $("#side4").die("click").live({ click:
                function () {
                    //$('#side-selector').css({ "left": me.sideSelectorWidth(), "top": "250px", "display": "block" });
                    me.loadDocumentor();
                }

                });


                //tasks
                $("#side5").die("click").live({ click:
                function () {
                    //$('#side-selector').css({ "left": me.sideSelectorWidth(), "top": "310px", "display": "block" });

                    //building placeholder and load sub-components

                    var dialog = app.openDialog('Create New Task', { width: 600, height: 300 });
                    var Id1 = dialog.phId;

                    app.tagReady(Id1, function () {
                        var c = { id: Id1, dialog: dialog }
                        var defineTaskController = new defineTaskControllerClass(c);
                        defineTaskController.init();
                    });
                }
                });

                //TEST Extjs
                $("#side8").die("click").live({ click: function () {
                    //me.loadExtJSFunction();
                    var phId = me.getLeft();
                    var callback = function (id) {

                        var c = { parentId: phId }
                        var x = new testUIControllerClass(c);
                        x.init();
                    }

                    app.tagReady(phId, function () { app.loader("testUI", callback, { PHId: phId }); });
                }

                });

                //facebook
                $("#side9").die("click").live({ click: function () { me.facebook(); } });

                //login
                $("#theme1_loginRequest").die("click").live({ click: function () {
                    //$('#side-selector').css({ "left": me.sideSelectorWidth(), "top": "430px", "display": "block" });


                    //building placeholder and load sub-components

                    var dialog = app.openDialog('Login', { width: 250, height: 120 });
                    var ph1 = dialog.phId;

                    app.tagReady(ph1, function () {
                        var c = { id: ph1, dialog: dialog }
                        app.loginController = new loginControllerClass(c);
                        app.loginController.init();

                    });
                }
                });

                //logout
                $("#theme1_logoutRequest").die("click").live({ click: function () { app.loginController.Logout(); } });
            },

            enableSideMenu: function (enable) { $('.side').css('display', enable); },

            getLeft: function () { return 'firstPH'; },
            getRight: function () { return 'secondPH'; },

            facebook: function () {

                var me = this;
                var phId = me.getLeft();


                var callback = function (id) {

                    var c = { parentId: phId }
                    var fb = new facebookControllerClass(c);
                    fb.init();

                }

                app.tagReady(phId, function () {

                    app.loader("facebook", callback, { PHId: phId });

                });
            },
            loadDocumentor: function () {

                var me = this;

                var phId = me.getLeft();
                var callback = function (id) {

                    var c = { parentId: phId }
                    var archive = new archiveClass(c);
                    archive.init();
                }

                app.tagReady(phId, function () { app.loader("archive", callback, { PHId: phId }); });
            },
            loadExtJSFunction: function () {

                var me = this;
                //$('#side-selector').css({ "left": me.sideSelectorWidth(), "top": "370px", "display": "block" });


                //me.testViewportWin1();
                //me.testViewportWin2();
                //me.EXTJSGrid();
                //me.EXTJSTree();
                //me.EXTJSFormMixed();
                //me.EXTJSForm1();
                //me.EXTJSForm3();
                //me.EXTJSForm4();
                //me.EXTJSTabs();
                //me.EXTJSGridFormDND();
                //me.EXTJSGroupped();
                //me.EXTJSChartRadar();

                //app.loadKenoGrid(me.getLeft());

                //Splitter
                //                    $("#vertical").kendoSplitter({
                //                        orientation: "vertical",
                //                        panes: 
                //                        [
                //                            { collapsible: true },
                //                            { collapsible: true, size: "100px" },
                //                            { collapsible: true, resizable: true, size: "100px" }
                //                        ]
                //                    });

                //                    $("#horizontal").kendoSplitter({
                //                        panes: 
                //                        [
                //                            { collapsible: true, size: "220px" },
                //                            { collapsible: true },
                //                            { collapsible: true, size: "220px" }
                //                        ]
                //                    });

                //Dropdownlist
                //                $("#titles").kendoDropDownList({
                //                    dataTextField: "Name",
                //                    dataValueField: "Id",
                //                    // define custom template
                //                    template: '<img src="${ data.BoxArt.SmallUrl }" alt="${ data.Name }" />' +
                //                                  '<dl>' +
                //                                      '<dt>Title:</dt><dd>${ data.Name }</dd>' +
                //                                      '<dt>Year:</dt><dd>${ data.ReleaseYear }</dd>' +
                //                                  '</dl>',
                //                    dataSource: {
                //                        type: "odata",
                //                        serverFiltering: true,
                //                        filter: [{
                //                            field: "Name",
                //                            operator: "contains",
                //                            value: "Star Wars"
                //                        }, {
                //                            field: "BoxArt.SmallUrl",
                //                            operator: "neq",
                //                            value: null
                //                        }],
                //                        transport: {
                //                            read: "http://odata.netflix.com/Catalog/Titles"
                //                        }
                //                    }
                //                });

                //                var dropdownlist = $("#titles").data("kendoDropDownList");

                //                // set width of the drop-down list
                //                dropdownlist.list.width(400);

            }, //F

            EXTJSGrid: function () {

                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    var config = { parentId: ph1 }
                    me.controls.grid1 = new gridPanelControllerClass(config);
                    me.controls.grid1.init();
                }

                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            }, //F
            EXTJSTree: function () {

                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    var config = { parentId: ph1 }
                    me.controls.tree = new treePanelControllerClass(config);
                    me.controls.tree.init();

                }

                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            }, //F
            EXTJSFormMixed: function () {

                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    //(1) Load View port Module
                    var vpConfig = { parentId: ph1, width: 900 }
                    me.controls.vp1 = new Ext.viewPort2Class(vpConfig);
                    me.controls.vp1.doLayout();
                    me.controls.vp1.doComponentLayout();
                    var winBottomItems =
                        [
                            {
                                xtype: "button",
                                id: "button1",
                                text: 'Submit',
                                listeners:
                                {
                                    click: function () { }
                                },

                                minWidth: 80
                            }
                        ];
                    app.showWin(me.controls.vp1, "Form Combined ExtJs 1", {}, null, winBottomItems);

                    //(2)load other Components one by one
                    app.tagReady(me.controls.vp1.getInnerSecId("center"), function () {
                        var config = { parentId: me.controls.vp1.getInnerSecId("center"), width: "100%" }
                        var f = new form2Class(config);
                        f.init();

                        //setup Properties after all required combos loaded
                        formSetup =
                        [
                            { field: "form2_combo1", value: 'mrs' },
                            { field: "form2_firstname", value: 'test' }
                        ];
                        for (var i = 0; i < formSetup.length; i++)
                            Ext.getCmp(formSetup[i].field).setValue(formSetup[i].value);
                    });
                    app.tagReady(me.controls.vp1.getInnerSecId("west"), function () {
                        var config =
                        {
                            parentId: me.controls.vp1.getInnerSecId("west"),
                            width: "100%"
                        }
                        var f = new form1Class(config);
                        f.init();
                    });

                }

                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            }, //F
            EXTJSGridFormDND: function () {
                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    //(1) Load View port Module
                    var vpConfig = { parentId: ph1, width: 900 }
                    me.controls.vp1 = new Ext.viewPort2Class(vpConfig);
                    me.controls.vp1.doLayout();
                    me.controls.vp1.doComponentLayout();
                    app.showWin(me.controls.vp1, "grid Form DND", {}, null, null);

                    //(2)load other Components one by one
                    app.tagReady(me.controls.vp1.getInnerSecId("center"), function () {
                        var config = { parentId: me.controls.vp1.getInnerSecId("center") }
                        me.controls.control1 = new gridPanel3ControllerClass(config);
                        me.controls.control1.init();
                        me.controls.vp1.alignmentViewPort(me.controls.control1.grid, "center", null);
                    });
                    app.tagReady(me.controls.vp1.getInnerSecId("west"), function () {
                        var config =
                        {
                            parentId: me.controls.vp1.getInnerSecId("west"),
                            width: "100%"
                        }
                        var f = new form1Class(config);
                        var form = f.init();

                        var formPanelDropTargetEl = form.body.dom;

                        //Drag and Drop Definition
                        var formPanelDropTarget = Ext.create('Ext.dd.DropTarget', formPanelDropTargetEl, {
                            ddGroup: 'GridExample',
                            notifyEnter: function (ddSource, e, data) {

                                form.body.stopAnimation();
                                form.body.highlight();
                            },
                            notifyDrop: function (ddSource, e, data) {

                                var selectedRecord = ddSource.dragData.records[0];
                                alert(app.dump(selectedRecord));
                                ddSource.view.store.remove(selectedRecord);
                                return true;
                            }
                        });
                    });



                }

                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            },
            EXTJSForm1: function () {

                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    var config =
                    {
                        parentId: ph1,
                        width: 600
                    }
                    var f = new form1Class(config);
                    var winBottomItems =
                    [
                        {
                            xtype: "button",
                            id: "button1",
                            text: 'Submit',
                            listeners:
                            {
                                click: function () { }
                            },

                            minWidth: 80
                        }
                    ];

                    app.showWin(f.init(), "title", {}, null, winBottomItems);

                    //setup Properties after all required combos loaded
                    formSetup =
                    [
                        { field: "form1_combo1", value: 'mrs' },
                        { field: "form1_email", value: 'saeid@yahoo.com' }
                    ];
                    for (var i = 0; i < formSetup.length; i++)
                        Ext.getCmp(formSetup[i].field).setValue(formSetup[i].value);
                }

                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            }, //F
            EXTJSForm3: function () {

                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    var config =
                    {
                        parentId: ph1,
                        width: 1000
                    }
                    var f = new form3Class(config);
                    var form = f.init();

                    var winBottomItems =
                    [
                        {
                            id: "button1",
                            xtype: "button",
                            text: 'Submit',
                            handler: function () {

                                var form = win.form.getForm();
                                if (!form.isValid()) return;

                                form.submit
                                ({
                                    url: '/home/json_upload',
                                    waitMsg: 'Uploading your photo...',
                                    success: function () {
                                        alert(app.dump('Successfull'));
                                    }
                                });
                            },
                            minWidth: 80
                        }
                    ];
                    var win = app.showWin(form, "Title", {}, null, winBottomItems);

                }

                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            }, //F
            EXTJSForm4: function () {

                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    var config = { parentId: ph1, width: 1000 }
                    var f = new form4Class(config);
                    app.showWin(f.init(), "title", {}, null, null);
                }

                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            }, //F
            EXTJSTabs: function () {


                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    var TABS = Ext.createWidget('tabpanel',
                    {
                        width: "100%",
                        activeTab: 0,
                        //renderTo: ph1,
                        plugins:
                        [{
                            ptype: 'tabscrollermenu',
                            maxText: 15,
                            pageSize: 10
                        }],
                        defaults: { bodyPadding: 10 },
                        items:
                        [
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true },
                            { title: 'Tab1', closable: true },
                            { title: 'Tab2', closable: true }

                        ]
                    });
                    app.showWin(TABS, "title", {}, null, null);

                }

                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            }, //F
            EXTJSChartRadar: function () {

                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    var data = [];
                    for (i = 0; i < 12; i++) {
                        data.push({
                            name: "XXXX - " + i,
                            data1: Math.random() * 100,
                            data2: Math.random() * 100,
                            data3: Math.random() * 100,
                            data4: Math.random() * 100,
                            data5: Math.random() * 100,
                            data6: Math.random() * 100,
                            data7: Math.random() * 100,
                            data8: Math.random() * 100,
                            data9: Math.random() * 100
                        });
                    }

                    //Chart 1
                    var chart1 = Ext.create('Ext.chart.Chart', {
                        id: 'chartCmp',
                        width: 700,
                        height: 500,
                        xtype: 'chart',
                        style: 'background:#fff',
                        theme: 'Category2',
                        animate: true,
                        store: app.makeExtJSStaticStore
                        (
                            ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9'],
                            data
                        ),
                        insetPadding: 20,
                        legend: { position: 'right' },
                        axes: [{
                            type: 'Radial',
                            position: 'radial',
                            label: {
                                display: true
                            }
                        }],
                        series: [{
                            type: 'radar',
                            xField: 'name',
                            yField: 'data1',
                            showInLegend: true,
                            showMarkers: true,
                            markerConfig: {
                                radius: 5,
                                size: 5
                            },
                            style: {
                                'stroke-width': 2,
                                fill: 'none'
                            }
                        }, {
                            type: 'radar',
                            xField: 'name',
                            yField: 'data2',
                            showInLegend: true,
                            showMarkers: true,
                            markerConfig: {
                                radius: 5,
                                size: 5
                            },
                            style: {
                                'stroke-width': 2,
                                fill: 'none'
                            }
                        }, {
                            type: 'radar',
                            xField: 'name',
                            yField: 'data3',
                            showMarkers: true,
                            showInLegend: true,
                            markerConfig: {
                                radius: 5,
                                size: 5
                            },
                            style: {
                                'stroke-width': 2,
                                fill: 'none'
                            }
                        }]
                    });
                    //Chart 2
                    var chart2 = Ext.create('Ext.chart.Chart', {
                        id: 'chartCmp',
                        xtype: 'chart',
                        style: 'background:#fff',
                        animate: true,
                        theme: 'Category1',
                        width: 700,
                        height: 500,
                        store: app.makeExtJSStaticStore
                        (
                            ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data8', 'data9'],
                            data
                        ),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['data1', 'data2', 'data3'],
                            title: 'Number of Hits',
                            grid: true
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['name'],
                            title: 'Month of the Year'
                        }],
                        series: [{
                            type: 'column',
                            axis: 'left',
                            xField: 'name',
                            yField: 'data1',
                            markerConfig: {
                                type: 'cross',
                                size: 3
                            }
                        }, {
                            type: 'scatter',
                            axis: 'left',
                            xField: 'name',
                            yField: 'data2',
                            markerConfig: {
                                type: 'circle',
                                size: 5
                            }
                        }, {
                            type: 'line',
                            axis: 'left',
                            smooth: true,
                            fill: true,
                            fillOpacity: 0.5,
                            xField: 'name',
                            yField: 'data3'
                        }]
                    });
                    //Chart 3
                    var pieModel = [
                        {
                            name: 'data1',
                            data: 10
                        },
                        {
                            name: 'data2',
                            data: 10
                        },
                        {
                            name: 'data3',
                            data: 10
                        },
                        {
                            name: 'data4',
                            data: 10
                        },
                        {
                            name: 'data5',
                            data: 10
                        }
                    ];

                    var pieStore = Ext.create('Ext.data.JsonStore', {
                        fields: ['name', 'data'],
                        data: pieModel
                    });

                    var pieChart = Ext.create('Ext.chart.Chart', {
                        width: 100,
                        height: 100,
                        animate: false,
                        store: pieStore,
                        shadow: false,
                        insetPadding: 0,
                        theme: 'Base:gradients',
                        series: [{
                            type: 'pie',
                            field: 'data',
                            showInLegend: false,
                            label: {
                                field: 'name',
                                display: 'rotate',
                                contrast: true,
                                font: '9px Arial'
                            }
                        }]
                    });

                    var gridStore = Ext.create('Ext.data.JsonStore', {
                        fields: ['name', 'data'],
                        data: pieModel
                    });

                    var grid = Ext.create('Ext.grid.Panel', {
                        store: gridStore,
                        height: 130,
                        width: 480,
                        columns: [
                            {
                                text: 'name',
                                dataIndex: 'name'
                            },
                            {
                                text: 'data',
                                dataIndex: 'data'
                            }
                        ]
                    });

                    var chart3 = Ext.create('Ext.chart.Chart', {
                        xtype: 'chart',
                        animate: true,
                        shadow: true,
                        width: 700,
                        height: 500,
                        store: app.makeExtJSStaticStore
                        (
                            ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
                            data
                        ),
                        axes: [{
                            type: 'Numeric',
                            position: 'left',
                            fields: ['data1'],
                            title: false,
                            grid: true
                        }, {
                            type: 'Category',
                            position: 'bottom',
                            fields: ['name'],
                            title: false
                        }],
                        series: [{
                            type: 'line',
                            axis: 'left',
                            gutter: 80,
                            xField: 'name',
                            yField: ['data1'],
                            tips: {
                                trackMouse: true,
                                width: 580,
                                height: 170,
                                layout: 'fit',
                                items: {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [pieChart, grid]
                                },
                                renderer: function (klass, item) {
                                    var storeItem = item.storeItem,
                            data = [{
                                name: 'data1',
                                data: storeItem.get('data1')
                            }, {
                                name: 'data2',
                                data: storeItem.get('data2')
                            }, {
                                name: 'data3',
                                data: storeItem.get('data3')
                            }, {
                                name: 'data4',
                                data: storeItem.get('data4')
                            }, {
                                name: 'data5',
                                data: storeItem.get('data5')
                            }], i, l, html;

                                    this.setTitle("Information for " + storeItem.get('name'));
                                    pieStore.loadData(data);
                                    gridStore.loadData(data);
                                    grid.setSize(480, 130);
                                }
                            }
                        }]
                    });


                    app.showWin(chart3, "title", {}, null, null);

                }

                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });

            },
            testViewportWin1: function () {

                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    //(1) Load View port Module
                    var vpConfig = { parentId: ph1, width: 900 }
                    me.controls.vp1 = new Ext.viewPort1Class(vpConfig);
                    me.controls.vp1.doLayout();
                    me.controls.vp1.doComponentLayout();
                    app.showWin(me.controls.vp1, "title", {}, null, null);

                    //(2)load other Components one by one
                    app.tagReady(me.controls.vp1.getInnerSecId("center"), function () {

                        var config = { parentId: me.controls.vp1.getInnerSecId("center") }
                        me.controls.control1 = new gridPanelControllerClass(config);
                        me.controls.control1.init();
                        me.controls.vp1.alignmentViewPort(me.controls.control1.grid, "center", null);
                    });
                    app.tagReady(me.controls.vp1.getInnerSecId("west"), function () {

                        var config = { parentId: me.controls.vp1.getInnerSecId("west") }
                        me.controls.control2 = new gridPanel2ControllerClass(config);
                        me.controls.control2.init();
                        me.controls.vp1.alignmentViewPort(me.controls.control2.grid, "west", null);
                    });

                    Ext.getCmp(me.controls.vp1.getSecId("north")).collapse();
                }
                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            }, //F
            testViewportWin2: function () {

                var me = this;
                var ph1 = me.getLeft();
                var callback = function () {

                    //(1) Load View port Module
                    var vpConfig = { parentId: ph1, width: 900 }
                    me.controls.vp1 = new Ext.viewPort1Class(vpConfig);
                    me.controls.vp1.doLayout();
                    me.controls.vp1.doComponentLayout();
                    app.showWin(me.controls.vp1, "title", {}, null, null);

                    //(2)load other Components one by one
                    app.tagReady(me.controls.vp1.getInnerSecId("center"), function () {

                        var config = { parentId: me.controls.vp1.getInnerSecId("center") }
                        me.controls.control1 = new gridPanelControllerClass(config);
                        me.controls.control1.init();
                        me.controls.vp1.alignmentViewPort(me.controls.control1.grid, "center", null);
                    });

                    app.tagReady(me.controls.vp1.getInnerSecId("west"), function () {

                        var config = { parentId: me.controls.vp1.getInnerSecId("west") }
                        me.controls.gmaps = new gmapsClass(config);
                        me.controls.gmaps.init();
                        me.controls.vp1.alignmentViewPort(Ext.get(me.controls.gmaps.getId()), "west", function () { google.maps.event.trigger(me.controls.gmaps.maps, 'resize'); });
                    });
                    app.tagReady(me.controls.vp1.getInnerSecId("north"), function () {

                        var config = { parentId: me.controls.vp1.getInnerSecId("north") }
                        me.controls.tree = new treePanelControllerClass(config);
                        me.controls.tree.init();
                        Ext.getCmp(me.controls.vp1.getSecId("north")).collapse();
                    });
                }
                app.tagReady(ph1, function () { app.loader("testExtJs", callback, { PHId: ph1 }); });
            }, //F

            loadWorkFlow: function (task_id) {

                var me = this;


                $('.tags').each(function () {

                    $(this).remove();
                    $(this).css("display", "none");

                });
                var callback2 = function (id) {

                    var cWorkFlow =
                        {
                            id: id,
                            pos:
                            {
                                left: $('#' + id).position().left,
                                top: $('#' + id).position().top
                            },
                            enableDetails: true,
                            task_id: task_id
                        }

                    me.draw1 = new workflow1ControllerClass(cWorkFlow);
                    me.draw1.init();

                }
                app.tagReady(me.id, function () {
                    app.loader("workflow", callback2, { PHId: me.config.baseController.getLeft() });
                });

            },

            loadKenoGrid: function (PH) {
                var me = this;

                app.tagReady(PH, function () {

                    var callback = function () {

                        var c = { parentId: PH }
                        me.kendoGrid1Controller = new kendoGrid1ControllerClass(c);
                        me.kendoGrid1Controller.init();
                    };

                    app.loader("kendoGrid1Component", callback, { PHId: PH });
                });
            },
            loadRightSideTabs: function () {
                var me = this;
                var ph1 = "secondPH";
                app.tagReady(ph1, function () {

                    var callback = function () {

                        var config = { parentId: ph1 }
                        me.rightTabsController = new rightTabsControllerClass(config);
                        me.rightTabsController.init();


                    }
                    app.loader("rightTabsComponent", callback, { PHId: ph1 });
                });

            },
            buildContextMenu: function () {
                var me = this;
                var contextMenuConfig =
                    {
                        id: "side5",
                        menusubItems:
                        [
                            {
                                id: "1", title: "Tasks", func: function (a) {

                                    //(1)select from Task List

                                    var dialog = app.openDialog('Registered Tasks', { width: 200, height: 100 });
                                    var ph1 = dialog.phId;

                                    app.tagReady(ph1, function () {
                                        var c =
                                        {
                                            id: ph1,
                                            callback: function () {

                                                var task_id = $('#usercurtasks_taskList').val();

                                                me.loadWorkFlow(task_id);
                                                app.closeDialog(dialog);
                                            }
                                        };
                                        var taskListController = new taskListControllerClass(c);
                                        taskListController.init();
                                    });

                                }
                            },
                            {
                                id: "2", title: "New Task", func: function (a) {

                                    //building placeholder and load sub-components
                                    var dialog = app.openDialog('Create New Task', { width: 600, height: 330 });
                                    var PH1 = dialog.phId;

                                    app.tagReady(PH1, function () {
                                        var c =
                                        {
                                            id: PH1,
                                            dialog: dialog
                                        }
                                        var defineTaskController = new defineTaskControllerClass(c);
                                        defineTaskController.init();
                                    });

                                }
                            },
                            { id: "3", title: "Task Assignment", func: function (a) {

                                //(1)select from Task
                                var dialogTaskList = app.openDialog('My Registered Tasks', { width: 200, height: 120 });
                                var dialogTaskListId = dialogTaskList.phId;


                                app.tagReady(dialogTaskListId, function () {
                                    var c =
                                    {
                                        id: dialogTaskListId,
                                        dialog: dialogTaskList,

                                        callback: function () {

                                            var task_id = $('#usercurtasks_taskList').val();

                                            //building placeholder and load sub-components
                                            var dialogTaskAssignment = app.openDialog('Task Assignment', { width: 670, height: 620 });
                                            var dialogTaskAssignmentId = dialogTaskAssignment.phId;


                                            app.tagReady(dialogTaskAssignmentId, function () {
                                                var c =
                                                {
                                                    id: dialogTaskAssignmentId,
                                                    dialog: dialogTaskAssignment,
                                                    task_id: task_id
                                                }
                                                var taskAssignmentController = new taskAssignmentControllerClass(c);
                                                taskAssignmentController.init();
                                            });

                                            //close current dialog 
                                            app.closeDialog(dialogTaskList);

                                        }
                                    };
                                    var taskListController = new taskListControllerClass(c);
                                    taskListController.init();
                                });
                            }
                            },
                            { id: "4", title: "My Tracker", func: function (a) {

                                //(1)select from Task

                                var dialogTaskList = app.openDialog('My Registered Tasks', { width: 200, height: 100 });
                                var dialogTaskListId = dialogTaskList.phId;


                                app.tagReady(dialogTaskListId, function () {
                                    var c =
                                    {
                                        id: dialogTaskListId,
                                        dialog: dialogTaskList,
                                        callback: function () {

                                            var task_id = $('#usercurtasks_taskList').val();

                                            //initiate time Tracker Panel

                                            var dialogTimeTracker = app.openDialog('Task Time Tracker', { width: 650, height: 600 });
                                            var dialogTimeTrackerId = dialogTimeTracker.phId;


                                            app.tagReady(dialogTimeTrackerId, function () {
                                                var c =
                                                {
                                                    id: dialogTimeTrackerId,
                                                    dialog: dialogTimeTracker,

                                                    task_id: task_id
                                                };
                                                var taskTrackerController = new taskTrackerControllerClass(c);
                                                taskTrackerController.init();
                                            });

                                            //close current dialog 
                                            app.closeDialog(dialogTaskList);

                                        }
                                    };
                                    var taskListController = new taskListControllerClass(c);
                                    taskListController.init();
                                });

                            }
                            }
                        ]
                    }
                var contextMenu = new contextMenuClass(contextMenuConfig);
            }
        }
});