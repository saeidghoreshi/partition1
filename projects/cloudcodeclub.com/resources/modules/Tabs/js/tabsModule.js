(function ($) {
    Class('tabsModuleClass',
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

            init: function (callback) {

                var me = this;
                app.tagReady(me.getId(), function () { me.buildGUI(callback); });
            },
            buildGUI: function (callback) {

                var me = this;

                var module = '<ul>';
                for (var i = 0; i < me.config.tabs.length; i++)
                    module += '<li><a href="#' + me.getId() + '-Tab' + i+ '">' + me.config.tabs[i] + '</a></li>';
                module += '</ul>';

                for (var i = 0; i < me.config.tabs.length; i++)
                    module += '<div id="' + me.getId() + '-Tab'+i+'"></div>';



                $('#' + me.getId()).html(module);
                $("#" + me.getId()).addClass("tabsModule");


                $("#" + me.getId()).tabs();
                $("#" + me.getId() + " .ui-widget-header").css("background", "transparent");


                if (callback != null) callback();

            },
            getTab: function (index) {
                var me = this;
                return me.getId() + '-Tab' + index.toString();
            },
            selectTab: function (index) {

                var me = this;
                app.tagReady(me.getId(), function () {
                    $("#" + me.getId()).tabs("select", index);

                });
            }
        }
});
})(jQuery);

