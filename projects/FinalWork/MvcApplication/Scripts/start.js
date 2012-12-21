(function ($$) {
    (function ($) {


        //JSCSSLOADER.loadAll(['scripts/designpatterns/observer/observerCaller.js'], [], null);
        JSCSSLOADER.loadAll(['scripts/designpatterns/inheritance/inheritance.js'], [], null);
        //JSCSSLOADER.loadAll(['scripts/designpatterns/async/async.js'], [], null);
        //JSCSSLOADER.loadAll(['scripts/Tests/miscellaneous.js.js'], ['scripts/Tests/test2.css'], null);


        //JSCSSLOADER.loadAll(['scripts/Tests/Test1.js'], [''], null);
        //JSCSSLOADER.loadAll(['scripts/Tests/Test2.js'], [''], null);
        //JSCSSLOADER.loadAll(['scripts/Tests/Test3.js'], [''], null);
        //JSCSSLOADER.loadAll(['scripts/DesignPatterns/Promises/Promise1.js'], [''], null);

        JSCSSLOADER.loadAll(
            [
                'scripts/structure/base.js',
                'resources/modules/kendoMenu/kendoMenuModule.js',
                'resources/components/mainMenu/mainMenuController.js'
            ],
            [
                'resources/modules/kendoMenu/kendoMenuCss.css',
                'resources/components/mainMenu/mainMenuCss.css'
            ], 
            function () {
            var mainMenuController = new mainMenuControllerClass({ parentId: "menu" });
            mainMenuController.init();
        });


    } (jQuery));
} (Prototype));