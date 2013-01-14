var helperLib;


    (function ($) {

        helperLib=function(field1) {

            this.initialize= function () {}
            
        }


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
        };

        helperLib.loadAll = function (jsArray, cssArray, callback) 
        {
            
        };
        helperLib.easyUIWin=function(config)
        {
            //config.size,pageUrl,content,modal
            var ID = helperLib.idGenerator('win');
            $('body').append('<div id="' + ID + '" style="padding:5px">'+config.content+'</div>');
            $('#'+ID).window({
                width: config.size.width,
                height: config.size.height,
                modal: config.modal
            });
            if(config.pageUrl!=null)
                $('#' + ID).window('refresh', config.pageUrl);
            return  $('#' + ID);
        },
        helperLib.dump= function (input) {
				return YAHOO.lang.dump(input);
	    };
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



