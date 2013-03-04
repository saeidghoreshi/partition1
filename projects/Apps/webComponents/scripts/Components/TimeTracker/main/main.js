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
                
                //Define PlaceHolder
                var $panel=$('<div id='+lib.helper.idGenerator('panel')+' />')
                .appendTo('#tt_main_menu');

                //Define Source
                me.mainMenuDS=
                [
                    {id:"1",label:"create New Task"},
                    {id:"2",label:"create New Task Assignment"},
                    {id:"3",label:"Task History"}
                ];

                //Define Adapter
				var dataAdapter = new $.jqx.dataAdapter({localdata: me.mainMenuDS});

                //Define Component
				$panel.jqxListBox(
				{ 
					promptText	: " items(s)",
					theme: me.theme, 
					source: dataAdapter, 
					displayMember: "label", 
					valueMember: "id", 
					height: 800, 
					width: 190
				});

				//Define Events
				$panel.on('change', 
				function (event) {     
					var args = event.args;
					
					if (args) {
						// index represents the item's index.                      
						var index = args.index;
						var item = args.item;
						if(item ===undefined || item === null )return;
							
						// get item's label and value.
						var label = item.label;
						var value = item.value;
						
                        
						var $component=$('#tt_main_component');
								
						var obj=lib.helper.findItemInObjectArray(value,'id',me.mainMenuDS);
                        var mm_id=obj.id;
                        if(mm_id==1)
                        {
                            $.get('/timetracker/tt_task_new_form')
                            .done(function(content){
                                $('#tt_main_component').html(content);
                            })
                            .fail(function(){console.log('get Function failed');});
                        }
                        if(mm_id==2)
                        {
                            $.get('/timetracker/tt_task_assignment_form')
                            .done(function(content){
                                $('#tt_main_component').html(content);
                            })
                            .fail(function(){console.log('get Function failed');});
                        }
                        if(mm_id==3)
                        {
                            $.get('/timetracker/tt_task_history_form')
                            .done(function(content){
                                $('#tt_main_component').html(content);
                            })
                            .fail(function(){console.log('get Function failed');});
                        }
                        
                        
				} });//event End
        }
    });

    //instantiate Objects
    var mm=new mainMenu({});
    mm.initiate();
    mm.createMainMenu();


} (jQuery));