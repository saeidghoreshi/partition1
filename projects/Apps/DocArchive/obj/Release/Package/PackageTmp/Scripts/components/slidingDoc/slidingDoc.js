function slidingDoc(placeHolder) {


    this.moduleName = baseClass.idGenerator('slidingDoc');


    this.resetPlaceHolder = function () {
        $('#' + placeHolder).html('<div class="panel1" id="' + this.moduleName + '"></div>');
    }



    this.build = function (folderId) {
        var me = this;
        me.resetPlaceHolder();
        $.ajax
        (
            {
                url: "/Home/json_get2LevelsTopics",
                type: "GET",
                data: { folderId: folderId }
            }
        ).done(function (data) {

            me.data = data;
            me.loadPage();
        });


    }   //build Method
    this.setSelectedItem = function (id) {
        
        this.selectedItem = $('#' + id);
    }
    this.getSelectedItem = function () {
        return this.selectedItem;
    }
    this.loadPage = function () {
        var me = this;
        for (var i = 0; i < me.data.length; i++) {

            //Define Header
            var slidingDoc_Panel_Header_NewBtn_Id = baseClass.idGenerator('NewButton');
            var slidingDoc_Panel_Header_DelBtn_Id = baseClass.idGenerator('DelButton');

            var newTabHeader = '<div class="slidingDoc_Panel_Header" id="' + baseClass.idGenerator('slidingDoc_Panel_List') + '">'
                + '<div class="slidingDoc_Panel_Header_PinOpen"></div>'
                + '<div class="slidingDoc_Panel_Header_NewBtn" id="' + slidingDoc_Panel_Header_NewBtn_Id + '"> <b>+</b> </div>'
                + '<div class="slidingDoc_Panel_Header_DelBtn" id="' + slidingDoc_Panel_Header_DelBtn_Id + '"> <b>-</b> </div>'
                + '<div style="float:left">' + me.data[i].title + '</div>'

                + '</div>';

            $('#' + me.moduleName).append(newTabHeader)

            //Assign Data to Header components
            $('#' + slidingDoc_Panel_Header_NewBtn_Id).data('data', { topic_id: me.data[i].id });
            $('#' + slidingDoc_Panel_Header_DelBtn_Id).data('data', { topic_id: me.data[i].id });


            //Define Panel
            var slidingDoc_Panel_List_Id = baseClass.idGenerator('slidingDoc_Panel_Header');
            var slidingDoc_Panel_List = '<div class="slidingDoc_Panel_List" style="display:none" id="' + slidingDoc_Panel_List_Id + '">';
            $('#' + me.moduleName).append(slidingDoc_Panel_List);

            for (var j = 0; j < me.data[i].children.length; j++) {

                var slidingDoc_Panel_List_Item_Id = baseClass.idGenerator('item');

                slidingDoc_Panel_List = '<div id="' + slidingDoc_Panel_List_Item_Id
                    + '" class="slidingDoc_Panel_List_Item" style="float:left">' + me.data[i].children[j].title + '</div>';

                $('#' + slidingDoc_Panel_List_Id).append(slidingDoc_Panel_List);
                $('#' + slidingDoc_Panel_List_Item_Id).data('data',
                {
                    id: me.data[i].children[j].id,
                    parent_id: me.data[i].id,
                    title: me.data[i].children[j].title,
                    description: me.data[i].children[j].detail
                });

            }
            $('#' + me.moduleName).append('</div>');
        }

        //Events
        $('.slidingDoc_Panel_Header').die("click").live({ click: function () {
            $el = $('#' + $(this).attr('id'));

            $('#' + $(this).attr('id') + ' > div:eq(0)').toggleClass('slidingDoc_Panel_Header_PinClose');

            if ($el.next('div:eq(0)').css('display') == 'block')
                $el.next('div').slideUp(100);
            else
                $el.next('div').slideDown(100);
        }
        });

        $(".slidingDoc_Panel_Header_NewBtn").click(function () {

            var meButton = this;
            var id = $(this).attr("id");

            var dialog = baseClass.openDialog('New Sub Topics', { width: 700, height: 500 });
            $('#' + dialog.phId).ready(function () {

                $.ajax(
                        {
                            url: '/home/get_SubTopicPage'
                        }).done(function (data) {
                            $('#' + dialog.phId).html(data);


                            //AssignEvents
                            $('#SubTopic-form').ready(function () {

                                var descriptionPanel = $('#SubTopic-description').rte({
                                    controls_rte: rte_toolbar,
                                    controls_html: html_toolbar,
                                    width: 650,
                                    height: 200
                                });

                                $('#SubTopic-save').click(function () {
                                    
                                    $.ajax(
                                    {
                                        url: "/home/saveNewSubTopic",
                                        type: "POST",
                                        data:
                                        {
                                            folder_id: App.treeMenu.tree.getSelection()[0].data.id,
                                            parent_id: $('#' + id).data('data').topic_id,
                                            title: $('#SubTopic-title').val(),
                                            description: escape(descriptionPanel['SubTopic-description'].get_content())
                                        }
                                    }).done(function () {
                                        baseClass.closeDialog(dialog);
                                        //Update List

                                        var dataId = App.treeMenu.tree.getSelection()[0].data.id;
                                        App.sliderObject.build(dataId);


                                    });
                                    return false;

                                }); //save event
                                $('#SubTopic-cancel').click(function () {

                                    baseClass.closeDialog(dialog);

                                    return false;
                                }); //cancel Event
                            });



                        });
            });
        });
        $(".slidingDoc_Panel_Header_DelBtn").click(function () {

            var meButton = this;

            var id = $(this).attr("id");

            var dialog = baseClass.openDialog('Confirmation', { width: 400, height: 100 });
            $('#' + dialog.phId).ready(function () {

                $.ajax(
                        {
                            url: '/home/get_delTopicPage'
                        }).done(function (data) {
                            $('#' + dialog.phId).html(data);

                            //AssignEvents
                            $('#delTopic-form').ready(function () {

                                $('#delTopic-ok').click(function () {

                                    var topic_id = $('#' + id).data('data').topic_id;

                                    $.ajax(
                                    {
                                        url: "/home/delTopic",
                                        type: "POST",
                                        data: { topic_id: topic_id }
                                    }).done(function () {

                                        baseClass.closeDialog(dialog);

                                        //Update List
                                        var dataId = App.treeMenu.tree.getSelection()[0].data.id;
                                        App.sliderObject.build(dataId);
                                    });
                                    return false;
                                });
                                $('#delTopic-cancel').click(function () {

                                    baseClass.closeDialog(dialog);
                                    return false;

                                });
                            });
                        });
            });
        });
        $(".slidingDoc_Panel_List_Item").die("click").live({ click: function (data) {

            me.setSelectedItem($(this).attr("id"));
            var dialog = baseClass.openDialog('Description', { width: 700, height: 500 });
            me.loadDescriptionPage(dialog.phId, dialog);
        }});
    }
    this.loadDescriptionPage = function (placeHolder, dialog) {
        var me = this;

        var topic = me.getSelectedItem();
        var topicId = topic.data('data').id;



        var doneFunction = function (data) {
            $('#' + placeHolder).ready(function () {

                //load scroller
                $('#' + placeHolder).slimScroll({
                    position: 'right',
                    height: 450,
                    color: '#2F4F4F', //#800000  #2F4F4F  gray
                    size: '8px',
                    railVisible: true,
                    alwaysVisible: false
                });

                $('#' + placeHolder).html('<div id=main>' + unescape(data) + '</div>');
                $('#' + placeHolder).css({ "width": "700px", "overflow": "auto", margin: 10 });


                var ItemId = baseClass.idGenerator("option");
                var optionHtml = "<div id='" + ItemId + "'>     <div><div class='action action1'></div><div class='action action2'></div></div>   <div><div id='handle'></div></div>    </div>";
                $('#' + placeHolder).prepend(optionHtml)
                $option = $('#' + ItemId);

                $('.action').css(
                    {
                        position: "relative",
                        float: "left",
                        padding: "2px",
                        margin: "2px",

                        width: 15,
                        height: 15,
                        background: "url('scripts/components/slidingDoc/images/add.png') "

                    });
                $('.action1').css({ background: "url('scripts/components/slidingDoc/images/edit.png') " });
                $('.action2').css({ background: "url('scripts/components/slidingDoc/images/delete.png') " });
                $('#handle').css(
                    {
                        position: "relative",
                        width: 20,
                        height: 25,
                        top: 25,
                        left: 12,
                        background: "url('scripts/components/slidingDoc/images/arrow_double_down.png') ",
                        cursor: "pointer"
                    });

                $option.css(
                    {
                        position: "absolute",
                        top: -25,
                        right: 0,
                        cursor: "pointer",
                        background: "#f2f2f2",
                        "border-right": "2px solid #fefefe",
                        "border-bottom": "2px solid #fefefe",
                        font: "10px verdana"
                    });
                $('#handle').click(function () {
                    if ($('#' + ItemId).position().top !== 0) {
                        $('#' + ItemId).animate({ top: "0px" }, 500);
                        $('#handle').css({ background: "url('scripts/components/slidingDoc/images/arrow_double_up.png') " });
                    }

                    else {
                        $('#' + ItemId).animate({ top: "-25px" }, 500);
                        $('#handle').css({ background: "url('scripts/components/slidingDoc/images/arrow_double_down.png') " });
                    }


                });

                $('.action').click(function () {

                    if ($(this).hasClass('action1'))
                        me.loaditemEditPage(placeHolder);
                    else {
                        var cdialog = baseClass.openDialog('Confirmation', { width: 400, height: 100 });
                        $('#' + cdialog.phId).ready(function () {
                            $.ajax(
                        {
                            url: '/home/get_delTopicPage'
                        }).done(function (data) {
                            $('#' + cdialog.phId).html(data);

                            //AssignEvents
                            $('#delTopic-form').ready(function () {

                                $('#delTopic-ok').click(function () {
                                    baseClass.closeDialog(cdialog);
                                    me.deleteSubTopic(dialog);

                                    return false;
                                });
                                $('#delTopic-cancel').click(function () { baseClass.closeDialog(dialog); return false; });
                            });
                        });

                        });
                    }

                });


            });
        }


        $.ajax(
        {
            url: "/home/getTopicDescription",
            type: "POST",
            data:
            {
                topic_id: topicId
            }
        }).done(function (data) { doneFunction(data); });

    }
    this.deleteSubTopic = function (dialog) {

        var me = this;
        var subTopic = me.getSelectedItem();
        var subTopicId = subTopic.data('data').id;

        $.ajax(
        {
            url: "/home/`",
            type: "post",
            data:
            {
                topic_id: subTopicId
            }
        }).done(function (data) {
            baseClass.closeDialog(dialog);

            //update UI
            var dataId = App.treeMenu.tree.getSelection()[0].data.id;
            App.sliderObject.build(dataId);
        });
    }
    this.loaditemEditPage = function (placeHolder) {


        var me = this;

        $.ajax(
                        {
                            url: '/home/get_SubTopicPage'
                        }
                        ).done(function (data) {
                            $('#' + placeHolder).html(data);


                            //AssignEvents
                            $('#SubTopic-form').ready(function () {


                                var descriptionPanel = $('#SubTopic-description').rte({
                                    controls_rte: rte_toolbar,
                                    controls_html: html_toolbar,
                                    width: 650,
                                    height: 200
                                });
                                var selectedItem = me.getSelectedItem();
                                descriptionPanel['SubTopic-description'].set_content(unescape(selectedItem.data('data').description));
                                $('#SubTopic-title').val(me.getSelectedItem().data('data').title);

                                $('#SubTopic-save').click(function () {

                                    $.ajax(
                                    {
                                        url: "/home/updateSubTopic",
                                        type: "POST",
                                        data:
                                        {
                                            folder_id: App.treeMenu.tree.getSelection()[0].data.id,
                                            topic_id: me.getSelectedItem().data('data').id,
                                            title: $('#SubTopic-title').val(),
                                            description: escape(descriptionPanel['SubTopic-description'].get_content())
                                        }
                                    }).done(function () {

                                        //Update List
                                        me.loadDescriptionPage(placeHolder);

                                        //DONT update UI
                                        //set seleted Item

                                        selectedItem.data('data').description = escape(descriptionPanel['SubTopic-description'].get_content());
                                        selectedItem.data('data').title = $('#SubTopic-title').val();

                                    });
                                    return false;
                                });
                                $('#SubTopic-cancel').click(function () {

                                    //Update page
                                    me.loadDescriptionPage(placeHolder);

                                    return false;
                                }); //cancel Event
                            });



                        });

    }

}


            


     