var gmapClass;
(function ($) {

    gmapClass = cls.define(
    {
        init: function (config) {
                var me = this;

                me.config.id = helperLib.idGenerator('placeholder');
                $('#' + me.config.parentID).html('<div id=' + me.config.id + '></div>');
                
                $('#' + me.config.id).css(
                    {
                        width: "100%",
                        height: "100%"
                    }
                );

                helperLib.tagReady(me.config.id,function () {me.buildGUI();});
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
                me.maps = new google.maps.Map(document.getElementById(me.config.id), myOptions);
                

                
                me.directionsDisplay.setMap(me.maps);
                

                //add Custom Control
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
                    return;
                    input.map.setCenter(input.point);
                    input.caller.putMarker({ map: input.caller.maps, point: input.point });
                    input.caller.circling({ map: input.caller.maps, point: input.point });

                    var endPoint = new google.maps.LatLng(49.254137, -123.107986);
                    input.caller.calDirection({ caller: input.caller, startPoint: input.point, endPoint: endPoint });



                });
            },
            putMarker: function (input) {
                marker = new google.maps.Marker({
                    map: input.map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: input.point
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

                var Options = {
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                    map: input.map,
                    center: input.point,
                    radius: 100000
                };
                new google.maps.Circle(Options);
            },
            calDirection: function (input) {

                var request = {
                    origin: input.startPoint,
                    destination: input.endPoint,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                input.caller.directionsService.route(request, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        input.caller.directionsDisplay.setDirections(result);
                    }
                });
            },
            geoCoding: function (input) {


                input.caller.geocoder.geocode({ 'address': input.address }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        input.caller.maps.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: input.caller.maps,
                            position: results[0].geometry.location
                        });
                        if (input.callback != null)
                            input.callback();
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });

            }
    });
}(jQuery));