
//class definition
function Customer(field1) {

    this.field1 = field1;
    this.Method1 = function () { alert("Hi Method 1"); }
    //Property
    Object.defineProperty(this, "PROP1",
    {
        get: function () { return field1; },
        set: function (value) { field1 = value; }
    });
}
//instantiate object 
var cust = new Customer("saeid", "Goreshi");
var test = cust instanceof Customer; //true
var name = cust.PROP1; 

//Define static member
Customer.mailServer = "support@ccc.net";
var mail = Customer.mailServer;

//Class Definition using prototype
Customer.prototype.sendMail = function (email) 
{ //send email
}






//Inheritance
function bestCustomer(rate) {
    this.rate = rate;
    this.appreciate = function () { console.log(this.rate); }
}
bestCustomer.prototype = new customer("ali");

//Instantiate from inherited Class
var bastCust = new bestCustomer(10.25);
bastCust.appreciate();
var test1 = bastCust instanceof Customer; //true
var test2 = bastCust instanceof bestCustomer; //true


//build Abstract Class
var Animal =
{
    foodType: "None",
    feed: function () {
        console.log("feed this animal by : "+this.foodType);
    }
}
var a = new Animal(); //fails
//then how to use it >>>
function cow(color) {
    this.color = color;
    this.foodType = "ALAF";
}
cow.prototype = a;
//instantiate
var c = new cow("White");
c.feed();
var test = c instanceof Animal; //false
var test2 = c instanceof cow; //true
 
