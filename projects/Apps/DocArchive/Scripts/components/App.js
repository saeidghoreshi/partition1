require(["Scripts/components/slider1/slider1"],
    function () {

        var x = new slider1("docarch");
        x.build();
    }

 );

    function baseClass() {
        this.idGenerator = function (prefix) { return prefix + "-" + (Math.random() * 1000000000000).toFixed(0).toString(); }
    }
    var x = new baseClass();
 function openDialog(title, size) {

                var PH = x.idGenerator('ph');
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
                    resizable: false,
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
            function closeDialog(dialog) {
                dialog.win.destroy();
            }