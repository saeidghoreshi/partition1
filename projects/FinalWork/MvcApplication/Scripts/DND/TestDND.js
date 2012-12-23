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

                    //Draggables
                    $('#draggables').children().draggable
                    (
                        {   
                            scroll: true ,
                            scrollSensitivity: 100,
                            scrollSpeed: 100
                        }
                    ).disableSelection();


                    //Sortable
                    $('#sortablesY').sortable
					(
						{
						    axis:"y",
                            placeholder: "placeholder"
						}
					).disableSelection();
                    $('#sortablesX').sortable
					(
						{
						    axis:"x",
                            placeholder: "placeholder SIDEBYSIDE"
						}
					).disableSelection();
                    
                     $( "#sortableGrid" ).sortable
                    (
                        {
                            placeholder: "placeholder SIDEBYSIDE"
                        }
                    ).disableSelection();







       
                    $( "#sortable2, #sortable3" ).sortable({

                        revert: 'invalid',
                        connectWith: ".connectedSortable"//means can drag drop on .connectedSortable objects not neccessary reverse if itself dont have it
                    }).disableSelection();

                    $( "#sortable1").sortable({

                        revert: 'invalid',
                        connectWith: ".connectedSortable",
                        //items: "li:not(.ui-state-disabled)",   //more strict than "cancel"
                        cancel: ".ui-state-disabled"

                    })
                    .disableSelection()
                    .droppable(
                    {
                            accept: "#sortable2 li",
                            drop: function (event, ui) {
                                $item = ui.draggable;
                                
                                //get ther clone and change its properties
//                                $item.clone()
//                                .css({position:""})
//                                .text("Newly Added")
//                                .css({display:'none'})
//                                .appendTo("#sortable3").fadeIn(1000);

                                //OR 
                                //strip the ui.draggable and build new item 
                                $drop_pos=$('#sortable3')
                                .find("li:eq(0)");

                                $( "<li></li>" )
                                .text( ui.draggable.text())
                                .addClass('ui-state-active')
                                .css({display:"none"})
                                .insertAfter( $drop_pos)
                                .fadeIn(function()
                                {
                                    $(this).animate(
                                    {
                                        "font-weight":'bold'
                                    });
                                });


                                //
                                $item.clone()
                                .css({position:""})
                                .text('*****')
                                .css({display:'none'})
                                .appendTo("#sortable2").fadeIn(2000);
                                
                            }
                    });


                   














                    //--------------------------------------------------------------------
                    return;
                    
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
                    
                

            }

            
        });
        
      
    } (jQuery));
} (Prototype));


var ins1 = new TestDND();