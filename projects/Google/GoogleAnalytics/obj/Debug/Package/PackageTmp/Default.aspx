<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.master" AutoEventWireup="true"
    CodeBehind="Default.aspx.cs" Inherits="GoogleAnalytics._Default" %>

<asp:Content ID="HeaderContent" runat="server" ContentPlaceHolderID="HeadContent">

<script src="Scripts/jquery-1.8.2.min.js" type="text/javascript"></script>

<script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-35127419-1']);
    _gaq.push(['_trackPageview']);

    _gaq.push(['_trackPageview', '/default/step1']);

    
    (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

</script>

<style type="text/css">
.wizard {cursor:pointer;}
.disable{color:gray;}
.enable{color:red;}
</style>

<script language="javascript" type="text/javascript">
    $(document).ready(function () {

        $(".wizard #s1").click(function () {

            $('.wizard #s2').removeClass('diable').addClass('enable');
            $('.wizard #s1').removeClass('enable').addClass('disable');
            $('.wizard #s3').removeClass('enable').addClass('disable');
            _gaq.push(['_trackPageview', '/default/step2']);
        });
        $(".wizard #s2").click(function () {

            $('.wizard #s3').removeClass('diable').addClass('enable');
            $('.wizard #s1').removeClass('enable').addClass('disable');
            $('.wizard #s2').removeClass('enable').addClass('disable');
            _gaq.push(['_trackPageview', '/default/step3']);
        });
    });
</script>

</asp:Content>
<asp:Content ID="BodyContent" runat="server" ContentPlaceHolderID="MainContent">

    <h2>
        <b><small>This is just a test for google Analytica</small></b>
    </h2>

    <div class="wizard">
    <a id="s1" class="enable">step1</a>
    <a id="s2" class="disable">step2</a>
    <a id="s3" class="disable">step3</a>
    </div>
    
    
</asp:Content>
