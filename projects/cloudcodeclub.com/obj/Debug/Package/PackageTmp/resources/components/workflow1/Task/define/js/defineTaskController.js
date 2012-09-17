Class('defineTaskControllerClass',
{
    has:
        {
            config:
            {
                is: 'rw',
                init: {}
            }
        },


    methods:
        {
            initialize: function (config) {
                var me = this;

                me.config = config;
            },
            init: function () {
                var me = this;

                $.ajax(
                {
                    url: "/workflow/json_getCreateNewTaskForm",
                    type: "get"
                }).done(function (data) {

                    $('#' + me.config.id).html(data.result);

                    $('#' + me.config.id).ready(function () {
                        app.tagReady(me.config.id, function () {
                            me.buildGUI();
                        });
                    });
                });
            },
            buildGUI: function () {
                var me = this;
                //buttons
                $("#createNewTask_saveBtn").button();

                //rich text box
                //Render 
                var Dom = YAHOO.util.Dom;
                var Event = YAHOO.util.Event;
                var myConfig =
                {
                    width: '550px',
                    height: '100px',
                    dompath: true,
                    focusAtStart: true
                };
                var myEditor = new YAHOO.widget.SimpleEditor("createNewTask_description", myConfig);
                myEditor.render();


                //save
                $("#createNewTask_saveBtn").die("click").live({ click: function () {
                    var fileNames = '';
                    $(".createNewtask_fileList_Div_items").each(function () {

                        fileNames += $(this).attr("docId") + ',';
                    });
                    if (fileNames != '')
                        fileNames = fileNames.substring(0, fileNames.length - 1);


                    myEditor.saveHTML();
                    var description = myEditor.get('element').value;

                    var data =
                    {
                        filenames: fileNames,
                        task_title: $("#createNewTask_title").val(),
                        task_deadline: $("#createNewTask_deadline").val(),
                        task_description: description
                    }
                    $.ajax(
                    {
                        url: "/workflow/json_saveNewTask",
                        type: "post",
                        data: data

                    }).done(function (data) {

                        app.closeDialog(me.config.dialog);
                        
                    });
                }
                });

                //on file change
            $("#createNewtask_file").die("change").live({ change: function () {

                    

                    var formObject = document.getElementById('createNewTask_Form');
                    YAHOO.util.Connect.setForm(formObject, true, true);
                    YAHOO.util.Connect.asyncRequest("GET", "/workflow/json_uploadTaskDoc/",
                                        {
                                            upload: function (o) {
                                                //success: function (o) {
                                                var startIndex = o.responseText.indexOf("{");
                                                var endIndex = o.responseText.indexOf("</pre>");

                                                //update List
                                                var data = YAHOO.lang.JSON.parse(o.responseText.substring(startIndex, endIndex));
                                                var filename = data.result.filename;
                                                var docId = data.result.docId;
                                                $('#createNewtask_fileList_Div_nofileadded').remove();
                                                $('#createNewtask_fileList_Div').append("<div class='createNewtask_fileList_Div_items_parent'>   <div class='createNewtask_fileList_Div_items_delete'></div><div class='createNewtask_fileList_Div_items' docId=" + docId + ">" + filename + "</div>   </div>");
                                                $("#createNewtask_file").val('');


                                                //delete from filelist
                                                $(".createNewtask_fileList_Div_items_delete").die("click").live({ click: function () {
                                                    
                                                    $(this).parent().remove()
                                                    
                                                }
                                                });


                                                
                                            },
                                            failure: function (o) { alert("failed") }
                                        });
                }
                });




            } //build GUI end
        }
});

