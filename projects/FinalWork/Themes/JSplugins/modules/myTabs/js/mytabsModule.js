(function ($) {
    Class('mytabsModuleClass',
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
                app.tagReady(me.getId(), function () { me.buildGUI(); });
            },
            buildGUI: function () {

                var me = this;

                

            }
        }
});
})(jQuery);

