(function ($$) {
    (function ($) {

        //Create Office Chart        
        this.orgChart = new orgChartVerticalClass(
            {
                id: 'wf',
                enableDetails: true
            });
        this.orgChart.init();
        //this.orgChart.clearTags();
        //this.orgChart.pushTaskSequenceLayer(1);
        this.orgChart.buildUserTasksList();
        
        

    } (jQuery));
} (Prototype));