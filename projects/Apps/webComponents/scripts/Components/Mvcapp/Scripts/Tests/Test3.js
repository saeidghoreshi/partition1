
var Test3;
(function ($$) {
    (function ($) {

        Test3= Class.create({

            initialize: function () {

                var me=this;
                me.buildUI();
            },

            //on ViewPort3
            buildUI: function () {
                var me = this;
                

                    value = 0;
                    $('#progress').progressbar({ value: value });

                    var countup = function () {
                        value++;
                        $('#progress').progressbar("option", "value", value);

                        if (value < 100)
                            setTimeout(countup, 10);
                        else
                            $('#progress').progressbar("disable");
                    }
                    countup();

                    //build tabs
                    $('#tabs').tabs();

                    //Build Accordion
                    $('#accordion').accordion(
					{
					    autoHeight: true,
					    collapsible: true,
					    change: function (event, ui) {
					        console.log(event, ui);
					    }

					});
                    $('#accordion').accordion("activate", 2);

                    //autocmplete
                    // var classes=
                    // [
                    // 'C#',
                    // 'VB'
                    // ];
                    $('#search').autocomplete(
					{
					    source: "handler1.ashx",
					    minLength: 2,
					    delay: 1500
					});

                    //UI butons

                    $('#buttons').children().button({ icons: { primary: "ui-icon-search", secondary: "ui-icon-wrench"} });
                    $('#radios', function () {

                        $('#radios').buttonset();
                    })

                    $('#checks').buttonset();

                    $('#effect-btn').button();
                    $('#ease-btn').button();

                    //Effects
                    $('#effect-btn').click(function () {
                        $('#effect-box')
						.effect('bounce')
						.effect('explode', { pieces: 4 }, 1000, function () { });
                    });

                    //Easing  document s in effect section
                    $('#ease-btn').click(function () {
                        $('#ease-box')
						.css({ position: "relative" })
						.animate(
						{
						    left: "+=50"
						}, 1000, "easeOutBounce")
                        //}, 1000, "easeInOutElastic")
						.toggleClass('c1', 'slow')
                        //.addClass (c,'slow')   to do animation also  specially when reverse action matter
                        //hide('explode')
                    });

            }

            
        });
        
      
    } (jQuery));
} (Prototype));


var ins1 = new Test3();