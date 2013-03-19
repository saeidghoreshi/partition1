(function ($$) {
    (function ($) {

        //scroller Pane
        $('.scroll-pane').ready(function () {
            $('.scroll-pane').jScrollPane();
        });

       

    } (jQuery));
} (Prototype));

//upload Script
YAHOO.util.Get.script(["http://localhost:91/ClientSideLibraries/JQUI/jquery-1.8.3.js", "../../../JSplugins/ajaxForm/jquery.form.js"],
    { onSuccess: function () {

        //the whole block need to be out of any scope if not work then move iit to html code  section
        var percent = $('#percent');
        $('#m').ajaxForm({
            beforeSend: function () {

                var percentVal = '0%';
                percent.html(percentVal);
            },
            //IE wont read this function
            uploadProgress: function (event, position, total, percentComplete) {
                var percentVal = percentComplete + '%';

                percent.html(percentVal);
            },
            complete: function (xhr) {

                percent.html("completed");
                percent.append(xhr.responseText);
            }
        });

    }
    });