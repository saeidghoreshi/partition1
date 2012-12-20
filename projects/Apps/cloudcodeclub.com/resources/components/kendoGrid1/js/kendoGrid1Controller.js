(function ($) {
    Class('kendoGrid1ControllerClass',
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
                },
                init: function () {

                    var me = this;

                    var data =
                    [
                        {
                            id:"1",
                            FirstName:"saeid",
                            LastName:"Ghoreshi",
                            City:"tehran",
                            Title:"Test",
                            BirthDate: new Date("1984/02/02"),
                            Age:"28"
                        }
                    ]

                    var c =
                        {
                            parentId: me.config.parentId,
                            data: data
                        }
                    me.grid = new kendoGridModuleClass(c);
                    me.grid.init();


                } //Init
            }
    });
})(jQuery);