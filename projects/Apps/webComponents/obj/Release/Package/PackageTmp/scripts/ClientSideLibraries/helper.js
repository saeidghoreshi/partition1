var lib = {};
lib.helper = {};

(function ($) {
    

        lib.helper.interfaceReader = function (jsCssFilePath, callback) {
            $.ajax(
            {
                url: jsCssFilePath,
                type: "GET",
                dataType: "json"

            }).done(function (result/*would be like [[],[]]*/) {
                YAHOO.util.Get.css(result[1], {});
                YAHOO.util.Get.script(result[0], { onSuccess: (callback === null ? function () { } : callback) });
            });
        };

        lib.helper.jqWidgetWinClose=function(id) {
            
            $("#" + id).jqxWindow('close');
            $("#" + id).remove();
		};

        lib.helper.jqWidgetWin=function(config) {
    
            var $win=$('<div id='+config.id+'><div>'+config.header+'</div>'+'<div style="overflow: hidden;" id="'+config.id+'-Content"></div></div>')
			.appendTo('body');

            $win.jqxWindow({
                showCollapseButton: false, 
				showCloseButton: false, 
                height: config.height, 
                width: config.width, 
                isModal:config.modal,
                showCollapseButton:config.collapsible,
                theme: config.theme,
				resizable:false,
                initContent: function () {
                    $('#'+config.id+'-Content')
					.html(config.content)
					;
                }
            });

            if(config.callback!==null && config.callback!==undefined)
			    config.callback();	
            

			//don't define close event which bubbles up from inner controls events
            
        };

		//[]
        lib.helper.findItemInArray= function (input,array) {
            for(var i=0;i<array.length;i++)
                if(array[i]===input)
                    return i;

            return -1;
        };
		//[[],[],[]]
		lib.helper.findItemInArray2D= function (input,column,array) {
            for(var i=0;i<array.length;i++)
                if(array[i][column]===input)
                    return i;

            return -1;
        };
		//[{},{},{}]
		lib.helper.findItemInObjectArray= function (input,column,array) {
			
			for(var item in array)
			{
				if(array[item][column].toString()===input.toString())
                    return array[item];
			}

            return null;
        };
        lib.helper.dump = function (input) {
            return YAHOO.lang.dump(input);
        };
        lib.helper.idGenerator = function (prefix) {
            return prefix + '_' + (new Number(1000000000000000 * Math.random())).toFixed(0).toString();
            
        };

        lib.helper.tagReady = function (tagId, callback) {

            $('#' + tagId).ready(function () {
                YAHOO.util.Event.onAvailable(tagId, callback);
            });
        };
        lib.helper.isBrowser = function (browser) {
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
        lib.helper.AdjustWindow = function () {
            $(window).resize(function () {
                me.window = { width: window.innerWidth, height: window.innerHeight }
                $('#theme1_maintable').css('height', me.window.height + padding + 'px');
            });
        };


 } (jQuery));



