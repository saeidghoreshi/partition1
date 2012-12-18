
var test2
(function ($$) {
    (function ($) {

        test2= Class.create({

            initialize: function () {

                var me=this;
                me.buildGUI2();
            },

            //On Viewport1
            buildGUI: function () {
                
                var me = this;
    
                    console.time('timer1');
                    console.log('divs values average: '+$('#numberdata').find('div').average());
                    console.timeEnd('timer1');

                    console.log('-------------data Test on elements--------------');
                    $('#testdiv').on('setData', function (e, key, value) { console.log('data set event '+key+" >> "+ value) });
                    $('#testdiv').on('changeData', function (e, key, value) { console.log('data change event '+key+" >> "+  value) });
                    $('#testdiv').on('getData', function (e, key) { console.log('data get event  '+key) });
                    
                    //set/change Data
                    $('#testdiv').data('var1', 1);

                    //get Data
                    console.log('GET DATA #1 >> '+$('#testdiv').data('var1'));

                    //Remove Data
                    $('#testdiv').removeData('var1');

                    //Get REMOVED Data WHICH IS REMOVED
                    console.log('GET DATA #2 >> '+$('#testdiv').data('var1'));
                    console.log('-------------data Test on elements End--------------');


                    //----------------------------------------------------------------------------------------------------------------------
                    //Note : for built-in events just use delegate[doesnt bubble up and acts like live]
                    //but for defining custome events use below
                    //--------------custom Events
                    console.log('--------------Custom Events-------------');
                    $('#customEvent').die('green').live('green', function () { console.log('gone green'); })
                    $('#customEvent').live('green', function () { console.log('another gone green'); })
                    $('#customEvent').trigger('green');
                    console.log('--------------Custom Events End-------------');

 
                    $('body').undelegate(".section","click").delegate('.section',"click",function (e) {

                        //$(this).find('div[prop = "content"]').slideToggle(1000);
                        //OR
                        
                        $(this).find('div').each(function (index) {

                            if ($(this).hasClass('section-content')) {
                            
                                $(this).slideToggle();
                                //$(this).toggle('slow');
                                //$(this).effect("bounce", { times:3 }, 300);
                                //$(this).effect("explode", { times:3 }, 300);

                                //blinking
                                //$(this).effect("pulsate", { times:3 }, 2000);

                            }

                        });
                        e.stopPropagation();
                        return false;

                    });//.section click


                    //multiple Event Binding
                     $('body').undelegate(".section-header","mouseover mouseleave").delegate('.section-header',"mouseover mouseleave",function (e) {
                     
                        if(e.type==="mouseover")
                            console.log("over");
                        if(e.type==="mouseleave")
                            console.log("leave");
                        
                        e.stopPropagation();
                        return false;

                    });//.section-header mouseup mouseleave
                    
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
						.toggleClass('c1', 'slow')
                        //.class (slow)   to do animation also  specially when reverse action matter
                    });

                    //DND
                    //$('#draggables').children().draggable();
                    $('#d1').draggable
					(
						{
						    revert: "invalid",
						    helper: function () { return $('<div>Move</div>'); }
						}
					);
                    $('#d2').draggable
					(
						{
						    revert: "invalid",
						    helper: "clone"
						}
					);
                    $('#d3').draggable();

                    $('#d1,#d2,#d3').draggable("option", "stack", ".ui-draggable");
                    $('#d1,#d2,#d3').draggable("option", "handle", ".header");

                    //make droppable
                    $('#trash').droppable
					(
						{
						    accept: "#d2 , #sortables div",
						    activeClass: "opaque",
						    drop: function (event, ui) {
						        ui.draggable.fadeOut(2000, function () {
						            $(this).remove();
						        });
						    }
						}
					);
                    //Sortable
                    $('#sortables').sortable
					(
						{
						    //axis:"y",
						    placeholder: "placeholder"
						}
					);
                

            },

            //On Viewport 2
            buildGUI2: function ()   //UI
            {
                var me = this;

               
                    var bullet =
					{
					    shoot: function ()   ////////WAIT Function
					    {
					        bullet.shot = $.Deferred();

					        $b = $('#bullet');
					        $b.css({ left: "100px" }).show();
					        $b.animate({ left: "300px" }, 2000, bullet.shootFinished);


					        return bullet.shot.promise();


					        // var promise=$.ajax(
					        // {
					        // url:'/home/test'
					        // });
					        //return promise;
					    },
					    shootFinished: function () {
					        $('#bullet').hide();
					        //bullet.shot.resolve('red');
					        setTimeout(function () { bullet.shot.reject(); }, 5000);
					        //promise objects events INTELLIgently wait till be rejected or be resolve at any point

					    }


					}
                    var redGuy =
					{
					    shootBlue: function () {
					        return bullet.shoot();
					    }

					}
                    var blueGuy =
					{
					    die: function () {
					        $('#blueGuy').fadeOut(2000);
					    },
					    shotFired: function (shot) {

					        shot.always(blueGuy.die);


					        //scenario 2
					        if (shot.reject)
					            shot.reject();

					    }
					}

                    $('#redGuy').die("click").live({ click: function () {
                        startCombat();
                    }
                    });
                    startCombat = function () {
                        var shot = redGuy.shootBlue();
                        blueGuy.shotFired(shot);

                        shot.always(function () { console.log('Battle is completed'); });
                        shot.done(function (e) { console.log('Battle is resolved : ' + e); });
                        shot.fail(function () { console.log('Battle is rejected'); });
                    },

					$('#whowon').click(function () { bullet.shot.done(function (e) { console.log(e); }); });



                //WHEN
                //pat1
                me.tagReady('w1', function () {
                    //var promise1=$('#w1').fadeIn(2000).promise();
                    //var promise2=$('#w2').fadeIn(3000).promise();
                    //var when=$.when(promise1,promise2).done(function(){console.log('both loaded');});
                });
                //pat2
                me.tagReady('w1', function () {
                    var promise1 = $('#w1').fadeIn(2000).promise();
                    var promise2 = $('#w2').fadeIn(3000).promise();
                    var def = $.Deferred();
                    var when = $.when(promise1, promise2, def).then(
						function () { console.log('Resolved'); },
						function () { console.log('Rejected'); }
					);

                    setTimeout(function () { def.resolve() }, 2000);
                });
            }
            
        });


        $.fn.average = function () {
            var sum = 0;
            var x = { f1: 1, f3: 2 }
            var y = { f1: 3, f3: 4 }
            $(this).each(function () {
                sum += parseFloat($(this).html());

                $(this).data('data1', x);
                $(this).data('data2', y);

                console.log($(this).data());
                console.log($(this).get(0));
            });
            return sum;
        }
      
    } (jQuery));
} (Prototype));


var ins1=new test2();