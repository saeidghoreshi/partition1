Class('permissionsControllerClass',
{
    has:
        {
            config:
            {
                is: 'rw',
                init: {}
                //
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

            //Operations

            //fetch User Password Form
            changeUserPasswordForm: function () {
                var me = this;
                $.ajax(
                {
                    url: "permission/changeUserPasswordForm",
                    type: "get"
                }).done(function (data) {

                    $("#" + me.config.id).html(data.result);

                });
            },

            //assign Permissions Form
            assignPermissionsForm: function () {

                var me = this;

                $.ajax(
                {
                    url: "permission/assignPermissionsForm",
                    type: "get"
                }).done(function (data) {

                    $("#" + me.config.id).html(data.result);

                    $("#permission_options_container").buttonset();
                    $("#permission_save_button").button();
                    me.assignEvents();

                    me.dnd();
                });
            },

            //gets user_id,roleid and assign together
            assignPermissions: function () {

            },

            //change user Password
            changeUserPassword: function () {

            },

            //save permissions
            assignEvents: function () {

                var me = this;
                //assign save permission button
                $("#permission_save_button").click(function () {

                    var finalpermissions = '';
                    $(".permission_G2 div").each(function () {
                        finalpermissions += ($(this).attr("roleid") + ',');
                    });
                    if (finalpermissions.length != 0)
                        finalpermissions = finalpermissions.substring(0, finalpermissions.length - 1);


                    app.maskUI(me.getId(),'Saving ...');
                    $.ajax(
                    {
                        url: "/permission/json_savePermissions/",
                        type: "post",
                        data:
                        {
                            "roleIds": finalpermissions
                        }
                    }).done(function (data) {


                        app.closeDialog(me.config.dialog);
                        app.unmaskUI(me.getId());
                    });
                });
            },

            //DND
            dnd: function () {
                $(function () {

                    /*
                    ////1
                    $("#sortable3").sortable({
                    connectWith: "#sortable2 , #sortable",  //constraints 
                    revert: "invalid",
                    placeholder: "highlight"
                    }).disableSelection();

                    $("#sortable3").droppable({

                    drop: function (event, div) {
                    return;
                    $item = div.draggable;

                    $item.fadeOut(function () {
                    $item.appendTo("#sortable3").fadeIn(function () {
                    //$item
                    //  .animate({ width    : "200px", height:"200px" })
                    //.animate({ width    : "100px", height:"100px" })  
                    });
                    });
                    }
                    });


                    ////2
                    $("#sortable").sortable({
                    cancel: ".ui-state-disabled", //not sortable
                    revert: true,
                    connectWith: "#sortable2 , #sortable",  //constraints
                    placeholder: "highlight"
                    }).disableSelection();

                    $("#sortable").droppable({
                    drop: function (event, div) {
                    alert('');
                    $item = div.draggable;
                    }
                    });
                    ////3
                    $("#sortable2").sortable({

                    revert: true,
                    connectWith: "#sortable2 , #sortable, #sortable3",  //constraints
                    placeholder: "highlight",
                    cursor: "move",
                    cursorAt: { top: -12, left: -20 },
                    helper: function (event) {
                    return $("<div class='icon'>Move</div>");
                    }
                    });


                    //                    $( "#sortable2" ).selectable(    
                    //                    {
                    //                    stop: function() {
                    //                    var result = $( "#select-result" ).empty();
                    //                    $( ".ui-selected", this ).each(function() {
                    //                    var index = $( "#selectable li" ).index( this );
                    //                    result.append( " #" + ( index + 1 ) );
                    //                    });
                    //                    });
                    //                    }
                    //                    #sortable2 .ui-selecting { background: #FECA40; }
                    //                    #sortable2 .ui-selected { background: #F39814; color: white; }
                    */





                    ////2
                    $("#s1").sortable({
                        cancel: ".ui-state-disabled", //not sortable
                        revert: true,
                        connectWith: "#s1, #s2",  //constraints
                        placeholder: "permission_highlight"
                    }).disableSelection();

                    $("#s1").droppable({
                        drop: function (event, div) {
                            //alert('');
                            $item = div.draggable;
                        }
                    });
                    ////3
                    $("#s2").sortable({

                        revert: true,
                        connectWith: "#s2 , #s1",  //constraints
                        placeholder: "permission_highlight",
                        cursor: "move",
                        cursorAt: { top: -12, left: -20 },
                        helper: function (event) {
                            return $("<div class='permission_icon'>Move</div>");
                        }
                    });


                });
            },


            //Interfaces
            interface1: function () {


            }
        }//Methods End
});
