var index2;
(function ($) {

	index2=cls.define(
    {
        updateEditor:null,

		availableForms:
		{
			header_NewForm:function(config)
			{	
				var me=this;
				me.theme = getDemoTheme();
				
				$.get('/sandbox/header_NewForm',function(content)
				{
					lib.helper.jqWidgetWin(
					{
						header: "Define New Header",
						content: content,
						theme: me.theme,
						modal: false,
						width: 300,
						height: 165,
						collapsible: false
					});  
				});
			},

			header_EditForm:function(config)
			{	
				var me=this;
				me.theme = getDemoTheme();
				
				$.get('/sandbox/header_EditForm',function(content)
				{
					lib.helper.jqWidgetWin(
					{
                        header  : "Update Header",
						content : content,
						theme   : me.theme,
						modal   : true,
						width   : 300,
						height  : 165,
						collapsible : false,
                        callback    :config.callback
					});  
					
				});
                
			},

			headerContent_NewForm:function(config)
			{
				var me=this;
				$.get('/sandbox/headerContent_NewForm',function(content)
				{
					lib.helper.jqWidgetWin(
						{
							header: "Define New Content",
							content: content,
							theme: me.theme,
							modal: false,
							width: 650,
							height: 575,
							collapsible: false
						}); 
					
				});
			},

			headerContent_EditForm:function(config)
			{
				var me=this;
                me.theme = getDemoTheme();
				$.get('/sandbox/headerContent_EditForm',function(content)
				{
					var $window=lib.helper.jqWidgetWin(
						{
							header: "Edit Content",
							content: content,
							theme: me.theme,
							modal: false,
							width: 650,
							height: 575,
							collapsible: false,
                            callback:config.callback
						}); 
				});
			}
		},

        loadDataSources:function(){
		
			var me=this;
		
			$('#panel').children().remove();
			
			var panels=[];
			$.get("/sandbox/getHeaderContents")
			.done(function(data)
			{
				var headers=data.headers;
				me.headerContents=data.headerContents;
				
				for(var i=0;i<headers.length;i++)
				{
					var id=lib.helper.idGenerator('panel');
					var $header=$('<div class="header">'+((headers[i].label==='')?'---':headers[i].label) +'</div>')
					.appendTo('#panel');
					
					//ASSIGN DATA TO HEADER
					$header.data('data',{headerID:headers[i].id})
					
					
					var $panel=$('<div class="headercontent" id="'+id+'" />')
					.appendTo('#panel');
					
					//keep track of panels
					panels.push($panel);
					
					//build repo for each header
					var repo=[];
					for(var j=0;j<me.headerContents.length;j++)
						if(me.headerContents[j].headerID === headers[i].id)
							repo.push(me.headerContents[j]);
							
					var source =
					{
						localdata: repo,
						datatype: "array"
					};
					var dataAdapter = new $.jqx.dataAdapter(source);
					$panel.jqxDropDownList(
					{ 
						promptText	: repo.length+" items(s)",
						dropDownHeight:70,
						theme: me.theme, 
						source: dataAdapter, 
						displayMember: "contentLabel", 
						valueMember: "headerContentID", 
						height: 25, 
						width: 200
					});
					//events
					$panel.on('change', 
					function (event) {     
						var args = event.args;
						
						me.updateEditor=null;
						
						if (args) {
							// index represents the item's index.                      
							var index = args.index;
							var item = args.item;
							if(item ===undefined || item === null )return;
								
							// get item's label and value.
							var label = item.label;
							var value = item.value;
							
                            
							var $documentation=$('#documentation');
							var $component=$('#component');
									
							var obj=lib.helper.findItemInObjectArray(value,'headerContentID',me.headerContents);
							$documentation.html(unescape(obj.content));
							$.get('/sandbox/sandbox?type='+obj.viewurl).done(function(content){$component.html(content);});
							
                            //SAVE SELECTED HEADERCONTENTID
                            console.log(obj.headerContentID);
                            me.selected_HC=lib.helper.findItemInObjectArray(obj.headerContentID,'headerContentID',me.headerContents);
                            console.log(me.selected_HC);
					        
							//reset selected index for rest of them
							for(var item in panels)
								if(panels[item].attr('id') !==$(this).attr('id'))
									panels[item].jqxDropDownList('selectIndex', -1 ); 							
							
					} });
				
				}
				
				//events
				$('.header').on('click',function()
				{
					var $control=$(this);

                    var winid=lib.helper.idGenerator('win');
					var config=
					{	
                        callback:function()
						{
                            //FORM DEFAULT VALUES
							var label=$control.html();
							$('#HC-header').val(label);

                            //FORM DATA
                            E_H_DATA=$.extend($control.data('data'),{winidxxx:winid});
						}
					}
                    
					me.availableForms.updateHeaderForm(config);
				});
				
				//panel Container
				$("#panelcontainer").jqxPanel({ width: 230, height: 720, theme: me.theme });
				
			});
			
			
		},

		loadLayout:function()
		{
			var me=this;
			
			me.theme = getDemoTheme();
			
			//Right Side Tabs
			$('#maintab').jqxTabs(
			{ 
				width: "100%", 
				height:800,
				theme: me.theme, 
				selectionTracker: true, 
				animationType: 'fade' 
			});
            //Right Side Tabs-----------------------------------------------------------
  
			
            //create New Header button
			$('#sandbox-new-header')
            .jqxButton({ width: 200, height: 25, theme: me.theme })
            .click(function()
            {
                me.availableForms.header_NewForm();
            });
            //create New Header button --------------------------------------------------

            //Create New Content button
			$('#sandbox-new-content')
            .jqxButton({ width: 200, height: 25, theme: me.theme })
            .click(function()
            {

                var winid=lib.helper.idGenerator('win');
                var config=
			    {	
                    callback:function()
					{   
                        //FORM INTERFACE
                        HC_DATA={winidxx:winid};
				    }
				}
                me.availableForms.headerContent_NewForm();
            });
            //Create New Content button -------------------------------------------------

            //Edit Header Content Button button
			$('#sandbox-edit-headercontent')
            .jqxButton({ width: 60, height: 25, theme: me.theme })
            .on('click',function()
			{      

                    var winid=lib.helper.idGenerator('win');
					var config=
					{	
                        callback:function()
						{   
                            HC_DATA=$.extend(me.selected_HC,{winidxx:winid});

                            //FORM DEFAULT VALUES
                            $('#HC-label').val(me.selected_HC.contentLabel);
                            $('#HC-url').val(me.selected_HC.viewurl);
                            HCeditor.setData(unescape(me.selected_HC.content));

                            var selectedItem = $('#HC-headers').jqxDropDownList('getItemByValue', me.selected_HC.headerID);
                            $("#HC-headers").jqxDropDownList('selectItem', selectedItem); 
						}
					}
				    me.availableForms.headerContent_EditForm(config);
			});
            //Edit Header Content Button button  ----------------------------------------
			
			
			me.loadDataSources();
			
		}
		
    });


    mainPanel=new index2();
	mainPanel.loadLayout();
    


} (jQuery));