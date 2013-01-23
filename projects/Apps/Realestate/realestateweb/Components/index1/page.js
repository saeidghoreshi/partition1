(function ($$) {
    (function ($) {

        var mygmap = new gmap({ parentID: "center-area", imageRoot: "/components/index1/img" });

        jQuery('#listings > ul').sortable({ axis: "y" });

        jQuery('#listings ul li').click(function () {
            var data = jQuery(this).attr('data');
            data = jQuery.parseJSON(data);

            $('.listings_selected').removeClass('listings_selected');
            $(this).toggleClass('listings_selected');

            jQuery('#center-area').gmap3({
                map: {
                    options: {
                        mapTypeId: google.maps.MapTypeId.HYBRID,
                        center:
                {
                    latLng: [data.lat, data.lng]
                },
                        zoom: 16
                    }
                },
                marker: {
                    values: [
                       {
                           latLng: [data.lat, data.lng], data: "", options: { icon: "/components/index1/img/gmap_pin_grey.png" }
                       }
                    ]
                }//Markers

            });
        });

    } (jQuery));
} (Prototype));
