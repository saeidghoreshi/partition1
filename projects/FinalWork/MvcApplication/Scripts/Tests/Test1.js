
var Test1;
(function ($$) {
    (function ($) {

        Test1= Class.create({

            initialize: function () {

                var me=this;
                me.buildGUI();
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

 
                    //Hide all the tabs except Header 3
                    //$(".section-header:not(:contains('Header 3'))").next().hide();
                    $(".section-header:not(:eq(0))").next().hide();
                    //Using Find an chaining 
                    $(".section-content").find('p:eq(1)').empty().html('saeid 1 ');
                    $(".section-content")
                        .find('p:eq(0) > a')
                        .empty()
                        .html('Link1')
                        .attr('href',"http://ww.google.com")
                        .data('key',{id:1,parent:2});

                    //Filter
                    var item=$(".section-content")
                        .find('p > a')
                        .filter(function()
                        {
                            return ($(this).data('key').id===1)
                        });
                        console.log("----------using Filter-------");
                        console.log(item.html());
                        console.log("----------using Filter END-------");

                        

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


var ins1=new Test1();