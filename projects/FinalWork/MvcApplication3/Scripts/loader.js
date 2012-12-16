(function ($$) {
    (function ($) {

        JSCSSLOADER = Class.create({

            initialize: function (jsArray, cssArray,callback) {
                this.jsArray = jsArray;
                this.cssArray = cssArray;
                this.loadAll(callback);
            },

            loadAll: function (callback) {
                YAHOO.util.Get.css(this.cssArray, {});
                YAHOO.util.Get.script(this.jsArray, { onSuccess: (callback === null ? function () { } : callback) });
            }
        });

    } (jQuery));
} (Prototype));
