//NOTE : DONE HAPPENS AFTER RESOLVING
//NOTE : IN AJAX SUCCESS==RESOLVE-DONE FAILURE==REJECT-FAIL

//RESOLVE   ==>> success or done
//REJECT    ==>> error or fail

(function ($$) {
    (function ($) {

        var dfd1 = $.Deferred();
        var dfd2 = $.Deferred();

        //for dfd1
        setTimeout(function () {
            dfd1.done(function (data) {
                console.log("Defered Object #1 has completed w/ DELAY !!!!");
            });
        }, 2000);


        dfd1
        .done(function (data) {
            console.log("Defered Object #1 has been successfull !!!!");
        })
        .fail(function (data) {
            console.log("Defered Object #1 has Failed!!!!");
        })
        .always(function (data) {
            console.log("Defered Object #1 Always !!!!");
        })
        .progress(function () {
            console.log("Defered Object #1 is progressing ....!!!!");
        });
        

        //for dfd2
        dfd2
        .done(function () {
            console.log("Defered Object #2 has successfull !!!!");
        })
        .fail(function () {
            console.log("Defered Object #2 has Failed !!!!");
        })
        .always(function (data) {
            console.log("Defered Object #2 Always !!!!");
        })
        .progress(function () {
            console.log("Defered Object #2 is progressing ....!!!!");
        });

        //Merging
        $.when(dfd1.promise(), dfd2.promise()).done(function (args) {
            console.log("When Reached !!!  W/ ARGS >>> "+args);
        });


        //after all setting above then do resolving or rejection
        setTimeout(function () {
            dfd1.resolve();  //Or reject it 
        }, 5000);

        setTimeout(function () {
            dfd2.resolve();
        }, 1000);

        console.log("Application Completed");

    } (jQuery));
} (Prototype));
