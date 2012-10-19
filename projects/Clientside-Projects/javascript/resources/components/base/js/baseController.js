(function ($) {
    Class('baseControllerClass',
{
    isa: abstractBase,

    methods:
        {

            init: function () {
                var me = this;
                
                me.tagReady(me.getId(), function () {
                    
                    //me.buildGUI2();
                    me.buildGUI();

                    //var b =new subClass({parentId:'tetst'});
                    //b.run();

                });

            },
            buildGUI: function () {
                
                var me = this;

                $.ajax(
                {
                    url: "/home/componentViewLoader/",
                    type: "GET",
                    data: { viewname: 'viewport1' }
                }).done(function (data) {

                    $('#' + me.getId()).html(data.result);


                    console.time('timer1');
                    console.log($('#pluginTest').find('div').average());
                    console.timeEnd('timer1');


                    $('#testdiv').on('setData', function (e, key, value) { console.log('data set', key, value) });
                    $('#testdiv').on('changeData', function (e, key, value) { console.log('data change', key, value) });
                    $('#testdiv').on('getData', function (e, key) { console.log('data get', key) });

                    $('#testdiv').data('x', 1);
                    console.log($('#testdiv').data('x'));
                    $('#testdiv').removeData('x');
                    console.log($('#testdiv').data('x'));
                    var data = $('#testdiv').data('x');

                    //--------------custom Events
                    $('#testdiv').die('green').live('green', function () { console.log('gone green'); })
                    $('#testdiv').live('green', function () { console.log('another gone green'); })
                    $('#testdiv').trigger('green');

                    //ajax Hirarchy
                    $.ajax(
					{
					    url: '/home/sss',
					    success: function (e) { console.log('success'); },
					    error: function (e) { console.log('error'); },
					    complete: function (e) { console.log('complete'); }
					});



                    //bootstrap
                    $('#btn').tooltip({ title: '<div style="text-align:left;">this is a test message<br/>tes it is</div>' })
                    //$('#btn').button();

                    //jQuerxy effects : hide,show, toggle/ slideUp,slidedown,sldeToggle / fadeI,faeOut,fadeTo
                    $('.section').die("click").live({ click: function () {





                        /*
                        $(':input')
                        $(':input[type="radio"]')
                        $(div:contains('plural'))
                        $('r:first-child')
                        $('div:[title^="xxx"]')
                        $('div:[title*="xxx"]')
                        $('div:[title$="xxx"]')//case sensitive
                        $('tr:odd')
                        $('').wrap('<div></div>')
                        prepend/append/appendto
                        .toggleClass


                        //Utitlities
                        $.isEmptyObject
                        $.isXmlDoc
                        $isNumeric
                        $.isWindow   is frame or win
                        $.type > bool, number,  function,array , date,regx,object, undefined, null
                        $.inArray()
                        $.unique
                        $.merge(arra,arr)
                        ----
                        js array > stringify > parseJSON
                        ------
                        .end() return handler  to main object

                        fadeOut(speed,callback)



                        $('input:radio[name=g1]:checked')
                       
                        */

                        //$(this).find('div[prop = "content"]').slideToggle(1000);
                        //OR
                        $(this).find('div').each(function (index) {

                            if ($(this).hasClass('section-content')) {

                                $(this).slideToggle('slow');
                                //$(this).toggle('slow');
                                //bounce,explode,puldate

                            }

                        })

                        //event type detection
                        /*
                        $('#item').bind("mouseup mouseleave"
                        ,function(e)
                        {
                        if(e.type=="mouseup")
                        });
                        */
                        //Live[works for new objects added and aloso bubble up] 
                        //and delegate aks the same except the fact that we can put a filter
                        /*use delegates > $('#divs').delegate('filter attr','click',function);
                        
                        */

                        //selector
                        /*
                        $('div:eq(index)') index-th div child
                        $('whatever',item) > means whatever relative to item
                        */
                        //Note : e.stopPropagation  > means prevent bubblng up in live events
                        //use in delegate

                        //Note: when using $  means by reference if want by value ten use clone()

                        //Note: $(filter,item) > filter items relative to item

                        //Note 
                        /*
                        item.hover(
                        function(){},
                        function(){}
                        );
                        */

                        //Note : item.toggle
                        /*(
                        function(){},
                        function(){},
                        function(){}

                        );
                        acts like multiple click toggle
                        */
                    }
                    });
                });

            },



            buildGUI2: function ()   //UI
            {
                var me = this;

                $.ajax(
                {
                    url: "/home/componentViewLoader/",
                    type: "GET",
                    data: { viewname: 'viewport2' }
                }).done(function (data) {

                    $('#' + me.getId()).html(data.result);

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


                });

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
            },
            buildUI: function () {
                var me = this;

                $.ajax(
                {
                    url: "/home/componentViewLoader/",
                    type: "GET",
                    data: { viewname: 'viewport3' }
                }).done(function (data) {
                    $('#' + me.getId()).html(data.result);

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
						.effect('explode', { pieces: 4 }, 2000, function () { });
                        //find list of possible effects in JS file
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
                });



            }
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

})(jQuery);