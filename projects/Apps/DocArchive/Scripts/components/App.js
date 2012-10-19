//base calss
function baseClass() {}
//static Method
baseClass.idGenerator = function (prefix) { return prefix + "-" + (Math.random() * 1000000000000).toFixed(0).toString(); }
baseClass.openDialog=function(title, size) {

    var PH = baseClass.idGenerator('ph');
    var win = Ext.create('widget.window',
                {
                    title: title,
                    width: size.width,
                    height: size.height,
                    items:
                    [
                        {
                            flex: 1,
                            height: "100%",
                            padding: 5,
                            border: 0,
                            html: "<div id='" + PH + "'><div class='theme1_loading2'></div></div>"
                        }
                    ],


                    frame: false,
                    border: 0,
                    draggable: true,
                    resizable: true,
                    closable: true,
                    closeAction: 'destroy',
                    modal: true,
                    autoScroll: true,
                    animCollapse: true,
                    animateTarget: 'body'
                });

    win.show();
    return { win: win, phId: PH };

}
baseClass.closeDialog=function(dialog) {dialog.win.destroy();}


function AppClass() {

    //setup page
    this.setupPage = function () {
        $('#theme1-table-main').ready(function () {

            $('#theme1-table-main').height(window.innerHeight - 2);

            //Event Resize Window
            $(window).resize(function () {
                $('#theme1-table-main').css('height', window.innerHeight);
            });

        });
        

    }
    //Initiate
    this.sliderObject=null;
    this.initiate = function () {
        var me = this;
        require(["Scripts/components/slider1/slider1"],
        function () {

            me.sliderObject = new slider1("docarch");

        }
     );
    }
}

//App Class Inheriting from base Class
AppClass.prototype = new baseClass();
AppClass.prototype.buildMenu = function () {

    var me = this;
    var buildComponent = function (placeHolder) {
        var tvConfig =
        {
        
            id: baseClass.idGenerator('tree'),
            renderTo: placeHolder,
            width: "100%",
            height: "100%",
            collapsible: false,
            border: 0,
            fields: ['id', 'parent_type_id', 'type_name'],
            sorters: false,
            url: "/home/json_getTopicsFoldering",
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
                    dataIndex: 'type_name',
                    editor:
                    {
                        allowBlank: false,
                        xtype: 'textfield'
                    },
                    flex: 1,
                    header:"List"
                }
            ]

        }//tv Config


        //app.maskUI(placeHolder, "Loading ...");
        me.tree = new Ext.treePanelClass(tvConfig);
        //app.unmaskUI(placeHolder);


        me.tree.on("itemclick", function (a, b, c) 
        {

            //(1)Get Selcted Node
            var dataId = me.tree.getSelectionModel().getSelection()[0].data.id;
            var node = me.tree.getStore().getNodeById(dataId);

            me.sliderObject.build(dataId);



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
    }
    require(["Scripts/modules/Ext.treePanel"], function () { $("docHierarcy").ready(function () { buildComponent("docHierarcy"); }); });
};




    var App = new AppClass();
    App.setupPage();
    App.initiate();
    App.buildMenu();






