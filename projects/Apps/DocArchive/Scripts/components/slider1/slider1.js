function slider1(parentId) {

    this.idGenerator = function (prefix) {return prefix + "-" + (Math.random() * 1000000000000).toFixed(0).toString();} 
    this.moduleName = this.idGenerator('slider1');
    $('#' + parentId).html('<div class="panel1" id="' + this.moduleName+ '"></div>');


    this.build = function () {
        var me = this;
        $.ajax
        (
            {
                url: "/Home/getData",
                type: "GET"
            }
        ).done(function (data) {

            for (var i = 0; i < data.length; i++) {
                var newTabHeader = '<div class="panel1Header" id="' + me.idGenerator('tabHeader') + '">'
                + '<div class="pinOpen"></div>'
                + '<div style="float:left">' + data[i].type_name + '</div>'

                + '</div>';

                var newTabContent = '<div class="panel1Content" style="display:none" id="' + me.idGenerator('tabContent') + '">';

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

                //test Opebn dialog
                //openDialog('', {width:100,height:100});
            }
            });

            //
            $('#bottomPanel').click(function (e) {

                if ($(this).height() <= 60)
                    $("#bottomPanel").animate({
                        height: "200px",
                        opacity: 0.95
                    }, 1500);
                else
                    $("#bottomPanel").animate({
                        height: "60px",
                        opacity: 0.95
                    }, 1500);
            });



        });

    }
}


