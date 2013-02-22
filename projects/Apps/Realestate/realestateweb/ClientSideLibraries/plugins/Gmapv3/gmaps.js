var gmapClass;
(function ($) {

    gmapClass = cls.define(
    {
        ID:null,
        maps:null,

        init: function (config) {

                var me = this;
                
                me.ID = lib.helper.idGenerator('map');
                var $el=$('<div id=' + me.ID + '></div>');
                
                $('#' + me.config.parentID).html($el);
                
                $el.css(
                    {
                        width: "100%",
                        height: "100%"
                    }
                );

                lib.helper.tagReady(me.ID,function () {me.buildGUI();});
            },
            
            buildGUI: function () {

                var me = this;

                me.directionsService = new google.maps.DirectionsService();
                me.directionsDisplay = new google.maps.DirectionsRenderer();
                me.geocoder = new google.maps.Geocoder();

                var myOptions = {
                    center: new google.maps.LatLng(49.25593, -123.128242),
                    zoom: 5,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                me.maps = new google.maps.Map(document.getElementById(me.ID), myOptions);
                

                me.directionsDisplay.setMap(me.maps);
                
                //addCustomControl();
                
            },
            setZoom:function(input)
            {
                var me=this;

                me.maps.setZoom(input);
            },
            setCenter:function(input)
            {
                var me=this;

                var Latlng = new google.maps.LatLng(input.coords.lat,input.coords.lng);
                me.maps.setCenter(Latlng);
            },
            putMarker: function (input) {
                /* input >>> coords */
                var me=this;

                var Latlng = new google.maps.LatLng(input.coords.lat,input.coords.lng);

                var marker = new google.maps.Marker({
                    map: me.maps,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: Latlng
                });

                google.maps.event.addListener(marker, 'click', function () {
                    if (marker.getAnimation() != null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                });

            },
            circling: function (input) {

                /* input >> coords */
                var me=this;

                var Latlng = new google.maps.LatLng(input.coords.lat,input.coords.lng);

                var Options = {
                    strokeColor: "gray",
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: "#f2f2f2",
                    fillOpacity: 0.5,
                    map: me.maps,
                    center: Latlng,
                    radius: 10000
                };
                new google.maps.Circle(Options);
            },
            calculateDirection: function (input) {

                /* input >> startPoint / endPoint / callback */
                var me=this;

                var SLatlng = new google.maps.LatLng(input.startPoint.coords.lat,input.startPoint.coords.lng);
                var TLatlng = new google.maps.LatLng(input.endPoint.coords.lat,input.endPoint.coords.lng);

                var request = {
                    origin: SLatlng,
                    destination: TLatlng,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                me.directionsService.route(request, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        me.directionsDisplay.setDirections(result);
                        if(input.callback !==undefined)
                            input.callback();
                    }
                });
            },
            geoCoding: function (input) {

                /* input >>> address / callback */
                var me=this;
                me.geocoder.geocode({ 'address': input.address }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        me.maps.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: me.maps,
                            position: results[0].geometry.location
                        });
                        if (input.callback != null)
                            input.callback();
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
            },



            addCustomControl:function()
            {
                var me=this;

                me.points = {}
                me.points.vernon = new google.maps.LatLng(50.268716, -119.277191);
                var homeControlDiv = document.createElement('div');
                var homeControl = new me.HomeControl(homeControlDiv, { caller: me, map: me.maps, point: me.points.vernon });
                homeControlDiv.index = 1;
                me.maps.controls[google.maps.ControlPosition.LEFT_CENTER].push(homeControlDiv);
            },
            HomeControl: function (controlDiv, input) {

                var me = this;
                
                var controlUI = document.createElement('div');
                controlUI.style.backgroundColor = 'white';
                controlUI.style.borderStyle = 'solid';
                controlUI.style.borderWidth = '2px';
                controlUI.style.cursor = 'pointer';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Click to set the map to Home';
                controlDiv.appendChild(controlUI);

                // Set CSS for the control interior.
                var controlText = document.createElement('div');
                controlText.style.fontFamily = 'Arial,sans-serif';
                controlText.style.fontSize = '10px';
                controlText.style.paddingLeft = '4px';
                controlText.style.paddingRight = '4px';
                controlText.innerHTML = 'Go Home';
                controlUI.appendChild(controlText);

                $(controlUI).button();

                google.maps.event.addDomListener(controlUI, 'click', function () {

                    input.caller.geoCoding({ address: "tehran", caller: input.caller, callback: null });
                    
                    input.map.setCenter(input.point);
                    input.caller.putMarker({ map: input.caller.maps, point: input.point });
                    input.caller.circling({ map: input.caller.maps, point: input.point });

                    var endPoint = new google.maps.LatLng(49.254137, -123.107986);
                    input.caller.calDirection({ caller: input.caller, startPoint: input.point, endPoint: endPoint });



                });
            }
    });//Class Definition


}(jQuery));