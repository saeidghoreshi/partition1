(function ($) {
    Class('baseControllerClass',
{
	isa:abstractBase,
	
    methods:
        {
            
            init: function () {
                var me = this;
				
				me.tagReady(me.getId(), function () 
				{
				
					me.buildGUI();
					
				});
                
            },
            buildGUI: function ()
			{
                var me = this;

                $.ajax(
                {
                    url: "/home/componentViewLoader/",
                    type: "GET",
                    data: { viewname: 'viewport1' }
                }).done(function (data) {

                    $('#' + me.getId()).html(data.result);

					
                });

            },

			
        }
});

})(jQuery);