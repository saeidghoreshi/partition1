var page1;
(function ($) {

    page1=cls.define(
    {
        customMap:null,
        pTypes:[],
        stat:[],

        loadMap:function()
        {
            var me=this;

            me.customMap= new gmapClass({ parentID: "center-area", imageRoot: "/components/index1/img" });
            me.customMap.init();

            //current location test Navigation
            /*
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
            */
           
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
            
            
            $.get('home/test', function(content) {
            
                return;
                lib.helper.jqWidgetWin(
                {
                    header: "Final Result",
                    content: content,
                    theme: theme,
                    modal: true,
                    height: 450,
                    width: 900,
                    collapsible: false
                });  
            });


            $('#settings-panel').ready(function () {

                var resetFilters = function () {
                    priceSlider.jqxSlider('setValue', [priceSlider.jqxSlider('min'), priceSlider.jqxSlider('max')]);
                    $('#priceSliderRange').html(priceSlider.jqxSlider('min')+'-'+priceSlider.jqxSlider('max'));
                };
                
                //proce range Slider
                var priceSlider = $('#priceSlider');
                priceSlider.jqxSlider({ showButtons: true, showTicks: false, rangeSlider: true, theme: theme, height: 30, width: 150, min: 25000, max: 1000000, step: 10000, ticksFrequency: 10000, mode: 'fixed', values: [25000, 10000000], rangeSlider: true });
                resetFilters();
                priceSlider.on('change', function (event) {
                    var value = event.args.value;
                    $('#priceSliderRange').html(value.rangeStart+'-'+value.rangeEnd);
                    me.accumulativeFilter();
                });
                


                //checkboxes
                $("#pt-0").data("data",1);
                $("#pt-0" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#pt-0").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.pTypes);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.pTypes.push(item);
                    }   
                    else
                        me.pTypes.splice(index,1);

                    me.accumulativeFilter();
                });
                $("#pt-1").data("data",2);
                $("#pt-1" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#pt-1").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.pTypes);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.pTypes.push(item);
                    }   
                    else
                        me.pTypes.splice(index,1);

                    me.accumulativeFilter();
                });
                $("#pt-2").data("data",3);
                $("#pt-2" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#pt-2").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.pTypes);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.pTypes.push(item);
                    }   
                    else
                        me.pTypes.splice(index,1);

                    me.accumulativeFilter();
                });
                $("#pt-3").data("data",4);
                $("#pt-3" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#pt-3").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.pTypes);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.pTypes.push(item);
                    }   
                    else
                        me.pTypes.splice(index,1);

                    me.accumulativeFilter();
                });
                $("#pt-4").data("data",5);
                $("#pt-4" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#pt-4").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.pTypes);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.pTypes.push(item);
                    }   
                    else
                        me.pTypes.splice(index,1);

                    me.accumulativeFilter();
                });


                //Show Checkboxes
                
                $("#t-1" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#t-1").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.stat);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.stat.push(item);
                    }   
                    else
                        me.stat.splice(index,1);

                    me.accumulativeFilter();
                });
                $("#t-2").data("data",3);
                $("#t-2" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#t-2").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.stat);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.stat.push(item);
                    }   
                    else
                        me.stat.splice(index,1);

                    me.accumulativeFilter();
                });
                $("#t-3").data("data",4);
                $("#t-3" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#t-3").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.stat);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.stat.push(item);
                    }   
                    else
                        me.stat.splice(index,1);

                    me.accumulativeFilter();
                });
                $("#t-4").data("data",5);
                $("#t-4" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#t-4").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.stat);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.stat.push(item);
                    }   
                    else
                        me.stat.splice(index,1);

                    me.accumulativeFilter();
                });
                $("#t-5").data("data",6);
                $("#t-5" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#t-5").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.stat);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.stat.push(item);
                    }   
                    else
                        me.stat.splice(index,1);

                    me.accumulativeFilter();
                });
                $("#t-6").data("data",7);
                $("#t-6" ).jqxCheckBox({ width: 100, height: 25, theme: theme });
                $("#t-6").on('change', function (event) {
                    var value = event.args.checked;
                    var item=$(this).data('data');
                    var index=lib.helper.findItemInArray(item,me.stat);

                    if(value===true)
                    {   
                        if(index===-1)
                            me.stat.push(item);
                    }   
                    else
                        me.stat.splice(index,1);

                    me.accumulativeFilter();
                });


                
                



                //Combo
                var source1 = [
                            {value:1,label:"1+ Bedroom"},
                            {value:2,label:"2+ Bedrooms"},
                            {value:3,label:"3+ Bedrooms"}
		                ];
                $("#beds").jqxDropDownList({ source: source1, selectedIndex: 0, width: '150px', height: '25px', dropDownHeight: '80px', theme: theme });
                $('#beds').on('change', 
                function (event) {     
                    var args = event.args;
                    if (args) {
                        var index = args.index;
                        var item = args.item;

                       me.accumulativeFilter();

                    } });
          

                var source2 = [
                            {value:1,label:"1+ Bathroom"},
                            {value:2,label:"2+ Bathrooms"},
                            {value:3,label:"3+ Bathrooms"}
		                ];
                $("#baths").jqxDropDownList({ source: source2, selectedIndex: 0, width: '150px', height: '25px', dropDownHeight: '80px', theme: theme });
                $('#baths').on('change', 
                function (event) {     
                    var args = event.args;
                    if (args) {
                        var index = args.index;
                        var item = args.item;

                        me.accumulativeFilter();
                    } });

            });//panel ready
        },
        
        accumulativeFilter:function()
        {
            var me=this;

            me.customMap.clearOverlays();
           
            var bdr  =$("#beds").jqxDropDownList('getSelectedItem').value;
            var bath =$("#baths").jqxDropDownList('getSelectedItem').value;
            var pricerange =$("#priceSlider").jqxSlider('getValue');
            var ptypes=me.pTypes.join(',');
            var showSelection=me.stat.join(',');


            //console.log(ptypes);


             $.ajax(
             {
                 url:"/home/getListingByFilter",
                 type:"GET",
                 data:
                 {   
                     bdr        :bdr,
                     bath       :bath,
                     pricerange :pricerange.rangeStart+','+pricerange.rangeEnd,
                     ptypes:ptypes,
                     showSelection:showSelection
                 }
             }).done(function(data)
             {   
                 for(var i=0;i<data.length;i++)
                 {
                     var item=data[i];
                     
                     var point={
                             lat:item[15],
                             lng:item[16]
                     };
                     me.customMap.putMarker({coords:point});
                     me.customMap.setCenter({coords:point});
                    
                 }//end for
             });//end ajax
        }//Method end

    });


    var p=new page1();
    p.loadScreen();
  

} (jQuery));