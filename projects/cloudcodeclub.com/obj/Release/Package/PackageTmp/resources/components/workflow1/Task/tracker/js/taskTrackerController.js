Class('taskTrackerControllerClass',
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
                    url: "/workflow/json_getCurUserTimeTrackerForm",
                    type: "post",
                    data:
                    {
                        task_id: me.config.task_id
                    }
                }
                ).done(function (data) {

                    $('#' + me.config.id).html(data.result);


                    app.tagReady(me.config.id, function () {
                            me.buildGUI(data.result);
                        });
                });
            }, //Function End

            buildGUI: function () {
                var me = this;
                var Dom = YAHOO.util.Dom;
                var Event = YAHOO.util.Event;
                var myConfig =
                {
                    width: '580px',
                    height: '100px',
                    dompath: true,
                    focusAtStart: true
                };
                if (myEditor)myEditor.destroy();
                var myEditor = new YAHOO.widget.SimpleEditor("curUserTimeTrackerForm_description", myConfig);
                myEditor.render();


                //Define scroller
                $('.curUserTimeTrackerForm_table').slimScroll({
                    position: 'right',
                    height: "300px",
                    color: '#0B3B39',
                    size: '8px',
                    railVisible: false,
                    alwaysVisible: false
                });
                //Events
                $('#curUserTimeTrackerForm_saveBtn').button().die("click").live({ click: function () {

                    //Get Text Editor
                    myEditor.saveHTML();
                    var description = escape(myEditor.get('element').value);

                    var data =
                    {
                        task_id: $('#curUserTimeTrackerForm_task_id').val(),
                        description: description
                    }
                    $.ajax(
                    {
                        url: "/workflow/json_saveNewTaskStat",
                        type: "post",
                        data: data
                    }).done(function (data) {

                        me.init();
                    });
                }
                });

                //push change state
                $('#curUserTimeTrackerForm_finalizeBtn').button().die("click").live({ click: function () {

                    var data =
                    {
                        task_id: $('#curUserTimeTrackerForm_task_id').val()
                    }
                    $.ajax(
                    {
                        url: "/workflow/json_finalizeTaskPerson",
                        type: "post",
                        data: data
                    }).done(function (data) {

                        //close current dialog
                        app.closeDialog(me.config.dialog);

                    });
                }
                });
                //push play/pause
                $('#curUserTimeTrackerForm_topPanel_button').die("click").live({ click: function () {

                    var data =
                    {
                        task_id: $('#curUserTimeTrackerForm_task_id').val()
                    }
                    $.ajax(
                    {
                        url: "/workflow/json_updateTaskProgress",
                        type: "post",
                        data: data
                    }).done(function (data) {
                        me.init();
                    });
                }
                });

                //loop through all escaped HTML elements 
                $(".curUserTimeTrackerForm_rightPanel div").each(function () {

                    $(this).html(unescape($(this).html()));
                });


            }
        }
});

