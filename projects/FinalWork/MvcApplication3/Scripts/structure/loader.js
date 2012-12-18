(function ($$) {
    (function ($) {

        JSCSSLOADER = Class.create({

            initialize: function (jsArray, cssArray, callback) {
                this.jsArray = jsArray;
                this.cssArray = cssArray;
                this.loadAll(callback);
            },

            loadAll: function (callback) {
                $.getScript(this.jsArray, (callback === null ? function () { } : callback));
            }
        });

    } (jQuery));
} (Prototype));


