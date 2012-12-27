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
                            //snap handle
                            //helper:function(){return $('<div></div>')}
                            scroll: true ,
                            scrollSensitivity: 100,
                            scrollSpeed: 100,

                            connectToSortable: "#sortableDraggable",
                            helper: "clone",  //if want to use it by ref then  helper:''
                            revert: "invalid"
                        }
                    ).disableSelection();
                    $('#draggables').children().draggable
                    ("option","stack",".ui-draggable");

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
                        connectWith: ".connectedSortable"
                        //means can Automatically drag N drop on ".connectedSortable" objects not neccessary reverse if itself dont have it
                    }).disableSelection();

                    $( "#sortable1").sortable({

                        revert: 'invalid',
                        connectWith: ".connectedSortable",
                        //items: "li:not(.ui-state-disabled)",   //more strict than "cancel"
                        cancel: ".ui-state-disabled"

                    })
                    .disableSelection()
                    //already by using "connectwith" dropping happens Automatically, but want to ad more features then use droppable in target element
                    .droppable( 
                    {
                    activeClass:"",
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



                    //Grabs every thing draggable hovering on it
                    $('#trash').droppable
					(
						{
						    //accept: "#sortable2 li",  //Optianal
						    drop: function (event, ui) {
						        $item=ui.draggable;

                                $item.clone()
                                .css({position:""})
                                .addClass("SIDEBYSIDE")
                                .appendTo("#trash");
						    }
						}
					);


                    //Draggable connect with sortables
                    $( "#sortableDraggable" ).sortable({
                        revert: true
                    }).disableSelection();

            }

            
        });
        
      
    } (jQuery));
} (Prototype));


var ins1 = new TestDND();