function slider1(placeHolder) {


    this.moduleName = baseClass.idGenerator('slider1');


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
            var newTabHeader = '<div class="panel1Header" id="' + baseClass.idGenerator('tabHeader') + '">'
                + '<div class="pinOpen"></div>'
                + '<div class="panel1-newButton" topicId="' + me.data[i].id + '"> <b>+</b> </div>'
                + '<div class="panel1-delButton" topicId="' + me.data[i].id + '"> <b>-</b> </div>'
                + '<div style="float:left">' + me.data[i].type_name + '</div>'

                + '</div>';
            $('#' + me.moduleName).append(newTabHeader)

            var tabContentId = baseClass.idGenerator('tabContent');
            var newTabContent = '<div class="panel1Content" style="display:none" id="' + tabContentId + '">';
            $('#' + me.moduleName).append(newTabContent);

            for (var j = 0; j < me.data[i].children.length; j++) {

                var itemId = baseClass.idGenerator('item');
                newTabContent = '<div topicId="' + me.data[i].children[j].id + '" id="' + itemId
                    + '" class="panel1ContentItem" style="float:left">' + me.data[i].children[j].type_name + '</div>';

                $('#' + tabContentId).append(newTabContent);
                $('#' + itemId).data('data',
                                {

                                    id: me.data[i].children[j].id,
                                    parent_id: me.data[i].id,
                                    title: me.data[i].children[j].type_name,
                                    description: me.data[i].children[j].type_detail
                                });

            }
            $('#' + me.moduleName).append('</div>');

            //$('#' + me.moduleName).append(newTabContent);
        }

        //Events
        $('.panel1Header').die("click").live({ click: function () {
            $el = $('#' + $(this).attr('id'));

            $('#' + $(this).attr('id') + ' > div:eq(0)').toggleClass('pinClose');

            if ($el.next('div:eq(0)').css('display') == 'block')
                $el.next('div').slideUp(100);
            else
                $el.next('div').slideDown(100);

        }
        });
        $('.bottomPanel').die("click").live({ click: function (e) {

            if ($(this).height() <= 60) {
                $(this).animate({
                    height: "200px",
                    opacity: 0.95
                }, 1500);

                var result = baseClass.openDialog('New', { width: 400, height: 400 });
                $('#' + result.phId).ready(function () {

                    
                    $.ajax(
                        {
                            url: '/home/get_NewTopicPage'
                        }).done(function (data) {
                            $('#' + result.phId).html(data);


                            //AssignEvents
                            $('#newTopic-form').ready(function () {

                                $('#newTopic-save').click(function () {
                                    $.ajax(
                                    {
                                        url: "/home/saveNewTopic",
                                        type: "POST",
                                        data:
                                        {
                                            folder_id: App.tree.getSelection()[0].data.id,
                                            title: $('#newTopic-name').val(),
                                            description: $('#newTopic-description').val()
                                        }
                                    });
                                    return false;
                                });
                            });
                        });
                });


            }

            else
                $(this).animate({
                    height: "60px",
                    opacity: 0.95
                }, 1500);
        }

        });
        $(".panel1-newButton").click(function () {

            var meButton = this;

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
                                            folder_id: App.tree.getSelection()[0].data.id,
                                            parent_id: $(meButton).attr("topicId"),
                                            title: $('#SubTopic-title').val(),
                                            description: escape(descriptionPanel['SubTopic-description'].get_content())
                                        }
                                    }).done(function () {
                                        baseClass.closeDialog(dialog);
                                        //Update List

                                        var dataId = App.tree.getSelection()[0].data.id;
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
        $(".panel1-delButton").click(function () {

            var meButton = this;

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
                                    $.ajax(
                                    {
                                        url: "/home/delTopic",
                                        type: "POST",
                                        data:
                                        {

                                            topic_id: $(meButton).attr("topicId")

                                        }
                                    }).done(function () {
                                        baseClass.closeDialog(dialog);
                                        //Update List

                                        var dataId = App.tree.getSelection()[0].data.id;
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
        $(".panel1ContentItem").die("click").live({ click: function (data) {

            me.setSelectedItem($(this).attr("id"));

            var dialog = baseClass.openDialog('Description', { width: 700, height: 500 });

            me.loadDescriptionPage(dialog.phId, dialog);
        }

        });
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
                        background: "url('scripts/components/slider1/images/add.png') "

                    });
                $('.action1').css({ background: "url('scripts/components/slider1/images/edit.png') " });
                $('.action2').css({ background: "url('scripts/components/slider1/images/delete.png') " });
                $('#handle').css(
                    {
                        position: "relative",
                        width: 20,
                        height: 25,
                        top: 25,
                        left: 12,
                        background: "url('scripts/components/slider1/images/arrow_double_down.png') ",
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
                        $('#handle').css({ background: "url('scripts/components/slider1/images/arrow_double_up.png') " });
                    }

                    else {
                        $('#' + ItemId).animate({ top: "-25px" }, 500);
                        $('#handle').css({ background: "url('scripts/components/slider1/images/arrow_double_down.png') " });
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
                                    me.deleteSubTopic(dialog);
                                    baseClass.closeDialog(cdialog);
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
            url: "/home/delTopic",
            type: "post",
            data:
            {
                topic_id: subTopicId
            }
        }).done(function (data) {
            baseClass.closeDialog(dialog);

            //update UI
            var dataId = App.tree.getSelection()[0].data.id;
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
                                            folder_id: App.tree.getSelection()[0].data.id,
                                            topic_id: me.getSelectedItem().data('data').id,
                                            title: $('#SubTopic-title').val(),
                                            description: escape(descriptionPanel['SubTopic-description'].get_content())
                                        }
                                    }).done(function () {

                                        //Update List
                                        me.loadDescriptionPage(placeHolder);

                                        //DONT update UI

                                        //set seletec Item

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


            


     