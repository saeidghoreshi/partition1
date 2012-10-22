Class('taskAssignmentControllerClass',
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

                        url: "/workflow/json_getAssignmentform/",
                        type: "post"
                    }).done(function (data) {
                        $('#' + me.config.id).ready(function () {
                            app.tagReady(me.config.id, function () {
                                $('#' + me.config.id).html(data.result);
                                me.buildGUI();
                            });
                        });
                    });

            },
            buildGUI: function () {

                var me = this;

                $("#taskAssignment-saveBtn").button();
                $('#taskAssignment-saveBtn').die("click").live({ click: function () {

                    var ids = '';
                    $(".taskAssignment_G2 .taskAssignment_officeList_items").each(function () {

                        ids += $(this).attr("dataId") + ',';
                    });
                    if (ids != '')
                        ids = ids.substring(0, ids.length - 1);

                    $.ajax(
                    {
                        url: "/workflow/json_saveUserSequence",
                        type: "post",
                        data:
                        {
                            task_id: me.config.task_id,
                            taskUsersSequence: ids
                        }
                    }).done(function (data) {
                        app.closeDialog(me.config.dialog);


                        if (me.draw1 != null)
                            me.draw1.deleteAll();

                        //app.loadWorkFlow(me.config.task_id);
                    });
                }
                });



                $('#taskAssignment_officelist').die("change").live({ change: function () {

                    $.ajax(
                    {
                        url: "/workflow/json_getOfficeUsers",
                        type: "get",
                        data:
                        {
                            org_id: $("#taskAssignment_officelist").val()
                        }
                    }).done(function (data) {
                        me.buildContent(data.result);


                    });
                }
                });

                //load data of first Selected Organization
                $('#taskAssignment_officelist').change();

            }, //Build GUI
            buildContent: function (data) {

                $('#taskAssignment_UserList1').html('');
                for (var i = 0; i < data.length; i++) {

                    //build Item 
                    var itemId = app.idGenerator("taskAssignmentItem");

                    var html =
                    "<div id='" + itemId + "'>" +
                        "<table>" +
                        "<tr>" +
                            "<td>" +
                            "<div id='" + itemId + "-pic' class='pic' style='width:50px;height:50px;background:url(" + data[0].thumbnail + ") no-repeat'></div>" +
                            "</td>" +
                            "<td>" +
                            data[i].fname + "<br/>" + data[i].lname
                    "</td>" +
                            "</tr>" +
                        "</table>" +
                    "</div>";

                    $('#taskAssignment_UserList1').append("<div dataId='" + data[i].person_id + "' class='taskAssignment_officeList_items'>" + html + "</div>");

                }


                //load Slider for left list
//                $('#taskAssignment_UserList1').slimScroll({
//                    position: 'right',
//                    height: "350px",
//                    color: '#AEB404',
//                    size: '8px',
//                    railVisible: true,
//                    alwaysVisible: true
//                });

//                $('#taskAssignment_UserList2').slimScroll({
//                    position: 'right',
//                    height: "350px",
//                    color: '#AEB404',
//                    size: '8px',
//                    railVisible: true,
//                    alwaysVisible: true
//                });


                //define DND--------------------------------------------------------------------------------------------------------

                //sortable means cut and pasted in / out
                // one layer down DIV auto
                $("#taskAssignment_UserList1").sortable({
                    revert: true,
                    //connectWith: "#taskAssignment_UserList1",  //constraints
                    placeholder: "taskAssignment_highlight",
                    cursor: "move",
                    cursorAt: { top: -12, left: -20 },
                    helper: function (event) {
                        return $("<div class='taskAssignment_icon'>Move</div>");
                    }
                }).disableSelection();
                /*
                $('#taskAssignment_UserList1 > div').draggable({
                    revert: 'invalid',
                    //connectToSortable: "#taskAssignment_UserList1",
                    helper: 'clone'
                });
                */
                $("#taskAssignment_UserList2").droppable({

                    accept: "#taskAssignment_UserList1 div",
                    
                    drop: function (event, div) {



                        $item = div.draggable;

                        $item.clone().appendTo($('#taskAssignment_UserList2')).fadeIn();
                        //$item.fadeOut(function () {});

                        return;

                        if ($item.children().hasClass('taskAssignment_itemDeleteBtn')) return;
                        var deleteBtnId = app.idGenerator("taskAssignmentDelBtn");



                        var tempId = $('#' + $item.attr('id') + ' div').attr("id");
                        var ID = $('#' + tempId + '-pic').attr("id");
                        $('#' + ID).html("<div id='" + deleteBtnId + "' parentPanelId='" + $item.attr("id") + "' class='taskAssignment_itemDeleteBtn'></div>");
                        $('#' + deleteBtnId).css
                        (
                            {
                                position: "relative",
                                top: 13,
                                left: 13
                            }
                        );

                        $('#' + deleteBtnId).die("click").live({ click: function () { $('#' + $(this).attr('parentPanelId')).remove(); } });
                    }
                });
                ////3
                                $("#taskAssignment_UserList2").sortable({

                                    revert: true,
                                    //connectWith: " #taskAssignment_UserList2",  //constraints
                                    placeholder: "taskAssignment_highlight"

                                });

            }

        }
});

