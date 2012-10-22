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
        var me = this;
        require(["Scripts/components/TreeMenu/treemenu"],
        function () {

            me.treeMenu = new treeMenu();
            me.treeMenu.initiate(placeHolder);

        });
    }
    require(["Scripts/modules/Ext.treePanel"], function () { $("docHierarcy").ready(function () { buildComponent("docHierarcy"); }); });
};




    var App = new AppClass();
    App.setupPage();
    App.initiate();
    App.buildMenu();






