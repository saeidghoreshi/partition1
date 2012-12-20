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

        //Define static Field/Method
        Person.mailServer = "support@ccc.net";
        Person.callMailServer = function () { console.log("Mail Server Called") };

        //Add Method using prototype
        Person.prototype.addMe = function () {
            console.log("Add Method using prototype Called");
        }



        var Pirate = Class.create(Person, {
            // Override the Method
            say: function ($super, message) {
                console.log($super(message) + ', +++++!');
            }
        });


        console.log('-----------Inheritance--------------');
        //Call static method
        console.log(Person.mailServer);
        Person.callMailServer();


        //Instantiatiation
        var john = new Pirate('Long John');
        //Test 
        console.log(john instanceof Person)

        //call method
        john.say('ahoy matey');
        
        //Call Method using prototype
        john.addMe();

        console.log('-----------Inheritance END--------------');


    } (jQuery));
} (Prototype));
