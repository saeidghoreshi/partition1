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

        //Child item click
        $$('.item_child_title').click(function()
        {
        
            $$.ajax(
            {
                url:"/home/jSON_FetchResourceDescription",
                type:"post",
                data:{resourceID:$$(this).attr("resourceID")}
            }).done(function(data)
            {
                dialog(500,500,data[0].description);
            });

            
            
            
        });

        function gen(prefix) { return prefix + "-" + (Math.random() * 1000000000000).toFixed(0).toString(); }
        function dialog(w,h,content)
        {
            var id=gen('');
            var panel="<div id=Panel-"+id+"><div id=close_"+id+"><b>X</b></div><hr/><div id='"+id+"'>"+content+"</div></div>";
            $$('body').append(panel);
            $$('#close_'+id).css(
            {
                width:"10px",
                height:"10px",
                cursor:"pointer"
            });
            $$('#'+id).css({width:"100%"});
            $$('#Panel-'+id).css(
            {
                position:"absolute",
                left:window.innerWidth/2-w/2,
                top:window.innerHeight/2-h/2,
                background:"#f2f2f2",
                border:"1px solid black",
                width:w,
                height:h+20,
                padding:"10px",

                "-moz-box-shadow": "-1px 1px 1px rgba(0,0,0,.4)", 
                "-webkit-box-shadow": "0 4px 5px rgba(0,0,0,.4)",
                "box-shadow": "0 4px 5px rgba(0,0,0,.4)",

                "border-radius": "3px",
                "-moz-border-radius": "3px",
                "-webkit-border-radius": "3px",
            });
            $$('#Panel-'+id).draggable();
            $$('#close_'+id).click(function()
            {
                $$('#Panel-'+id).remove();
            });
        }

        //click Item
        /*
        var descriptionPanel = $('#SubTopic-description').rte({
                                    controls_rte: rte_toolbar,
                                    controls_html: html_toolbar,
                                    width: 650,
                                    height: 200
                                });

                                $('#SubTopic-save').click(function () {
                                    
                                    $.ajax(
                                    {
                                        url: "/home/saveNewSubTopic",
                                        type: "POST",
                                        data:
                                        {
                                            folder_id: App.treeMenu.tree.getSelection()[0].data.id,
                                            parent_id: $('#' + id).data('data').topic_id,
                                            title: $('#SubTopic-title').val(),
                                            description: escape(descriptionPanel['SubTopic-description'].get_content())
        */
        

    });
} (jQuery));