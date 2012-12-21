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
        

        YAHOO.util.Get.css(cssArray, {});
        YAHOO.util.Get.script(jsArray,{onSuccess:(callback === null ? function () { } : callback)});

            //$.getScript(cssArray, function () {});
            //$.getScript(jsArray, (callback === null ? function () { } : callback));
        }

    } (jQuery));
} (Prototype));


