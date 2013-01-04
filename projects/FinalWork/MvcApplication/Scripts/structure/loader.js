var JSCSSLOADER=null;

(function ($$) {
    (function ($) {

        JSCSSLOADER = Class.create({

            initialize: function (jsArray, cssArray) {
                this.jsArray = jsArray;
                this.cssArray = cssArray;
            }
        });

        JSCSSLOADER.interfaceReader= function (jsFilePath,callback) 
        {
            $.ajax(
            {
                url:jsFilePath,
                type:"GET",
                dataType:"json"
            }).done(function(result/*would be like [[],[]]*/)
            {
                JSCSSLOADER.loadAll(result[0],result[1],callback);
            });
        },

        JSCSSLOADER.loadAll = function (jsArray, cssArray, callback) 
        {
            YAHOO.util.Get.css(cssArray, {});
            YAHOO.util.Get.script(jsArray,{onSuccess:(callback === null ? function () { } : callback)});
        }

    } (jQuery));
} (Prototype));


