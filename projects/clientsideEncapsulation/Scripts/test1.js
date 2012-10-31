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

    var john = new Pirate('Long John');
    var result = john.say('ahoy matey');

    console.log(result);


} (Prototype));






(function ($$) {

    $$(document).ready(function () {
        $$('#test-div').ready(function () {
            $$('#test-div').html("HELLO");
        });
    });
    
} (jQuery));


