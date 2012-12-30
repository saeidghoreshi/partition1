(function ($$) {
    (function ($) {

        //Load Menu
        JSCSSLOADER.loadAll([
            "/components/index/menu/ddmenu.js"
        ],
        ["/components/index/menu/ddmenu.css"], null);


        //Load Samples


        JSCSSLOADER.loadAll([

            "/JSplugins/scroller-sly/jquery.sly.min.js"
            , "/JSplugins/scroller-sly/vendor/plugins.js"
            , "/JSplugins/scroller-sly/main.js"
        ],
        ['/JSplugins/scroller-sly/style.css'], null);




    } (jQuery));
} (Prototype));