<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=7,IE=9" />
    <!--The viewport meta tag is used to improve the presentation and behavior of the samples 
      on iOS devices-->
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no"/>
    <title>Terrain basemap with custom data</title>
    <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.2/js/dojo/dijit/themes/claro/claro.css">
    <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.2/js/esri/css/esri.css" />
    
    <style>
      html, body { height: 100%; width: 100%; margin: 0; padding: 0; }
      #map{padding:0;}
    </style>
    <script type="text/javascript">        var djConfig = { parseOnLoad: true };</script>
    <script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=3.2"></script>
    <script type="text/javascript">
        dojo.require("dijit.layout.BorderContainer");
        dojo.require("dijit.layout.ContentPane");
        dojo.require("esri.map");

        var map;

        function init() {
            var initExtent = new esri.geometry.Extent({ "xmin": -5.54, "ymin": 40.81, "xmax": 44.46, "ymax": 58.35, "spatialReference": { "wkid": 4326} });
            map = new esri.Map("map", {
                extent: esri.geometry.geographicToWebMercator(initExtent)
            });
            //Add the terrain service to the map. View the ArcGIS Online site for services http://arcgisonline/home/search.html?t=content&f=typekeywords:service    
            var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer");
            map.addLayer(basemap);

            //add custom services in the middle. This is typically data like demographic data, soils, geology etc.
            //This layer is typically partly opaque so the base layer is visible. 
            var operationalLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer", { "opacity": 0.5 });
            map.addLayer(operationalLayer);

            //add the reference layer
            var referenceLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer");
            map.addLayer(referenceLayer);


            dojo.connect(map, 'onLoad', function (theMap) {
                //resize the map when the browser resizes
                dojo.connect(dijit.byId('map'), 'resize', map, map.resize);
            });
        }

        dojo.addOnLoad(init);
    </script>
  </head>
  
  <body class="claro">
    <div dojotype="dijit.layout.BorderContainer" design="headline" gutters="false"
    style="width: 100%; height: 100%; margin: 0;">
      <div id="map" dojotype="dijit.layout.ContentPane" region="center" style="overflow:hidden;">
      </div>
    </div>
  </body>

</html>
