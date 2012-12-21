var kendoMenuModuleClass
(function ($$) {
    (function ($) {

    kendoMenuModuleClass = Class.create({
                initialize: function (config) {
                    var me = this;

                    me.config = config;
                    me.config.id = baseClass.idGenerator('placeholder');
                    $('#' + me.config.parentId).html('<div id=' + me.config.id + '></div>');
                },
                getId: function () {
                    var me = this;
                    return me.config.id;
                },

                init: function () {
                    var me = this;

                    me.result = '';
                    
                    baseClass.tagReady(me.getId(), function () {
                        me.buildGUI();
                    });
                },

                buildGUI: function () {

                    var me = this;

                    baseClass.tagReady(me.getId(), function () {
                    
                        $("#" + me.getId()).kendoMenu
                        ({
                            direction: "bottom",
                            dataSource: me.config.data,

                            select: function (e) { console.log(baseClass.dump($(e.item).children(".k-link").text())); },
                            open: function (e) {  },
                            close: function (e) { }

                        });
                        //.css({ "margin-bottom": "0px" });
                    });
                }

    });

    } (jQuery));
} (Prototype));

