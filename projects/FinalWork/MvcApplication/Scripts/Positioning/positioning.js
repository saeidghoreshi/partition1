var positioning;
(function ($$) {
    (function ($) {

        positioning= Class.create({

            initialize: function () {

                var me=this;
                me.buildUI();
            },

            //on ViewPort3
            buildUI: function () {
                var me = this;

                var list=[];

                list.push($('<div class="button">Click me1</div>'));
                $(list[0]).text("Saeid Button");

                var parent=$('#mainContainer');
                //must be positioned relative, then can use children to be relative

                for(var x=0;x<list.length;x++)
                    $(list[x]).css(
                    {
                        display:"none",
                        position:"absolute",
                        left:30,
                        top:30
                    });

                $('#mainContainer').append(list);

                $('.button').button()
                .undelegate(this,"click").delegate(this,"click",function (e) 
                {
                    alert('clicked');
                    //$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
                    e.stopPropagation();
                });

                $('#mainContainer').undelegate(this,"mouseenter mouseleave").delegate(this,"mouseenter mouseleave",function (e) 
                {
                     $('.button').toggle(500);
                     e.stopPropagation();
                });

            }

            
        });
        
      
    } (jQuery));
} (Prototype));


var ins1 = new positioning();