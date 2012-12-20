Class('loginControllerClass',
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
            },
            init: function () {
                var me = this;

                $.ajax(
                {
                    url: "/permission/json_getLoginForm",
                    type: "get"
                }
                ).done(function (data) {

                    $('#' + me.config.id).html(data.result);
                    $('#' + me.config.id).ready(function () {
                        app.tagReady(me.config.id, function () {
                            me.buildGUI();
                        });
                    });
                });
            }, //Function End
            buildGUI: function () {

                var me = this;
                me.Login();
            },
            Login: function () {
                var me = this;
                $('#login-btn').button().die("click").live({ click: function () {

                    var Data =
                    {
                        username: $("#login-username").val(),
                        password: $("#login-password").val()
                    }

                    $.ajax(
                    {
                        url: "/permission/json_login",
                        type: "post",
                        data: Data
                    }
                    ).done(function (data) {

                        app.closeDialog(me.config.dialog);


                        $("#theme1_loginRequest").removeClass("show").addClass("hide");
                        $("#theme1_logoutSection").removeClass("hide").addClass("show");
                        $("#theme1_timer_left").removeClass("hide").addClass("show");

                        //keep track of Session Timeout
                        var halfMinCounter = 0;
                        me.config.loginTimer = setInterval(function () {

                            var timeout = 10;
                            var value = timeout * 60000 - (halfMinCounter++) * 1000;
                            var min = (Math.floor(value / 60000)).toFixed(0);
                            var sec = (value % 60000) / 1000;

                            var timeleft = min + ':' + sec;
                            if (min == 0 && sec == 0) {

                                me.Logout();
                                clearInterval(me.config.loginTimer);
                                //building placeholder and load sub-components
                                var dialog = app.openDialog('Warning',  { width: 400, height: 300 });
                                var Id1 = dialog.phId;
                            }

                            $("#theme1_timer_left").html(timeleft.toString());

                        }, 1000);
                    });
                }
                });
            },
            Logout: function () {
                var me = this;

                $.ajax(
                    {
                        url: "/permission/json_logout",
                        type: "post"
                    }
                    ).done(function (data) {

                        clearInterval(me.config.loginTimer);
                        $("#theme1_timer_left").removeClass("show").addClass("hide");

                        $("#theme1_loginRequest").addClass("show").removeClass("hide");
                        $("#theme1_logoutSection").addClass("hide").removeClass("show");


                    });
            }
        }
});