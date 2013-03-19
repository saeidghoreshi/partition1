var gmapClass;
(function ($) {

    gmapClass = cls.define(
    {
        ID:null,
        maps:null,
        markersArray:[],
		drawingManager:null,

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

            clearOverlays:function() 
            {
                var me=this;

                if (me.markersArray) 
                    for (i in me.markersArray) 
                        me.markersArray[i].setMap(null);
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
                
				
				//Drawing Feature
				me.drawingManager = new google.maps.drawing.DrawingManager({
					drawingMode: google.maps.drawing.OverlayType.CIRCLE,
					drawingControl: true,
					drawingControlOptions: {
						position: google.maps.ControlPosition.TOP_CENTER,
						drawingModes: [google.maps.drawing.OverlayType.CIRCLE]
					},
					circleOptions: {
						editable: false,
						strokeColor: "#1faeff",
						strokeOpacity: 0.8,
						strokeWeight: 1,
						fillColor: "#f2f2f2",
						fillOpacity: 0.5,
					}
				});
				me.drawingManager.setMap(me.maps);
				me.circling();
				//Drawing Feature End ----

                me.directionsDisplay.setMap(me.maps);
                
                me.addCustomControl();
                
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

                me.markersArray.push(marker);

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
				/*
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
				*/
				////
					
					var circles = [];
					
					google.maps.event.addDomListener(me.drawingManager, 'circlecomplete', function (circle) {
						if(circles.length==1)
						{
							for (var i in circles) 
								circles[i].setMap(null);
							circles=[];
						}	
						circles.push(circle);
						
						//for (var i = 0; i < circles.length; i++) {
						
							var circleCenter = circle.getCenter();
							var circleRadius = circle.getRadius();
							var lat=circleCenter.lat().toFixed(3);
							var lng=circleCenter.lng().toFixed(3);
							
							console.log("circle(("+  lat+ "," + lng+"), "+ circleRadius + ")");
						//}
						
						var bounds = circle.getBounds();
						if (bounds != null) {
							var groupList = []; 
							var center = circle.getCenter(); 
							var r = circle.getRadius(); 
							
							var pos =new google.maps.LatLng(49.244276, -123.117943);
							if (bounds.contains(pos) &&google.maps.geometry.spherical.computeDistanceBetween(pos, center) <= r)
								 console.log("YES");
							else
								console.log("NO");
						}
						
						
					});//Event End
				
				////
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
				
				var simplePanelDiv = document.createElement('div');
                var simplePanelControl = new me.simplePanel(simplePanelDiv);
                simplePanelDiv.index = 1;
                me.maps.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(simplePanelDiv);
            },
			simplePanel:function(controlDiv)
			{
				var me = this;
                
                var controlUI = document.createElement('div');
                controlUI.style.backgroundColor = '#f2f2f2';
				controlUI.style.borderColor = '#1faeff';
				controlUI.style.opacity = '0.4';
                controlUI.style.borderStyle = 'solid';
                controlUI.style.borderWidth = '1px';
                controlUI.style.cursor = 'pointer';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Click to set the map to Home';
				controlUI.style.width = '900px';
				controlUI.style.height = '80px';
                controlDiv.appendChild(controlUI);

                // Set CSS for the control interior.
                var controlText = document.createElement('div');
                controlText.style.fontFamily = 'Arial,sans-serif';
                controlText.style.fontSize = '10px';
                controlText.style.paddingLeft = '4px';
                controlText.style.paddingRight = '4px';
                controlText.innerHTML = 'sample Content';
                controlUI.appendChild(controlText);

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
                    

                    var endPoint = new google.maps.LatLng(49.254137, -123.107986);
                    input.caller.calDirection({ caller: input.caller, startPoint: input.point, endPoint: endPoint });



                });
            },
            extraFunctionality:function()
            {
                this.map.geocoder = new GClientGeocoder();     
                this.map.removeControl(new GScaleControl());
                this.map.addControl(new GOverviewMapControl());
                this.map.addControl(new GLargeMapControl3D());
                //this.map.addControl(new GSmallZoomControl3D());small pce of zoom  ctrl 2 ply
                
                
                //google search bar
                this.map.enableGoogleBar();
                //Hybrid view with labels ON
                this.map.addMapType(G_HYBRID_MAP);
                var mapControl = new GHierarchicalMapTypeControl();
                mapControl.clearRelationships();
                mapControl.addRelationship(G_HYBRID_MAP, "Labels", true);
                this.map.addControl(mapControl);
                this.map.setMapType(G_HYBRID_MAP);
                //this.map.setUIToDefault();
                var point=new GLatLng(this.config.latitude,this.config.longitude);
                this.map_make_point(point.x,point.y,this.config.icon_char,true);
                this.CenterPosition(point, 17);          
                if(this.config.enable_click==true) GEvent.addListener(this.map, "dblclick",function(overlay,latlng){me.map_click(overlay,latlng)});
                
                //Part 2

                var point=new GLatLng(lat,lng);
                this.map.geocoder.getLocations(point,function(response)
                {   
                    try
                        {                                        
                            if(response.Placemark == undefined){me.map.clearOverlays();return;}
                            var addr= response.Placemark[0].address;
                            var addr_splitted=addr.split(",");
                
                            //me.create_info(point,me.info_tempelate_maker("",addr_splitted[0],"",addr_splitted[1]+', '+addr_splitted[2]+', '+addr_splitted[3]));
                            marker = new GMarker(point);
                            me.map.addOverlay(marker);  
                            me.CenterPosition(point,17);
                    
                            //Totally customized usage                  
                    
                            var street='',city='',region='',country='',postalcode='';
                            var Address=response.Placemark[0].AddressDetails.Country;
                         
                            street      =Address.AdministrativeArea.Locality.Thoroughfare.ThoroughfareName ;
                            city        =Address.AdministrativeArea.Locality.LocalityName;
                            postalcode  =Address.AdministrativeArea.Locality.PostalCode.PostalCodeNumber;     
                            region      =Address.AdministrativeArea.AdministrativeAreaName;
                            country     =Address.CountryNameCode;
                        
                            me.selected_lat=response.Placemark[0].Point.coordinates[1];
                            me.selected_lng=response.Placemark[0].Point.coordinates[0];                   
                    }
                    catch(error){/*alert(error);*/}
                });   

                //Part 3
                create_marker=function (point,icon_char) 
                {                                                 
                      var baseIcon = new GIcon(G_DEFAULT_ICON);
                      var letteredIcon = new GIcon(baseIcon);
                      letteredIcon.image = "http://www.google.com/mapfiles/marker" + icon_char + ".png";
                      var marker = new GMarker(point,{icon:letteredIcon});
                      return marker;
                },
                create_info=function(point,msg){this.map.openInfoWindowHtml(point,msg);},
                find_location=function(address,zoom) 
                {
                    try
                    {
                        var me=this;                
                        this.map.geocoder.getLocations(address,function(response){me.find_location_response(response,me,zoom);} );
                    }
                    catch(error){}      
                },
        
                find_location_response=function(response,me,zoom)
                {                                                          
                   me.map.clearOverlays();
                   if (!response || response.Status.code != 200) alert("Sorry, we were unable to geocode that address");
                   else 
                   {
                     place = response.Placemark[0];
                     point = new GLatLng(place.Point.coordinates[1],place.Point.coordinates[0]);
                     marker = new GMarker(point);
                     me.map.addOverlay(marker);  
                     me.CenterPosition(point,zoom);
                     //me.create_info(point,place.address + '<br>' +'<b>Country code:</b> ' + place.AddressDetails.Country.CountryNameCode);
                     me.selected_lat=place.Point.coordinates[1];
                     me.selected_lng=place.Point.coordinates[0];
                   }
                }               

            }
    });//Class Definition


}(jQuery));