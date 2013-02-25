var index2;
(function ($) {

    index2=cls.define(
    {
		loadLayout:function()
		{
			var me=this;
			
			me.theme = getDemoTheme();
			
			
			
			
			//load main Tab
			$('#maintab').jqxTabs(
			{ 
				width: "100%", 
				height:"100%",
				theme: me.theme, 
				selectionTracker: true, 
				animationType: 'fade' 
			});
  
			
			$('#createNewBox').jqxButton({ width: 200, height: 25, theme: me.theme });
			$('#createNewContent').jqxButton({ width: 200, height: 25, theme: me.theme });
	
			$('#createNewBox').click(function()
			{
				$.get('/home/form_newheader',function(content)
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
				
			});
			
			
			
			$('#createNewContent').click(function()
			{
				$.get('/home/form_newcontent',function(content)
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
				
			});
			
			me.loadDataSources();
			
			
			
		},
		loadDataSources:function(){
		$('#panel').children().remove();
			var me=this;
			var panels=[];
			$.get("/home/getHeaderContents")
			.done(function(data)
			{
				var headers=data.headers;
				var headerContents=data.headerContents;
				
				for(var i=0;i<headers.length;i++)
				{
					var id=lib.helper.idGenerator('panel');
					$('<b><span style="border-bottom:0px; margin:5px 0px 0px 2px">'+headers[i].label+'</span></b>')
					.appendTo('#panel');
					
					var $panel=$('<div id="'+id+'" />')
					.appendTo('#panel');
					
					//keep track of panels
					panels.push($panel);
					
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
					$panel.on('select', 
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
							
							var $result=$('#result');
									
							var obj=lib.helper.findItemInObjectArray(value,'headerContentID',headerContents);
							$result.html(unescape(obj.content));
							
							//reset selected index for rest of them
							for(var item in panels)
								if(panels[item].attr('id') !==$(this).attr('id'))
									panels[item].jqxDropDownList('selectIndex', -1 ); 							
							
					} });
						
				
				}
				//panel Container
			$("#panelcontainer").jqxPanel({ width: 250, height: 500, theme: me.theme });
				
			});
			
			
		},
		
		loadExtJSAccordion: function (PH) {
            var me = this;

            app.tagReady(PH, function () {
                $.ajax(
                {
                    url: "/home/json_getModuleFeatures",
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
        },
		loadUserOrgSlider: function (PH) {
            var me = this;

            app.tagReady(PH, function () {

                //load DVS and then Slider Inorder

                //load DVS 
                var config =
                    {
                        parentId: PH,
                        url: '/home/json_getSliderData',
                        colCount: 3,
                        cellWidth: "50",
                        cellHeight: "50",
                        bmpSum: "6",
                        path: "",
                        cascadingContainers: ["office", "employees"],
                        width: 170
                    }
                var dvs1 = new dataViewSliderClass(config);
                dvs1.setGrouping(true, null);
                dvs1.setSelctionMode("single");
                dvs1.init();

                //load Slider
                $('#' + dvs1.getId()).slimScroll({
                    position: 'right',
                    height: 320,
                    color: '#2F4F4F', //#800000  #2F4F4F  gray
                    size: '8px',
                    railVisible: false,
                    alwaysVisible: false
                });


            });
        },
    });


    mainPanel=new index2();
	mainPanel.loadLayout();
    


} (jQuery));