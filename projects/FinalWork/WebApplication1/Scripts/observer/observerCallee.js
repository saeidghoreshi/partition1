(function ($$) {
    (function ($) {

        /***Observable Objects****/
        book = function (name, price) {
            this.priceChanged = [];
            this.name = name;
            this.price = price;
        }
        book.prototype.setPrice = function (price) {

            if (this.price != price) {
                for (var i in this.priceChanged)
                    this.priceChanged[i](this, price)
            }
            this.price = price;
        }
        book.prototype.onPriceChanged = function (callback) {
            this.priceChanged.push(callback);
        }


    } (jQuery));
} (Prototype));

