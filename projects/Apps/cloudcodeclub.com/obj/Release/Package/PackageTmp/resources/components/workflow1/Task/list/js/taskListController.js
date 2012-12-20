Class('taskListControllerClass',
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
                    url: "/workflow/json_getUserCurrentTasksForm",
                    type: "get"
                }
                ).done(function (data) {

                    $('#' + me.config.id).html(data.result);

                    app.tagReady(me.config.id,function () {me.buildGUI();});
                });
            }, //Function End
            buildGUI: function () {

                var me = this;
                $('#usercurtasks_taskList_goBtn').button().die("click").live({ click: function () {

                    me.config.callback();
                }
                });
                
            }
        }
});