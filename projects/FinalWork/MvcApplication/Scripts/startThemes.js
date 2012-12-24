(function ($$) {
    (function ($) {

        $(document).ready(function () {

            $('.tabh').click(function () {

                $('.tdhon').each(function () {

                    $(this).removeClass('tdhon');
                    $(this).addClass('tdhoff');
                });


                $(this).removeClass('tdhoff');
                $(this).addClass('tdhon');

            });
        });


        //Horizantal
        $(document).ready(function () {

            $('.tab').click(function () {

                $('.tdon').each(function () {

                    $(this).removeClass('tdon');
                    $(this).addClass('tdoff');
                });


                $(this).removeClass('tdoff');
                $(this).addClass('tdon');

            });
        });
	    

    } (jQuery));
} (Prototype));