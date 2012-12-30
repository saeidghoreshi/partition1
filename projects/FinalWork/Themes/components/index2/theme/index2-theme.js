(function ($$) {
    (function ($) {

        //Create Office Chart        
        this.orgChart = new orgChartVerticalClass(
            {
                id: 'wf',
                enableDetails: true
            });
        this.orgChart.init();
        this.orgChart.clearTags();


        //Theming
        $('#sortablesY').sortable
					(
						{
						    axis: "y",
						    placeholder: "placeholder"
						}
					).disableSelection();

    } (jQuery));
} (Prototype));