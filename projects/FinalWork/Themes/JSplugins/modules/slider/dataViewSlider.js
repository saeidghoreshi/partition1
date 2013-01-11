Class("dataViewSliderClass",
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

                me.recordsMapping = [];
                me.config = config;

                me.config.id = app.idGenerator('placeholder');
                $('#' + me.config.parentId).html('<div id=' + me.config.id + '></div>');

                $("#" + me.config.id).css("width", me.config.width + "px");
            },
            getId: function () {
                var me = this;
                return me.config.id;
            },

            init: function (callback) {
                var me = this;

                app.tagReady(me.getId(), function () {
                    $.ajax(
                    {
                        url: me.config.url,
                        type: "get"

                    }).done(function (data) {

                        me.config.data = data;
                        me.buildGUI();

                        if (callback != null)
                            callback();

                    });

                });
            },



            buildGUI: function () {

                var me = this;
                app.maskUI(me.getId(),"Loading ...");

                var eachContainerWidth = me.getEachSectionWidth();



                var counter = 0;
                for (var y = 0; y < me.config.data.length; y++) {

                    //section
                    var moduleItem = $("#" + me.config.id);
                    var sectionId = app.idGenerator('slider');
                    moduleItem.append("<div class='dvs-G1' id='" + sectionId + "' ></div>");
                    var sectionItem = $('#' + sectionId);

                    //Header
                    var headerId = app.idGenerator('slider');
                    sectionItem.append("<div class='dvs-G2 dvs-headerStyle dvs-headerExpand' id='" + headerId + "' ></div>");
                    var headerItem = $('#' + headerId);

                    headerItem.css(
                    {
                        "width": eachContainerWidth + "px",
                        "height": "20px",
                        "padding-left": "20px",
                        "font-family": "verdana",
                        "font-size": "10px"
                    });

                    headerItem.html(me.config.data[y][me.config.cascadingContainers[0]]);


                    //main Container
                    var mainContainerId = app.idGenerator('slider');
                    sectionItem.append("<div class='dvs-G3 dvs-mainDivStyle dvs-sectionShow ' id='" + mainContainerId + "' ></div>");
                    var mainContainer = $("#" + mainContainerId);
                    mainContainer.css({ width: eachContainerWidth + "px", height: me.getEachSectionHeight(y) + "px" });

                    //sub Items
                    for (var i = 0; i < me.config.data[y][me.config.cascadingContainers[1]].length; i++) {

                        //image
                        var itemId = app.idGenerator('slider');
                        mainContainer.append("<div id='" + itemId + "' class='dvs-G4 dvs-itemStyle' ></div>");
                        var item = $('#' + itemId);


                        item.css(
                        {
                            "width": me.config.cellWidth + "px",
                            "height": me.config.cellHeight + "px",
                            "background": 'url(' + me.config.data[y][me.config.cascadingContainers[1]][i].thumbnail + ') no-repeat scroll 0 0 transparent',
                            "background-position": "center"
                        });

                        //assign recordsMapping
                        me.recordsMapping[counter++] = { id: itemId, record: me.config.data[y][me.config.cascadingContainers[1]][i] };

                    }

                }
                me.bindEventAndStyle();

                setTimeout(function () { app.unmaskUI(me.getId()); }, 1000);

            },
            bindEventAndStyle: function () {

                var me = this;

                //Item Click
                $('.dvs-G4').die("click").live(
                {
                    click: function () {

                        $('.dvs-itemStyle-selected').each(function () {
                            $(this).removeClass('dvs-itemStyle-selected');
                        });

                        $(this).addClass('dvs-itemStyle-selected');
                        alert(YAHOO.lang.dump(me.findRec($(this).attr("id"), me.recordsMapping)));
                    }
                });

                //header Click
                $('.dvs-G2').die("click").live(
                {
                    click: function () {
                        var meG2 = this;

                        var pId = $(meG2).parent().attr("id")
                        $('.dvs-G3').each(function () {
                            if ($(this).parent().attr("id") == pId) {
                                if ($(this).hasClass("dvs-sectionShow")) {
                                    $(this).removeClass("dvs-sectionShow");
                                    $(this).addClass("dvs-sectionHide");

                                    $(meG2).removeClass("dvs-headerExpand");
                                    $(meG2).addClass("dvs-headerCollapse");
                                }
                                else {
                                    $(this).removeClass("dvs-sectionHide");
                                    $(this).addClass("dvs-sectionShow");

                                    $(meG2).removeClass("dvs-headerCollapse");
                                    $(meG2).addClass("dvs-headerExpand");
                                }

                            }

                        });
                    }
                });
            },

            setGrouping: function (groupable, groupField) {
                var me = this;
                me.config.groupable = groupable;
                if (me.config.groupable == true)
                    me.groupField = groupField;
                else
                    me.groupField = null;
            },

            setSelctionMode: function (selectionMode) {
                var me = this;
                me.config.selectionMode = selectionMode;
            },

            findRec: function (id, source) {

                for (var i = 0; i < source.length; i++)
                    if (source[i].id == id)
                        return source[i].record;
            },

            getEachSectionWidth: function () {

                var me = this;

                return (me.config.colCount * (parseInt(me.config.cellWidth) + 2 * parseInt(me.config.bmpSum))).toString();
            },
            getEachSectionHeight: function (index) {

                var me = this;

                for (var i = 0; i < me.config.data.length; i++)
                    if (index == i) {
                        var rowCount = Math.ceil(me.config.data[i][me.config.cascadingContainers[1]].length / me.config.colCount);
                        return parseInt((rowCount * (parseInt(me.config.cellHeight) + 2 * parseInt(me.config.bmpSum))).toString());
                    }
            },

            getSelectedNodes: function () {

            },

            setSelectedNodes: function () {

            }

        }
}); 