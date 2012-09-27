
var moduleLibBase = "resources/components";
var moduleLib =
                {
                    'testExtJs':
                    {
                        js:
                        [
                            moduleLibBase + "/testExtjs/js/treePanelController.js",
                            moduleLibBase + "/testExtjs/js/gridPanelController.js",
                            moduleLibBase + "/testExtjs/js/gridPanel2Controller.js",
                            moduleLibBase + "/testExtjs/js/gridPanel3Controller.js",
                            moduleLibBase + "/testExtjs/js/form1Class.js",
                            moduleLibBase + "/testExtjs/js/form2Class.js",
                            moduleLibBase + "/testExtjs/js/form3Class.js",
                            moduleLibBase + "/testExtjs/js/form4Class.js"
                        ],
                        css: [moduleLibBase + "/testExtjs/css/extjscss.css"],
                        hasView: false
                    },
                    "facebook":
                    {
                        js: [moduleLibBase + "/facebook/js/facebookController.js"],
                        css: [moduleLibBase + "/facebook/css/facebookCss.css"],
                        hasView: false
                    },
                    "testUI":
                    {
                        js: [moduleLibBase + "/testUI/js/testUIController.js"],
                        css: [moduleLibBase + "/testUI/css/testUICss.css"],
                        hasView: false
                    },
                    "MainMenuComponent":
                    {
                        js: [moduleLibBase + "/mainMenu/js/mainMenuController.js"],
                        css: [moduleLibBase + "/mainMenu/css/mainMenuCss.css"],
                        hasView: false
                    },
                    "kendoGrid1Component":
                    {
                        js: [moduleLibBase + "/kendoGrid1/js/kendoGrid1Controller.js"],
                        css: [moduleLibBase + "/kendoGrid1/css/kendoGrid1Css.css"],
                        hasView: false
                    },
                    "rightTabsComponent":
                    {
                        js: [moduleLibBase + "/rightTabsComponent/js/rightTabsController.js"],
                        css: [moduleLibBase + "/rightTabsComponent/css/rightTabsCss.css"],
                        hasView: false
                    },
                    "viewport1":
                    {
                        js:
                        [
                        //Base
                            moduleLibBase + "/base/js/baseController.js",
                        //Create new user
                            moduleLibBase + "/user/new/js/controller.js",
                        //Create new Office
                            moduleLibBase + "/office/new/js/controller.js",
                        //Permissions - Assignment
                            moduleLibBase + "/permission/Assignment/js/permissionController.js",
                        //Permissions - Login
                            moduleLibBase + "/permission/Login/js/loginController.js",
                        //Define Task
                            moduleLibBase + "/workflow1/Task/define/js/defineTaskController.js",
                        //task Assignment
                            moduleLibBase + "/workflow1/Task/assignment/js/taskAssignmentController.js",
                        //task time Tracker
                            moduleLibBase + "/workflow1/Task/tracker/js/taskTrackerController.js",
                        //task List
                            moduleLibBase + "/workflow1/Task/list/js/taskListController.js"
                        ],
                        css:
                        [
                            moduleLibBase + "/base/css/baseCss.css",
                        //Create new user
                            moduleLibBase + "/user/new/css/css.css",
                        //Create new Office
                            moduleLibBase + "/office/new/css/css.css",
                        //Permissions - Assignment
                            moduleLibBase + "/permission/Assignment/css/permissionCss.css",
                        //Permissions - Login
                            moduleLibBase + "/permission/Login/css/loginCss.css",
                        //Define Task
                            moduleLibBase + "/workflow1/Task/define/css/defineTaskCss.css",
                        //task Assignment
                            moduleLibBase + "/workflow1/Task/assignment/css/taskAssignmentCss.css",
                        //task time Tracker
                            moduleLibBase + "/workflow1/Task/tracker/css/taskTrackerCss.css",
                        //task List
                            moduleLibBase + "/workflow1/Task/list/css/taskListCss.css"
                        ],
                        hasView: true
                    },
                    "archive":
                    {
                        js: [moduleLibBase + "/archive/js/archiveController.js"],
                        css: [moduleLibBase + "/archive/css/archiveCss.css"],
                        hasView: false
                    },
                    "workflow":
                    {
                        js: [moduleLibBase + "/workflow1/map/js/workflow1Controller.js"],
                        css: [moduleLibBase + "/workflow1/map/css/map.css"],
                        hasView: false
                    }
                }