(function ($) {
    Class('facebookControllerClass',
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
                    me.login();
                    return;
                    $.ajax(
                    {
                        url: '/facebook',
                        type: 'get'
                    }).done(function (data) {

                        alert(data.result);
                    });

                },
                login: function () {
                    $.ajax(
                    {
                        url: "facebook/json_get_facebook_keys",
                        type: "get"
                    }).done(function (data) {

                        var qs =
                        {
                            client_id: data.appid,
                            redirect_uri: data.url+"/facebook/getLoginPage", //to strip access code and pass to server
                            state: 'true',
                            display: 'popup',
                            scope: 'friends_groups,publish_stream,read_friendlists,email,user_photos,read_stream,user_about_me,user_birthday,user_checkins,user_groups,user_location,user_photo_video_tags,user_status',
                            response_type: "token"

                        }

                        var qsStringify = '';
                        for (var x in qs)
                            qsStringify += (x + '=' + qs[x] + '&');

                        window.open('http://www.facebook.com/dialog/oauth/?' + qsStringify, '_blank', 'left=300px,top=250px,height=300px,width=600px');
                    });
                }

            }
    });
})(jQuery);