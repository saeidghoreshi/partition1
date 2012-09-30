<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="qunitjs._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">
    <script src="Scripts/jquery-1.8.2.js" type="text/javascript"></script>
    <link href="Scripts/qunit-1.10.0.css" rel="stylesheet" type="text/css" media="screen"/>
    <script src="Scripts/qunit-1.10.0.js" type="text/javascript"></script>

</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">
    
    <h1 id="qunit-header">Qunit Example</h1>
    <h2 id="qunit-banner"></h2>
    <div id="qunit-testrunner-toolbar"></div>
    <h2 id="qunit-userAgent"></h2>
    <o1 id="qunit-tests"></o1>
    <div id="qunit-fixture">test markup</div>

    <script language="javascript" type="text/javascript">

        module("ok assertion");

        test("passing test", function () {
            ok(true,"this passes the test");
        });
        test("failure test", function () {
            ok(false, "this passes the test");
        });

        module("equal assertion");
        test("equal pass",function()
        {
            equal(1+1,2,"equal pass");
        });
        test("equal fail",function()
        {
            equal(1+1,7,"fail pass");
        });

        module("deep equal assertion");
        test("deepequal pass",function()
        {
            deepEqual([1,2],[1,2],"fail pass");
        });

    </script>
</asp:Content>
