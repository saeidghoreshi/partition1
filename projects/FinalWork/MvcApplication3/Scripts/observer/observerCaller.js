(function ($$) {
    (function ($) {

        var loader = new JSCSSLOADER(['scripts/observer/observerCallee.js'], [], callback);


        function callback() {

            var book1 = new book('Alex', 11);

            //define 3 callback on price change
                book1.onPriceChanged(function (obj, price) {
                    console.log('Price changed1');
                });
            book1.onPriceChanged(function (obj, price) {
                console.log(obj.name + ' Price changed from $' + obj.price + ' to $' + price);
            });
            book1.onPriceChanged(function (obj, price) {
                console.log(obj.name + ' Price changed from $' + obj.price + ' to $' + price);
            });

            //do change
            book1.setPrice(12);
            book1.setPrice(13);

        }


    } (jQuery));
} (Prototype));

