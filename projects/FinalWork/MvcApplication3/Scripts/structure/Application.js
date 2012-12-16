var Application;

(function ($$) {
    (function ($) {

        Application = Class.create({
            initialize: function () {
                //Load google Visualization
				google.load('visualization', '1', { packages: ['orgchart'] });
            }
            
            });

    } (jQuery));
} (Prototype));