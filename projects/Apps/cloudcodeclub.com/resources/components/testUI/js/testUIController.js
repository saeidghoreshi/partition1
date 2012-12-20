(function ($) {
    Class('testUIControllerClass',
    {
        has:
            {
                config:
                {
                    is: 'rw',
                    init: {}
                }
            },
        methods:
            {
                initialize: function (config) {
                    var me = this;
                    me.config = config;
                    me.config.id = app.idGenerator('placeholder');
                    $('#' + me.config.parentId).html('<div id=' + me.config.id + '></div>');
                },
                getId: function () {
                    var me = this;
                    return me.config.id;
                },
                init: function () {
                    var me = this;
                    app.tagReady(me.getId(), function () { me.buildGUI(); });
                },
                buildGUI: function () {

                    var me = this;

                    var c = { parentId: me.getId(), tabs: ["Uploader", 'Weather', 'GMap Locator'] }
                    me.tabs = new tabsModuleClass(c);
                    var cb = function () { $('#' + me.tabs.getId() + '.ui-tabs .ui-tabs-nav li').css({ "width": "100px", "margin": "0px" }); }
                    me.tabs.init(cb);

                    app.maskUI(me.getId(), 'Loading ...');

                    //load tabs one by one
                    app.tagReady(me.tabs.getTab(0), function () {
                        me.uploadPanel(me.tabs.getTab(0))

                    });
                    app.tagReady(me.tabs.getTab(1), function () { me.getGoogleWeather(me.tabs.getTab(1)); });
                    app.tagReady(me.tabs.getTab(2), function () { $('#' + me.tabs.getTab(2)).html('Tab3'); });


                    //select Tab 1
                    me.tabs.selectTab(0);
                    setTimeout(function () { app.unmaskUI(me.getId()); }, 1000);


                }, //Init

                //Google weather Plugin
                getGoogleWeather: function (ph) {
                    $.ajax(
                    {
                        url: "/home/json_getGoogleWeather",
                        type: "get"
                    }).done(function (data) {

                        var result = $.parseJSON(data);

                        var conditions = result.xml_api_reply.weather.forecast_conditions;
                        var cur_conditions = result.xml_api_reply.weather.current_conditions;
                        //current condition
                        var html =
                            '<div style="float:left">' +
                            cur_conditions.condition["@data"] + '<br/>' +
                            '<img src=http://www.google.com' + cur_conditions.icon["@data"] + ' />' + '<br/>' +
                            cur_conditions.temp_f["@data"] + '<br/>' +
                            cur_conditions.temp_c["@data"] + '<br/>' +
                            cur_conditions.humidity["@data"] + '<br/>' +
                            cur_conditions.wind_condition["@data"] +
                            '</div>'
                        $('#' + ph).append(html);

                        //forcast conditions
                        for (var item in conditions) {

                            var html =
                            '<div style="float:left">' +
                            conditions[item].day_of_week["@data"] + '<br/>' +
                            '<img src=http://www.google.com' + conditions[item].icon["@data"] + ' />' + '<br/>' +
                            conditions[item].low["@data"] + '<br/>' +
                            conditions[item].high["@data"] + '<br/>' +
                            conditions[item].condition["@data"] +
                            '</div>'
                            $('#' + ph).append(html);
                        }
                    });

                },
                //upload Panel Plugin
                uploadPanel: function (ph) {
                    var me = this;
                    var c = {
                        parentId: ph,
                        saveUrl: "/home/json_upload",
                        removeUrl: "/home/json_uploadRemove",
                        pars: {},
                        doneCallback: function () { }
                    }
                    me.uploader = new uploaderModuleClass(c);
                    me.uploader.init();

                    

                }
            }
    });
})(jQuery);