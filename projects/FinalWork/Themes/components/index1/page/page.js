var index1Page;
(function ($$) {
    (function ($) {

    index1Page=Class.create(
    {
        initiatilize:function(config)
        {
            var me=this;
            me.config=config;
        },
        initiateLayout:function()
        {
            var me=this;
                $('#mainLayout').layout();  
            
                $("#breadCrumb0").jBreadCrumb({ easing: 'swing' });
            
                //Handle Bottom Menu
                $('.big-menu-strip').sortable({axis: "x"}).disableSelection();

                me.generalHandlers=
                {
                    newTask:function()
                    {   
                    },
                    orgsList:function()
                    {   
                        me.resetPanel();
                        verticalOrgChart.loadOrgs("center-area");
                    },
                    myTasks:function()
                    {
                        
                    },
                    mainPage:function()
                    {   
                       me.resetPanel();
                       var mygmap=new gmap({parentID:"center-area"});
                       $('#tree').tree({
                            onClick: function (node) {
                                  var addr = "Tehran";
                          
                                  $("#center-area").gmap3({
                                    getlatlng:{
                                      address:  addr,
                                      callback: function(results){
                                        if ( !results ) return;
                                        $(this).gmap3({
                                           map: {
                                                options: {
                                                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                                                    center:
                                                    {
                                                        latLng:[49.253689, -123.111471]
                                                    },
                                                    zoom: 12
                                                }
                                            },
                                            marker:{
                                                values: [
                                                  {
                                                        latLng:[49.253689, -123.111471], data:"", options:{icon: "../../Components/index1/page/img/gmap_pin_grey.png"} 
                                                  }


                                                ]
                                             }//Markers

                                  
                                        });
                                      }
                                    }
                                  });
                            }
                        }); 
                    }    
                }
         },//initialize End0
         resetPanel:function()
         {
                var parentID=$("#center-area").parent().attr("id");
                $("#center-area").remove();
                $centerArea=$("<div id='center-area'></div>");
                $centerArea.css({height:"100%",'text-align':'center'});
                $('#'+parentID).append($centerArea);
         }
    });         
        
    } (jQuery));
} (Prototype));

var index1PageIns=new index1Page();
index1PageIns.initiateLayout();
