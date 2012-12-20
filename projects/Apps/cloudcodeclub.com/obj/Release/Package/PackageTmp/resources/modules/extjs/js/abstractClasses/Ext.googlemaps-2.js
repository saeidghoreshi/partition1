Ext.define('Ext.googlemap',
{
        extend: 'Ext.Panel',
        alias: 'widget.mapgoogle',
 
        map:null, 
        selected_lat:null,
        selected_lng:null,                 
        config:null,
        
        initComponent: function(config) 
        {
            this.callParent(arguments);
        },
       
        constructor : function(config) 
        {                      
            this.config=config;                                                  
            this.callParent(arguments); 
        }, 
        afterRender : function()
        {       
            this.initialize();      
            
            this.callParent(arguments);  
        },
        afterComponentLayout : function(w, h)
        {                                                                 
            if (typeof this.map == 'object') {
                this.map.checkResize();
            }                       
            this.callParent(arguments);             
        },             
        initialize:function()
        {       
            var me=this;
            if (GBrowserIsCompatible()) 
            {     
                this.map = new google.maps.Map(this.body.dom); 
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
                
            }
        } ,
       
        map_click:function(overlay,latlng) //Multipurpose
        {          
            if(latlng !=null)
            {                             
              this.selected_lat=latlng.lat();
              this.selected_lng=latlng.lng();
              
              if(this.map!=null) this.map.clearOverlays();
              this.geolocation_special(latlng.lat(),latlng.lng());
            }                                                           
        },
        geolocation_special:function(lat,lng)
        {      
            var me=this;
            
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
        },                                                
        /*geolocation:function(lat,lng)
        {      
            var me=this;
            var point=new GLatLng(lat,lng);
            
            this.map.geocoder.getLocations(point,function(response)
            {                                           
                if(response.Placemark == undefined){me.map.clearOverlays();return;}
                var addr= response.Placemark[0].address;
                var addr_splitted=addr.split(",");
        
                //me.create_info(point,me.info_tempelate_maker("",addr_splitted[0],"",addr_splitted[1]+', '+addr_splitted[2]+', '+addr_splitted[3]));
                me.CenterPosition(point,15);
            });   
        }, */  
        /*points_list:function(o)      //receives Json Data and create marker for all points[lat,lng]
        {    
             var ds=[];
             ds = YAHOO.lang.JSON.parse(o.responseText);
             
             for (var i = 0, len = ds.length; i < len; i++)                   
                 if(ds[i].venue_latitude!=null && ds[i].venue_longitude!=null )
                    this.map_make_point(ds[i].venue_longitude,ds[i].venue_latitude,ds[i].icon_char,'');
        }, */
        map_make_point:function(lng,lat,_char,tooltip)
        {           
             if(lat=='null'|| lat=='' || lng=='null' || lng=='' )
             {
                 this.initialize();
                 return; 
             }
                                                                    
             var point = new GLatLng(lat,lng);
             var marker= this.create_marker(point,_char);              
             this.map.addOverlay(marker);
             
             var location=google.loader.ClientLocation;
             if(location==null)location={latitude:50.264831,longitude:-119.266605}
             var point=new GLatLng(location.latitude,location.longitude);
             if(tooltip==true) this.find_location(lat+","+lng,17);  
        },
           
        CenterPosition:function(point,zoom){this.map.setCenter(point, zoom);},
        info_tempelate_maker:function()    //[Title , Value] Pair Sequence
        {
            var str="";                                                                                                               
            for(var i=0;i<arguments.length;i+=2) str+="<div>"+arguments[i]+"</div><div>"+arguments[i+1]+"</div>";
            return str;
        },
        create_marker:function (point,icon_char) 
        {                                                 
              var baseIcon = new GIcon(G_DEFAULT_ICON);
              var letteredIcon = new GIcon(baseIcon);
              letteredIcon.image = "http://www.google.com/mapfiles/marker" + icon_char + ".png";
              var marker = new GMarker(point,{icon:letteredIcon});
              return marker;
        },
        create_info:function(point,msg){this.map.openInfoWindowHtml(point,msg);},
        find_location:function(address,zoom) 
        {
            try
            {
                var me=this;                
                this.map.geocoder.getLocations(address,function(response){me.find_location_response(response,me,zoom);} );
            }
            catch(error){}      
        },
        
        find_location_response:function(response,me,zoom)
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
});