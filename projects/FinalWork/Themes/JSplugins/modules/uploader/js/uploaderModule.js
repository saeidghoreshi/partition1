(function ($) {
    Class('uploaderModuleClass',
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
                me.config.id = app.idGenerator('placeholder');
                $('#' + me.config.parentId).html('<div id=' + me.config.id + '></div>');

                $('#' + me.getId()).css({ width: "250px" });
            },
            getId: function () {
                var me = this;
                return me.config.id;
            },

            init: function () {

                var me = this;
                me.x = 15;
                app.tagReady(me.getId(), function () { me.buildGUI(); });
            },
            buildGUI: function () {

                var me = this;

                $('#' + me.getId()).html('');
                $('#' + me.getId()).addClass('uploaderModule');

                //top panel for loading data
                var html = '<div class="uploaderModuleTopContainer">';
                html += '<div id="'+me.getId()+'-itemsContainer" class="uploaderModuleItemsContainer"></div>';
                html += '</div>';

                html += '<div id="' + me.getId() + '-fileUpload"></div>';


                //bottom panel
                html += '<div style="visibility:hidden" id="' + me.getId() + '-filecontainer" class="fileContainer" >';
                html += '<div id="' + me.getId() + '-fileUploadBtn" class="fileButtons">Upload</div>';
                html += '<div id="' + me.getId() + '-fileRemoveBtn" class="fileButtons">Remove</div>';
                html += '<div id="' + me.getId() + '-filename" class="uploaderModuleFilename"></div>';
                html += '</div>';

                $('#' + me.getId()).append(html);


                //load scroller
                $('#' + me.getId() + '-itemsContainer').slimScroll({
                    position: 'right',
                    height: "150px",
                    color: 'gray', //#800000  #2F4F4F  gray
                    size: '8px',
                    railVisible: false,
                    alwaysVisible: false
                });


                $('#' + me.getId() + '-fileUploadBtn').button({ icons: { primary: "ui-icon-circle-arrow-n" }, text: false })
                .die("click").live({ click: function () {
                    app.maskUI(me.getId(), 'Uploading ...');
                    form.submit
                    ({
                        url: me.config.saveUrl,
                        success: function () {

                            me.emptyUpload();
                            me.loadData();

                            app.unmaskUI(me.getId());
                        }
                    });
                }
                });


                $('#' + me.getId() + '-fileRemoveBtn').button({ icons: { primary: "ui-icon-circle-close" }, text: false })
                .die("click").live({ click: function () { me.emptyUpload(); } });




                //Upload Plugin ExtJS
                var form = Ext.create('Ext.form.Panel',
                {
                    id: me.getId() + '-file',
                    border: 0,
                    renderTo: me.getId() + '-fileUpload',
                    bodyStyle:"background:transparent",
                    items: [
                        {
                            xtype: 'filefield',
                            name: 'file1',
                            buttonOnly: true,
                            hideLabel: true,
                            emptyText: 'Select...',
                            fieldLabel: 'File upload',
                            listeners:
                            {
                                change: function (fb, v) {

                                    $('#' + me.getId() + '-filename').html(v);
                                    $('#' + me.getId() + '-filecontainer').css("visibility", "visible");
                                }
                            }
                        }
                    ]
                });

                me.loadData();

            },
            emptyUpload: function () {
                var me = this;

                $('#' + me.getId() + '-filecontainer').css("visibility", "hidden");

            },

            
            loadData: function () {

                var me = this;
                me.x++;

                $('#'+me.getId()+'-itemsContainer').html('');

                var html = '';
                for (var i = 0; i < me.x; i++)
                    html += '<div class="uploaderModuleItems"></div>';

                $('#' + me.getId() + '-itemsContainer').html(html);


                //Item Events
                $('.uploaderModuleItems').die("click").live({ click: function () {
                    $('.uploaderModuleItems-selected').each(function () {
                        $(this).removeClass('uploaderModuleItems-selected');
                    });

                    $(this).addClass('uploaderModuleItems-selected');
                }
                });

                $('.uploaderModuleItems').mouseenter(function () {

                    var id = app.idGenerator('del');
                    $(this).html('<div id="' + id + '" class="uploderModuleItems-delbtn"></id>');
                    $del = $('#' + id);
                    $del.css(
                        {
                            position: "relative",
                            top: ($(this).width()-20)/2,
                            left: ($(this).height() - 20) / 2,
                            width: 20,
                            height: 20,
                            background: "url(/resources/modules/uploader/images/remove.png) ",
                            "background-repeat": "no-repeat",
                            cursor: "pointer"
                        });

                    $del.die("click").live({ click: function () {

                        var panelId = app.idGenerator('popup');
                        $('body').append('<div id="'+panelId+'" title="Delete Action">Are You Sure ?</div>');
                        $("#" + panelId).dialog({
                            resizable: false,
                            height: 150,
                            modal: true,
                            buttons: {
                                "OK": function () {
                                    $.ajax(
                                    {
                                        url: me.config.removeUrl,
                                        type: "get"
                                    }).done(function (data) {
                                        $("#" + panelId).dialog("close");
                                        alert("deleted"); 
                                     });
                                    
                                },
                                "Cancel": function () {
                                    $("#" + panelId).dialog("close");
                                }
                            }
                        });

                    }
                    });

                });
                $('.uploaderModuleItems').mouseleave(function (e) {

                    var currentDel = null;
                    $('.uploderModuleItems-delbtn').each(function () { currentDel = $(this).attr("id"); });


                    $('.uploderModuleItems-delbtn').each(function () { $(this).remove(); });

                });
            }
        }
});
})(jQuery);

