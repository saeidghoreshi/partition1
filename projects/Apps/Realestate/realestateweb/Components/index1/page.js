    (function ($) {

    
        var mygmap = new gmap({ parentID: "center-area", imageRoot: "/components/index1/img" });

        $('#listings > ul').sortable({ axis: "y" });

        $('#listings ul li').click(function () {
            var data = jQuery(this).attr('data');
            data = jQuery.parseJSON(data);

            $('.listings_selected').removeClass('listings_selected');
            $(this).toggleClass('listings_selected');

            $('#center-area').gmap3({
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





        var theme = getDemoTheme();

        $('#settings-panel').ready(function () {
            
            var priceSlider = $('#priceSlider');
            priceSlider.jqxSlider({ showButtons: true, theme: theme, height: 30, width: 150, min: 500, max: 4000, step: 350, ticksFrequency: 350, mode: 'fixed', values: [500, 4000], rangeSlider: true });
            var resetFilters = function () {
                priceSlider.jqxSlider('setValue', [priceSlider.jqxSlider('min'), priceSlider.jqxSlider('max')]);
            };
            resetFilters();


            //scrores
            var score_walk = $('#score-walk');
            score_walk.jqxSlider({ showButtons: true, theme: theme, height: 30, width: 150, min: 500, max: 4000, step: 350, ticksFrequency: 350, mode: 'fixed', values: [500, 4000], rangeSlider: true });
            var scoreWalkResetFilters = function () {
                score_walk.jqxSlider('setValue', [score_walk.jqxSlider('min'), score_walk.jqxSlider('max')]);
            };
            scoreWalkResetFilters();

            var transit_walk = $('#transit-walk');
            transit_walk.jqxSlider({ showButtons: true, theme: theme, height: 30, width: 150, min: 500, max: 4000, step: 350, ticksFrequency: 350, mode: 'fixed', values: [500, 4000], rangeSlider: true });
            var transitWalkResetFilters = function () {
                transit_walk.jqxSlider('setValue', [transit_walk.jqxSlider('min'), transit_walk.jqxSlider('max')]);
            };
            transitWalkResetFilters();


            for (var i = 0; i <= 4; i++)
                $("#pt-" + i).jqxCheckBox({ width: 100, height: 25, theme: theme });

            for (var i = 1; i <= 6; i++)
                $("#t-" + i).jqxCheckBox({ width: 100, height: 25, theme: theme });




            //Combo
            var source1 = [
                    "0 Bedroom",
                    "1+ Bedroom",
                    "2+ Bedroom"
		        ];
            $("#beds").jqxDropDownList({ source: source1, selectedIndex: 0, width: '150px', height: '25px', dropDownHeight: '80px', theme: theme });
            var source2 = [
                    "0 Bathrooms ",
                    "1+ Bathrooms",
                    "2+ Bathrooms"
		        ];
            $("#baths").jqxDropDownList({ source: source2, selectedIndex: 0, width: '150px', height: '25px', dropDownHeight: '80px', theme: theme });


        });

    } (jQuery));