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
                + '<div style="float:left">' + data[i].type_name + '</div>'
                + '<div class="panel1-newButton" style="float:right">NEW</div>'


                + '</div>';

                var newTabContent = '<div class="panel1Content" style="display:none" id="' + baseClass.idGenerator('tabContent') + '">';

                for (var j = 0; j < data[i].children.length; j++)
                    newTabContent += '<div class="panel1ContentItem" style="float:left">' + data[i].children[j].type_name + '</div>';

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

                var result = baseClass.openDialog('New Sub', { width: 400, height: 400 });
            });



        });

    }
}


