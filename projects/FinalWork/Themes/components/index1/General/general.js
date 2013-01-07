﻿(function ($$) {
    (function ($) {

        $('#mainLayout').layout();  
          
       
        //Load jQBreadCumb Module and use it in desired components
        JSCSSLOADER.interfaceReader("../../JSplugins/jQBreadCrumb_11/interface.js",
            function () 
            {
                $("#breadCrumb0").jBreadCrumb({ easing: 'swing' });
            });




            //Handle Bottom Menu
            $('.big-menu-strip').sortable({axis: "x"}).disableSelection();
            $('#new-task').undelegate(this,"click").delegate(this,"click",function()
            {
                this.orgChart = new orgChartVerticalClass({id: 'main-area'});
                this.orgChart.newTask();
                return false;
            });
            $("#view-tasks").undelegate(this,"click").delegate(this,"click",function()
            {
                this.orgChart = new orgChartVerticalClass({id: 'main-area'});
                this.orgChart.viewTasks();
                this.orgChart.buildUserTasksList();
                this.orgChart.handleUserOrgTree();
                
                return false;
            });
            $("#my-tasks").undelegate(this,"click").delegate(this,"click",function()
            {
                this.orgChart.myTasks("main-area");
                return false;
            });

    } (jQuery));
} (Prototype));


﻿