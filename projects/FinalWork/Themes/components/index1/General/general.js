(function ($$) {
    (function ($) {

        $('#mainLayout').layout();  
        
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
        
       


        //Load jQBreadCumb Module and use it in desired components
        JSCSSLOADER.interfaceReader("../../JSplugins/jQBreadCrumb_11/interface.js",
            function () 
            {
                $("#breadCrumb0").jBreadCrumb({ easing: 'swing' });
            });


    } (jQuery));
} (Prototype));


﻿