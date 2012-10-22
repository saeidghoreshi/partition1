(function ($) {
Class('contextMenuClass',
{
    has:
        {
            config:
            {
                is: 'rw',
                init: null
            }
        },

    methods:
        {

            initialize: function (config) {

                var me = this;
                me.config = config;


                app.tagReady(me.config.id, function () {

                        me.init();
                        //remove all context menu if document clicked
                        //Never bind body click event to any thing els
                        $('body:not(#' + me.config.id + ')').die('contextmenu click').live('contextmenu click', function (e) {

                            me.deleteAllContextMenu();

                        });

                    });
                
            },

            init: function () {
                var me = this;
                
                me.rightClick();
            },

            rightClick: function () {
                var me = this;

                //$("#" + me.config.id).die('contextmenu rightclick').live('contextmenu rightclick', function (e) {
                $("#" + me.config.id).die('contextmenu click').live('contextmenu click', function (e) {
                    
                    e.preventDefault();
                    me.rightClickCB(e);
                    return false;
                });

            },

            deleteAllContextMenu: function () {
                $('.contectMenu_panel').each(function () { $(this).remove(); });
            },

            rightClickCB: function (e) {
                var me = this;
                me.deleteAllContextMenu();



                //build main panel
                var comtextMenuPanelId = app.idGenerator('contextMenu');
                $("body").append('<div id="' + comtextMenuPanelId + '" class="contectMenu_panel"></div>');

                //build sub items
                var contectMenu_panel = $("#" + comtextMenuPanelId);

                for (var i = 0; i < me.config.menusubItems.length; i++) {

                    var id = app.idGenerator('contextMenu');
                    var subId = app.idGenerator('contextMenu');
                    contectMenu_panel.append(
                         '<div id=' + id + ' dataId=' + me.config.menusubItems[i].dataId + ' class="tooltip_b1 contectMenu_items">'
                        + '<div id=' + subId + '  class="contectMenu_items_inner">' + me.config.menusubItems[i].title + '</div>'
                        + '</div>'

                    + '<div class="contectMenu_items_inner_seprator"></div>'
                    );
                }
                contectMenu_panel.css("display", "none");
                contectMenu_panel.fadeIn();

                contectMenu_panel.css("left", e.pageX);
                contectMenu_panel.css("top", e.pageY);

                //sub Menu Item Click
                $('.contectMenu_items').click(function () {

                    var dataId = $(this).attr("dataId");
                    var title = $(this).find('div').html();


                    for (var i = 0; i < me.config.menusubItems.length; i++)
                        if (me.config.menusubItems[i].title == title)
                            me.config.menusubItems[i].func(me.config.menusubItems[i].dataId);

                    contectMenu_panel.fadeOut();
                });

                //sub Menu Item Hover
                $('.contectMenu_items').hover
                (
                    function () {
                        $(this).css("background", "#f2f2f2");
                    },
                    function () {
                        $(this).css("background", "whitesmoke");
                    }
                );

            }

        }
        });
})(jQuery);