var index2;
(function ($) {

	index2=cls.define(
    {
        selected_HC:null,
        headerContentsDS:null,

        availableForms:
		{
			header_new_form:function(config)
			{	
				var me=this;
				me.theme = getDemoTheme();
				
				$.get('/sandbox/header_new_form',function(content)
				{
					lib.helper.jqWidgetWin(
					{
						header: "Define New Header",
						content: content,
						theme: me.theme,
						modal: true,
						width: 300,
						height: 165,
						collapsible: false
					});  
				});
			},

			header_edit_form:function(config)
			{	
				var me=this;
				me.theme = getDemoTheme();
				
				$.get('/sandbox/header_edit_form',function(content)
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

			headercontent_new_form:function(config)
			{
				var me=this;
				$.get('/sandbox/headercontent_new_form',function(content)
				{
					lib.helper.jqWidgetWin(
						{
							header: "Define New Content",
							content: content,
							theme: me.theme,
							modal: true,
							width: 650,
							height: 575,
							collapsible: false
						}); 
					
				});
			},

			headercontent_edit_form:function(config)
			{
				var me=this;
                me.theme = getDemoTheme();
				$.get('/sandbox/headercontent_edit_form',function(content)
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

        loadDataSources:function()
        {
		
			var me=this;
		
			$('#sandbox_panel').children().remove();
			
			var panels=[];
			$.get("/sandbox/getHeaderContents")
			.done(function(data)
			{
				var headers=data.headers;
				me.headerContentsDS=data.headerContents;
				
				for(var i=0;i<headers.length;i++)
				{
					var id=lib.helper.idGenerator('panel');
					var $header=$('<div class="header">'+((headers[i].label==='')?'---':headers[i].label) +'</div>')
					.appendTo('#sandbox_panel');
					
					//ASSIGN DATA TO HEADER
					$header.data('data',{headerID:headers[i].id})
					
					
					var $panel=$('<div class="headercontent" id="'+id+'" />')
					.appendTo('#sandbox_panel');
					
					//keep track of panels
					panels.push($panel);
					
					//build repo for each header
					var repo=[];
					for(var j=0;j<me.headerContentsDS.length;j++)
						if(me.headerContentsDS[j].headerID === headers[i].id)
							repo.push(me.headerContentsDS[j]);
							
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
						
						if (args) {
							// index represents the item's index.                      
							var index = args.index;
							var item = args.item;
							if(item ===undefined || item === null )return;
								
							// get item's label and value.
							var label = item.label;
							var value = item.value;
							
                            
							var $documentation=$('#sandbox_documentation');
							var $component=$('#sandbox_component');
									
							var obj=lib.helper.findItemInObjectArray(value,'headerContentID',me.headerContentsDS);
							$documentation.html(unescape(obj.content));
							$.get('/sandbox/sandbox?type='+obj.viewurl).done(function(content){$component.html(content);});
							
                            //SAVE SELECTED HEADERCONTENTID
                            
                            me.selected_HC=lib.helper.findItemInObjectArray(obj.headerContentID,'headerContentID',me.headerContentsDS);
                            
							//reset selected index for rest of them
							for(var item in panels)
								if(panels[item].attr('id') !==$(this).attr('id'))
									panels[item].jqxDropDownList('selectIndex', -1 ); 							

                            me.enableRightPanel(true);
							
					} });

                    
				}
				
                me.assignHeaderEvent();
				//panel Container
				$("#sandbox_panelcontainer").jqxPanel({ width: 230, height: 720, theme: me.theme });
				
			});//GET Ajax-----
			

            me.enableRightPanel(false);
			
		},
        enableRightPanel:function(enable)
        {
            $('#sandbox_maintab').css("display",((enable==true)?"block":"none"));
            
        },
		loadLayout:function()
		{
			var me=this;
			
			me.theme = getDemoTheme();
			
			//Right Side Tabs
			$('#sandbox_maintab').jqxTabs(
			{ 
				width: "100%", 
				height:800,
				theme: me.theme, 
				selectionTracker: true, 
				animationType: 'fade' 
			});
            //Right Side Tabs-----------------------------------------------------------
  
			
            //create New Header button
			$('#sandbox_newheaderbtn')
            .jqxButton({ width: 230, height: 25, theme: me.theme })
            .click(function()
            {
                me.availableForms.header_new_form();
            });
            //create New Header button --------------------------------------------------

            //Create New Content button
			$('#sandbox_newheadercontentbtn')
            .jqxButton({ width: 230, height: 25, theme: me.theme })
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
                me.availableForms.headercontent_new_form();
            });
            //Create New Content button -------------------------------------------------

            //Edit Header Content Button 
			$('#sandbox_editheadercontentbtn')
            .jqxButton({ width: 60, height: 25, theme: me.theme })
            .on('click',function()
			{      

                    var winid=lib.helper.idGenerator('win');
					var config=
					{	
                        callback:function()
						{   
                            headercontent_DATA=$.extend(me.selected_HC,{winidxx:winid});

                            //FORM DEFAULT VALUES
                            $('#headercontent_label').val(me.selected_HC.contentLabel);
                            $('#headercontent_viewurl').val(me.selected_HC.viewurl);
                            headercontent_editor.setData(unescape(me.selected_HC.content));

                            var selectedItem = $('#headercontent_headers').jqxDropDownList('getItemByValue', me.selected_HC.headerID);
                            $("#headercontent_headers").jqxDropDownList('selectItem', selectedItem); 
						}
					}
				    me.availableForms.headercontent_edit_form(config);
			});
            //Edit Header Content Button button  ----------------------------------------
            //Delete Header Content Button 
			$('#sandbox_deleteheadercontentbtn')
            .jqxButton({ width: 60, height: 25, theme: me.theme })
            .on('click',function()
			{      
                if (confirm("Sure to Delete")===false)return false;
                $.ajax(
                {
                    url:"/sandbox/headercontent_delete",
                    type:"POST",
                    data:
                    {
                        contentid:me.selected_HC.contentID
                    }
                })
                .done(function(data)
                {
                    me.loadDataSources();
                });
			});
            //Delete Header Content Button button  ----------------------------------------
			
			me.loadDataSources();
            
		},
        assignHeaderEvent:function()
        {
            var me=this;
            //HEADER CLICK ACTION
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
						$('#header_label').val(label);

                        //FORM DATA
                        header_DATA=$.extend($control.data('data'),{winidxxx:winid});
					}
				}
                
				me.availableForms.header_edit_form(config);
			});
			//HEADER CLICK ACTION-----------------------------------------------------------
        }
		
    });


    mainPanel=new index2();
	mainPanel.loadLayout();
    


} (jQuery));