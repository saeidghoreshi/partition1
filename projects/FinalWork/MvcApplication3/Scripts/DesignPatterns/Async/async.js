/******Async Pattern**********/


//Note:
//Do not allow undefined amout of time to be spent on UI calculation >>>> usually on for loop

var job = function () { }
job.prototype.calculateASync = function () {

    var totalRecords = 90000;
    var eachTimeRecords = 3000; //set by me
    var pauseTimes = totalRecords / eachTimeRecords;

    var items = [];
    for (var i = 0; i < totalRecords; i++)
        items.push(i);


    var buffer = function (items, iterFunc, callback) {
        var i = 0, len = items.length;

        setTimeout(function () {
            var result;

            //25 ms per 3000 record
            for (var start = new Date(); i < len && (new Date) - start < 25 * pauseTimes  /*750*/; i++) {
                result = iterFunc.call(this, items[i]);
            }

            if (i < len)
                setTimeout(arguments.callee, 30); //given time to other UI ops
            else
                callback(items);

        }, pauseTimes);
    }





    var html = '';

    buffer(
        items,
        function (item) { html += item + ' , '; },
        function () { console.log(html); }
    );
}


job.prototype.calculateSync= function () {

    var result = [];
    for (var i = 0; i < 90000; i++)
        result.push(i);
    var html = '';

    for (var i = 0; i < result.length; i++)
        html += result[i] + ' , ';
    console.log(html);


}

var job1 = new job();
job1.calculateASync();
//job1.calculateSync();


