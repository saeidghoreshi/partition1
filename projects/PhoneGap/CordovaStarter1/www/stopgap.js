function stopgap() {
    function deviceready() {

        var e = document.createEvent("Events");
        e.initEvent("deviceready");
        document.dispatchEvent(e);
    }
    window.cordova = {};
    window.device = { cordova: "in broweser" }
    deviceready();
 }