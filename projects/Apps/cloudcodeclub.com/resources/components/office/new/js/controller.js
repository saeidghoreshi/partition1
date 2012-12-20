Class('newOfficeClass',
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
                    url: "/home/json_addnewOfficeForm",
                    type: "get"
                }
                ).done(function (data) {

                    $("#" + me.config.id).html(data.result);

                    $("#newOffice_submitform").button();
                    me.assignEvents();
                });
            },
            assignEvents: function () {

                var me = this;
                $("#newOffice_submitform").click(function () {

                    var selectedlogoname = '';
                    $(".newOffice_logos").each(function () {

                        if ($(this).hasClass("newOffice_uploadsection_selected"))
                            selectedlogoname = $(this).attr("logoname");
                    });

                    app.maskUI(me.getId(), 'Saving ...');
                    $.ajax(
                    {
                        url: "/home/json_CreateOffice/",
                        type: "post",
                        data:
                        {
                            "newOffice_existing": $('#newOffice_existing').val(),
                            "newOffice_name": $('#newOffice_name').val(),
                            "newOffice_street": $('#newOffice_lname').val(),
                            "newOffice_city": $('#newOffice_city').val(),
                            "newOffice_postalcode": $('#newOffice_postalcode').val(),
                            "selectedLogo": selectedlogoname
                        }
                    }).done(function (data) {
                        app.unmaskUI(me.getId());
                        app.baseController.rightTabsController.init();
                        app.closeDialog(me.config.dialog);

                    });


                });

                $(".newOffice_logos").click(function () {
                    $(".newOffice_logos").each(function () {
                        $(this).removeClass("newOffice_uploadsection_selected");
                    });
                    $(this).addClass("newOffice_uploadsection_selected");
                });
            }
        }
});

   

