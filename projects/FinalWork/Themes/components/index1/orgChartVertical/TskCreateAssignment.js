var  TskCreateAssignmentClass;

(function ($$) {
    (function ($) {
        TskCreateAssignmentClass = Class.create(
        {
            initialize: function (config) {
                this.config = config;
                this.buildView(this.config.parentID);
            },
            buildView: function (parentID) {
                var me = this;

                $.ajax(
                 {
                     url: "/workflow/Form_createAssignTask",
                     type: "get"

                 }).done(function (html) {
                     $('#' + parentID).html(html);
                     $('#TskCreateAssignLayout').layout();

                     $('#orgsTree').tree(
                        {
                            onClick: function (node) {
                                me.loadUserPerOrg(node.id);

                            }
                        });
                 });
            },
            loadUserPerOrg: function (orgID) {
                var me = this;
                $("#TskCreateAssignLayout-center").empty();
                $.ajax(
                {
                    url: "/workflow/getOrgUsers",
                    data: { orgID: orgID }
                }).done(function (result) {
                    /*build the OrgUsersList*/
                    for (var i = 0; i < result.length; i++) {
                        var item = $("<li></li>")
                        var pointer = $('<div></div>');
                        pointer.addClass("pointer");

                        item.append('<div>' + result[i].name + '</div>');
                        item.appendTo("#TskCreateAssignLayout-center");
                        item.addClass("TskCreateAssignLayout-center");

                        item.find('div').attr('title', "Click to Drag");
                        item.find('div').tipsy({ title: 'title', gravity: 'sw' });
                    }


                    $('#TskCreateAssignLayout-center li').draggable({
                        revert: true,
                        proxy: 'clone',
                        onStartDrag: function () {
                            $(this).draggable('options').cursor = 'auto';
                            $(this).draggable('proxy').css('z-index', 999999999);
                        },
                        onStopDrag: function () {
                            $(this).draggable('options').cursor = 'auto';
                        }
                    });
                    $('#TskCreateAssignLayout-east div:eq(1)').sortable();
                    $('#TskCreateAssignLayout-east div:eq(1)').droppable({
                        onDragEnter: function (e, source) {
                            $(source).draggable('options').cursor = 'auto';
                            $(source).draggable('options').width = "200px";
                        },
                        onDragLeave: function (e, source) {
                            $(source).draggable('options').cursor = 'auto';
                            
                            
                        },
                        onDrop: function (e, source) {

                            var x = source.clone();
                            $(x).html('<img src="/components/index1/orgChartVertical/img/arrowResize.png" />' + $(source).text());
                            $("#TskCreateAssignLayout-east div:eq(1)").append(x);
                            $(x).attr('title', "Click to Sort");
                            $(x).tipsy({ title: 'title', gravity: 'sw' });
                            
                        }
                    });


                });

            }
        });

    } (jQuery));
} (Prototype));
