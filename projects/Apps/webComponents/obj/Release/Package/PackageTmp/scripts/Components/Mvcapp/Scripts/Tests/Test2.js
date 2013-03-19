
var Test2;


(function ($) {

    Test2 = cls.define(
    	{ 
              initialize: function () {

                var me=this;
                me.buildGUI2();
            },

            //On Viewport 2
            buildGUI2: function ()   
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


					        //var promise=$.ajax({});
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



                
                lib.helper.tagReady('w1', function () {
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



} (jQuery));

    new Test2().initialize();