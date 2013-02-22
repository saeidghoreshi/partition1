function cls() { }

//Define Class
cls.define = function (body) {

    var f = function (config) {this.config = config;}
    f.prototype = body;
    return f;
};

//Inherit Class
cls.inherit = function (baseObject, body) {

    var f = function (config) {this.config = config;}
    f.prototype = $.extend(baseObject, body);
    return f;
};
 






