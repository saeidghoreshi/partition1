
    loadExtJSFunction: function () {


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
    id: "2", title: "New Task", func: function (a) {

    //building placeholder and load sub-components
    var dialog = app.openDialog('Create New Task', { width: 600, height: 350 });
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
    {
    id: "1", title: "Tasks Map", func: function (a) {

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
