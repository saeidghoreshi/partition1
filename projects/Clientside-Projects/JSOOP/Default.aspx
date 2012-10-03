<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="JSOOP._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <script src="Scripts/jquery-1.8.2.min.js" type="text/javascript"></script>
    <script src="Scripts/require.js" data-main="Scripts/components/App.js" type="text/javascript"></script>


    <script language="javascript" type="text/javascript">

    /*
        //class definition
        function Customer(fname,lname) {
            this.fname = fname;
            this.lname = lname;
            this.Method1 = function () { alert("hi func1"); }
            //Property
            Object.defineProperty(this, "fname",
            {
                get: function () { return fname; },
                set: function (value) { fname = value; }
            });
        }
        //instantiate object 
        var cust = new Customer("saeid", "Goreshi");
        var test = cust instanceof Customer; //true
        var name = cust.fname; //readonly

        //Define static member
        customer.mailServer = "support@ccc.net";
        var mail = customer.mailServer;

        //Class Definition using prototype
        Customer.prototype.sendMail = function (email) 
        { //send email
        }

        //Inheritance
        function bestCustomer(rate) {
            this.rate = rate;
            this.appreciate = function () { console.log(this.rate); }
        }
        bestCustomer.prototype = new customer("ali","Mohammadi");

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

        */
    
    </script>
</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    
    

</asp:Content>
