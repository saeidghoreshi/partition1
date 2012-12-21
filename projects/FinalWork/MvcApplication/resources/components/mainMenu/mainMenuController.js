var mainMenuControllerClass
(function ($$) {
    (function ($) {

    mainMenuControllerClass = Class.create({
            initialize: function (config) {
                    var me = this;
                    
                    me.config = config;
                },
            init: function () {
            
                    var me = this;

                    var data = [
                        {
                            text: "Baseball", imageUrl: "http://demos.kendoui.com/content/shared/icons/sports/baseball.png",
                            items: [
                                { text: "Top News", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/star.png" },
                                { text: "Photo Galleries", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/photo.png" },
                                { text: "Videos Records", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/video.png" },
                                { text: "Radio Records", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/speaker.png"
                                    , items: [
                                        { text: "Top News", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/star.png" },
                                        { text: "Photo Galleries", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/photo.png" },
                                        { text: "Videos Records", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/video.png" },
                                        { text: "Radio Records", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/speaker.png" }
                                    ]
                                }
                            ]
                        },
                        {
                            text: "Golf", imageUrl: "http://demos.kendoui.com/content/shared/icons/sports/golf.png",
                            items: [
                                { text: "Top News", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/star.png" },
                                { text: "Photo Galleries", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/photo.png" },
                                { text: "Videos Records", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/video.png" },
                                { text: "Radio Records", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/speaker.png" }
                            ]
                        },
                        {
                            text: "Swimming", imageUrl: "http://demos.kendoui.com/content/shared/icons/sports/swimming.png",
                            items: [
                                { text: "Top News", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/star.png" },
                                { text: "Photo Galleries", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/photo.png" }
                            ]
                        },
                        {
                            text: "Snowboarding", imageUrl: "http://demos.kendoui.com/content/shared/icons/sports/snowboarding.png",
                            items: [
                                { text: "Photo Galleries", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/photo.png" },
                                { text: "Videos Records", imageUrl: "http://demos.kendoui.com/content/shared/icons/16/video.png" }
                            ]
                        }
                    ]
                    var c =
                        {
                            parentId: me.config.parentId,
                            data: data
                        }
                    me.menu = new kendoMenuModuleClass(c);
                    me.menu.init();


                    


                    return;
                    $.ajax(
                    {
                        url: "/home/getMenuData",
                        type: "GET"
                    }
                    ).done(function (data) {


                    });

                } //Init
        });

    } (jQuery));
} (Prototype));
