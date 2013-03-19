var mainMenu;
(function ($) {

	mainMenu=cls.define(
    { 
        mainMenuDS:[],

        initiate:function()
        {
            var me=this;
            me.theme = getDemoTheme();
        },
        createMainMenu:function()
        {
            var me=this;
                var mm_id=4;
                        if(mm_id==3)
                        {
                            $.get('/timetracker/tt_task_history_form')
                            .done(function(content){
                                $('#tt_main_component').html(content);
                            })
                            .fail(function(){console.log('get Function failed');});
                        }
						if(mm_id==4)
                        {
                            $.get('/timetracker/tt_task_chart_form')
                            .done(function(content){
                                $('#tt_main_component').html(content);
                            })
                            .fail(function(){console.log('get Function failed');});
                        }
        }
    });

    //instantiate Objects
    var mm=new mainMenu({});
    mm.initiate();
    mm.createMainMenu();


} (jQuery));