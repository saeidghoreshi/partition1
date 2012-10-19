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

            for (var i = 0; i < data.length; i++) {
                var newTabHeader = '<div class="panel1Header" id="' + baseClass.idGenerator('tabHeader') + '">'
                + '<div class="pinOpen"></div>'
                + '<div class="panel1-newButton" topicId="' + data[i].id + '"> <b>+</b> </div>'
                + '<div class="panel1-delButton" topicId="' + data[i].id + '"> <b>-</b> </div>'
                + '<div style="float:left">' + data[i].type_name + '</div>'



                + '</div>';

                var newTabContent = '<div class="panel1Content" style="display:none" id="' + baseClass.idGenerator('tabContent') + '">';

                for (var j = 0; j < data[i].children.length; j++)
                    newTabContent += '<div topicId="' + data[i].children[j].id + '" class="panel1ContentItem" style="float:left">' + data[i].children[j].type_name + '</div>';

                $('#' + me.moduleName).append(newTabHeader).append(newTabContent);
            }



            //Click Event

            $('.panel1Header').die("click").live({ click: function () {
                $el = $('#' + $(this).attr('id'));

                $('#' + $(this).attr('id') + ' > div:eq(0)').toggleClass('pinClose');

                if ($el.next('div:eq(0)').css('display') == 'block')
                    $el.next('div').slideUp(100);
                else
                    $el.next('div').slideDown(100);

            }
            });

            //
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
                                            folder_id: 40,
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
                            url: '/home/get_NewSubTopicPage'
                        }).done(function (data) {
                            $('#' + dialog.phId).html(data);
                            

                            //AssignEvents
                            $('#newSubTopic-form').ready(function () {
                                


                                var descriptionPanel = $('#newSubTopic-description').rte({
                                    controls_rte: rte_toolbar,
                                    controls_html: html_toolbar,
                                    width: 650,
                                    height: 200
                                });

                                $('#newSubTopic-save').click(function () {
                                    console.log($('#newSubTopic-description').val());
                                    $.ajax(
                                    {
                                        url: "/home/saveNewSubTopic",
                                        type: "POST",
                                        data:
                                        {
                                            folder_id: 40,
                                            parent_id: $(meButton).attr("topicId"),
                                            title: $('#newSubTopic-name').val(),
                                            description: escape(descriptionPanel['newSubTopic-description'].get_content())
                                        }
                                    }).done(function () {
                                        baseClass.closeDialog(dialog);
                                        //Update List

                                        var dataId = App.tree.getSelectionModel().getSelection()[0].data.id;
                                        var node = App.tree.getStore().getNodeById(dataId);
                                        App.sliderObject.build(dataId);
                                    });
                                    return false;
                                });
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

                                        var dataId = App.tree.getSelectionModel().getSelection()[0].data.id;
                                        var node = App.tree.getStore().getNodeById(dataId);
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



        });

    }
    }
    $(".panel1ContentItem").die("click").live({ click: function (data) {

        var me = this;
        var topicId = $(me).attr("topicId");

        $.ajax(
        {
            url: "/home/getTopicDescription",
            type: "POST",
            data:
            {
                topic_id: topicId
            }
        }).done(function (data) {

            var dialog = baseClass.openDialog('Description', { width: 700, height: 500 });
            $('#' + dialog.phId).ready(function () {

                //load scroller
                $('#' + dialog.phId).slimScroll({
                    position: 'right',
                    height: 450,
                    color: '#2F4F4F', //#800000  #2F4F4F  gray
                    size: '8px',
                    railVisible: true,
                    alwaysVisible: false
                });

                $('#' + dialog.phId).html(unescape(data));
                $('#' + dialog.phId).css({ "width": "700px", "overflow": "auto" });


                var ItemId = baseClass.idGenerator("option");
                var optionHtml = "<div id='" + ItemId + "'>     <div><div class='action action1'></div><div class='action action2'></div></div>   <div><div id=x></div></div>    </div>";
                $('#' + dialog.phId).prepend(optionHtml + "<br>")
                $option = $('#' + ItemId);

                $('.action').css(
                    {
                        position: "relative",
                        float: "left",
                        padding: "2px",
                        margin: "2px",

                        width: 20,
                        height: 20,
                        background: "url('scripts/components/slider1/images/add.png') "

                    });
                    $('.action1').css({ background: "url('scripts/components/slider1/images/add.png') " });
                    $('.action2').css({ background: "url('scripts/components/slider1/images/recycle.png') " });
                $('#x').css(
                    {
                        position: "relative",
                        width: 20,
                        height: 20,
                        top: 20,
                        background: "url('scripts/components/slider1/images/fullscreen.png') ",
                        cursor: "pointer"
                    });

                $option.css(
                    {
                        position: "absolute",
                        top: -23,
                        cursor: "pointer",
                        background: "#f2f2f2",
                        "border-right": "2px solid #fefefe",
                        "border-bottom": "2px solid #fefefe",
                        font: "10px verdana"
                    });
                $('#x').click(function () {
                    if ($('#' + ItemId).position().top !== 0)
                        $('#' + ItemId).animate({ top: "0px" }, 1000);
                    else
                        $('#' + ItemId).animate({ top: "-23px" }, 1000);

                });

            });
        });

    }
    });
    
    
           

            


     