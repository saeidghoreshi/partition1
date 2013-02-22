var page1;
(function ($) {

    page1=cls.define(
    {
        customMap:null,
        loadMap:function()
        {
            var me=this;

            me.customMap= new gmapClass({ parentID: "center-area", imageRoot: "/components/index1/img" });
            me.customMap.init();

            //current location test Navigation
            if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                function (position) {
    
                    var point={
                            lat:position.coords.latitude,
                            lng:position.coords.longitude
                        };

                    me.customMap.putMarker({coords:point});
                    me.customMap.setCenter({coords:point});

                    me.customMap.calculateDirection(
                    {
                        startPoint :{coords:point},
                        endPoint :{coords:{lat:49.230378,lng:-122.960701}},
                        callback:function()
                        {
                            setTimeout(function()
                            {
                                me.customMap.circling({coords:point});
                                me.customMap.setZoom (11);
                            },1000);
                        }
                    });


                    me.customMap.circling({coords:point});
                    me.customMap.setZoom (1);
            })
            else { console.log("Geolocation is not supported by this browser."); }

           
        },
        loadScreen:function()
        {
            var me=this;

            //load main customMap
            me.loadMap();



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


            //other components
            var theme = getDemoTheme();

            /*
            lib.helper.jqWidgetWin(
            {
                header: "H",
                content: "C",
                theme: theme,
                modal: true,
                height: 100,
                width: 400,
                collapsible: false
            });
            */

            

            $('#settings-panel').ready(function () {

                var priceSlider = $('#priceSlider');
                priceSlider.jqxSlider({ showButtons: true, showTicks: false, rangeSlider: true, theme: theme, height: 30, width: 150, min: 500, max: 4000, step: 350, ticksFrequency: 350, mode: 'fixed', values: [500, 4000], rangeSlider: true });
                var resetFilters = function () {
                    priceSlider.jqxSlider('setValue', [priceSlider.jqxSlider('min'), priceSlider.jqxSlider('max')]);
                };
                resetFilters();
                priceSlider.change();


                //scrores
                var score_walk = $('#score-walk');
                score_walk.jqxSlider({ showButtons: true, showTicks: false, theme: theme, height: 30, width: 150, min: 500, max: 4000, step: 350, ticksFrequency: 350, mode: 'fixed', values: [500, 4000], rangeSlider: true });
                var scoreWalkResetFilters = function () {
                    score_walk.jqxSlider('setValue', [score_walk.jqxSlider('min'), score_walk.jqxSlider('max')]);
                };
                scoreWalkResetFilters();

                var transit_walk = $('#transit-walk');
                transit_walk.jqxSlider({ showButtons: true, showTicks: false, theme: theme, height: 30, width: 150, min: 500, max: 4000, step: 350, ticksFrequency: 350, mode: 'fixed', values: [500, 4000], rangeSlider: true });
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
                            {value:1,label:"0 Bedroom"},
                            {value:2,label:"1+ Bedrooms"},
                            {value:3,label:"2+ Bedrooms"}
		                ];
                $("#beds").jqxDropDownList({ source: source1, selectedIndex: 0, width: '150px', height: '25px', dropDownHeight: '80px', theme: theme });
                $('#beds').on('change', 
                function (event) {     
                    var args = event.args;
                    if (args) {
                        var index = args.index;
                        var item = args.item;

                        $.ajax(
                        {
                            url:"/home/getListingByFilter",
                            type:"GET",
                            data:
                            {   
                                "filter":"bdr",
                                "value":item.value
                            }
                        });
                        

                    } });
          

                var source2 = [
                            {value:1,label:"0 Bathroom"},
                            {value:2,label:"1+ Bathrooms"},
                            {value:3,label:"2+ Bathrooms"}
		                ];
                $("#baths").jqxDropDownList({ source: source2, selectedIndex: 0, width: '150px', height: '25px', dropDownHeight: '80px', theme: theme });


            });
        }

    });


    var p=new page1();
    p.loadScreen();
  

} (jQuery));