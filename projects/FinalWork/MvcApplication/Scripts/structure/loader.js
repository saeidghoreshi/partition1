var JSCSSLOADER=null;

(function ($$) {
    (function ($) {

        JSCSSLOADER = Class.create({

            initialize: function (jsArray, cssArray) {
                this.jsArray = jsArray;
                this.cssArray = cssArray;
            }
        });

        JSCSSLOADER.loadAll = function (jsArray, cssArray, callback) {

            $.getScript(cssArray, function () {});
            $.getScript(jsArray, (callback === null ? function () { } : callback));
        }

    } (jQuery));
} (Prototype));


