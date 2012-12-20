
Class('applicationClass',
{
    has:
        {
            config:
            {
                is: 'rw',
                init: {}
            },
            moduleLibLoaded:
            {
                is: 'rw',
                init: {}
            }
        },

    methods:
        {
            initialize: function () {
                var me = this;

                //Load google Visualization
                google.load('visualization', '1', { packages: ['orgchart'] });

                me.tagReady('body', function () { me.init(); });

            },


            init: function () {
                var me = this;

                var cb = function () {

                    var phId = 'body';
                    var callback = function (pars) { me.loadBaseController(pars); }
                    me.loader("viewport1", callback, { PHId: phId });
                }
                me.modulesLoader(cb);
            },

            loadBaseController: function (pars) {

                var me = this;
                var baseControllerClassConfig = { parentId: pars.phId }
                me.baseController = new baseControllerClass(baseControllerClassConfig);
                me.baseController.init();

            },



            //****************************************************************
            //********************************  content Handling *************
            //****************************************************************

            idGenerator: function (prefix) {
                return prefix + '-' + (new Number(1000000000000000 * Math.random())).toFixed(0).toString();
            },

            tagReady: function (tagId, callback) {
                $('#' + tagId).ready(function () {
                    YAHOO.util.Event.onAvailable(tagId, function () {

                        callback();

                    });
                });
            },
            isBrowser: function (browser) {
                if (browser == 'chrome') {
                    if (jQuery.browser.webkit == true && jQuery.browser.safari == true &&
                        /chrome/.test(navigator.userAgent.toLowerCase())
                        )
                        return true;
                }
                if (browser == 'safari' && jQuery.browser.safari) return true;
                if (browser == 'opera' && jQuery.browser.opera) return true;
                if (browser == 'msie' && jQuery.browser.msie) return true;
                if (browser == 'mozilla' && jQuery.browser.mozilla) return true;

            },
            modulesLoader: function (initiatorCallback) {

                var me = this;
                YAHOO.util.Get.css(modulesLibCss, {});
                YAHOO.util.Get.script(modulesLibJs, { onSuccess: function (obj) { initiatorCallback(); } });

            },
            loader: function (componentName, initiatorCallback, pars) {

                var me = this;

                YAHOO.util.Get.css(moduleLib[componentName].css, {});
                YAHOO.util.Get.script(moduleLib[componentName].js, {
                    onSuccess: function (obj) {

                        //check if component is already loaded
                        if (me.moduleLibLoaded[componentName] !== undefined) {
                            initiatorCallback(pars);
                            return;
                        }

                        if (moduleLib[componentName].hasView == true) {
                            $.ajax(
                            {
                                url: "/home/componentIngridiantsLoader/",
                                type: "post",
                                data: { componentName: componentName }
                            }).done(function (data) {

                                $('#' + pars.PHId).html(data.result);
                                initiatorCallback(pars);
                            });
                        }
                        else
                            initiatorCallback(pars);

                        me.moduleLibLoaded[componentName] = true;
                    }
                });

            },

            //****************************************************************
            //********************************  dialog Generator *******************
            //****************************************************************
            openDialog: function (title, size) {

                var PH = app.idGenerator('PlaceHolder');
                var win = Ext.create('widget.window',
                {
                    title: title,
                    width: size.width,
                    height: size.height,
                    items:
                    [
                        {
                            flex: 1,
                            height: "100%",
                            padding: 5,
                            border: 0,
                            html: "<div id='" + PH + "'><div class='theme1_loading2'></div></div>"
                        }
                    ],


                    frame: false,
                    border: 0,
                    draggable: true,
                    resizable: false,
                    closable: true,
                    closeAction: 'destroy',
                    modal: true,
                    autoScroll: true,
                    animCollapse: true,
                    animateTarget: 'body'
                });

                win.show();
                return { win: win, phId: PH };

            },
            closeDialog: function (dialog) {
                dialog.win.destroy();
            },


            //****************************************************************
            //********************************  UI MASK *******************
            //****************************************************************

            maskUI: function (divId, Message) { $("#" + divId).mask(Message); },

            unmaskUI: function (divId) { $("#" + divId).unmask(); },

            //****************************************************************
            //********************************  EXT JS POPUP WIN *************
            //****************************************************************

            showWin: function (finalPanel, title, winHandlers, topItems, bottomItems) {

                if (bottomItems == null)
                    bottomItems = []

                var dockedItems =
                [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            ui: 'footer',
                            items: ['->'].concat(bottomItems)

                        },
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: topItems
                        }

                    ]

                if (topItems == null || topItems.length == 0)
                    dockedItems.splice(1, 1);
                if (bottomItems == [])
                    dockedItems.splice(0, 1);

                var win = Ext.create('widget.window',
                {
                    title: title,
                    width: finalPanel.config.width + 30,
                    height: finalPanel.config.height,
                    items: [finalPanel],


                    frame: false,
                    draggable: true,
                    closable: true,
                    closeAction: 'destroy',
                    modal: true,
                    resizable: false,
                    autoScroll: true,

                    tools:
                    [
                    /*{id: 'left',handler:winHandlers.left},
                    {id: 'right',handler:winHandlers.right},
                    {id: 'print'},
                    {id: 'minimize',handler:winHandlers.minimize},
                    {id: 'refresh'},
                    {id: 'help'},
                    {id: 'search'},
                    {id: 'save'},
                    {id: 'pin'},
                    */
                    ],

                    dockedItems: dockedItems

                });



                win.show();
                return { win: win, form: finalPanel };
            },

            makeExtJSStaticStore: function (fields, data) {
                return Ext.create('Ext.data.Store', { fields: fields, data: data });
            },

            hideWin: function (win, finalPanel) {
                win.hide();
                finalPanel.destroy();
            },

            //****************************************************************
            //********************************  JS Helpers********************
            //****************************************************************

            dump: function (input) {
                return YAHOO.lang.dump(input);
            },

            merge_objects: function (x1, x2, x3) {
                var result = {}
                for (var x in x1) result[x] = x1[x];
                for (var x in x2) result[x] = x2[x];
                for (var x in x3) result[x] = x3[x];
                return result;
            },
            walkThroughObjectItems: function (jQItem, styles) {

                var me = this;

                for (var key in styles) {
                    if (styles.hasOwnProperty(key)) {
                        jQItem.css(key, styles[key]);
                    }
                }
            }
        }
});

var app = new applicationClass();

