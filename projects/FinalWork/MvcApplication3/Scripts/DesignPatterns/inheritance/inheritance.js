(function ($$) {
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
            // Override the Method
            say: function ($super, message) {
                return $super(message) + ', yarr!';
            }
        });




        //Instantiatiation
        var john = new Pirate('Long John');
        var result = john.say('ahoy matey');

        console.log('-----------Inheritance--------------');
        console.log(result);
        console.log('-----------Inheritance END--------------');


    } (jQuery));
} (Prototype));
