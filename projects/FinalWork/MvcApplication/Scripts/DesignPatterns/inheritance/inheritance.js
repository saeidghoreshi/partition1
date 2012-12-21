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
        Person.prototype.addMe = function (msg) {
            console.log("Add Method using prototype Called - " + msg);
        }



        var Pirate = Class.create(Person, {
            // Override the Method
            say: function ($super, message) {

                console.log($super(message) + ', +++++!');


                //Note : $super means Person.prototype.say function beacasu not used in prototype definition but in explicit prototype notation
                Person.prototype.addMe.apply(this, ["ryan#1"]);
                Person.prototype.addMe.call(this, "ryan#2");
            }
        });


        console.log('-----------Inheritance--------------');
        //Call static method
        console.log(Person.mailServer);
        Person.callMailServer();


        //Instantiatiation
        var john = new Pirate('Long John');
        //Test 
        console.log(john instanceof Person);


        //call method
        john.say('ahoy matey');

        //Call Method using prototype
        john.addMe("Ryan");

        console.log('-----------Inheritance END--------------');


    } (jQuery));
} (Prototype));
