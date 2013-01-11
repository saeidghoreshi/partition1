var helperLib;
(function ($$) {
    (function ($) {

        helperLib = Class.create({initialize: function () {}});

        helperLib.interfaceReader= function (jsCssFilePath,callback) 
        {
            $.ajax(
            {
                url:jsCssFilePath,
                type:"GET",
                dataType:"json"
                
            }).done(function(result/*would be like [[],[]]*/)
            {   
                YAHOO.util.Get.css(result[1], {});
                YAHOO.util.Get.script(result[0],{onSuccess:(callback === null ? function () { } : callback)});
            });
        },

        helperLib.loadAll = function (jsArray, cssArray, callback) 
        {
            
        },
        helperLib.dump= function (input) {
				return YAHOO.lang.dump(input);
	    }
        helperLib.idGenerator=function (prefix) {
				return prefix + '-' + (new Number(1000000000000000 * Math.random())).toFixed(0).toString();
		};

		helperLib.tagReady= function (tagId, callback) {
			
				$('#' + tagId).ready(function () {
					YAHOO.util.Event.onAvailable(tagId,callback);
				});
		};
		helperLib.isBrowser= function (browser) {
				if (browser == 'chrome') {
					if (jQuery.browser.webkit == true && jQuery.browser.safari == true &&
						/chrome/.test(navigator.userAgent.toLowerCase()))
						return true;
				}
				if (browser == 'safari' && jQuery.browser.safari) return true;
				if (browser == 'opera' && jQuery.browser.opera) return true;
				if (browser == 'msie' && jQuery.browser.msie) return true;
				if (browser == 'mozilla' && jQuery.browser.mozilla) return true;

		};

    } (jQuery));
} (Prototype));


