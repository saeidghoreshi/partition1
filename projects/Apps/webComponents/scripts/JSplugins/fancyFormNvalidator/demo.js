$(document).ready(function () {
    $('#contact-form').jqTransform();

    $("button").click(function () {

        $(".formError").hide();

    });


    //$.validationEngine.settings={};

    $("#contact-form").validationEngine({
        inlineValidation: false,
        promptPosition: "centerRight",
        success: function () { use_ajax = true },
        failure: function () { use_ajax = false; }
    })

    $("#contact-form").submit(function (e) {

        if (!$('#subject').val().length) {
            $.validationEngine.buildPrompt(".jqTransformSelectWrapper", "* This field is required", "error")
            return false;
        }
        e.preventDefault();
    })

}); /* File Created: December 28, 2012 */