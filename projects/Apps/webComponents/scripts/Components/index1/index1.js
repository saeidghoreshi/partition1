var index2;
(function ($) {

	index2=cls.define(
    {
		availableForms:
		{
			newHeaderForm:function(config)
			{	
				var me=this;
				me.theme = getDemoTheme();
				
				$.get('/sandbox/form_newheader',function(content)
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
			updateHeaderForm:function(config)
			{	
				var me=this;
				me.theme = getDemoTheme();
				
				$.get('/sandbox/form_updateheader',function(content)
				{
					lib.helper.jqWidgetWin(
					{
						header: "Update Header",
						content: content,
						theme: me.theme,
						modal: true,
						width: 300,
						height: 165,
						collapsible: false
					});  
					
					
					headerUpdate_dataRequired=config.requiredData;
					if(config.callback!==null)
						config.callback();
					
					
				});
			},
			newHeaderContentForm:function(config)
			{
				var me=this;
				$.get('/sandbox/form_newcontent',function(content)
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
			editHeaderContentForm:function(config)
			{
				var me=this;
				$.get('/sandbox/form_editcontent',function(content)
				{
					lib.helper.jqWidgetWin(
						{
							header: "Edit Content",
							content: content,
							theme: me.theme,
							modal: false,
							width: 650,
							height: 575,
							collapsible: false
						}); 
					
					if(config.callback!==null)
						config.callback();	
					
				});
			}
		},
		updateEditor:null,
		loadLayout:function()
		{
			var me=this;
			
			me.theme = getDemoTheme();
			
			
			//load main Tab
			$('#maintab').jqxTabs(
			{ 
				width: "100%", 
				height:800,
				theme: me.theme, 
				selectionTracker: true, 
				animationType: 'fade' 
			});
  
			
			$('#createNewBox').jqxButton({ width: 200, height: 25, theme: me.theme });
			$('#createNewContent').jqxButton({ width: 200, height: 25, theme: me.theme });
	
			$('#createNewBox').click(function(){me.availableForms.newHeaderForm();});
			$('#createNewContent').click(function(){me.availableForms.newHeaderContentForm();});
			
			$('#editbtn').jqxButton({ width: 60, height: 25, theme: me.theme })
			.on('click',function()
			{
				me.availableForms.editHeaderContentForm();
			});
			
			
			me.loadDataSources();
			
		},
		loadDataSources:function(){
		
			var me=this;
		
			$('#panel').children().remove();
			
			var panels=[];
			$.get("/sandbox/getHeaderContents")
			.done(function(data)
			{
				var headers=data.headers;
				var headerContents=data.headerContents;
				
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
					for(var j=0;j<headerContents.length;j++)
						if(headerContents[j].headerID === headers[i].id)
							repo.push(headerContents[j]);
							
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
									
							var obj=lib.helper.findItemInObjectArray(value,'headerContentID',headerContents);
							$documentation.html(unescape(obj.content));
							$.get('/sandbox/sandbox?type='+obj.viewurl).done(function(content){$component.html(content);});
							
							//SAVE SELECTED CONTENTID
							contentUpdate_dataRequired={contentID:obj.contentID}
							
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
					
					var config=
					{	
						requiredData:$control.data('data'),
						callback:function()
						{
							var label=$control.html();
							$('#txt-header').val(label);
						}
					}
					me.availableForms.updateHeaderForm(config);
					
				});
				
				//panel Container
				$("#panelcontainer").jqxPanel({ width: 230, height: 720, theme: me.theme });
				
			});
			
			
		},
		
		
		
		loadExtJSAccordion: function (PH) {
            var me = this;

            app.tagReady(PH, function () {
                $.ajax(
                {
                    url: "/sandbox/json_getModuleFeatures",
                    type: "get"
                }).done(function (data) {

                    var items = []
                    for (var i = 0; i < data.length; i++) {
                        items.push
                        (
                            Ext.create('Ext.Panel', {
                                title: data[i].text,
                                html: '<img src="/resources/components/rightTabsComponent/images/' + data[i].text + '.png" />'
                            })

                        );
                        }

                    
                    var accordion = Ext.create('Ext.Panel', {
                        renderTo: PH,
                        height: 400,
                        border: 0,
                        layout: 'accordion',
                        items: items
                    });
                });
            });
        }
		
    });


    mainPanel=new index2();
	mainPanel.loadLayout();
    


} (jQuery));