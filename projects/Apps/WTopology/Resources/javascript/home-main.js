(function ($) {

    var Person = Class.create({
        initialize: function (name) {
            this.name = name;
        },
        say: function (message) {
            return this.name + ': ' + message;
        }
    });

    var Pirate = Class.create(Person, {
        // redefine the speak method
        say: function ($super, message) {
            return $super(message) + ', yarr!';
        }
    });

    //var john = new Pirate('Long John');
    //var result = john.say('ahoy matey');

    //console.log(result);


} (Prototype));






(function ($$) {
    
    
    $$(document).ready(function () {
    
       
       $$( "input[type=button], button" )
                .button()
                .click(function( event ) {
                    //event.preventDefault();
       });
       $$('#main_btn_createNew')
       .button({icons: {primary: "ui-icon-link"}});
       $$('#main_btn_createCategory')
       .button({icons: {primary: "ui-icon-folder-open"}});
       $$('#main_btn_hightlightResources')
       .button({icons: {primary: "ui-icon-check"}});
       $$('#main_btn_unhightlightResources')
       .button({icons: {primary: "ui-icon-alert"}});
       $$('#main_btn_deleteSelected')
       .button({icons: {primary: "ui-icon-trash"}});
       
       
       $$( "#main-expandcollapse" ).buttonset();
       
        
            $$( "#radio" ).buttonset();
        

        $$('.item_child').ready(function () {
            $$('#main-expandAll').change();
        });//itemChild start

        $$(".item_parent").click(function()
        {
            var parentID=$$(this).attr("id");
            $$("."+parentID).animate({height: 'toggle'},1,function(){});
        });

        //main-search  effects
        $$(".main-search").focus(
            function()
            {
                if($$(".main-search:eq(0)").val()=='search')
                    $$(this).val("");
            }
        );
        $$(".main-search").blur(
            function()
            {
                if($$(".main-search:eq(0)").val()=='')
                    $$(this).val("search");
            }
        );
        $$(".main-search").keyup(
            function()
            {
                $$.ajax(
                {
                    url:"/home/jSON_getSearchResult",
                    type:"post",
                    data:{criteria:$$(".main-search:eq(0)").val()}
                }).done(function(data)
                {
                    var result="";
                    for(var index=0;index<data.length;index++)
                    {
                        if (data[index].parentID == null)
                        {
                            result+='<div class="item_parent" id="parent-'+data[index].ID+'">'+data[index].title+'</div>'
                        }
                        else
                        { 
                            result+='<div class="parent-'+data[index].parentID+' item_child" >';
                                result+='<table>';
                                result+='<tr>';
                                result+='<td><input type="checkbox" name="main_resources_cb" id="main_resources_cb_'+data[index].ID+'" value="'+data[index].ID+'" /></td>';
                                result+='<td><label for="main_resources_cb_'+data[index].ID+'" style="background:'+data[index].colorCode+'">'+data[index].title+'</label></td>';
                                result+='</tr>';
                                result+='</table>';
                            result+='</div>';
                        }
                    }
                    $$('#mainResult').html(result);
                });
            }
        );

        $$('#main-collapseAll').change(function()
        {
            $$('.item_child').each(function(){   $$(this).slideUp();});
        });
        $$('#main-expandAll').change(function()
        {
            $$('.item_child').each(function(){   $$(this).slideDown();});
        });
        

    });
} (jQuery));