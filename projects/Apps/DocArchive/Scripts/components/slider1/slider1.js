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


            for (var i = 0; i < data.content.length; i++) {
                var newTabHeader = '<div class="panel1Header" id="' + me.idGenerator('tabHeader') + '">'
                + '<div class="pinOpen"></div>'
                + '<div>' + data.header[i] + '</div>'
                + '</div>';

                var newTabContent = '<div class="panel1Content" style="display:none" id="' + me.idGenerator('tabContent') + '">';

                for (var j = 0; j < data.content[i].length; j++)
                    newTabContent += '<div class="panel1ContentItem" style="float:left">' + data.content[i][j] + '</div>';

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
        });

    }
}


