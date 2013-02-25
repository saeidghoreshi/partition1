var index2;
(function ($) {

    index2=cls.define(
    {
		loadLayout:function()
		{
			var me=this;
			
			me.theme = getDemoTheme();
			
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
			
			
			
			
			
			return;
			var $panel1=$('#jqxWidget');
			var content=$('<ul />');
			var text='test1';
			$('<li>' + text + '</li>').appendTo(content);
			$('<li>' + text + '</li>').appendTo(content);
			$('<li>' + text + '</li>').appendTo(content);
			$('<li>' + text + '</li>').appendTo(content);
			$('<li>' + text + '</li>').appendTo(content);
			$('<li>' + text + '</li>').appendTo(content);
			$('<li>' + text + '</li>').appendTo(content);
			$('<li>' + text + '</li>').appendTo(content);
			$panel1.jqxExpander({ width: 200,height:200, theme: me.theme,initContent: function (){} });
			$panel1.jqxExpander('setContent', content);
			$panel1.jqxExpander('setHeaderContent', 'test');
			$panel1.jqxExpander('collapse');
			
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


    var p=new index2();
	p.loadLayout();
    


} (jQuery));