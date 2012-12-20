Class('newUserClass',
{
    has:
        {
            config:
            {
                is: 'rw',
                init: null
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



            buildForm: function () {
                var me = this;

                $.ajax(
                {
                    url: "/home/json_addNewUserForm",
                    type: "get"
                }
                ).done(function (data) {
                    $("#" + me.config.id).html(data.result);

                    $("#newUser_submitform").button();
                    me.assignEvents();
                });
            },
            assignEvents: function () {

                var me = this;
                $("#newUser_submitform").die("click").live({ click: function () {

                    app.maskUI(me.getId(), 'Saving ...');
                    $.ajax(
                    {
                        url: "/home/json_CreateUser/",
                        type: "post",
                        data:
                        {
                            newUser_existingOffices:$('#newUser_existingOffices').val(),
                            newUser_fname:$('#newUser_fname').val(),
                            newUser_lname:$('#newUser_lname').val()
                        }
                    }).done(function (data) {

                        app.unmaskUI(me.getId());
                        app.baseController.rightTabsController.init();
                        app.closeDialog(me.config.dialog);

                    });
                }});
            }
        }
});

   

