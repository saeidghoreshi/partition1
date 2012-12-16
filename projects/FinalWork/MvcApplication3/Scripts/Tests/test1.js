//test


console.log('------------Array Sort-----------');
var a = [2, 44, 53, 0, 5]
console.log(a.sort(function (first, second) { return first - second }).reverse());

console.log('------------Exec-----------');
var input1 = 'this is a sample <b>text</b> me';
var expression1 = /<b>(.*)<\/b>/;
var result1 = expression1.exec(input1);
console.log(result1);

console.log('------------replace1-----------');
var input2 = 'this is a sample test me sample';
var expression2 = /sample/g;
var result2 = input2.replace(expression2, ' replaced ');
console.log(result2);

console.log('------------replace2-----------');
var input22 = 'this is a sample test me sample';
var expression22 = /(\w+) (\w+) (\w+)/g;
var result22 = input22.replace(expression22, function (match, cap1, cap2, cap3) {
    return cap3 + ' ' + cap2 + ' ' + cap1;
});
console.log(result22);

console.log('------------search-----------');
var input3 = 'this is a sample test me sample';
var expression3 = /sample/g;
var result3 = input3.search(expression3, ' replaced ');
console.log(result3);

console.log('------------slice-----------');
var input4 = 'this is a sample test me sample';
var result4 = input4.slice(0, 5);
console.log(result4);


console.log('----------------Date Operations----------------');
console.log('----------------elapsed time----------------');

var from = new Date();
for (var i = 0; i < 3000000; i++)
    var result = Math.sqrt(i);
var to = new Date();
var elapsed = to - from;
console.log(elapsed + ' ms');
console.log('----------------is NaN----------------');
console.log('Hi ' + isNaN('Hi'));
console.log('5.5 ' + isNaN(5.5));
console.log("2/ 'a' " + isNaN(2 / 'a'));
console.log('2+ undefined ' + isNaN(2 + undefined));

console.log('----------------NOTE----------------');
console.log('to round on precisions we can multiple by 10, round and return back of parse to string and do customized rounding');




/*
$(':input')
$(':input[type="radio"]')
$(div:contains('plural'))
$('r:first-child')
$('div:[title^="xxx"]')
$('div:[title*="xxx"]')
$('div:[title$="xxx"]')//case sensitive
$('tr:odd')
$('').wrap('<div></div>')
prepend/append/appendto
.toggleClass


//Utitlities
$.isEmptyObject
$.isXmlDoc
$isNumeric
$.isWindow   is frame or win
$.type > bool, number,  function,array , date,regx,object, undefined, null
$.inArray()
$.unique
$.merge(arra,arr)
----
js array > stringify > parseJSON
------
.end() return handler  to main object

fadeOut(speed,callback)



$('input:radio[name=g1]:checked')
                       
*/


/*
var catObject={}&&{}
always use === and !==

$(TAG[attr=sth])
E F			==>any F tag under E
E>F			==>any F childlren under E
E+F			==>anf F sticking immediatly after E
E:not(s)
E~F			==>any F sticks after E
$().wrap('<b></b>');
jQuery.fn.FunctionName=function(){} then call it like $().FunctionName();
$('.x .y')	==>$('.x').find('.y')



*/