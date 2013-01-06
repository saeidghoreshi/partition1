(function ($$) {
    (function ($) {

        $('#mainLayout').layout();  
        theme();
        //Create Office Chart        
        this.orgChart = new orgChartVerticalClass(
            {
                id: 'wf',
                enableDetails: true
            });
        this.orgChart.init();
        this.orgChart.buildUserTasksList();
        this.orgChart.handleUserOrgTree();
        

        $('#test').click(function()
        {
            delete $('#wf').children();
            $('#wf').children().remove();
            
            this.TskCreateAssignment=new TskCreateAssignmentClass(
            {
                containerID:"wf"
            });
        });
        
       

        function theme() {

            $('.Hsection').undelegate(this, "click").delegate(this, "click", function (e) {
                var me = this;

                var hideAll = $('.Hsection-content').fadeOut();
                $.when(hideAll)
            .done(function () {

                $(me).find('div').each(function (index) {

                    if ($(this).hasClass('Hsection-content')) {
                        if ($(this).is(":visible"))
                            $(this).fadeOut(function () { });
                        else
                            $(this).fadeIn(function () { });
                    }

                });
            });

                e.stopPropagation();
                return false;

            }); //.section click
            $(".Hsection-header:not(:eq(0))").next().hide();

            var i = 0;
        };

      


        //Load jQBreadCumb Module and use it in desired components
        JSCSSLOADER.interfaceReader("../../JSplugins/jQBreadCrumb_11/interface.js",
            function () 
            {
                $("#breadCrumb0").jBreadCrumb({ easing: 'swing' });
            });



       


        
		var btnUpload=$('#upload');
		var status=$('#status');
		new AjaxUpload(btnUpload, {
			action: '/home/upload',
			name: 'uploadfile',
			onSubmit: function(file, ext){
				 if (! (ext && /^(jpg|png|jpeg|gif|doc|zip|exe|msi)$/.test(ext))){ 
                    // extension is not allowed 
					status.text('Only JPG, PNG or GIF files are allowed');
					return false;
				}
				status.text('Uploading...');
			},
			onComplete: function(file, response){
				
				status.text('');
				//Add uploaded file to list
				if(response==="success"){
					$('<li></li>').appendTo('#files').html('<img src="./uploads/'+file+'" alt="" /><br />'+file).addClass('success');
				} else{
					$('<li></li>').appendTo('#files').text(file).addClass('error');
				}
			}
		
		
	});

    } (jQuery));
} (Prototype));


﻿