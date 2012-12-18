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
.end() return handler  to main object
fadeOut(speed,callback)




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


$('input:radio[name=g1]:checked')
                       

***var catObject={}&&{}
***always use === and !==

$(TAG[attr=sth])
E F  or $(F,E)          ==>any F tag under E
E>F			            ==>any F children under E at level one
E+F			            ==>any F sticking immediatly after E
E:not(s)
E~F			            ==>any F sticks after E
$('.x .y')	            ==>$('.x').find('.y')
$('#x div:eq(index)')   ==>index-th div child


$().wrap('<b></b>');
jQuery.fn.FunctionName=function(){} then call it like $().FunctionName();

*/






//JQUERY EFFECTS :
/*
hide, show, toggle  
slideUp,slidedown,slideToggle 
fadeIn,faeOut,fadeTo
*/

//NOTE
/*
1-Live is going to be deprecated>> use delegate[automatically live] and stop propagation or return false
2-when using $  means by reference if want by value ten use clone()
*/




//ajax Hirarchy
/*
$.ajax(
{
    url: '/home/sss',
    success: function (e) { console.log('success'); },
    error: function (e) { console.log('error'); },
    complete: function (e) { console.log('complete'); }
});
*/