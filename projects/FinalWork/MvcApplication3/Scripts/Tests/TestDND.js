var TestDND;
(function ($$) {
    (function ($) {

        TestDND= Class.create({

            initialize: function () {

                var me=this;
                me.buildUI();
            },

            //on ViewPort3
            buildUI: function () {
                var me = this;

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
                

            }

            
        });
        
      
    } (jQuery));
} (Prototype));


var ins1 = new TestDND();