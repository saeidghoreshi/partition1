var gmap;

(function ($$) {
    (function ($) {

        gmap=Class.create({
        initialize: function (config) {

                var me = this;
                me.config = config;
                
                me.init();
              
            },
            init: function () {
                var me = this;
      
                            $("#"+me.config.parentID).gmap3(
                                { 
                                    map: {
                                        options: {
                                            mapTypeId: google.maps.MapTypeId.SATELLITE ,
                                            center:
                                            {
                                                latLng:[48.764110, 2.346169], data:"", options:{icon: "http://maps.google.com/mapfiles/marker_green.png"}
                                            },
                                            zoom: 15
                                        }
                                    },
                                    kmllayer: {
                                            options: {
                                                url: "http://gmap3.net/kml/rungis.kml",
                                                preserveViewport: true
                                            },
                                            events: {
                                                click: function (kml, event) {
                                                    alert(event.featureData.description);
                                                }
                                            },
                                            callback: function(map){
                                            
                                              console.log('callback Called');
                                            }
                                    },

                                    marker:{
                                        values: [
                                          //first four for clustring
                                          {
                                                latLng:[49.28952958093682, 6.152559438984804], data:""
                                          },
                                          {
                                                latLng:[44.28952958093682, 6.152559438984804], data:""
                                          },
                                          {
                                                latLng:[49.28952958093682, -1.1501188139848408], data:""
                                          },
                                          {
                                                latLng:[44.28952958093682, -1.1501188139848408], data:""
                                          },
                                          {
                                                address:"66000 Perpignan, France", data:"", options:{icon: "http://maps.google.com/mapfiles/marker_green.png"}
                                          },

                                          {
                                                latLng:[48.764110, 2.346169], data:"", options:{icon: me.config.imageRoot+"/gmap_pin.png"} 
                                          }


                                        ],
                                        cluster:{
                                          radius: 100,
          		                            // This style will be used for clusters with more than 0 markers
          		                            0: {
          		                              content: '<div class="cluster cluster-1">CLUSTER_COUNT</div>',
          			                            width: 53,
          			                            height: 52
          		                            },
          		                            // This style will be used for clusters with more than 20 markers
          		                            20: {
          		                              content: '<div class="cluster cluster-2">CLUSTER_COUNT</div>',
          			                            width: 56,
          			                            height: 55
          		                            },
          		                            // This style will be used for clusters with more than 50 markers
          		                            50: {
          		                              content: '<div class="cluster cluster-3">CLUSTER_COUNT</div>',
          			                            width: 66,
          			                            height: 65
          		                            }
          	                            }
                                     }//Markers

                                });

                            $("#chk").change(function () {
                                var map = $("#"+me.config.parentID).gmap3("get"),
                                kml = $("#"+me.config.parentID).gmap3({ get: "kmllayer" });
                                kml.setMap(jQuery(this).is(':checked') ? map : null);
                            });


                
                
            },
            buildGUI: function () {

                var me = this;

                me.directionsService = new google.maps.DirectionsService();
                me.directionsDisplay = new google.maps.DirectionsRenderer();
                me.geocoder = new google.maps.Geocoder();

                var myOptions = {
                    center: new google.maps.LatLng(49.25593, -123.128242),
                    zoom: 5,
                    mapTypeId: google.maps.MapTypeId.SATELLITE
                };
                me.maps = new google.maps.Map(document.getElementById(me.config.parentID), myOptions);

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
            }
            
           });
            
    } (jQuery));
} (Prototype));



            
            


