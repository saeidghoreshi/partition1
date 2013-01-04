(function ($$) {
    (function ($) {


        JSCSSLOADER.loadAll(
        [
            "../../components/index2/orgChartVertical/orgChartVerticalClass.js",
            "../../components/index2/general/general.js"
        ],
        [
            "../../components/index2/orgChartVertical/orgChartVerticalClass.css",
            "../../components/index2/general/general.css"
        ], null);

        //Load jQBreadCumb Module and use it in desired components
        JSCSSLOADER.interfaceReader("../../JSplugins/jQBreadCrumb_11/interface.js",
            function () 
            {
                $("#breadCrumb0").jBreadCrumb({ easing: 'swing' });
            });

    } (jQuery));
} (Prototype));