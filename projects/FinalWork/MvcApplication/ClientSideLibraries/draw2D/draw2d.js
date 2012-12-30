
/**This notice must be untouched at all times.
This is the COMPRESSED version of the Draw2D Library
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/
var draw2d=new Object();
var _errorStack_=[];
function pushErrorStack(e,_2087){
_errorStack_.push(_2087+"\n");
throw e;
}
draw2d.AbstractEvent=function(){
this.type=null;
this.target=null;
this.relatedTarget=null;
this.cancelable=false;
this.timeStamp=null;
this.returnValue=true;
};
draw2d.AbstractEvent.prototype.initEvent=function(sType,_2089){
this.type=sType;
this.cancelable=_2089;
this.timeStamp=(new Date()).getTime();
};
draw2d.AbstractEvent.prototype.preventDefault=function(){
if(this.cancelable){
this.returnValue=false;
}
};
draw2d.AbstractEvent.fireDOMEvent=function(_208a,_208b){
if(document.createEvent){
var evt=document.createEvent("Events");
evt.initEvent(_208a,true,true);
_208b.dispatchEvent(evt);
}else{
if(document.createEventObject){
var evt=document.createEventObject();
_208b.fireEvent("on"+_208a,evt);
}
}
};
draw2d.EventTarget=function(){
this.eventhandlers={};
};
draw2d.EventTarget.prototype.addEventListener=function(sType,_208e){
if(typeof this.eventhandlers[sType]=="undefined"){
this.eventhandlers[sType]=[];
}
this.eventhandlers[sType][this.eventhandlers[sType].length]=_208e;
};
draw2d.EventTarget.prototype.dispatchEvent=function(_208f){
_208f.target=this;
if(typeof this.eventhandlers[_208f.type]!="undefined"){
for(var i=0;i<this.eventhandlers[_208f.type].length;i++){
this.eventhandlers[_208f.type][i](_208f);
}
}
return _208f.returnValue;
};
draw2d.EventTarget.prototype.removeEventListener=function(sType,_2092){
if(typeof this.eventhandlers[sType]!="undefined"){
var _2093=[];
for(var i=0;i<this.eventhandlers[sType].length;i++){
if(this.eventhandlers[sType][i]!=_2092){
_2093[_2093.length]=this.eventhandlers[sType][i];
}
}
this.eventhandlers[sType]=_2093;
}
};
String.prototype.trim=function(){
return (this.replace(new RegExp("^([\\s]+)|([\\s]+)$","gm"),""));
};
String.prototype.lefttrim=function(){
return (this.replace(new RegExp("^[\\s]+","gm"),""));
};
String.prototype.righttrim=function(){
return (this.replace(new RegExp("[\\s]+$","gm"),""));
};
String.prototype.between=function(left,right,_15a8){
if(!_15a8){
_15a8=0;
}
var li=this.indexOf(left,_15a8);
if(li==-1){
return null;
}
var ri=this.indexOf(right,li);
if(ri==-1){
return null;
}
return this.substring(li+left.length,ri);
};
draw2d.UUID=function(){
};
draw2d.UUID.prototype.type="draw2d.UUID";
draw2d.UUID.create=function(){
var _20a3=function(){
return (((1+Math.random())*65536)|0).toString(16).substring(1);
};
return (_20a3()+_20a3()+"-"+_20a3()+"-"+_20a3()+"-"+_20a3()+"-"+_20a3()+_20a3()+_20a3());
};
draw2d.ArrayList=function(){
this.increment=10;
this.size=0;
this.data=new Array(this.increment);
};
draw2d.ArrayList.EMPTY_LIST=new draw2d.ArrayList();
draw2d.ArrayList.prototype.type="draw2d.ArrayList";
draw2d.ArrayList.prototype.reverse=function(){
var _2820=new Array(this.size);
for(var i=0;i<this.size;i++){
_2820[i]=this.data[this.size-i-1];
}
this.data=_2820;
};
draw2d.ArrayList.prototype.getCapacity=function(){
return this.data.length;
};
draw2d.ArrayList.prototype.getSize=function(){
return this.size;
};
draw2d.ArrayList.prototype.isEmpty=function(){
return this.getSize()===0;
};
draw2d.ArrayList.prototype.getLastElement=function(){
if(this.data[this.getSize()-1]!==null){
return this.data[this.getSize()-1];
}
};
draw2d.ArrayList.prototype.asArray=function(){
this.trimToSize();
return this.data;
};
draw2d.ArrayList.prototype.getFirstElement=function(){
if(this.data[0]!==null&&this.data[0]!==undefined){
return this.data[0];
}
return null;
};
draw2d.ArrayList.prototype.get=function(i){
return this.data[i];
};
draw2d.ArrayList.prototype.add=function(obj){
if(this.getSize()==this.data.length){
this.resize();
}
this.data[this.size++]=obj;
};
draw2d.ArrayList.prototype.addAll=function(obj){
for(var i=0;i<obj.getSize();i++){
this.add(obj.get(i));
}
};
draw2d.ArrayList.prototype.remove=function(obj){
var index=this.indexOf(obj);
if(index>=0){
return this.removeElementAt(index);
}
return null;
};
draw2d.ArrayList.prototype.insertElementAt=function(obj,index){
if(this.size==this.capacity){
this.resize();
}
for(var i=this.getSize();i>index;i--){
this.data[i]=this.data[i-1];
}
this.data[index]=obj;
this.size++;
};
draw2d.ArrayList.prototype.removeElementAt=function(index){
var _282c=this.data[index];
for(var i=index;i<(this.getSize()-1);i++){
this.data[i]=this.data[i+1];
}
this.data[this.getSize()-1]=null;
this.size--;
return _282c;
};
draw2d.ArrayList.prototype.removeAllElements=function(){
this.size=0;
for(var i=0;i<this.data.length;i++){
this.data[i]=null;
}
};
draw2d.ArrayList.prototype.indexOf=function(obj){
for(var i=0;i<this.getSize();i++){
if(this.data[i]==obj){
return i;
}
}
return -1;
};
draw2d.ArrayList.prototype.contains=function(obj){
for(var i=0;i<this.getSize();i++){
if(this.data[i]==obj){
return true;
}
}
return false;
};
draw2d.ArrayList.prototype.resize=function(){
newData=new Array(this.data.length+this.increment);
for(var i=0;i<this.data.length;i++){
newData[i]=this.data[i];
}
this.data=newData;
};
draw2d.ArrayList.prototype.trimToSize=function(){
if(this.data.length==this.size){
return;
}
var temp=new Array(this.getSize());
for(var i=0;i<this.getSize();i++){
temp[i]=this.data[i];
}
this.size=temp.length;
this.data=temp;
};
draw2d.ArrayList.prototype.sort=function(f){
var i,j;
var _2838;
var _2839;
var _283a;
var _283b;
for(i=1;i<this.getSize();i++){
_2839=this.data[i];
_2838=_2839[f];
j=i-1;
_283a=this.data[j];
_283b=_283a[f];
while(j>=0&&_283b>_2838){
this.data[j+1]=this.data[j];
j--;
if(j>=0){
_283a=this.data[j];
_283b=_283a[f];
}
}
this.data[j+1]=_2839;
}
};
draw2d.ArrayList.prototype.clone=function(){
var _283c=new draw2d.ArrayList(this.size);
for(var i=0;i<this.size;i++){
_283c.add(this.data[i]);
}
return _283c;
};
draw2d.ArrayList.prototype.overwriteElementAt=function(obj,index){
this.data[index]=obj;
};
draw2d.ArrayList.prototype.getPersistentAttributes=function(){
return {data:this.data,increment:this.increment,size:this.getSize()};
};
function trace(_16e8){
var _16e9=openwindow("about:blank",700,400);
_16e9.document.writeln("<pre>"+_16e8+"</pre>");
}
function openwindow(url,width,_16ec){
var left=(screen.width-width)/2;
var top=(screen.height-_16ec)/2;
property="left="+left+", top="+top+", toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,alwaysRaised,width="+width+",height="+_16ec;
return window.open(url,"_blank",property);
}
function dumpObject(obj){
trace("----------------------------------------------------------------------------");
trace("- Object dump");
trace("----------------------------------------------------------------------------");
for(var i in obj){
try{
if(typeof obj[i]!="function"){
trace(i+" --&gt; "+obj[i]);
}
}
catch(e){
}
}
for(var i in obj){
try{
if(typeof obj[i]=="function"){
trace(i+" --&gt; "+obj[i]);
}
}
catch(e){
}
}
trace("----------------------------------------------------------------------------");
}
draw2d.Drag=function(){
};
draw2d.Drag.current=null;
draw2d.Drag.currentTarget=null;
draw2d.Drag.currentHover=null;
draw2d.Drag.currentCompartment=null;
draw2d.Drag.dragging=false;
draw2d.Drag.isDragging=function(){
return this.dragging;
};
draw2d.Drag.setCurrent=function(_2bc4){
this.current=_2bc4;
this.dragging=true;
};
draw2d.Drag.getCurrent=function(){
return this.current;
};
draw2d.Drag.clearCurrent=function(){
this.current=null;
this.dragging=false;
this.currentTarget=null;
};
draw2d.Draggable=function(_2bc5,_2bc6){
this.id=draw2d.UUID.create();
this.node=null;
draw2d.EventTarget.call(this);
this.construct(_2bc5,_2bc6);
this.diffX=0;
this.diffY=0;
this.targets=new draw2d.ArrayList();
};
draw2d.Draggable.prototype=new draw2d.EventTarget();
draw2d.Draggable.prototype.construct=function(_2bc7){
if(_2bc7===null||_2bc7===undefined){
return;
}
this.element=_2bc7;
var oThis=this;
var _2bc9=function(){
var _2bca=new draw2d.DragDropEvent();
_2bca.initDragDropEvent("dblclick",true);
oThis.dispatchEvent(_2bca);
var _2bcb=arguments[0]||window.event;
_2bcb.cancelBubble=true;
_2bcb.returnValue=false;
};
var _2bcc=function(){
var _2bcd=arguments[0]||window.event;
var _2bce=new draw2d.DragDropEvent();
if(oThis.node!==null){
var _2bcf=oThis.node.getWorkflow().getAbsoluteX();
var _2bd0=oThis.node.getWorkflow().getAbsoluteY();
var _2bd1=oThis.node.getWorkflow().getScrollLeft();
var _2bd2=oThis.node.getWorkflow().getScrollTop();
_2bce.x=_2bcd.clientX-oThis.element.offsetLeft+_2bd1-_2bcf;
_2bce.y=_2bcd.clientY-oThis.element.offsetTop+_2bd2-_2bd0;
}
if(_2bcd.button===2){
_2bce.initDragDropEvent("contextmenu",true);
oThis.dispatchEvent(_2bce);
}else{
_2bce.initDragDropEvent("dragstart",true);
if(oThis.dispatchEvent(_2bce)){
oThis.diffX=_2bcd.clientX-oThis.element.offsetLeft;
oThis.diffY=_2bcd.clientY-oThis.element.offsetTop;
draw2d.Drag.setCurrent(oThis);
if(oThis.isAttached==true){
oThis.detachEventHandlers();
}
oThis.attachEventHandlers();
}
}
_2bcd.cancelBubble=true;
_2bcd.returnValue=false;
};
var _2bd3=function(){
if(draw2d.Drag.getCurrent()===null){
var _2bd4=arguments[0]||window.event;
if(draw2d.Drag.currentHover!==null&&oThis!==draw2d.Drag.currentHover){
var _2bd5=new draw2d.DragDropEvent();
_2bd5.initDragDropEvent("mouseleave",false,oThis);
draw2d.Drag.currentHover.dispatchEvent(_2bd5);
}
if(oThis!==null&&oThis!==draw2d.Drag.currentHover){
var _2bd5=new draw2d.DragDropEvent();
_2bd5.initDragDropEvent("mouseenter",false,oThis);
oThis.dispatchEvent(_2bd5);
}
draw2d.Drag.currentHover=oThis;
}else{
}
};
if(this.element.addEventListener){
this.element.addEventListener("mousemove",_2bd3,false);
this.element.addEventListener("mousedown",_2bcc,false);
this.element.addEventListener("dblclick",_2bc9,false);
}else{
if(this.element.attachEvent){
this.element.attachEvent("onmousemove",_2bd3);
this.element.attachEvent("onmousedown",_2bcc);
this.element.attachEvent("ondblclick",_2bc9);
}else{
throw "Drag not supported in this browser.";
}
}
};
draw2d.Draggable.prototype.onDrop=function(_2bd6,_2bd7){
};
draw2d.Draggable.prototype.attachEventHandlers=function(){
var oThis=this;
oThis.isAttached=true;
this.tempMouseMove=function(){
var _2bd9=arguments[0]||window.event;
var _2bda=new draw2d.Point(_2bd9.clientX-oThis.diffX,_2bd9.clientY-oThis.diffY);
if(oThis.node!==null&&oThis.node.getCanSnapToHelper()){
_2bda=oThis.node.getWorkflow().snapToHelper(oThis.node,_2bda);
}
oThis.element.style.left=_2bda.x+"px";
oThis.element.style.top=_2bda.y+"px";
if(oThis.node!==null){
var _2bdb=oThis.node.getWorkflow().getScrollLeft();
var _2bdc=oThis.node.getWorkflow().getScrollTop();
var _2bdd=oThis.node.getWorkflow().getAbsoluteX();
var _2bde=oThis.node.getWorkflow().getAbsoluteY();
var _2bdf=oThis.getDropTarget(_2bd9.clientX+_2bdb-_2bdd,_2bd9.clientY+_2bdc-_2bde);
var _2be0=oThis.getCompartment(_2bd9.clientX+_2bdb-_2bdd,_2bd9.clientY+_2bdc-_2bde);
if(draw2d.Drag.currentTarget!==null&&_2bdf!=draw2d.Drag.currentTarget){
var _2be1=new draw2d.DragDropEvent();
_2be1.initDragDropEvent("dragleave",false,oThis);
draw2d.Drag.currentTarget.dispatchEvent(_2be1);
}
if(_2bdf!==null&&_2bdf!==draw2d.Drag.currentTarget){
var _2be1=new draw2d.DragDropEvent();
_2be1.initDragDropEvent("dragenter",false,oThis);
_2bdf.dispatchEvent(_2be1);
}
draw2d.Drag.currentTarget=_2bdf;
if(draw2d.Drag.currentCompartment!==null&&_2be0!==draw2d.Drag.currentCompartment){
var _2be1=new draw2d.DragDropEvent();
_2be1.initDragDropEvent("figureleave",false,oThis);
draw2d.Drag.currentCompartment.dispatchEvent(_2be1);
}
if(_2be0!==null&&_2be0.node!=oThis.node&&_2be0!==draw2d.Drag.currentCompartment){
var _2be1=new draw2d.DragDropEvent();
_2be1.initDragDropEvent("figureenter",false,oThis);
_2be0.dispatchEvent(_2be1);
}
draw2d.Drag.currentCompartment=_2be0;
}
var _2be2=new draw2d.DragDropEvent();
_2be2.initDragDropEvent("drag",false);
oThis.dispatchEvent(_2be2);
};
oThis.tempMouseUp=function(){
oThis.detachEventHandlers();
var _2be3=arguments[0]||window.event;
if(oThis.node!==null){
var _2be4=oThis.node.getWorkflow().getScrollLeft();
var _2be5=oThis.node.getWorkflow().getScrollTop();
var _2be6=oThis.node.getWorkflow().getAbsoluteX();
var _2be7=oThis.node.getWorkflow().getAbsoluteY();
var _2be8=oThis.getDropTarget(_2be3.clientX+_2be4-_2be6,_2be3.clientY+_2be5-_2be7);
var _2be9=oThis.getCompartment(_2be3.clientX+_2be4-_2be6,_2be3.clientY+_2be5-_2be7);
if(_2be8!==null){
var _2bea=new draw2d.DragDropEvent();
_2bea.initDragDropEvent("drop",false,oThis);
_2be8.dispatchEvent(_2bea);
}
if(_2be9!==null&&_2be9.node!==oThis.node){
var _2bea=new draw2d.DragDropEvent();
_2bea.initDragDropEvent("figuredrop",false,oThis);
_2be9.dispatchEvent(_2bea);
}
if(draw2d.Drag.currentTarget!==null){
var _2bea=new draw2d.DragDropEvent();
_2bea.initDragDropEvent("dragleave",false,oThis);
draw2d.Drag.currentTarget.dispatchEvent(_2bea);
draw2d.Drag.currentTarget=null;
}
}
var _2beb=new draw2d.DragDropEvent();
_2beb.initDragDropEvent("dragend",false);
oThis.dispatchEvent(_2beb);
oThis.onDrop(_2be3.clientX,_2be3.clientY);
draw2d.Drag.currentCompartment=null;
draw2d.Drag.clearCurrent();
};
if(document.body.addEventListener){
document.body.addEventListener("mousemove",this.tempMouseMove,false);
document.body.addEventListener("mouseup",this.tempMouseUp,false);
}else{
if(document.body.attachEvent){
document.body.attachEvent("onmousemove",this.tempMouseMove);
document.body.attachEvent("onmouseup",this.tempMouseUp);
}else{
throw new Error("Drag doesn't support this browser.");
}
}
};
draw2d.Draggable.prototype.detachEventHandlers=function(){
this.isAttached=false;
if(document.body.removeEventListener){
document.body.removeEventListener("mousemove",this.tempMouseMove,false);
document.body.removeEventListener("mouseup",this.tempMouseUp,false);
}else{
if(document.body.detachEvent){
document.body.detachEvent("onmousemove",this.tempMouseMove);
document.body.detachEvent("onmouseup",this.tempMouseUp);
}else{
throw new Error("Drag doesn't support this browser.");
}
}
};
draw2d.Draggable.prototype.getDropTarget=function(x,y){
for(var i=0;i<this.targets.getSize();i++){
var _2bef=this.targets.get(i);
if(_2bef.node.isOver(x,y)&&_2bef.node!==this.node){
return _2bef;
}
}
return null;
};
draw2d.Draggable.prototype.getCompartment=function(x,y){
var _2bf2=null;
for(var i=0;i<this.node.getWorkflow().compartments.getSize();i++){
var _2bf4=this.node.getWorkflow().compartments.get(i);
if(_2bf4.isOver(x,y)&&_2bf4!==this.node){
if(_2bf2===null){
_2bf2=_2bf4;
}else{
if(_2bf2.getZOrder()<_2bf4.getZOrder()){
_2bf2=_2bf4;
}
}
}
}
return _2bf2===null?null:_2bf2.dropable;
};
draw2d.Draggable.prototype.getLeft=function(){
return this.element.offsetLeft;
};
draw2d.Draggable.prototype.getTop=function(){
return this.element.offsetTop;
};
draw2d.DragDropEvent=function(){
draw2d.AbstractEvent.call(this);
};
draw2d.DragDropEvent.prototype=new draw2d.AbstractEvent();
draw2d.DragDropEvent.prototype.initDragDropEvent=function(sType,_2bf6,_2bf7){
this.initEvent(sType,_2bf6);
this.relatedTarget=_2bf7;
};
draw2d.DropTarget=function(_2bf8){
draw2d.EventTarget.call(this);
this.construct(_2bf8);
};
draw2d.DropTarget.prototype=new draw2d.EventTarget();
draw2d.DropTarget.prototype.construct=function(_2bf9){
this.element=_2bf9;
};
draw2d.DropTarget.prototype.getLeft=function(){
var el=this.element;
var ol=el.offsetLeft;
while((el=el.offsetParent)!==null){
ol+=el.offsetLeft;
}
return ol;
};
draw2d.DropTarget.prototype.getTop=function(){
var el=this.element;
var ot=el.offsetTop;
while((el=el.offsetParent)!==null){
ot+=el.offsetTop;
}
return ot;
};
draw2d.DropTarget.prototype.getHeight=function(){
return this.element.offsetHeight;
};
draw2d.DropTarget.prototype.getWidth=function(){
return this.element.offsetWidth;
};
draw2d.PositionConstants=function(){
};
draw2d.PositionConstants.NORTH=1;
draw2d.PositionConstants.SOUTH=4;
draw2d.PositionConstants.WEST=8;
draw2d.PositionConstants.EAST=16;
draw2d.Color=function(red,green,blue){
if(typeof green=="undefined"){
var rgb=this.hex2rgb(red);
this.red=rgb[0];
this.green=rgb[1];
this.blue=rgb[2];
}else{
this.red=red;
this.green=green;
this.blue=blue;
}
};
draw2d.Color.prototype.type="draw2d.Color";
draw2d.Color.prototype.getHTMLStyle=function(){
return "rgb("+this.red+","+this.green+","+this.blue+")";
};
draw2d.Color.prototype.getRed=function(){
return this.red;
};
draw2d.Color.prototype.getGreen=function(){
return this.green;
};
draw2d.Color.prototype.getBlue=function(){
return this.blue;
};
draw2d.Color.prototype.getIdealTextColor=function(){
var _258b=105;
var _258c=(this.red*0.299)+(this.green*0.587)+(this.blue*0.114);
return (255-_258c<_258b)?new draw2d.Color(0,0,0):new draw2d.Color(255,255,255);
};
draw2d.Color.prototype.hex2rgb=function(_258d){
_258d=_258d.replace("#","");
return ({0:parseInt(_258d.substr(0,2),16),1:parseInt(_258d.substr(2,2),16),2:parseInt(_258d.substr(4,2),16)});
};
draw2d.Color.prototype.hex=function(){
return (this.int2hex(this.red)+this.int2hex(this.green)+this.int2hex(this.blue));
};
draw2d.Color.prototype.int2hex=function(v){
v=Math.round(Math.min(Math.max(0,v),255));
return ("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
};
draw2d.Color.prototype.darker=function(_258f){
var red=parseInt(Math.round(this.getRed()*(1-_258f)));
var green=parseInt(Math.round(this.getGreen()*(1-_258f)));
var blue=parseInt(Math.round(this.getBlue()*(1-_258f)));
if(red<0){
red=0;
}else{
if(red>255){
red=255;
}
}
if(green<0){
green=0;
}else{
if(green>255){
green=255;
}
}
if(blue<0){
blue=0;
}else{
if(blue>255){
blue=255;
}
}
return new draw2d.Color(red,green,blue);
};
draw2d.Color.prototype.lighter=function(_2593){
var red=parseInt(Math.round(this.getRed()*(1+_2593)));
var green=parseInt(Math.round(this.getGreen()*(1+_2593)));
var blue=parseInt(Math.round(this.getBlue()*(1+_2593)));
if(red<0){
red=0;
}else{
if(red>255){
red=255;
}
}
if(green<0){
green=0;
}else{
if(green>255){
green=255;
}
}
if(blue<0){
blue=0;
}else{
if(blue>255){
blue=255;
}
}
return new draw2d.Color(red,green,blue);
};
draw2d.Point=function(x,y){
this.x=x;
this.y=y;
};
draw2d.Point.prototype.type="draw2d.Point";
draw2d.Point.prototype.getX=function(){
return this.x;
};
draw2d.Point.prototype.getY=function(){
return this.y;
};
draw2d.Point.prototype.getPosition=function(p){
var dx=p.x-this.x;
var dy=p.y-this.y;
if(Math.abs(dx)>Math.abs(dy)){
if(dx<0){
return draw2d.PositionConstants.WEST;
}
return draw2d.PositionConstants.EAST;
}
if(dy<0){
return draw2d.PositionConstants.NORTH;
}
return draw2d.PositionConstants.SOUTH;
};
draw2d.Point.prototype.equals=function(o){
return this.x==o.x&&this.y==o.y;
};
draw2d.Point.prototype.getDistance=function(other){
return Math.sqrt((this.x-other.x)*(this.x-other.x)+(this.y-other.y)*(this.y-other.y));
};
draw2d.Point.prototype.getTranslated=function(other){
return new draw2d.Point(this.x+other.x,this.y+other.y);
};
draw2d.Point.prototype.getPersistentAttributes=function(){
return {x:this.x,y:this.y};
};
draw2d.Dimension=function(x,y,w,h){
draw2d.Point.call(this,x,y);
this.w=w;
this.h=h;
};
draw2d.Dimension.prototype=new draw2d.Point();
draw2d.Dimension.prototype.type="draw2d.Dimension";
draw2d.Dimension.prototype.translate=function(dx,dy){
this.x+=dx;
this.y+=dy;
return this;
};
draw2d.Dimension.prototype.resize=function(dw,dh){
this.w+=dw;
this.h+=dh;
return this;
};
draw2d.Dimension.prototype.setBounds=function(rect){
this.x=rect.x;
this.y=rect.y;
this.w=rect.w;
this.h=rect.h;
return this;
};
draw2d.Dimension.prototype.isEmpty=function(){
return this.w<=0||this.h<=0;
};
draw2d.Dimension.prototype.getWidth=function(){
return this.w;
};
draw2d.Dimension.prototype.getHeight=function(){
return this.h;
};
draw2d.Dimension.prototype.getRight=function(){
return this.x+this.w;
};
draw2d.Dimension.prototype.getBottom=function(){
return this.y+this.h;
};
draw2d.Dimension.prototype.getTopLeft=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.Dimension.prototype.getCenter=function(){
return new draw2d.Point(this.x+this.w/2,this.y+this.h/2);
};
draw2d.Dimension.prototype.getBottomRight=function(){
return new draw2d.Point(this.x+this.w,this.y+this.h);
};
draw2d.Dimension.prototype.equals=function(o){
return this.x==o.x&&this.y==o.y&&this.w==o.w&&this.h==o.h;
};
draw2d.SnapToHelper=function(_16f1){
this.workflow=_16f1;
};
draw2d.SnapToHelper.NORTH=1;
draw2d.SnapToHelper.SOUTH=4;
draw2d.SnapToHelper.WEST=8;
draw2d.SnapToHelper.EAST=16;
draw2d.SnapToHelper.CENTER=32;
draw2d.SnapToHelper.NORTH_EAST=draw2d.SnapToHelper.NORTH|draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.NORTH_WEST=draw2d.SnapToHelper.NORTH|draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.SOUTH_EAST=draw2d.SnapToHelper.SOUTH|draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.SOUTH_WEST=draw2d.SnapToHelper.SOUTH|draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NORTH_SOUTH=draw2d.SnapToHelper.NORTH|draw2d.SnapToHelper.SOUTH;
draw2d.SnapToHelper.EAST_WEST=draw2d.SnapToHelper.EAST|draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NSEW=draw2d.SnapToHelper.NORTH_SOUTH|draw2d.SnapToHelper.EAST_WEST;
draw2d.SnapToHelper.prototype.snapPoint=function(_16f2,_16f3,_16f4){
return _16f3;
};
draw2d.SnapToHelper.prototype.snapRectangle=function(_16f5,_16f6){
return _16f5;
};
draw2d.SnapToHelper.prototype.onSetDocumentDirty=function(){
};
draw2d.SnapToGrid=function(_20ff){
draw2d.SnapToHelper.call(this,_20ff);
};
draw2d.SnapToGrid.prototype=new draw2d.SnapToHelper();
draw2d.SnapToGrid.prototype.type="draw2d.SnapToGrid";
draw2d.SnapToGrid.prototype.snapPoint=function(_2100,_2101,_2102){
_2102.x=this.workflow.gridWidthX*Math.floor(((_2101.x+this.workflow.gridWidthX/2)/this.workflow.gridWidthX));
_2102.y=this.workflow.gridWidthY*Math.floor(((_2101.y+this.workflow.gridWidthY/2)/this.workflow.gridWidthY));
return 0;
};
draw2d.SnapToGrid.prototype.snapRectangle=function(_2103,_2104){
_2104.x=_2103.x;
_2104.y=_2103.y;
_2104.w=_2103.w;
_2104.h=_2103.h;
return 0;
};
draw2d.SnapToGeometryEntry=function(type,_2862){
this.type=type;
this.location=_2862;
};
draw2d.SnapToGeometryEntry.prototype.getLocation=function(){
return this.location;
};
draw2d.SnapToGeometryEntry.prototype.getType=function(){
return this.type;
};
draw2d.SnapToGeometry=function(_25bc){
draw2d.SnapToHelper.call(this,_25bc);
this.rows=null;
this.cols=null;
};
draw2d.SnapToGeometry.prototype=new draw2d.SnapToHelper();
draw2d.SnapToGeometry.THRESHOLD=5;
draw2d.SnapToGeometry.prototype.snapPoint=function(_25bd,_25be,_25bf){
if(this.rows===null||this.cols===null){
this.populateRowsAndCols();
}
if((_25bd&draw2d.SnapToHelper.EAST)!==0){
var _25c0=this.getCorrectionFor(this.cols,_25be.getX()-1,1);
if(_25c0!==draw2d.SnapToGeometry.THRESHOLD){
_25bd&=~draw2d.SnapToHelper.EAST;
_25bf.x+=_25c0;
}
}
if((_25bd&draw2d.SnapToHelper.WEST)!==0){
var _25c1=this.getCorrectionFor(this.cols,_25be.getX(),-1);
if(_25c1!==draw2d.SnapToGeometry.THRESHOLD){
_25bd&=~draw2d.SnapToHelper.WEST;
_25bf.x+=_25c1;
}
}
if((_25bd&draw2d.SnapToHelper.SOUTH)!==0){
var _25c2=this.getCorrectionFor(this.rows,_25be.getY()-1,1);
if(_25c2!==draw2d.SnapToGeometry.THRESHOLD){
_25bd&=~draw2d.SnapToHelper.SOUTH;
_25bf.y+=_25c2;
}
}
if((_25bd&draw2d.SnapToHelper.NORTH)!==0){
var _25c3=this.getCorrectionFor(this.rows,_25be.getY(),-1);
if(_25c3!==draw2d.SnapToGeometry.THRESHOLD){
_25bd&=~draw2d.SnapToHelper.NORTH;
_25bf.y+=_25c3;
}
}
return _25bd;
};
draw2d.SnapToGeometry.prototype.snapRectangle=function(_25c4,_25c5){
var _25c6=_25c4.getTopLeft();
var _25c7=_25c4.getBottomRight();
var _25c8=this.snapPoint(draw2d.SnapToHelper.NORTH_WEST,_25c4.getTopLeft(),_25c6);
_25c5.x=_25c6.x;
_25c5.y=_25c6.y;
var _25c9=this.snapPoint(draw2d.SnapToHelper.SOUTH_EAST,_25c4.getBottomRight(),_25c7);
if(_25c8&draw2d.SnapToHelper.WEST){
_25c5.x=_25c7.x-_25c4.getWidth();
}
if(_25c8&draw2d.SnapToHelper.NORTH){
_25c5.y=_25c7.y-_25c4.getHeight();
}
return _25c8|_25c9;
};
draw2d.SnapToGeometry.prototype.populateRowsAndCols=function(){
this.rows=[];
this.cols=[];
var _25ca=this.workflow.getDocument().getFigures();
var index=0;
for(var i=0;i<_25ca.getSize();i++){
var _25cd=_25ca.get(i);
if(_25cd!=this.workflow.getCurrentSelection()){
var _25ce=_25cd.getBounds();
this.cols[index*3]=new draw2d.SnapToGeometryEntry(-1,_25ce.getX());
this.rows[index*3]=new draw2d.SnapToGeometryEntry(-1,_25ce.getY());
this.cols[index*3+1]=new draw2d.SnapToGeometryEntry(0,_25ce.x+(_25ce.getWidth()-1)/2);
this.rows[index*3+1]=new draw2d.SnapToGeometryEntry(0,_25ce.y+(_25ce.getHeight()-1)/2);
this.cols[index*3+2]=new draw2d.SnapToGeometryEntry(1,_25ce.getRight()-1);
this.rows[index*3+2]=new draw2d.SnapToGeometryEntry(1,_25ce.getBottom()-1);
index++;
}
}
};
draw2d.SnapToGeometry.prototype.getCorrectionFor=function(_25cf,value,side){
var _25d2=draw2d.SnapToGeometry.THRESHOLD;
var _25d3=draw2d.SnapToGeometry.THRESHOLD;
for(var i=0;i<_25cf.length;i++){
var entry=_25cf[i];
var _25d6;
if(entry.type===-1&&side!==0){
_25d6=Math.abs(value-entry.location);
if(_25d6<_25d2){
_25d2=_25d6;
_25d3=entry.location-value;
}
}else{
if(entry.type===0&&side===0){
_25d6=Math.abs(value-entry.location);
if(_25d6<_25d2){
_25d2=_25d6;
_25d3=entry.location-value;
}
}else{
if(entry.type===1&&side!==0){
_25d6=Math.abs(value-entry.location);
if(_25d6<_25d2){
_25d2=_25d6;
_25d3=entry.location-value;
}
}
}
}
}
return _25d3;
};
draw2d.SnapToGeometry.prototype.onSetDocumentDirty=function(){
this.rows=null;
this.cols=null;
};
draw2d.Border=function(){
this.color=null;
};
draw2d.Border.prototype.type="draw2d.Border";
draw2d.Border.prototype.dispose=function(){
this.color=null;
};
draw2d.Border.prototype.getHTMLStyle=function(){
return "";
};
draw2d.Border.prototype.setColor=function(c){
this.color=c;
};
draw2d.Border.prototype.getColor=function(){
return this.color;
};
draw2d.Border.prototype.refresh=function(){
};
draw2d.LineBorder=function(width){
draw2d.Border.call(this);
this.width=1;
if(width){
this.width=width;
}
this.figure=null;
};
draw2d.LineBorder.prototype=new draw2d.Border();
draw2d.LineBorder.prototype.type="draw2d.LineBorder";
draw2d.LineBorder.prototype.dispose=function(){
draw2d.Border.prototype.dispose.call(this);
this.figure=null;
};
draw2d.LineBorder.prototype.setLineWidth=function(w){
this.width=w;
if(this.figure!==null){
this.figure.html.style.border=this.getHTMLStyle();
}
};
draw2d.LineBorder.prototype.getHTMLStyle=function(){
if(this.getColor()!==null){
return this.width+"px solid "+this.getColor().getHTMLStyle();
}
return this.width+"px solid black";
};
draw2d.LineBorder.prototype.refresh=function(){
this.setLineWidth(this.width);
};
draw2d.Figure=function(){
this.construct();
};
draw2d.Figure.prototype.type="draw2d.Figure";
draw2d.Figure.ZOrderBaseIndex=100;
draw2d.Figure.setZOrderBaseIndex=function(index){
draw2d.Figure.ZOrderBaseIndex=index;
};
draw2d.Figure.prototype.construct=function(){
this.lastDragStartTime=0;
this.x=0;
this.y=0;
this.width=10;
this.height=10;
this.border=null;
this.id=draw2d.UUID.create();
this.html=this.createHTMLElement();
this.canvas=null;
this.workflow=null;
this.draggable=null;
this.parent=null;
this.isMoving=false;
this.canSnapToHelper=true;
this.snapToGridAnchor=new draw2d.Point(0,0);
this.timer=-1;
this.model=null;
this.alpha=1;
this.alphaBeforeOnDrag=1;
this.properties={};
this.moveListener=new draw2d.ArrayList();
this.setDimension(this.width,this.height);
this.setDeleteable(true);
this.setCanDrag(true);
this.setResizeable(true);
this.setSelectable(true);
};
draw2d.Figure.prototype.dispose=function(){
this.canvas=null;
this.workflow=null;
this.moveListener=null;
if(this.draggable!==null){
this.draggable.removeEventListener("mouseenter",this.tmpMouseEnter);
this.draggable.removeEventListener("mouseleave",this.tmpMouseLeave);
this.draggable.removeEventListener("dragend",this.tmpDragend);
this.draggable.removeEventListener("dragstart",this.tmpDragstart);
this.draggable.removeEventListener("drag",this.tmpDrag);
this.draggable.removeEventListener("dblclick",this.tmpDoubleClick);
this.draggable.node=null;
this.draggable.target.removeAllElements();
}
this.draggable=null;
if(this.border!==null){
this.border.dispose();
}
this.border=null;
if(this.parent!==null){
this.parent.removeChild(this);
}
};
draw2d.Figure.prototype.getProperties=function(){
return this.properties;
};
draw2d.Figure.prototype.getProperty=function(key){
return this.properties[key];
};
draw2d.Figure.prototype.setProperty=function(key,value){
this.properties[key]=value;
this.setDocumentDirty();
};
draw2d.Figure.prototype.getId=function(){
return this.id;
};
draw2d.Figure.prototype.setId=function(id){
this.id=id;
if(this.html!==null){
this.html.id=id;
}
};
draw2d.Figure.prototype.setCanvas=function(_2018){
this.canvas=_2018;
};
draw2d.Figure.prototype.getWorkflow=function(){
return this.workflow;
};
draw2d.Figure.prototype.setWorkflow=function(_2019){
if(this.draggable===null){
this.html.tabIndex="0";
var oThis=this;
this.keyDown=function(event){
event.cancelBubble=true;
event.returnValue=true;
oThis.onKeyDown(event.keyCode,event.ctrlKey);
};
if(this.html.addEventListener){
this.html.addEventListener("keydown",this.keyDown,false);
}else{
if(this.html.attachEvent){
this.html.attachEvent("onkeydown",this.keyDown);
}
}
this.draggable=new draw2d.Draggable(this.html,draw2d.Draggable.DRAG_X|draw2d.Draggable.DRAG_Y);
this.draggable.node=this;
this.tmpContextMenu=function(_201c){
oThis.onContextMenu(oThis.x+_201c.x,_201c.y+oThis.y);
};
this.tmpMouseEnter=function(_201d){
oThis.onMouseEnter();
};
this.tmpMouseLeave=function(_201e){
oThis.onMouseLeave();
};
this.tmpDragend=function(_201f){
oThis.onDragend();
};
this.tmpDragstart=function(_2020){
var w=oThis.workflow;
w.showMenu(null);
if(w.toolPalette&&w.toolPalette.activeTool){
_2020.returnValue=false;
w.onMouseDown(oThis.x+_2020.x,_2020.y+oThis.y);
w.onMouseUp(oThis.x+_2020.x,_2020.y+oThis.y);
return;
}
if(!(oThis instanceof draw2d.ResizeHandle)&&!(oThis instanceof draw2d.Port)){
var line=w.getBestLine(oThis.x+_2020.x,_2020.y+oThis.y);
if(line!==null){
_2020.returnValue=false;
w.setCurrentSelection(line);
w.showLineResizeHandles(line);
w.onMouseDown(oThis.x+_2020.x,_2020.y+oThis.y);
return;
}else{
if(oThis.isSelectable()){
w.showResizeHandles(oThis);
w.setCurrentSelection(oThis);
}
}
}
_2020.returnValue=oThis.onDragstart(_2020.x,_2020.y);
};
this.tmpDrag=function(_2023){
oThis.onDrag();
};
this.tmpDoubleClick=function(_2024){
oThis.onDoubleClick();
};
this.draggable.addEventListener("contextmenu",this.tmpContextMenu);
this.draggable.addEventListener("mouseenter",this.tmpMouseEnter);
this.draggable.addEventListener("mouseleave",this.tmpMouseLeave);
this.draggable.addEventListener("dragend",this.tmpDragend);
this.draggable.addEventListener("dragstart",this.tmpDragstart);
this.draggable.addEventListener("drag",this.tmpDrag);
this.draggable.addEventListener("dblclick",this.tmpDoubleClick);
}
this.workflow=_2019;
};
draw2d.Figure.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height=this.width+"px";
item.style.width=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.outline="none";
item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;
return item;
};
draw2d.Figure.prototype.setParent=function(_2026){
this.parent=_2026;
};
draw2d.Figure.prototype.getParent=function(){
return this.parent;
};
draw2d.Figure.prototype.getZOrder=function(){
return parseInt(this.html.style.zIndex);
};
draw2d.Figure.prototype.setZOrder=function(index){
this.html.style.zIndex=index;
};
draw2d.Figure.prototype.hasFixedPosition=function(){
return false;
};
draw2d.Figure.prototype.getMinWidth=function(){
return 5;
};
draw2d.Figure.prototype.getMinHeight=function(){
return 5;
};
draw2d.Figure.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
}
return this.html;
};
draw2d.Figure.prototype.paint=function(){
};
draw2d.Figure.prototype.setBorder=function(_2028){
if(this.border!==null){
this.border.figure=null;
}
this.border=_2028;
this.border.figure=this;
this.border.refresh();
this.setDocumentDirty();
};
draw2d.Figure.prototype.onRemove=function(_2029){
};
draw2d.Figure.prototype.onContextMenu=function(x,y){
var menu=this.getContextMenu();
if(menu!==null){
this.workflow.showMenu(menu,x,y);
}
};
draw2d.Figure.prototype.getContextMenu=function(){
return null;
};
draw2d.Figure.prototype.onDoubleClick=function(){
};
draw2d.Figure.prototype.onMouseEnter=function(){
};
draw2d.Figure.prototype.onMouseLeave=function(){
};
draw2d.Figure.prototype.onDrag=function(){
this.x=this.draggable.getLeft();
this.y=this.draggable.getTop();
if(this.isMoving==false){
this.isMoving=true;
this.alphaBeforeOnDrag=this.getAlpha();
this.setAlpha(this.alphaBeforeOnDrag*0.5);
}
this.fireMoveEvent();
};
draw2d.Figure.prototype.onDragend=function(){
if(this.getWorkflow().getEnableSmoothFigureHandling()===true){
var oThis=this;
var _202e=function(){
if(oThis.alpha<oThis.alphaBeforeOnDrag){
oThis.setAlpha(Math.min(1,oThis.alpha+0.05));
}else{
window.clearInterval(oThis.timer);
oThis.timer=-1;
}
};
if(oThis.timer>0){
window.clearInterval(oThis.timer);
}
oThis.timer=window.setInterval(_202e,20);
}else{
this.setAlpha(this.alphaBeforeOnDrag);
}
this.command.setPosition(this.x,this.y);
this.workflow.commandStack.execute(this.command);
this.command=null;
this.isMoving=false;
this.workflow.hideSnapToHelperLines();
this.fireMoveEvent();
};
draw2d.Figure.prototype.onDragstart=function(x,y){
this.command=this.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
return this.command!==null;
};
draw2d.Figure.prototype.setCanDrag=function(flag){
this.canDrag=flag;
if(flag){
this.html.style.cursor="move";
}else{
this.html.style.cursor="";
}
};
draw2d.Figure.prototype.getCanDrag=function(){
return this.canDrag;
};
draw2d.Figure.prototype.setAlpha=function(_2032){
if(this.alpha===_2032){
return;
}
this.alpha=Math.max(0,Math.min(1,_2032));
if(this.alpha==1){
this.html.style.filter="";
this.html.style.opacity="";
}else{
this.html.style.filter="alpha(opacity="+Math.round(this.alpha*100)+")";
this.html.style.opacity=this.alpha;
}
};
draw2d.Figure.prototype.getAlpha=function(){
return this.alpha;
};
draw2d.Figure.prototype.setDimension=function(w,h){
this.width=Math.max(this.getMinWidth(),w);
this.height=Math.max(this.getMinHeight(),h);
if(this.html===null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
this.fireMoveEvent();
if(this.workflow!==null&&this.workflow.getCurrentSelection()==this){
this.workflow.showResizeHandles(this);
}
};
draw2d.Figure.prototype.setPosition=function(xPos,yPos){
this.x=xPos;
this.y=yPos;
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
this.fireMoveEvent();
if(this.workflow!==null&&this.workflow.getCurrentSelection()==this){
this.workflow.showResizeHandles(this);
}
};
draw2d.Figure.prototype.isResizeable=function(){
return this.resizeable;
};
draw2d.Figure.prototype.setResizeable=function(flag){
this.resizeable=flag;
};
draw2d.Figure.prototype.isSelectable=function(){
return this.selectable;
};
draw2d.Figure.prototype.setSelectable=function(flag){
this.selectable=flag;
};
draw2d.Figure.prototype.isStrechable=function(){
return true;
};
draw2d.Figure.prototype.isDeleteable=function(){
return this.deleteable;
};
draw2d.Figure.prototype.setDeleteable=function(flag){
this.deleteable=flag;
};
draw2d.Figure.prototype.setCanSnapToHelper=function(flag){
this.canSnapToHelper=flag;
};
draw2d.Figure.prototype.getCanSnapToHelper=function(){
return this.canSnapToHelper;
};
draw2d.Figure.prototype.getSnapToGridAnchor=function(){
return this.snapToGridAnchor;
};
draw2d.Figure.prototype.setSnapToGridAnchor=function(point){
this.snapToGridAnchor=point;
};
draw2d.Figure.prototype.getBounds=function(){
return new draw2d.Dimension(this.getX(),this.getY(),this.getWidth(),this.getHeight());
};
draw2d.Figure.prototype.getWidth=function(){
return this.width;
};
draw2d.Figure.prototype.getHeight=function(){
return this.height;
};
draw2d.Figure.prototype.getY=function(){
return this.y;
};
draw2d.Figure.prototype.getX=function(){
return this.x;
};
draw2d.Figure.prototype.getAbsoluteY=function(){
return this.y;
};
draw2d.Figure.prototype.getAbsoluteX=function(){
return this.x;
};
draw2d.Figure.prototype.onKeyDown=function(_203c,ctrl){
if(_203c==46){
this.workflow.getCommandStack().execute(this.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.DELETE)));
}
if(ctrl){
this.workflow.onKeyDown(_203c,ctrl);
}
};
draw2d.Figure.prototype.getPosition=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.Figure.prototype.isOver=function(iX,iY){
var x=this.getAbsoluteX();
var y=this.getAbsoluteY();
var iX2=x+this.width;
var iY2=y+this.height;
return (iX>=x&&iX<=iX2&&iY>=y&&iY<=iY2);
};
draw2d.Figure.prototype.attachMoveListener=function(_2044){
if(_2044===null||this.moveListener===null){
return;
}
this.moveListener.add(_2044);
};
draw2d.Figure.prototype.detachMoveListener=function(_2045){
if(_2045===null||this.moveListener===null){
return;
}
this.moveListener.remove(_2045);
};
draw2d.Figure.prototype.fireMoveEvent=function(){
this.setDocumentDirty();
var size=this.moveListener.getSize();
for(var i=0;i<size;i++){
this.moveListener.get(i).onOtherFigureMoved(this);
}
};
draw2d.Figure.prototype.setModel=function(model){
if(this.model!==null){
this.model.removePropertyChangeListener(this);
}
this.model=model;
if(this.model!==null){
this.model.addPropertyChangeListener(this);
}
};
draw2d.Figure.prototype.getModel=function(){
return this.model;
};
draw2d.Figure.prototype.onOtherFigureMoved=function(_2049){
};
draw2d.Figure.prototype.setDocumentDirty=function(){
if(this.workflow!==null){
this.workflow.setDocumentDirty();
}
};
draw2d.Figure.prototype.disableTextSelection=function(_204a){
_204a.onselectstart=function(){
return false;
};
_204a.unselectable="on";
_204a.className=_204a.className+" unselectable";
_204a.onmousedown=function(){
return false;
};
};
draw2d.Figure.prototype.createCommand=function(_204b){
if(_204b.getPolicy()==draw2d.EditPolicy.MOVE){
if(!this.canDrag){
return null;
}
return new draw2d.CommandMove(this);
}
if(_204b.getPolicy()==draw2d.EditPolicy.DELETE){
if(!this.isDeleteable()){
return null;
}
return new draw2d.CommandDelete(this);
}
if(_204b.getPolicy()==draw2d.EditPolicy.RESIZE){
if(!this.isResizeable()){
return null;
}
return new draw2d.CommandResize(this);
}
return null;
};
draw2d.Node=function(){
this.bgColor=null;
this.lineColor=new draw2d.Color(128,128,255);
this.lineStroke=1;
this.ports=new draw2d.ArrayList();
draw2d.Figure.call(this);
};
draw2d.Node.prototype=new draw2d.Figure();
draw2d.Node.prototype.type="draw2d.Node";
draw2d.Node.prototype.dispose=function(){
for(var i=0;i<this.ports.getSize();i++){
this.ports.get(i).dispose();
}
this.ports=null;
draw2d.Figure.prototype.dispose.call(this);
};
draw2d.Node.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
item.style.width="auto";
item.style.height="auto";
item.style.margin="0px";
item.style.padding="0px";
if(this.lineColor!==null){
item.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}
item.style.fontSize="1px";
if(this.bgColor!==null){
item.style.backgroundColor=this.bgColor.getHTMLStyle();
}
return item;
};
draw2d.Node.prototype.paint=function(){
draw2d.Figure.prototype.paint.call(this);
for(var i=0;i<this.ports.getSize();i++){
this.ports.get(i).paint();
}
};
draw2d.Node.prototype.getPorts=function(){
return this.ports;
};
draw2d.Node.prototype.getInputPorts=function(){
var _247a=new draw2d.ArrayList();
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port instanceof draw2d.InputPort){
_247a.add(port);
}
}
return _247a;
};
draw2d.Node.prototype.getOutputPorts=function(){
var _247d=new draw2d.ArrayList();
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port instanceof draw2d.OutputPort){
_247d.add(port);
}
}
return _247d;
};
draw2d.Node.prototype.getPort=function(_2480){
if(this.ports===null){
return null;
}
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port.getName()==_2480){
return port;
}
}
};
draw2d.Node.prototype.getInputPort=function(_2483){
if(this.ports===null){
return null;
}
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port.getName()==_2483&&port instanceof draw2d.InputPort){
return port;
}
}
};
draw2d.Node.prototype.getOutputPort=function(_2486){
if(this.ports===null){
return null;
}
for(var i=0;i<this.ports.getSize();i++){
var port=this.ports.get(i);
if(port.getName()==_2486&&port instanceof draw2d.OutputPort){
return port;
}
}
};
draw2d.Node.prototype.addPort=function(port,x,y){
this.ports.add(port);
port.setOrigin(x,y);
port.setPosition(x,y);
port.setParent(this);
port.setDeleteable(false);
this.html.appendChild(port.getHTMLElement());
if(this.workflow!==null){
this.workflow.registerPort(port);
}
};
draw2d.Node.prototype.removePort=function(port){
if(this.ports!==null){
this.ports.remove(port);
}
try{
this.html.removeChild(port.getHTMLElement());
}
catch(exc){
}
if(this.workflow!==null){
this.workflow.unregisterPort(port);
}
var _248d=port.getConnections();
for(var i=0;i<_248d.getSize();++i){
this.workflow.removeFigure(_248d.get(i));
}
};
draw2d.Node.prototype.setWorkflow=function(_248f){
var _2490=this.workflow;
draw2d.Figure.prototype.setWorkflow.call(this,_248f);
if(_2490!==null){
for(var i=0;i<this.ports.getSize();i++){
_2490.unregisterPort(this.ports.get(i));
}
}
if(this.workflow!==null){
for(var i=0;i<this.ports.getSize();i++){
this.workflow.registerPort(this.ports.get(i));
}
}
};
draw2d.Node.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
draw2d.Node.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.Node.prototype.setColor=function(color){
this.lineColor=color;
if(this.lineColor!==null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border="0px";
}
};
draw2d.Node.prototype.setLineWidth=function(w){
this.lineStroke=w;
if(this.lineColor!==null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border="0px";
}
};
draw2d.Node.prototype.getModelSourceConnections=function(){
throw "You must override the method [Node.prototype.getModelSourceConnections]";
};
draw2d.Node.prototype.refreshConnections=function(){
if(this.workflow!==null){
this.workflow.refreshConnections(this);
}
};
draw2d.VectorFigure=function(){
this.bgColor=null;
this.lineColor=new draw2d.Color(0,0,0);
this.stroke=1;
this.graphics=null;
draw2d.Node.call(this);
};
draw2d.VectorFigure.prototype=new draw2d.Node;
draw2d.VectorFigure.prototype.type="draw2d.VectorFigure";
draw2d.VectorFigure.prototype.dispose=function(){
draw2d.Node.prototype.dispose.call(this);
this.bgColor=null;
this.lineColor=null;
if(this.graphics!==null){
this.graphics.clear();
}
this.graphics=null;
};
draw2d.VectorFigure.prototype.createHTMLElement=function(){
var item=draw2d.Node.prototype.createHTMLElement.call(this);
item.style.border="0px";
item.style.backgroundColor="transparent";
return item;
};
draw2d.VectorFigure.prototype.setWorkflow=function(_1a99){
draw2d.Node.prototype.setWorkflow.call(this,_1a99);
if(this.workflow===null){
this.graphics.clear();
this.graphics=null;
}
};
draw2d.VectorFigure.prototype.paint=function(){
if(this.html===null){
return;
}
try{
if(this.graphics===null){
this.graphics=new jsGraphics(this.html);
}else{
this.graphics.clear();
}
draw2d.Node.prototype.paint.call(this);
for(var i=0;i<this.ports.getSize();i++){
this.getHTMLElement().appendChild(this.ports.get(i).getHTMLElement());
}
}
catch(e){
pushErrorStack(e,"draw2d.VectorFigure.prototype.paint=function()["+area+"]");
}
};
draw2d.VectorFigure.prototype.setDimension=function(w,h){
draw2d.Node.prototype.setDimension.call(this,w,h);
if(this.graphics!==null){
this.paint();
}
};
draw2d.VectorFigure.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.graphics!==null){
this.paint();
}
};
draw2d.VectorFigure.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.VectorFigure.prototype.setLineWidth=function(w){
this.stroke=w;
if(this.graphics!==null){
this.paint();
}
};
draw2d.VectorFigure.prototype.setColor=function(color){
this.lineColor=color;
if(this.graphics!==null){
this.paint();
}
};
draw2d.VectorFigure.prototype.getColor=function(){
return this.lineColor;
};
draw2d.SVGFigure=function(width,_27e6){
this.bgColor=null;
this.lineColor=new draw2d.Color(0,0,0);
this.stroke=1;
this.context=null;
draw2d.Node.call(this);
if(width&&_27e6){
this.setDimension(width,_27e6);
}
};
draw2d.SVGFigure.prototype=new draw2d.Node();
draw2d.SVGFigure.prototype.type="draw2d.SVGFigure";
draw2d.SVGFigure.prototype.createHTMLElement=function(){
var item=new MooCanvas(this.id,{width:100,height:100});
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;
this.context=item.getContext("2d");
return item;
};
draw2d.SVGFigure.prototype.paint=function(){
this.context.clearRect(0,0,this.getWidth(),this.getHeight());
this.context.fillStyle="rgba(200,0,0,0.3)";
this.context.fillRect(0,0,this.getWidth(),this.getHeight());
};
draw2d.SVGFigure.prototype.setDimension=function(w,h){
draw2d.Node.prototype.setDimension.call(this,w,h);
this.html.width=w;
this.html.height=h;
this.html.style.width=w+"px";
this.html.style.height=h+"px";
if(this.context!==null){
if(this.context.element){
this.context.element.style.width=w+"px";
this.context.element.style.height=h+"px";
}
this.paint();
}
};
draw2d.SVGFigure.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.graphics!==null){
this.paint();
}
};
draw2d.SVGFigure.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.SVGFigure.prototype.setLineWidth=function(w){
this.stroke=w;
if(this.context!==null){
this.paint();
}
};
draw2d.SVGFigure.prototype.setColor=function(color){
this.lineColor=color;
if(this.context!==null){
this.paint();
}
};
draw2d.SVGFigure.prototype.getColor=function(){
return this.lineColor;
};
draw2d.Label=function(msg){
this.msg=msg;
this.bgColor=null;
this.color=new draw2d.Color(0,0,0);
this.fontSize=10;
this.textNode=null;
this.align="center";
draw2d.Figure.call(this);
};
draw2d.Label.prototype=new draw2d.Figure();
draw2d.Label.prototype.type="draw2d.Label";
draw2d.Label.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
this.textNode=document.createTextNode(this.msg);
item.appendChild(this.textNode);
item.style.color=this.color.getHTMLStyle();
item.style.fontSize=this.fontSize+"pt";
item.style.width="auto";
item.style.height="auto";
item.style.paddingLeft="3px";
item.style.paddingRight="3px";
item.style.textAlign=this.align;
item.style.MozUserSelect="none";
this.disableTextSelection(item);
if(this.bgColor!==null){
item.style.backgroundColor=this.bgColor.getHTMLStyle();
}
return item;
};
draw2d.Label.prototype.isResizeable=function(){
return false;
};
draw2d.Label.prototype.setWordwrap=function(flag){
this.html.style.whiteSpace=flag?"wrap":"nowrap";
};
draw2d.Label.prototype.setAlign=function(align){
this.align=align;
this.html.style.textAlign=align;
};
draw2d.Label.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
draw2d.Label.prototype.setColor=function(color){
this.color=color;
this.html.style.color=this.color.getHTMLStyle();
};
draw2d.Label.prototype.setFontSize=function(size){
this.fontSize=size;
this.html.style.fontSize=this.fontSize+"pt";
};
draw2d.Label.prototype.setDimension=function(w,h){
};
draw2d.Label.prototype.getWidth=function(){
if(window.getComputedStyle){
return parseInt(getComputedStyle(this.html,"").getPropertyValue("width"));
}
return parseInt(this.html.clientWidth);
};
draw2d.Label.prototype.getHeight=function(){
if(window.getComputedStyle){
return parseInt(getComputedStyle(this.html,"").getPropertyValue("height"));
}
return parseInt(this.html.clientHeight);
};
draw2d.Label.prototype.getText=function(){
return this.msg;
};
draw2d.Label.prototype.setText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createTextNode(this.msg);
this.html.appendChild(this.textNode);
};
draw2d.Label.prototype.setStyledText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createElement("div");
this.textNode.style.whiteSpace="nowrap";
this.textNode.innerHTML=text;
this.html.appendChild(this.textNode);
};
draw2d.Oval=function(){
draw2d.VectorFigure.call(this);
};
draw2d.Oval.prototype=new draw2d.VectorFigure();
draw2d.Oval.prototype.type="draw2d.Oval";
draw2d.Oval.prototype.paint=function(){
if(this.html===null){
return;
}
try{
draw2d.VectorFigure.prototype.paint.call(this);
this.graphics.setStroke(this.stroke);
if(this.bgColor!==null){
this.graphics.setColor(this.bgColor.getHTMLStyle());
this.graphics.fillOval(0,0,this.getWidth()-1,this.getHeight()-1);
}
if(this.lineColor!==null){
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.graphics.drawOval(0,0,this.getWidth()-1,this.getHeight()-1);
}
this.graphics.paint();
}
catch(e){
pushErrorStack(e,"draw2d.Oval.prototype.paint=function()");
}
};
draw2d.Circle=function(_25fd){
draw2d.Oval.call(this);
if(_25fd){
this.setDimension(_25fd,_25fd);
}
};
draw2d.Circle.prototype=new draw2d.Oval();
draw2d.Circle.prototype.type="draw2d.Circle";
draw2d.Circle.prototype.setDimension=function(w,h){
if(w>h){
draw2d.Oval.prototype.setDimension.call(this,w,w);
}else{
draw2d.Oval.prototype.setDimension.call(this,h,h);
}
};
draw2d.Circle.prototype.isStrechable=function(){
return false;
};
draw2d.Rectangle=function(width,_1799){
this.bgColor=null;
this.lineColor=new draw2d.Color(0,0,0);
this.lineStroke=1;
draw2d.Figure.call(this);
if(width&&_1799){
this.setDimension(width,_1799);
}
};
draw2d.Rectangle.prototype=new draw2d.Figure();
draw2d.Rectangle.prototype.type="draw2d.Rectangle";
draw2d.Rectangle.prototype.dispose=function(){
draw2d.Figure.prototype.dispose.call(this);
this.bgColor=null;
this.lineColor=null;
};
draw2d.Rectangle.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
item.style.width="auto";
item.style.height="auto";
item.style.margin="0px";
item.style.padding="0px";
item.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
item.style.fontSize="1px";
item.style.lineHeight="1px";
item.innerHTML="&nbsp";
if(this.bgColor!==null){
item.style.backgroundColor=this.bgColor.getHTMLStyle();
}
return item;
};
draw2d.Rectangle.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
draw2d.Rectangle.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.Rectangle.prototype.setColor=function(color){
this.lineColor=color;
if(this.lineColor!==null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border=this.lineStroke+"0px";
}
};
draw2d.Rectangle.prototype.getColor=function(){
return this.lineColor;
};
draw2d.Rectangle.prototype.getWidth=function(){
return draw2d.Figure.prototype.getWidth.call(this)+2*this.lineStroke;
};
draw2d.Rectangle.prototype.getHeight=function(){
return draw2d.Figure.prototype.getHeight.call(this)+2*this.lineStroke;
};
draw2d.Rectangle.prototype.setDimension=function(w,h){
draw2d.Figure.prototype.setDimension.call(this,w-2*this.lineStroke,h-2*this.lineStroke);
};
draw2d.Rectangle.prototype.setLineWidth=function(w){
var diff=w-this.lineStroke;
this.setDimension(this.getWidth()-2*diff,this.getHeight()-2*diff);
this.lineStroke=w;
var c="transparent";
if(this.lineColor!==null){
c=this.lineColor.getHTMLStyle();
}
this.html.style.border=this.lineStroke+"px solid "+c;
};
draw2d.Rectangle.prototype.getLineWidth=function(){
return this.lineStroke;
};
draw2d.ImageFigure=function(url){
if(url===undefined){
url=null;
}
this.url=url;
draw2d.Node.call(this);
this.setDimension(40,40);
};
draw2d.ImageFigure.prototype=new draw2d.Node;
draw2d.ImageFigure.prototype.type="draw2d.Image";
draw2d.ImageFigure.prototype.createHTMLElement=function(){
var item=draw2d.Node.prototype.createHTMLElement.call(this);
item.style.width=this.width+"px";
item.style.height=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.border="0px";
if(this.url!==null){
item.style.backgroundImage="url("+this.url+")";
}else{
item.style.backgroundImage="";
}
return item;
};
draw2d.ImageFigure.prototype.setColor=function(color){
};
draw2d.ImageFigure.prototype.isResizeable=function(){
return false;
};
draw2d.ImageFigure.prototype.setImage=function(url){
if(url===undefined){
url=null;
}
this.url=url;
if(this.url!==null){
this.html.style.backgroundImage="url("+this.url+")";
}else{
this.html.style.backgroundImage="";
}
};
draw2d.Port=function(_1728,_1729){
Corona=function(){
};
Corona.prototype=new draw2d.Circle();
Corona.prototype.setAlpha=function(_172a){
draw2d.Circle.prototype.setAlpha.call(this,Math.min(0.3,_172a));
this.setDeleteable(false);
this.setCanDrag(false);
this.setResizeable(false);
this.setSelectable(false);
};
if(_1728===null||_1728===undefined){
this.currentUIRepresentation=new draw2d.Circle();
}else{
this.currentUIRepresentation=_1728;
}
if(_1729===null||_1729===undefined){
this.connectedUIRepresentation=new draw2d.Circle();
this.connectedUIRepresentation.setColor(null);
}else{
this.connectedUIRepresentation=_1729;
}
this.disconnectedUIRepresentation=this.currentUIRepresentation;
this.hideIfConnected=false;
this.uiRepresentationAdded=true;
this.parentNode=null;
this.originX=0;
this.originY=0;
this.coronaWidth=10;
this.corona=null;
draw2d.Rectangle.call(this);
this.setDimension(8,8);
this.setBackgroundColor(new draw2d.Color(100,180,100));
this.setColor(new draw2d.Color(90,150,90));
draw2d.Rectangle.prototype.setColor.call(this,null);
this.dropable=new draw2d.DropTarget(this.html);
this.dropable.node=this;
this.dropable.addEventListener("dragenter",function(_172b){
_172b.target.node.onDragEnter(_172b.relatedTarget.node);
});
this.dropable.addEventListener("dragleave",function(_172c){
_172c.target.node.onDragLeave(_172c.relatedTarget.node);
});
this.dropable.addEventListener("drop",function(_172d){
_172d.relatedTarget.node.onDrop(_172d.target.node);
});
};
draw2d.Port.prototype=new draw2d.Rectangle();
draw2d.Port.prototype.type="draw2d.Port";
draw2d.Port.ZOrderBaseIndex=5000;
draw2d.Port.setZOrderBaseIndex=function(index){
draw2d.Port.ZOrderBaseIndex=index;
};
draw2d.Port.prototype.setHideIfConnected=function(flag){
this.hideIfConnected=flag;
};
draw2d.Port.prototype.dispose=function(){
var size=this.moveListener.getSize();
for(var i=0;i<size;i++){
var _1732=this.moveListener.get(i);
this.parentNode.workflow.removeFigure(_1732);
_1732.dispose();
}
draw2d.Rectangle.prototype.dispose.call(this);
this.parentNode=null;
this.dropable.node=null;
this.dropable=null;
this.disconnectedUIRepresentation.dispose();
this.connectedUIRepresentation.dispose();
};
draw2d.Port.prototype.createHTMLElement=function(){
var item=draw2d.Rectangle.prototype.createHTMLElement.call(this);
item.style.zIndex=draw2d.Port.ZOrderBaseIndex;
this.currentUIRepresentation.html.zIndex=draw2d.Port.ZOrderBaseIndex;
item.appendChild(this.currentUIRepresentation.html);
this.uiRepresentationAdded=true;
return item;
};
draw2d.Port.prototype.setUiRepresentation=function(_1734){
if(_1734===null){
_1734=new draw2d.Figure();
}
if(this.uiRepresentationAdded){
this.html.removeChild(this.currentUIRepresentation.getHTMLElement());
}
this.html.appendChild(_1734.getHTMLElement());
_1734.paint();
this.currentUIRepresentation=_1734;
};
draw2d.Port.prototype.onMouseEnter=function(){
this.setLineWidth(2);
};
draw2d.Port.prototype.onMouseLeave=function(){
this.setLineWidth(0);
};
draw2d.Port.prototype.setDimension=function(width,_1736){
draw2d.Rectangle.prototype.setDimension.call(this,width,_1736);
this.connectedUIRepresentation.setDimension(width,_1736);
this.disconnectedUIRepresentation.setDimension(width,_1736);
this.setPosition(this.x,this.y);
};
draw2d.Port.prototype.setBackgroundColor=function(color){
this.currentUIRepresentation.setBackgroundColor(color);
};
draw2d.Port.prototype.getBackgroundColor=function(){
return this.currentUIRepresentation.getBackgroundColor();
};
draw2d.Port.prototype.getConnections=function(){
var _1738=new draw2d.ArrayList();
var size=this.moveListener.getSize();
for(var i=0;i<size;i++){
var _173b=this.moveListener.get(i);
if(_173b instanceof draw2d.Connection){
_1738.add(_173b);
}
}
return _1738;
};
draw2d.Port.prototype.setColor=function(color){
this.currentUIRepresentation.setColor(color);
};
draw2d.Port.prototype.getColor=function(){
return this.currentUIRepresentation.getColor();
};
draw2d.Port.prototype.setLineWidth=function(width){
this.currentUIRepresentation.setLineWidth(width);
};
draw2d.Port.prototype.getLineWidth=function(){
return this.currentUIRepresentation.getLineWidth();
};
draw2d.Port.prototype.paint=function(){
try{
this.currentUIRepresentation.paint();
}
catch(e){
pushErrorStack(e,"draw2d.Port.prototype.paint=function()");
}
};
draw2d.Port.prototype.setPosition=function(xPos,yPos){
this.originX=xPos;
this.originY=yPos;
draw2d.Rectangle.prototype.setPosition.call(this,xPos,yPos);
if(this.html===null){
return;
}
this.html.style.left=(this.x-this.getWidth()/2)+"px";
this.html.style.top=(this.y-this.getHeight()/2)+"px";
};
draw2d.Port.prototype.setParent=function(_1740){
if(this.parentNode!==null){
this.parentNode.detachMoveListener(this);
}
this.parentNode=_1740;
if(this.parentNode!==null){
this.parentNode.attachMoveListener(this);
}
};
draw2d.Port.prototype.attachMoveListener=function(_1741){
draw2d.Rectangle.prototype.attachMoveListener.call(this,_1741);
if(this.hideIfConnected==true){
this.setUiRepresentation(this.connectedUIRepresentation);
}
};
draw2d.Port.prototype.detachMoveListener=function(_1742){
draw2d.Rectangle.prototype.detachMoveListener.call(this,_1742);
if(this.getConnections().getSize()==0){
this.setUiRepresentation(this.disconnectedUIRepresentation);
}
};
draw2d.Port.prototype.getParent=function(){
return this.parentNode;
};
draw2d.Port.prototype.onDrag=function(){
draw2d.Rectangle.prototype.onDrag.call(this);
this.parentNode.workflow.showConnectionLine(this.parentNode.x+this.x,this.parentNode.y+this.y,this.parentNode.x+this.originX,this.parentNode.y+this.originY);
};
draw2d.Port.prototype.getCoronaWidth=function(){
return this.coronaWidth;
};
draw2d.Port.prototype.setCoronaWidth=function(width){
this.coronaWidth=width;
};
draw2d.Port.prototype.setOrigin=function(x,y){
this.originX=x;
this.originY=y;
};
draw2d.Port.prototype.onDragend=function(){
this.setAlpha(1);
this.setPosition(this.originX,this.originY);
this.parentNode.workflow.hideConnectionLine();
document.body.focus();
};
draw2d.Port.prototype.onDragEnter=function(port){
var _1747=new draw2d.EditPolicy(draw2d.EditPolicy.CONNECT);
_1747.canvas=this.parentNode.workflow;
_1747.source=port;
_1747.target=this;
var _1748=this.createCommand(_1747);
if(_1748===null){
return;
}
this.parentNode.workflow.connectionLine.setColor(new draw2d.Color(0,150,0));
this.parentNode.workflow.connectionLine.setLineWidth(3);
this.showCorona(true);
};
draw2d.Port.prototype.onDragLeave=function(port){
this.parentNode.workflow.connectionLine.setColor(new draw2d.Color(0,0,0));
this.parentNode.workflow.connectionLine.setLineWidth(1);
this.showCorona(false);
};
draw2d.Port.prototype.onDrop=function(port){
var _174b=new draw2d.EditPolicy(draw2d.EditPolicy.CONNECT);
_174b.canvas=this.parentNode.workflow;
_174b.source=port;
_174b.target=this;
var _174c=this.createCommand(_174b);
if(_174c!==null){
this.parentNode.workflow.getCommandStack().execute(_174c);
}
};
draw2d.Port.prototype.getAbsolutePosition=function(){
return new draw2d.Point(this.getAbsoluteX(),this.getAbsoluteY());
};
draw2d.Port.prototype.getAbsoluteBounds=function(){
return new draw2d.Dimension(this.getAbsoluteX(),this.getAbsoluteY(),this.getWidth(),this.getHeight());
};
draw2d.Port.prototype.getAbsoluteY=function(){
return this.originY+this.parentNode.getY();
};
draw2d.Port.prototype.getAbsoluteX=function(){
return this.originX+this.parentNode.getX();
};
draw2d.Port.prototype.onOtherFigureMoved=function(_174d){
this.fireMoveEvent();
};
draw2d.Port.prototype.getName=function(){
return this.name;
};
draw2d.Port.prototype.setName=function(name){
this.name=name;
};
draw2d.Port.prototype.isOver=function(iX,iY){
var x=this.getAbsoluteX()-this.coronaWidth-this.getWidth()/2;
var y=this.getAbsoluteY()-this.coronaWidth-this.getHeight()/2;
var iX2=x+this.width+(this.coronaWidth*2);
var iY2=y+this.height+(this.coronaWidth*2);
return (iX>=x&&iX<=iX2&&iY>=y&&iY<=iY2);
};
draw2d.Port.prototype.showCorona=function(flag,_1756){
if(flag===true){
this.corona=new Corona();
this.corona.setAlpha(0.3);
this.corona.setBackgroundColor(new draw2d.Color(0,125,125));
this.corona.setColor(null);
this.corona.setDimension(this.getWidth()+(this.getCoronaWidth()*2),this.getWidth()+(this.getCoronaWidth()*2));
this.parentNode.getWorkflow().addFigure(this.corona,this.getAbsoluteX()-this.getCoronaWidth()-this.getWidth()/2,this.getAbsoluteY()-this.getCoronaWidth()-this.getHeight()/2);
}else{
if(flag===false&&this.corona!==null){
this.parentNode.getWorkflow().removeFigure(this.corona);
this.corona=null;
}
}
};
draw2d.Port.prototype.createCommand=function(_1757){
if(_1757.getPolicy()===draw2d.EditPolicy.MOVE){
if(!this.canDrag){
return null;
}
return new draw2d.CommandMovePort(this);
}
if(_1757.getPolicy()===draw2d.EditPolicy.CONNECT){
if(_1757.source.parentNode.id===_1757.target.parentNode.id){
return null;
}else{
return new draw2d.CommandConnect(_1757.canvas,_1757.source,_1757.target);
}
}
return null;
};
draw2d.InputPort=function(_2875){
draw2d.Port.call(this,_2875);
};
draw2d.InputPort.prototype=new draw2d.Port();
draw2d.InputPort.prototype.type="draw2d.InputPort";
draw2d.InputPort.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
return true;
};
draw2d.InputPort.prototype.onDragEnter=function(port){
if(port instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragEnter.call(this,port);
}else{
if(port instanceof draw2d.LineStartResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragEnter.call(this,line.getTarget());
}
}else{
if(port instanceof draw2d.LineEndResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragEnter.call(this,line.getSource());
}
}
}
}
};
draw2d.InputPort.prototype.onDragLeave=function(port){
if(port instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragLeave.call(this,port);
}else{
if(port instanceof draw2d.LineStartResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragLeave.call(this,line.getTarget());
}
}else{
if(port instanceof draw2d.LineEndResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragLeave.call(this,line.getSource());
}
}
}
}
};
draw2d.InputPort.prototype.createCommand=function(_287c){
if(_287c.getPolicy()==draw2d.EditPolicy.CONNECT){
if(_287c.source.parentNode.id==_287c.target.parentNode.id){
return null;
}
if(_287c.source instanceof draw2d.OutputPort){
return new draw2d.CommandConnect(_287c.canvas,_287c.source,_287c.target);
}
return null;
}
return draw2d.Port.prototype.createCommand.call(this,_287c);
};
draw2d.OutputPort=function(_2952){
draw2d.Port.call(this,_2952);
this.maxFanOut=100;
};
draw2d.OutputPort.prototype=new draw2d.Port();
draw2d.OutputPort.prototype.type="draw2d.OutputPort";
draw2d.OutputPort.prototype.onDragEnter=function(port){
if(this.getMaxFanOut()<=this.getFanOut()){
return;
}
if(port instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragEnter.call(this,port);
}else{
if(port instanceof draw2d.LineStartResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragEnter.call(this,line.getTarget());
}
}else{
if(port instanceof draw2d.LineEndResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragEnter.call(this,line.getSource());
}
}
}
}
};
draw2d.OutputPort.prototype.onDragLeave=function(port){
if(port instanceof draw2d.InputPort){
draw2d.Port.prototype.onDragLeave.call(this,port);
}else{
if(port instanceof draw2d.LineStartResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getSource() instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragLeave.call(this,line.getTarget());
}
}else{
if(port instanceof draw2d.LineEndResizeHandle){
var line=this.workflow.currentSelection;
if(line instanceof draw2d.Connection&&line.getTarget() instanceof draw2d.OutputPort){
draw2d.Port.prototype.onDragLeave.call(this,line.getSource());
}
}
}
}
};
draw2d.OutputPort.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
if(this.maxFanOut===-1){
return true;
}
if(this.getMaxFanOut()<=this.getFanOut()){
return false;
}
return true;
};
draw2d.OutputPort.prototype.setMaxFanOut=function(count){
this.maxFanOut=count;
};
draw2d.OutputPort.prototype.getMaxFanOut=function(){
return this.maxFanOut;
};
draw2d.OutputPort.prototype.getFanOut=function(){
if(this.getParent().workflow===null){
return 0;
}
var count=0;
var lines=this.getParent().workflow.getLines();
var size=lines.getSize();
for(var i=0;i<size;i++){
var line=lines.get(i);
if(line instanceof draw2d.Connection){
if(line.getSource()==this){
count++;
}else{
if(line.getTarget()==this){
count++;
}
}
}
}
return count;
};
draw2d.OutputPort.prototype.createCommand=function(_295f){
if(_295f.getPolicy()===draw2d.EditPolicy.CONNECT){
if(_295f.source.parentNode.id===_295f.target.parentNode.id){
return null;
}
if(_295f.source instanceof draw2d.InputPort){
return new draw2d.CommandConnect(_295f.canvas,_295f.target,_295f.source);
}
return null;
}
return draw2d.Port.prototype.createCommand.call(this,_295f);
};
draw2d.Line=function(){
this.lineColor=new draw2d.Color(0,0,0);
this.stroke=1;
this.canvas=null;
this.parent=null;
this.workflow=null;
this.html=null;
this.graphics=null;
this.id=draw2d.UUID.create();
this.startX=30;
this.startY=30;
this.endX=100;
this.endY=100;
this.alpha=1;
this.isMoving=false;
this.model=null;
this.zOrder=draw2d.Line.ZOrderBaseIndex;
this.corona=draw2d.Line.CoronaWidth;
this.properties={};
this.moveListener=new draw2d.ArrayList();
this.setSelectable(true);
this.setDeleteable(true);
};
draw2d.Line.prototype.type="draw2d.Line";
draw2d.Line.ZOrderBaseIndex=200;
draw2d.Line.CoronaWidth=5;
draw2d.Line.setZOrderBaseIndex=function(index){
draw2d.Line.ZOrderBaseIndex=index;
};
draw2d.Line.setDefaultCoronaWidth=function(width){
draw2d.Line.CoronaWidth=width;
};
draw2d.Line.prototype.dispose=function(){
this.canvas=null;
this.workflow=null;
if(this.graphics!==null){
this.graphics.clear();
}
this.graphics=null;
};
draw2d.Line.prototype.getZOrder=function(){
return this.zOrder;
};
draw2d.Line.prototype.setZOrder=function(index){
if(this.html!==null){
this.html.style.zIndex=index;
}
this.zOrder=index;
};
draw2d.Line.prototype.setCoronaWidth=function(width){
this.corona=width;
};
draw2d.Line.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left="0px";
item.style.top="0px";
item.style.height="0px";
item.style.width="0px";
item.style.zIndex=this.zOrder;
return item;
};
draw2d.Line.prototype.setId=function(id){
this.id=id;
if(this.html!==null){
this.html.id=id;
}
};
draw2d.Line.prototype.getId=function(){
return this.id;
};
draw2d.Line.prototype.getProperties=function(){
return this.properties;
};
draw2d.Line.prototype.getProperty=function(key){
return this.properties[key];
};
draw2d.Line.prototype.setProperty=function(key,value){
this.properties[key]=value;
this.setDocumentDirty();
};
draw2d.Line.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
}
return this.html;
};
draw2d.Line.prototype.getWorkflow=function(){
return this.workflow;
};
draw2d.Line.prototype.isResizeable=function(){
return true;
};
draw2d.Line.prototype.setCanvas=function(_2917){
this.canvas=_2917;
if(this.graphics!==null){
this.graphics.clear();
}
this.graphics=null;
};
draw2d.Line.prototype.setWorkflow=function(_2918){
this.workflow=_2918;
if(this.graphics!==null){
this.graphics.clear();
}
this.graphics=null;
};
draw2d.Line.prototype.paint=function(){
if(this.html===null){
return;
}
try{
if(this.graphics===null){
this.graphics=new jsGraphics(this.html);
}else{
this.graphics.clear();
}
this.graphics.setStroke(this.stroke);
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.graphics.drawLine(this.startX,this.startY,this.endX,this.endY);
this.graphics.paint();
}
catch(e){
pushErrorStack(e,"draw2d.Line.prototype.paint=function()");
}
};
draw2d.Line.prototype.attachMoveListener=function(_2919){
this.moveListener.add(_2919);
};
draw2d.Line.prototype.detachMoveListener=function(_291a){
this.moveListener.remove(_291a);
};
draw2d.Line.prototype.fireMoveEvent=function(){
var size=this.moveListener.getSize();
for(var i=0;i<size;i++){
this.moveListener.get(i).onOtherFigureMoved(this);
}
};
draw2d.Line.prototype.onOtherFigureMoved=function(_291d){
};
draw2d.Line.prototype.setLineWidth=function(w){
this.stroke=w;
if(this.graphics!==null){
this.paint();
}
this.setDocumentDirty();
};
draw2d.Line.prototype.setColor=function(color){
this.lineColor=color;
if(this.graphics!==null){
this.paint();
}
this.setDocumentDirty();
};
draw2d.Line.prototype.getColor=function(){
return this.lineColor;
};
draw2d.Line.prototype.setAlpha=function(_2920){
if(_2920==this.alpha){
return;
}
try{
this.html.style.MozOpacity=_2920;
}
catch(exc1){
}
try{
this.html.style.opacity=_2920;
}
catch(exc2){
}
try{
var _2921=Math.round(_2920*100);
if(_2921>=99){
this.html.style.filter="";
}else{
this.html.style.filter="alpha(opacity="+_2921+")";
}
}
catch(exc3){
}
this.alpha=_2920;
};
draw2d.Line.prototype.setStartPoint=function(x,y){
this.startX=x;
this.startY=y;
if(this.graphics!==null){
this.paint();
}
this.setDocumentDirty();
};
draw2d.Line.prototype.setEndPoint=function(x,y){
this.endX=x;
this.endY=y;
if(this.graphics!==null){
this.paint();
}
this.setDocumentDirty();
};
draw2d.Line.prototype.getStartX=function(){
return this.startX;
};
draw2d.Line.prototype.getStartY=function(){
return this.startY;
};
draw2d.Line.prototype.getStartPoint=function(){
return new draw2d.Point(this.startX,this.startY);
};
draw2d.Line.prototype.getEndX=function(){
return this.endX;
};
draw2d.Line.prototype.getEndY=function(){
return this.endY;
};
draw2d.Line.prototype.getEndPoint=function(){
return new draw2d.Point(this.endX,this.endY);
};
draw2d.Line.prototype.isSelectable=function(){
return this.selectable;
};
draw2d.Line.prototype.setSelectable=function(flag){
this.selectable=flag;
};
draw2d.Line.prototype.isDeleteable=function(){
return this.deleteable;
};
draw2d.Line.prototype.setDeleteable=function(flag){
this.deleteable=flag;
};
draw2d.Line.prototype.getLength=function(){
return Math.sqrt((this.startX-this.endX)*(this.startX-this.endX)+(this.startY-this.endY)*(this.startY-this.endY));
};
draw2d.Line.prototype.getAngle=function(){
var _2928=this.getLength();
var angle=-(180/Math.PI)*Math.asin((this.startY-this.endY)/_2928);
if(angle<0){
if(this.endX<this.startX){
angle=Math.abs(angle)+180;
}else{
angle=360-Math.abs(angle);
}
}else{
if(this.endX<this.startX){
angle=180-angle;
}
}
return angle;
};
draw2d.Line.prototype.createCommand=function(_292a){
if(_292a.getPolicy()==draw2d.EditPolicy.MOVE){
var x1=this.getStartX();
var y1=this.getStartY();
var x2=this.getEndX();
var y2=this.getEndY();
return new draw2d.CommandMoveLine(this,x1,y1,x2,y2);
}
if(_292a.getPolicy()==draw2d.EditPolicy.DELETE){
if(this.isDeleteable()==false){
return null;
}
return new draw2d.CommandDelete(this);
}
return null;
};
draw2d.Line.prototype.setModel=function(model){
if(this.model!==null){
this.model.removePropertyChangeListener(this);
}
this.model=model;
if(this.model!==null){
this.model.addPropertyChangeListener(this);
}
};
draw2d.Line.prototype.getModel=function(){
return this.model;
};
draw2d.Line.prototype.onRemove=function(_2930){
};
draw2d.Line.prototype.onContextMenu=function(x,y){
var menu=this.getContextMenu();
if(menu!==null){
this.workflow.showMenu(menu,x,y);
}
};
draw2d.Line.prototype.getContextMenu=function(){
return null;
};
draw2d.Line.prototype.onDoubleClick=function(){
};
draw2d.Line.prototype.setDocumentDirty=function(){
if(this.workflow!==null){
this.workflow.setDocumentDirty();
}
};
draw2d.Line.prototype.containsPoint=function(px,py){
return draw2d.Line.hit(this.corona,this.startX,this.startY,this.endX,this.endY,px,py);
};
draw2d.Line.hit=function(_2936,X1,Y1,X2,Y2,px,py){
X2-=X1;
Y2-=Y1;
px-=X1;
py-=Y1;
var _293d=px*X2+py*Y2;
var _293e;
if(_293d<=0){
_293e=0;
}else{
px=X2-px;
py=Y2-py;
_293d=px*X2+py*Y2;
if(_293d<=0){
_293e=0;
}else{
_293e=_293d*_293d/(X2*X2+Y2*Y2);
}
}
var lenSq=px*px+py*py-_293e;
if(lenSq<0){
lenSq=0;
}
return Math.sqrt(lenSq)<_2936;
};
draw2d.ConnectionRouter=function(){
};
draw2d.ConnectionRouter.prototype.type="draw2d.ConnectionRouter";
draw2d.ConnectionRouter.prototype.getDirection=function(r,p){
var _2053=Math.abs(r.x-p.x);
var _2054=3;
var i=Math.abs(r.y-p.y);
if(i<=_2053){
_2053=i;
_2054=0;
}
i=Math.abs(r.getBottom()-p.y);
if(i<=_2053){
_2053=i;
_2054=2;
}
i=Math.abs(r.getRight()-p.x);
if(i<_2053){
_2053=i;
_2054=1;
}
return _2054;
};
draw2d.ConnectionRouter.prototype.getEndDirection=function(conn){
var p=conn.getEndPoint();
var rect=conn.getTarget().getParent().getBounds();
return this.getDirection(rect,p);
};
draw2d.ConnectionRouter.prototype.getStartDirection=function(conn){
var p=conn.getStartPoint();
var rect=conn.getSource().getParent().getBounds();
return this.getDirection(rect,p);
};
draw2d.ConnectionRouter.prototype.route=function(_205c){
};
draw2d.NullConnectionRouter=function(){
};
draw2d.NullConnectionRouter.prototype=new draw2d.ConnectionRouter();
draw2d.NullConnectionRouter.prototype.type="draw2d.NullConnectionRouter";
draw2d.NullConnectionRouter.prototype.invalidate=function(){
};
draw2d.NullConnectionRouter.prototype.route=function(_27fa){
_27fa.addPoint(_27fa.getStartPoint());
_27fa.addPoint(_27fa.getEndPoint());
};
draw2d.ManhattanConnectionRouter=function(){
this.MINDIST=20;
};
draw2d.ManhattanConnectionRouter.prototype=new draw2d.ConnectionRouter();
draw2d.ManhattanConnectionRouter.prototype.type="draw2d.ManhattanConnectionRouter";
draw2d.ManhattanConnectionRouter.prototype.route=function(conn){
var _17a3=conn.getStartPoint();
var _17a4=this.getStartDirection(conn);
var toPt=conn.getEndPoint();
var toDir=this.getEndDirection(conn);
this._route(conn,toPt,toDir,_17a3,_17a4);
};
draw2d.ManhattanConnectionRouter.prototype._route=function(conn,_17a8,_17a9,toPt,toDir){
var TOL=0.1;
var _17ad=0.01;
var UP=0;
var RIGHT=1;
var DOWN=2;
var LEFT=3;
var xDiff=_17a8.x-toPt.x;
var yDiff=_17a8.y-toPt.y;
var point;
var dir;
if(((xDiff*xDiff)<(_17ad))&&((yDiff*yDiff)<(_17ad))){
conn.addPoint(new draw2d.Point(toPt.x,toPt.y));
return;
}
if(_17a9==LEFT){
if((xDiff>0)&&((yDiff*yDiff)<TOL)&&(toDir===RIGHT)){
point=toPt;
dir=toDir;
}else{
if(xDiff<0){
point=new draw2d.Point(_17a8.x-this.MINDIST,_17a8.y);
}else{
if(((yDiff>0)&&(toDir===DOWN))||((yDiff<0)&&(toDir==UP))){
point=new draw2d.Point(toPt.x,_17a8.y);
}else{
if(_17a9==toDir){
var pos=Math.min(_17a8.x,toPt.x)-this.MINDIST;
point=new draw2d.Point(pos,_17a8.y);
}else{
point=new draw2d.Point(_17a8.x-(xDiff/2),_17a8.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_17a9==RIGHT){
if((xDiff<0)&&((yDiff*yDiff)<TOL)&&(toDir===LEFT)){
point=toPt;
dir=toDir;
}else{
if(xDiff>0){
point=new draw2d.Point(_17a8.x+this.MINDIST,_17a8.y);
}else{
if(((yDiff>0)&&(toDir===DOWN))||((yDiff<0)&&(toDir===UP))){
point=new draw2d.Point(toPt.x,_17a8.y);
}else{
if(_17a9==toDir){
var pos=Math.max(_17a8.x,toPt.x)+this.MINDIST;
point=new draw2d.Point(pos,_17a8.y);
}else{
point=new draw2d.Point(_17a8.x-(xDiff/2),_17a8.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_17a9==DOWN){
if(((xDiff*xDiff)<TOL)&&(yDiff<0)&&(toDir==UP)){
point=toPt;
dir=toDir;
}else{
if(yDiff>0){
point=new draw2d.Point(_17a8.x,_17a8.y+this.MINDIST);
}else{
if(((xDiff>0)&&(toDir===RIGHT))||((xDiff<0)&&(toDir===LEFT))){
point=new draw2d.Point(_17a8.x,toPt.y);
}else{
if(_17a9===toDir){
var pos=Math.max(_17a8.y,toPt.y)+this.MINDIST;
point=new draw2d.Point(_17a8.x,pos);
}else{
point=new draw2d.Point(_17a8.x,_17a8.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}else{
if(_17a9==UP){
if(((xDiff*xDiff)<TOL)&&(yDiff>0)&&(toDir===DOWN)){
point=toPt;
dir=toDir;
}else{
if(yDiff<0){
point=new draw2d.Point(_17a8.x,_17a8.y-this.MINDIST);
}else{
if(((xDiff>0)&&(toDir===RIGHT))||((xDiff<0)&&(toDir===LEFT))){
point=new draw2d.Point(_17a8.x,toPt.y);
}else{
if(_17a9===toDir){
var pos=Math.min(_17a8.y,toPt.y)-this.MINDIST;
point=new draw2d.Point(_17a8.x,pos);
}else{
point=new draw2d.Point(_17a8.x,_17a8.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}
}
}
}
this._route(conn,point,dir,toPt,toDir);
conn.addPoint(_17a8);
};
draw2d.BezierConnectionRouter=function(_26a7){
if(!_26a7){
this.cheapRouter=new draw2d.ManhattanConnectionRouter();
}else{
this.cheapRouter=null;
}
this.iteration=5;
};
draw2d.BezierConnectionRouter.prototype=new draw2d.ConnectionRouter();
draw2d.BezierConnectionRouter.prototype.type="draw2d.BezierConnectionRouter";
draw2d.BezierConnectionRouter.prototype.drawBezier=function(_26a8,_26a9,t,iter){
var n=_26a8.length-1;
var q=[];
var _26ae=n+1;
for(var i=0;i<_26ae;i++){
q[i]=[];
q[i][0]=_26a8[i];
}
for(var j=1;j<=n;j++){
for(var i=0;i<=(n-j);i++){
q[i][j]=new draw2d.Point((1-t)*q[i][j-1].x+t*q[i+1][j-1].x,(1-t)*q[i][j-1].y+t*q[i+1][j-1].y);
}
}
var c1=[];
var c2=[];
for(var i=0;i<n+1;i++){
c1[i]=q[0][i];
c2[i]=q[i][n-i];
}
if(iter>=0){
this.drawBezier(c1,_26a9,t,--iter);
this.drawBezier(c2,_26a9,t,--iter);
}else{
for(var i=0;i<n;i++){
_26a9.push(q[i][n-i]);
}
}
};
draw2d.BezierConnectionRouter.prototype.route=function(conn){
if(this.cheapRouter!==null&&(conn.getSource().getParent().isMoving===true||conn.getTarget().getParent().isMoving===true)){
this.cheapRouter.route(conn);
return;
}
var _26b4=[];
var _26b5=conn.getStartPoint();
var toPt=conn.getEndPoint();
this._route(_26b4,conn,toPt,this.getEndDirection(conn),_26b5,this.getStartDirection(conn));
var _26b7=[];
this.drawBezier(_26b4,_26b7,0.5,this.iteration);
for(var i=0;i<_26b7.length;i++){
conn.addPoint(_26b7[i]);
}
conn.addPoint(toPt);
};
draw2d.BezierConnectionRouter.prototype._route=function(_26b9,conn,_26bb,_26bc,toPt,toDir){
var TOL=0.1;
var _26c0=0.01;
var _26c1=90;
var UP=0;
var RIGHT=1;
var DOWN=2;
var LEFT=3;
var xDiff=_26bb.x-toPt.x;
var yDiff=_26bb.y-toPt.y;
var point;
var dir;
if(((xDiff*xDiff)<(_26c0))&&((yDiff*yDiff)<(_26c0))){
_26b9.push(new draw2d.Point(toPt.x,toPt.y));
return;
}
if(_26bc===LEFT){
if((xDiff>0)&&((yDiff*yDiff)<TOL)&&(toDir===RIGHT)){
point=toPt;
dir=toDir;
}else{
if(xDiff<0){
point=new draw2d.Point(_26bb.x-_26c1,_26bb.y);
}else{
if(((yDiff>0)&&(toDir===DOWN))||((yDiff<0)&&(toDir===UP))){
point=new draw2d.Point(toPt.x,_26bb.y);
}else{
if(_26bc===toDir){
var pos=Math.min(_26bb.x,toPt.x)-_26c1;
point=new draw2d.Point(pos,_26bb.y);
}else{
point=new draw2d.Point(_26bb.x-(xDiff/2),_26bb.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_26bc===RIGHT){
if((xDiff<0)&&((yDiff*yDiff)<TOL)&&(toDir==LEFT)){
point=toPt;
dir=toDir;
}else{
if(xDiff>0){
point=new draw2d.Point(_26bb.x+_26c1,_26bb.y);
}else{
if(((yDiff>0)&&(toDir===DOWN))||((yDiff<0)&&(toDir===UP))){
point=new draw2d.Point(toPt.x,_26bb.y);
}else{
if(_26bc===toDir){
var pos=Math.max(_26bb.x,toPt.x)+_26c1;
point=new draw2d.Point(pos,_26bb.y);
}else{
point=new draw2d.Point(_26bb.x-(xDiff/2),_26bb.y);
}
}
}
if(yDiff>0){
dir=UP;
}else{
dir=DOWN;
}
}
}else{
if(_26bc===DOWN){
if(((xDiff*xDiff)<TOL)&&(yDiff<0)&&(toDir===UP)){
point=toPt;
dir=toDir;
}else{
if(yDiff>0){
point=new draw2d.Point(_26bb.x,_26bb.y+_26c1);
}else{
if(((xDiff>0)&&(toDir===RIGHT))||((xDiff<0)&&(toDir===LEFT))){
point=new draw2d.Point(_26bb.x,toPt.y);
}else{
if(_26bc===toDir){
var pos=Math.max(_26bb.y,toPt.y)+_26c1;
point=new draw2d.Point(_26bb.x,pos);
}else{
point=new draw2d.Point(_26bb.x,_26bb.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}else{
if(_26bc===UP){
if(((xDiff*xDiff)<TOL)&&(yDiff>0)&&(toDir===DOWN)){
point=toPt;
dir=toDir;
}else{
if(yDiff<0){
point=new draw2d.Point(_26bb.x,_26bb.y-_26c1);
}else{
if(((xDiff>0)&&(toDir===RIGHT))||((xDiff<0)&&(toDir===LEFT))){
point=new draw2d.Point(_26bb.x,toPt.y);
}else{
if(_26bc===toDir){
var pos=Math.min(_26bb.y,toPt.y)-_26c1;
point=new draw2d.Point(_26bb.x,pos);
}else{
point=new draw2d.Point(_26bb.x,_26bb.y-(yDiff/2));
}
}
}
if(xDiff>0){
dir=LEFT;
}else{
dir=RIGHT;
}
}
}
}
}
}
this._route(_26b9,conn,point,dir,toPt,toDir);
_26b9.push(_26bb);
};
draw2d.FanConnectionRouter=function(){
};
draw2d.FanConnectionRouter.prototype=new draw2d.NullConnectionRouter();
draw2d.FanConnectionRouter.prototype.type="draw2d.FanConnectionRouter";
draw2d.FanConnectionRouter.prototype.route=function(conn){
var _160b=conn.getStartPoint();
var toPt=conn.getEndPoint();
var lines=conn.getSource().getConnections();
var _160e=new draw2d.ArrayList();
var index=0;
for(var i=0;i<lines.getSize();i++){
var _1611=lines.get(i);
if(_1611.getTarget()==conn.getTarget()||_1611.getSource()==conn.getTarget()){
_160e.add(_1611);
if(conn==_1611){
index=_160e.getSize();
}
}
}
if(_160e.getSize()>1){
this.routeCollision(conn,index);
}else{
draw2d.NullConnectionRouter.prototype.route.call(this,conn);
}
};
draw2d.FanConnectionRouter.prototype.routeNormal=function(conn){
conn.addPoint(conn.getStartPoint());
conn.addPoint(conn.getEndPoint());
};
draw2d.FanConnectionRouter.prototype.routeCollision=function(conn,index){
var start=conn.getStartPoint();
var end=conn.getEndPoint();
conn.addPoint(start);
var _1617=10;
var _1618=new draw2d.Point((end.x+start.x)/2,(end.y+start.y)/2);
var _1619=end.getPosition(start);
var ray;
if(_1619==draw2d.PositionConstants.SOUTH||_1619==draw2d.PositionConstants.EAST){
ray=new draw2d.Point(end.x-start.x,end.y-start.y);
}else{
ray=new draw2d.Point(start.x-end.x,start.y-end.y);
}
var _161b=Math.sqrt(ray.x*ray.x+ray.y*ray.y);
var _161c=_1617*ray.x/_161b;
var _161d=_1617*ray.y/_161b;
var _161e;
if(index%2===0){
_161e=new draw2d.Point(_1618.x+(index/2)*(-1*_161d),_1618.y+(index/2)*_161c);
}else{
_161e=new draw2d.Point(_1618.x+(index/2)*_161d,_1618.y+(index/2)*(-1*_161c));
}
conn.addPoint(_161e);
conn.addPoint(end);
};
draw2d.Graphics=function(_2597,_2598,_2599){
this.jsGraphics=_2597;
this.xt=_2599.x;
this.yt=_2599.y;
this.radian=_2598*Math.PI/180;
this.sinRadian=Math.sin(this.radian);
this.cosRadian=Math.cos(this.radian);
};
draw2d.Graphics.prototype.setStroke=function(x){
this.jsGraphics.setStroke(x);
};
draw2d.Graphics.prototype.drawLine=function(x1,y1,x2,y2){
var _x1=this.xt+x1*this.cosRadian-y1*this.sinRadian;
var _y1=this.yt+x1*this.sinRadian+y1*this.cosRadian;
var _x2=this.xt+x2*this.cosRadian-y2*this.sinRadian;
var _y2=this.yt+x2*this.sinRadian+y2*this.cosRadian;
this.jsGraphics.drawLine(_x1,_y1,_x2,_y2);
};
draw2d.Graphics.prototype.fillRect=function(x,y,w,h){
var x1=this.xt+x*this.cosRadian-y*this.sinRadian;
var y1=this.yt+x*this.sinRadian+y*this.cosRadian;
var x2=this.xt+(x+w)*this.cosRadian-y*this.sinRadian;
var y2=this.yt+(x+w)*this.sinRadian+y*this.cosRadian;
var x3=this.xt+(x+w)*this.cosRadian-(y+h)*this.sinRadian;
var y3=this.yt+(x+w)*this.sinRadian+(y+h)*this.cosRadian;
var x4=this.xt+x*this.cosRadian-(y+h)*this.sinRadian;
var y4=this.yt+x*this.sinRadian+(y+h)*this.cosRadian;
this.jsGraphics.fillPolygon([x1,x2,x3,x4],[y1,y2,y3,y4]);
};
draw2d.Graphics.prototype.fillPolygon=function(_25af,_25b0){
var rotX=[];
var rotY=[];
for(var i=0;i<_25af.length;i++){
rotX[i]=this.xt+_25af[i]*this.cosRadian-_25b0[i]*this.sinRadian;
rotY[i]=this.yt+_25af[i]*this.sinRadian+_25b0[i]*this.cosRadian;
}
this.jsGraphics.fillPolygon(rotX,rotY);
};
draw2d.Graphics.prototype.setColor=function(color){
this.jsGraphics.setColor(color.getHTMLStyle());
};
draw2d.Graphics.prototype.drawPolygon=function(_25b5,_25b6){
var rotX=[];
var rotY=[];
for(var i=0;i<_25b5.length;i++){
rotX[i]=this.xt+_25b5[i]*this.cosRadian-_25b6[i]*this.sinRadian;
rotY[i]=this.yt+_25b5[i]*this.sinRadian+_25b6[i]*this.cosRadian;
}
this.jsGraphics.drawPolygon(rotX,rotY);
};
draw2d.Connection=function(){
draw2d.Line.call(this);
this.sourcePort=null;
this.targetPort=null;
this.canDrag=true;
this.sourceDecorator=null;
this.targetDecorator=null;
this.sourceAnchor=new draw2d.ConnectionAnchor();
this.targetAnchor=new draw2d.ConnectionAnchor();
this.router=draw2d.Connection.defaultRouter;
this.lineSegments=new draw2d.ArrayList();
this.children=new draw2d.ArrayList();
this.setColor(new draw2d.Color(0,0,115));
this.setLineWidth(1);
};
draw2d.Connection.prototype=new draw2d.Line();
draw2d.Connection.prototype.type="draw2d.Connection";
draw2d.Connection.defaultRouter=new draw2d.ManhattanConnectionRouter();
draw2d.Connection.setDefaultRouter=function(_20b2){
draw2d.Connection.defaultRouter=_20b2;
};
draw2d.Connection.prototype.disconnect=function(){
if(this.sourcePort!==null){
this.sourcePort.detachMoveListener(this);
this.fireSourcePortRouteEvent();
}
if(this.targetPort!==null){
this.targetPort.detachMoveListener(this);
this.fireTargetPortRouteEvent();
}
};
draw2d.Connection.prototype.reconnect=function(){
if(this.sourcePort!==null){
this.sourcePort.attachMoveListener(this);
this.fireSourcePortRouteEvent();
}
if(this.targetPort!==null){
this.targetPort.attachMoveListener(this);
this.fireTargetPortRouteEvent();
}
};
draw2d.Connection.prototype.isResizeable=function(){
return this.getCanDrag();
};
draw2d.Connection.prototype.setCanDrag=function(flag){
this.canDrag=flag;
};
draw2d.Connection.prototype.getCanDrag=function(){
return this.canDrag;
};
draw2d.Connection.prototype.addFigure=function(_20b4,_20b5){
var entry={};
entry.figure=_20b4;
entry.locator=_20b5;
this.children.add(entry);
if(this.graphics!==null){
this.paint();
}
var oThis=this;
var _20b8=function(){
var _20b9=arguments[0]||window.event;
_20b9.returnValue=false;
oThis.getWorkflow().setCurrentSelection(oThis);
oThis.getWorkflow().showLineResizeHandles(oThis);
};
if(_20b4.getHTMLElement().addEventListener){
_20b4.getHTMLElement().addEventListener("mousedown",_20b8,false);
}else{
if(_20b4.getHTMLElement().attachEvent){
_20b4.getHTMLElement().attachEvent("onmousedown",_20b8);
}
}
};
draw2d.Connection.prototype.setSourceDecorator=function(_20ba){
this.sourceDecorator=_20ba;
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.getSourceDecorator=function(){
return this.sourceDecorator;
};
draw2d.Connection.prototype.setTargetDecorator=function(_20bb){
this.targetDecorator=_20bb;
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.getTargetDecorator=function(){
return this.targetDecorator;
};
draw2d.Connection.prototype.setSourceAnchor=function(_20bc){
this.sourceAnchor=_20bc;
this.sourceAnchor.setOwner(this.sourcePort);
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.setTargetAnchor=function(_20bd){
this.targetAnchor=_20bd;
this.targetAnchor.setOwner(this.targetPort);
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.setRouter=function(_20be){
if(_20be!==null){
this.router=_20be;
}else{
this.router=new draw2d.NullConnectionRouter();
}
if(this.graphics!==null){
this.paint();
}
};
draw2d.Connection.prototype.getRouter=function(){
return this.router;
};
draw2d.Connection.prototype.setWorkflow=function(_20bf){
draw2d.Line.prototype.setWorkflow.call(this,_20bf);
for(var i=0;i<this.children.getSize();i++){
this.children.get(i).isAppended=false;
}
};
draw2d.Connection.prototype.paint=function(){
if(this.html===null){
return;
}
try{
for(var i=0;i<this.children.getSize();i++){
var entry=this.children.get(i);
if(entry.isAppended==true){
this.html.removeChild(entry.figure.getHTMLElement());
}
entry.isAppended=false;
}
if(this.graphics===null){
this.graphics=new jsGraphics(this.html);
}else{
this.graphics.clear();
}
this.graphics.setStroke(this.stroke);
this.graphics.setColor(this.lineColor.getHTMLStyle());
this.startStroke();
this.router.route(this);
if(this.getSource().getParent().isMoving==false&&this.getTarget().getParent().isMoving==false){
if(this.targetDecorator!==null){
this.targetDecorator.paint(new draw2d.Graphics(this.graphics,this.getEndAngle(),this.getEndPoint()));
}
if(this.sourceDecorator!==null){
this.sourceDecorator.paint(new draw2d.Graphics(this.graphics,this.getStartAngle(),this.getStartPoint()));
}
}
this.finishStroke();
for(var i=0;i<this.children.getSize();i++){
var entry=this.children.get(i);
this.html.appendChild(entry.figure.getHTMLElement());
entry.isAppended=true;
entry.locator.relocate(entry.figure);
}
}
catch(e){
pushErrorStack(e,"draw2d.Connection.prototype.paint=function()");
}
};
draw2d.Connection.prototype.getStartPoint=function(){
if(this.isMoving==false){
return this.sourceAnchor.getLocation(this.targetAnchor.getReferencePoint());
}else{
return draw2d.Line.prototype.getStartPoint.call(this);
}
};
draw2d.Connection.prototype.getEndPoint=function(){
if(this.isMoving==false){
return this.targetAnchor.getLocation(this.sourceAnchor.getReferencePoint());
}else{
return draw2d.Line.prototype.getEndPoint.call(this);
}
};
draw2d.Connection.prototype.startStroke=function(){
this.oldPoint=null;
this.lineSegments=new draw2d.ArrayList();
};
draw2d.Connection.prototype.finishStroke=function(){
this.graphics.paint();
this.oldPoint=null;
};
draw2d.Connection.prototype.getPoints=function(){
var _20c3=new draw2d.ArrayList();
var line=null;
for(var i=0;i<this.lineSegments.getSize();i++){
line=this.lineSegments.get(i);
_20c3.add(line.start);
}
if(line!==null){
_20c3.add(line.end);
}
return _20c3;
};
draw2d.Connection.prototype.addPoint=function(p){
p=new draw2d.Point(parseInt(p.x),parseInt(p.y));
if(this.oldPoint!==null){
this.graphics.drawLine(this.oldPoint.x,this.oldPoint.y,p.x,p.y);
var line={};
line.start=this.oldPoint;
line.end=p;
this.lineSegments.add(line);
}
this.oldPoint={};
this.oldPoint.x=p.x;
this.oldPoint.y=p.y;
};
draw2d.Connection.prototype.refreshSourcePort=function(){
var model=this.getModel().getSourceModel();
var _20c9=this.getModel().getSourcePortName();
var _20ca=this.getWorkflow().getDocument().getFigures();
var count=_20ca.getSize();
for(var i=0;i<count;i++){
var _20cd=_20ca.get(i);
if(_20cd.getModel()==model){
var port=_20cd.getOutputPort(_20c9);
this.setSource(port);
}
}
this.setRouter(this.getRouter());
};
draw2d.Connection.prototype.refreshTargetPort=function(){
var model=this.getModel().getTargetModel();
var _20d0=this.getModel().getTargetPortName();
var _20d1=this.getWorkflow().getDocument().getFigures();
var count=_20d1.getSize();
for(var i=0;i<count;i++){
var _20d4=_20d1.get(i);
if(_20d4.getModel()==model){
var port=_20d4.getInputPort(_20d0);
this.setTarget(port);
}
}
this.setRouter(this.getRouter());
};
draw2d.Connection.prototype.setSource=function(port){
if(this.sourcePort!==null){
this.sourcePort.detachMoveListener(this);
}
this.sourcePort=port;
if(this.sourcePort===null){
return;
}
this.sourceAnchor.setOwner(this.sourcePort);
this.fireSourcePortRouteEvent();
this.sourcePort.attachMoveListener(this);
this.setStartPoint(port.getAbsoluteX(),port.getAbsoluteY());
};
draw2d.Connection.prototype.getSource=function(){
return this.sourcePort;
};
draw2d.Connection.prototype.setTarget=function(port){
if(this.targetPort!==null){
this.targetPort.detachMoveListener(this);
}
this.targetPort=port;
if(this.targetPort===null){
return;
}
this.targetAnchor.setOwner(this.targetPort);
this.fireTargetPortRouteEvent();
this.targetPort.attachMoveListener(this);
this.setEndPoint(port.getAbsoluteX(),port.getAbsoluteY());
};
draw2d.Connection.prototype.getTarget=function(){
return this.targetPort;
};
draw2d.Connection.prototype.onOtherFigureMoved=function(_20d8){
if(_20d8==this.sourcePort){
this.setStartPoint(this.sourcePort.getAbsoluteX(),this.sourcePort.getAbsoluteY());
}else{
this.setEndPoint(this.targetPort.getAbsoluteX(),this.targetPort.getAbsoluteY());
}
};
draw2d.Connection.prototype.containsPoint=function(px,py){
for(var i=0;i<this.lineSegments.getSize();i++){
var line=this.lineSegments.get(i);
if(draw2d.Line.hit(this.corona,line.start.x,line.start.y,line.end.x,line.end.y,px,py)){
return true;
}
}
return false;
};
draw2d.Connection.prototype.getStartAngle=function(){
var p1=this.lineSegments.get(0).start;
var p2=this.lineSegments.get(0).end;
if(this.router instanceof draw2d.BezierConnectionRouter){
p2=this.lineSegments.get(5).end;
}
var _20df=Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
var angle=-(180/Math.PI)*Math.asin((p1.y-p2.y)/_20df);
if(angle<0){
if(p2.x<p1.x){
angle=Math.abs(angle)+180;
}else{
angle=360-Math.abs(angle);
}
}else{
if(p2.x<p1.x){
angle=180-angle;
}
}
return angle;
};
draw2d.Connection.prototype.getEndAngle=function(){
if(this.lineSegments.getSize()===0){
return 90;
}
var p1=this.lineSegments.get(this.lineSegments.getSize()-1).end;
var p2=this.lineSegments.get(this.lineSegments.getSize()-1).start;
if(this.router instanceof draw2d.BezierConnectionRouter){
p2=this.lineSegments.get(this.lineSegments.getSize()-5).end;
}
var _20e3=Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
var angle=-(180/Math.PI)*Math.asin((p1.y-p2.y)/_20e3);
if(angle<0){
if(p2.x<p1.x){
angle=Math.abs(angle)+180;
}else{
angle=360-Math.abs(angle);
}
}else{
if(p2.x<p1.x){
angle=180-angle;
}
}
return angle;
};
draw2d.Connection.prototype.fireSourcePortRouteEvent=function(){
var _20e5=this.sourcePort.getConnections();
for(var i=0;i<_20e5.getSize();i++){
_20e5.get(i).paint();
}
};
draw2d.Connection.prototype.fireTargetPortRouteEvent=function(){
var _20e7=this.targetPort.getConnections();
for(var i=0;i<_20e7.getSize();i++){
_20e7.get(i).paint();
}
};
draw2d.Connection.prototype.createCommand=function(_20e9){
if(_20e9.getPolicy()==draw2d.EditPolicy.MOVE){
return new draw2d.CommandReconnect(this);
}
if(_20e9.getPolicy()==draw2d.EditPolicy.DELETE){
if(this.isDeleteable()==true){
return new draw2d.CommandDelete(this);
}
return null;
}
return null;
};
draw2d.ConnectionAnchor=function(owner){
this.owner=owner;
};
draw2d.ConnectionAnchor.prototype.type="draw2d.ConnectionAnchor";
draw2d.ConnectionAnchor.prototype.getLocation=function(_2856){
return this.getReferencePoint();
};
draw2d.ConnectionAnchor.prototype.getOwner=function(){
return this.owner;
};
draw2d.ConnectionAnchor.prototype.setOwner=function(owner){
this.owner=owner;
};
draw2d.ConnectionAnchor.prototype.getBox=function(){
return this.getOwner().getAbsoluteBounds();
};
draw2d.ConnectionAnchor.prototype.getReferencePoint=function(){
if(this.getOwner()===null){
return null;
}else{
return this.getOwner().getAbsolutePosition();
}
};
draw2d.ChopboxConnectionAnchor=function(owner){
draw2d.ConnectionAnchor.call(this,owner);
};
draw2d.ChopboxConnectionAnchor.prototype=new draw2d.ConnectionAnchor();
draw2d.ChopboxConnectionAnchor.prototype.type="draw2d.ChopboxConnectionAnchor";
draw2d.ChopboxConnectionAnchor.prototype.getLocation=function(_2106){
var r=new draw2d.Dimension();
r.setBounds(this.getBox());
r.translate(-1,-1);
r.resize(1,1);
var _2108=r.x+r.w/2;
var _2109=r.y+r.h/2;
if(r.isEmpty()||(_2106.x==_2108&&_2106.y==_2109)){
return new Point(_2108,_2109);
}
var dx=_2106.x-_2108;
var dy=_2106.y-_2109;
var scale=0.5/Math.max(Math.abs(dx)/r.w,Math.abs(dy)/r.h);
dx*=scale;
dy*=scale;
_2108+=dx;
_2109+=dy;
return new draw2d.Point(Math.round(_2108),Math.round(_2109));
};
draw2d.ChopboxConnectionAnchor.prototype.getBox=function(){
return this.getOwner().getParent().getBounds();
};
draw2d.ChopboxConnectionAnchor.prototype.getReferencePoint=function(){
return this.getBox().getCenter();
};
draw2d.ConnectionDecorator=function(){
this.color=new draw2d.Color(0,0,0);
this.backgroundColor=new draw2d.Color(250,250,250);
};
draw2d.ConnectionDecorator.prototype.type="draw2d.ConnectionDecorator";
draw2d.ConnectionDecorator.prototype.paint=function(g){
};
draw2d.ConnectionDecorator.prototype.setColor=function(c){
this.color=c;
};
draw2d.ConnectionDecorator.prototype.setBackgroundColor=function(c){
this.backgroundColor=c;
};
draw2d.ArrowConnectionDecorator=function(_2098,width){
draw2d.ConnectionDecorator.call(this);
if(_2098===undefined||_2098<1){
this.lenght=15;
}
if(width===undefined||width<1){
this.width=10;
}
};
draw2d.ArrowConnectionDecorator.prototype=new draw2d.ConnectionDecorator();
draw2d.ArrowConnectionDecorator.prototype.type="draw2d.ArrowConnectionDecorator";
draw2d.ArrowConnectionDecorator.prototype.paint=function(g){
if(this.backgroundColor!==null){
g.setColor(this.backgroundColor);
g.fillPolygon([3,this.lenght,this.lenght,3],[0,(this.width/2),-(this.width/2),0]);
}
g.setColor(this.color);
g.setStroke(1);
g.drawPolygon([3,this.lenght,this.lenght,3],[0,(this.width/2),-(this.width/2),0]);
};
draw2d.ArrowConnectionDecorator.prototype.setDimension=function(l,width){
this.width=w;
this.lenght=l;
};
draw2d.CompartmentFigure=function(){
draw2d.Node.call(this);
this.children=new draw2d.ArrayList();
this.setBorder(new draw2d.LineBorder(1));
this.dropable=new draw2d.DropTarget(this.html);
this.dropable.node=this;
this.dropable.addEventListener("figureenter",function(_15d2){
_15d2.target.node.onFigureEnter(_15d2.relatedTarget.node);
});
this.dropable.addEventListener("figureleave",function(_15d3){
_15d3.target.node.onFigureLeave(_15d3.relatedTarget.node);
});
this.dropable.addEventListener("figuredrop",function(_15d4){
_15d4.target.node.onFigureDrop(_15d4.relatedTarget.node);
});
};
draw2d.CompartmentFigure.prototype=new draw2d.Node();
draw2d.CompartmentFigure.prototype.type="draw2d.CompartmentFigure";
draw2d.CompartmentFigure.prototype.onFigureEnter=function(_15d5){
};
draw2d.CompartmentFigure.prototype.onFigureLeave=function(_15d6){
};
draw2d.CompartmentFigure.prototype.onFigureDrop=function(_15d7){
};
draw2d.CompartmentFigure.prototype.getChildren=function(){
return this.children;
};
draw2d.CompartmentFigure.prototype.addChild=function(_15d8){
_15d8.setZOrder(this.getZOrder()+1);
_15d8.setParent(this);
this.children.add(_15d8);
};
draw2d.CompartmentFigure.prototype.removeChild=function(_15d9){
_15d9.setParent(null);
this.children.remove(_15d9);
};
draw2d.CompartmentFigure.prototype.setZOrder=function(index){
draw2d.Node.prototype.setZOrder.call(this,index);
for(var i=0;i<this.children.getSize();i++){
this.children.get(i).setZOrder(index+1);
}
};
draw2d.CompartmentFigure.prototype.setPosition=function(xPos,yPos){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Node.prototype.setPosition.call(this,xPos,yPos);
for(var i=0;i<this.children.getSize();i++){
var child=this.children.get(i);
child.setPosition(child.getX()+this.getX()-oldX,child.getY()+this.getY()-oldY);
}
};
draw2d.CompartmentFigure.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Node.prototype.onDrag.call(this);
for(var i=0;i<this.children.getSize();i++){
var child=this.children.get(i);
child.setPosition(child.getX()+this.getX()-oldX,child.getY()+this.getY()-oldY);
}
};
draw2d.CanvasDocument=function(_2c03){
this.canvas=_2c03;
};
draw2d.CanvasDocument.prototype.type="draw2d.CanvasDocument";
draw2d.CanvasDocument.prototype.getFigures=function(){
var _2c04=new draw2d.ArrayList();
var _2c05=this.canvas.figures;
var _2c06=this.canvas.dialogs;
for(var i=0;i<_2c05.getSize();i++){
var _2c08=_2c05.get(i);
if(_2c06.indexOf(_2c08)==-1&&_2c08.getParent()===null&&!(_2c08 instanceof draw2d.WindowFigure)){
_2c04.add(_2c08);
}
}
return _2c04;
};
draw2d.CanvasDocument.prototype.getFigure=function(id){
return this.canvas.getFigure(id);
};
draw2d.CanvasDocument.prototype.getLines=function(){
return this.canvas.getLines();
};
draw2d.CanvasDocument.prototype.getLine=function(id){
return this.canvas.getLine(id);
};
draw2d.Annotation=function(msg){
this.msg=msg;
this.alpha=1;
this.color=new draw2d.Color(0,0,0);
this.bgColor=new draw2d.Color(241,241,121);
this.fontSize=10;
this.textNode=null;
draw2d.Figure.call(this);
};
draw2d.Annotation.prototype=new draw2d.Figure();
draw2d.Annotation.prototype.type="draw2d.Annotation";
draw2d.Annotation.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
item.style.color=this.color.getHTMLStyle();
item.style.backgroundColor=this.bgColor.getHTMLStyle();
item.style.fontSize=this.fontSize+"pt";
item.style.width="auto";
item.style.height="auto";
item.style.margin="0px";
item.style.padding="0px";
item.onselectstart=function(){
return false;
};
item.unselectable="on";
item.style.cursor="default";
this.textNode=document.createTextNode(this.msg);
item.appendChild(this.textNode);
this.disableTextSelection(item);
return item;
};
draw2d.Annotation.prototype.onDoubleClick=function(){
var _2881=new draw2d.AnnotationDialog(this);
this.workflow.showDialog(_2881);
};
draw2d.Annotation.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
}
};
draw2d.Annotation.prototype.getBackgroundColor=function(){
return this.bgColor;
};
draw2d.Annotation.prototype.setFontSize=function(size){
this.fontSize=size;
this.html.style.fontSize=this.fontSize+"pt";
};
draw2d.Annotation.prototype.getText=function(){
return this.msg;
};
draw2d.Annotation.prototype.setText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createTextNode(this.msg);
this.html.appendChild(this.textNode);
};
draw2d.Annotation.prototype.setStyledText=function(text){
this.msg=text;
this.html.removeChild(this.textNode);
this.textNode=document.createElement("div");
this.textNode.innerHTML=text;
this.html.appendChild(this.textNode);
};
draw2d.ResizeHandle=function(_2a54,type){
draw2d.Rectangle.call(this,5,5);
this.type=type;
var _2a56=this.getWidth();
var _2a57=_2a56/2;
switch(this.type){
case 1:
this.setSnapToGridAnchor(new draw2d.Point(_2a56,_2a56));
break;
case 2:
this.setSnapToGridAnchor(new draw2d.Point(_2a57,_2a56));
break;
case 3:
this.setSnapToGridAnchor(new draw2d.Point(0,_2a56));
break;
case 4:
this.setSnapToGridAnchor(new draw2d.Point(0,_2a57));
break;
case 5:
this.setSnapToGridAnchor(new draw2d.Point(0,0));
break;
case 6:
this.setSnapToGridAnchor(new draw2d.Point(_2a57,0));
break;
case 7:
this.setSnapToGridAnchor(new draw2d.Point(_2a56,0));
break;
case 8:
this.setSnapToGridAnchor(new draw2d.Point(_2a56,_2a57));
case 9:
this.setSnapToGridAnchor(new draw2d.Point(_2a57,_2a57));
break;
}
this.setBackgroundColor(new draw2d.Color(0,255,0));
this.setWorkflow(_2a54);
this.setZOrder(10000);
};
draw2d.ResizeHandle.prototype=new draw2d.Rectangle();
draw2d.ResizeHandle.prototype.type="draw2d.ResizeHandle";
draw2d.ResizeHandle.prototype.getSnapToDirection=function(){
switch(this.type){
case 1:
return draw2d.SnapToHelper.NORTH_WEST;
case 2:
return draw2d.SnapToHelper.NORTH;
case 3:
return draw2d.SnapToHelper.NORTH_EAST;
case 4:
return draw2d.SnapToHelper.EAST;
case 5:
return draw2d.SnapToHelper.SOUTH_EAST;
case 6:
return draw2d.SnapToHelper.SOUTH;
case 7:
return draw2d.SnapToHelper.SOUTH_WEST;
case 8:
return draw2d.SnapToHelper.WEST;
case 9:
return draw2d.SnapToHelper.CENTER;
}
};
draw2d.ResizeHandle.prototype.onDragend=function(){
var _2a58=this.workflow.currentSelection;
if(this.commandMove!==null){
this.commandMove.setPosition(_2a58.getX(),_2a58.getY());
this.workflow.getCommandStack().execute(this.commandMove);
this.commandMove=null;
}
if(this.commandResize!==null){
this.commandResize.setDimension(_2a58.getWidth(),_2a58.getHeight());
this.workflow.getCommandStack().execute(this.commandResize);
this.commandResize=null;
}
this.workflow.hideSnapToHelperLines();
};
draw2d.ResizeHandle.prototype.setPosition=function(xPos,yPos){
this.x=xPos;
this.y=yPos;
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
};
draw2d.ResizeHandle.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
var _2a5d=this.workflow.currentSelection;
this.commandMove=_2a5d.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
this.commandResize=_2a5d.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.RESIZE));
return true;
};
draw2d.ResizeHandle.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Rectangle.prototype.onDrag.call(this);
var diffX=oldX-this.getX();
var diffY=oldY-this.getY();
var _2a62=this.workflow.currentSelection.getX();
var _2a63=this.workflow.currentSelection.getY();
var _2a64=this.workflow.currentSelection.getWidth();
var _2a65=this.workflow.currentSelection.getHeight();
switch(this.type){
case 1:
this.workflow.currentSelection.setPosition(_2a62-diffX,_2a63-diffY);
this.workflow.currentSelection.setDimension(_2a64+diffX,_2a65+diffY);
break;
case 2:
this.workflow.currentSelection.setPosition(_2a62,_2a63-diffY);
this.workflow.currentSelection.setDimension(_2a64,_2a65+diffY);
break;
case 3:
this.workflow.currentSelection.setPosition(_2a62,_2a63-diffY);
this.workflow.currentSelection.setDimension(_2a64-diffX,_2a65+diffY);
break;
case 4:
this.workflow.currentSelection.setPosition(_2a62,_2a63);
this.workflow.currentSelection.setDimension(_2a64-diffX,_2a65);
break;
case 5:
this.workflow.currentSelection.setPosition(_2a62,_2a63);
this.workflow.currentSelection.setDimension(_2a64-diffX,_2a65-diffY);
break;
case 6:
this.workflow.currentSelection.setPosition(_2a62,_2a63);
this.workflow.currentSelection.setDimension(_2a64,_2a65-diffY);
break;
case 7:
this.workflow.currentSelection.setPosition(_2a62-diffX,_2a63);
this.workflow.currentSelection.setDimension(_2a64+diffX,_2a65-diffY);
break;
case 8:
this.workflow.currentSelection.setPosition(_2a62-diffX,_2a63);
this.workflow.currentSelection.setDimension(_2a64+diffX,_2a65);
break;
}
this.workflow.moveResizeHandles(this.workflow.getCurrentSelection());
};
draw2d.ResizeHandle.prototype.setCanDrag=function(flag){
draw2d.Rectangle.prototype.setCanDrag.call(this,flag);
if(this.html===null){
return;
}
if(!flag){
this.html.style.cursor="";
return;
}
switch(this.type){
case 1:
this.html.style.cursor="nw-resize";
break;
case 2:
this.html.style.cursor="s-resize";
break;
case 3:
this.html.style.cursor="ne-resize";
break;
case 4:
this.html.style.cursor="w-resize";
break;
case 5:
this.html.style.cursor="se-resize";
break;
case 6:
this.html.style.cursor="n-resize";
break;
case 7:
this.html.style.cursor="sw-resize";
break;
case 8:
this.html.style.cursor="e-resize";
break;
case 9:
this.html.style.cursor="resize";
break;
}
};
draw2d.ResizeHandle.prototype.onKeyDown=function(_2a67,ctrl){
this.workflow.onKeyDown(_2a67,ctrl);
};
draw2d.ResizeHandle.prototype.fireMoveEvent=function(){
};
draw2d.LineStartResizeHandle=function(_284a){
draw2d.ResizeHandle.call(this,_284a,9);
this.setDimension(10,10);
this.setBackgroundColor(new draw2d.Color(100,255,0));
this.setZOrder(10000);
};
draw2d.LineStartResizeHandle.prototype=new draw2d.ResizeHandle();
draw2d.LineStartResizeHandle.prototype.type="draw2d.LineStartResizeHandle";
draw2d.LineStartResizeHandle.prototype.onDragend=function(){
if(this.workflow.currentSelection instanceof draw2d.Connection){
if(this.command!==null){
this.command.cancel();
}
}else{
if(this.command!==null){
this.getWorkflow().getCommandStack().execute(this.command);
}
}
this.command=null;
};
draw2d.LineStartResizeHandle.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
this.command=this.workflow.currentSelection.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
return this.command!==null;
};
draw2d.LineStartResizeHandle.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Rectangle.prototype.onDrag.call(this);
var diffX=oldX-this.getX();
var diffY=oldY-this.getY();
var _2851=this.workflow.currentSelection.getStartPoint();
var line=this.workflow.currentSelection;
line.setStartPoint(_2851.x-diffX,_2851.y-diffY);
line.isMoving=true;
};
draw2d.LineStartResizeHandle.prototype.onDrop=function(_2853){
var line=this.workflow.currentSelection;
line.isMoving=false;
if(line instanceof draw2d.Connection){
this.command.setNewPorts(_2853,line.getTarget());
this.getWorkflow().getCommandStack().execute(this.command);
}
this.command=null;
};
draw2d.LineEndResizeHandle=function(_171d){
draw2d.ResizeHandle.call(this,_171d,9);
this.setDimension(10,10);
this.setBackgroundColor(new draw2d.Color(0,255,0));
this.setZOrder(10000);
};
draw2d.LineEndResizeHandle.prototype=new draw2d.ResizeHandle();
draw2d.LineEndResizeHandle.prototype.type="draw2d.LineEndResizeHandle";
draw2d.LineEndResizeHandle.prototype.onDragend=function(){
if(this.workflow.currentSelection instanceof draw2d.Connection){
if(this.command!==null){
this.command.cancel();
}
}else{
if(this.command!==null){
this.workflow.getCommandStack().execute(this.command);
}
}
this.command=null;
};
draw2d.LineEndResizeHandle.prototype.onDragstart=function(x,y){
if(!this.canDrag){
return false;
}
this.command=this.workflow.currentSelection.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
return this.command!==null;
};
draw2d.LineEndResizeHandle.prototype.onDrag=function(){
var oldX=this.getX();
var oldY=this.getY();
draw2d.Rectangle.prototype.onDrag.call(this);
var diffX=oldX-this.getX();
var diffY=oldY-this.getY();
var _1724=this.workflow.currentSelection.getEndPoint();
var line=this.workflow.currentSelection;
line.setEndPoint(_1724.x-diffX,_1724.y-diffY);
line.isMoving=true;
};
draw2d.LineEndResizeHandle.prototype.onDrop=function(_1726){
var line=this.workflow.currentSelection;
line.isMoving=false;
if(line instanceof draw2d.Connection){
this.command.setNewPorts(line.getSource(),_1726);
this.getWorkflow().getCommandStack().execute(this.command);
}
this.command=null;
};
draw2d.Canvas=function(_2b98){
try{
if(_2b98){
this.construct(_2b98);
}
this.enableSmoothFigureHandling=false;
this.canvasLines=new draw2d.ArrayList();
}
catch(e){
pushErrorStack(e,"draw2d.Canvas=function(/*:String*/id)");
}
};
draw2d.Canvas.IMAGE_BASE_URL="";
draw2d.Canvas.prototype.type="draw2d.Canvas";
draw2d.Canvas.prototype.construct=function(_2b99){
this.canvasId=_2b99;
this.html=document.getElementById(this.canvasId);
this.scrollArea=document.body.parentNode;
};
draw2d.Canvas.prototype.setViewPort=function(divId){
this.scrollArea=document.getElementById(divId);
};
draw2d.Canvas.prototype.addFigure=function(_2b9b,xPos,yPos,_2b9e){
try{
if(this.enableSmoothFigureHandling===true){
if(_2b9b.timer<=0){
_2b9b.setAlpha(0.001);
}
var _2b9f=_2b9b;
var _2ba0=function(){
if(_2b9f.alpha<1){
_2b9f.setAlpha(Math.min(1,_2b9f.alpha+0.05));
}else{
window.clearInterval(_2b9f.timer);
_2b9f.timer=-1;
}
};
if(_2b9f.timer>0){
window.clearInterval(_2b9f.timer);
}
_2b9f.timer=window.setInterval(_2ba0,30);
}
_2b9b.setCanvas(this);
if(xPos&&yPos){
_2b9b.setPosition(xPos,yPos);
}
if(_2b9b instanceof draw2d.Line){
this.canvasLines.add(_2b9b);
this.html.appendChild(_2b9b.getHTMLElement());
}else{
var obj=this.canvasLines.getFirstElement();
if(obj===null){
this.html.appendChild(_2b9b.getHTMLElement());
}else{
this.html.insertBefore(_2b9b.getHTMLElement(),obj.getHTMLElement());
}
}
if(!_2b9e){
_2b9b.paint();
}
}
catch(e){
pushErrorStack(e,"draw2d.Canvas.prototype.addFigure= function( /*:draw2d.Figure*/figure,/*:int*/ xPos,/*:int*/ yPos, /*:boolean*/ avoidPaint)");
}
};
draw2d.Canvas.prototype.removeFigure=function(_2ba2){
if(this.enableSmoothFigureHandling===true){
var oThis=this;
var _2ba4=_2ba2;
var _2ba5=function(){
if(_2ba4.alpha>0){
_2ba4.setAlpha(Math.max(0,_2ba4.alpha-0.05));
}else{
window.clearInterval(_2ba4.timer);
_2ba4.timer=-1;
oThis.html.removeChild(_2ba4.html);
_2ba4.setCanvas(null);
}
};
if(_2ba4.timer>0){
window.clearInterval(_2ba4.timer);
}
_2ba4.timer=window.setInterval(_2ba5,20);
}else{
this.html.removeChild(_2ba2.html);
_2ba2.setCanvas(null);
}
if(_2ba2 instanceof draw2d.Line){
this.canvasLines.remove(_2ba2);
}
};
draw2d.Canvas.prototype.getEnableSmoothFigureHandling=function(){
return this.enableSmoothFigureHandling;
};
draw2d.Canvas.prototype.setEnableSmoothFigureHandling=function(flag){
this.enableSmoothFigureHandling=flag;
};
draw2d.Canvas.prototype.getWidth=function(){
return parseInt(this.html.style.width);
};
draw2d.Canvas.prototype.setWidth=function(width){
if(this.scrollArea!==null){
this.scrollArea.style.width=width+"px";
}else{
this.html.style.width=width+"px";
}
};
draw2d.Canvas.prototype.getHeight=function(){
return parseInt(this.html.style.height);
};
draw2d.Canvas.prototype.setHeight=function(_2ba8){
if(this.scrollArea!==null){
this.scrollArea.style.height=_2ba8+"px";
}else{
this.html.style.height=_2ba8+"px";
}
};
draw2d.Canvas.prototype.setBackgroundImage=function(_2ba9,_2baa){
if(_2ba9!==null){
if(_2baa){
this.html.style.background="transparent url("+_2ba9+") ";
}else{
this.html.style.background="transparent url("+_2ba9+") no-repeat";
}
}else{
this.html.style.background="transparent";
}
};
draw2d.Canvas.prototype.getY=function(){
return this.y;
};
draw2d.Canvas.prototype.getX=function(){
return this.x;
};
draw2d.Canvas.prototype.getAbsoluteY=function(){
var el=this.html;
var ot=el.offsetTop;
while((el=el.offsetParent)!==null){
ot+=el.offsetTop;
}
return ot;
};
draw2d.Canvas.prototype.getAbsoluteX=function(){
var el=this.html;
var ol=el.offsetLeft;
while((el=el.offsetParent)!==null){
ol+=el.offsetLeft;
}
return ol;
};
draw2d.Canvas.prototype.getScrollLeft=function(){
return this.scrollArea.scrollLeft;
};
draw2d.Canvas.prototype.getScrollTop=function(){
return this.scrollArea.scrollTop;
};
draw2d.Workflow=function(id){
try{
if(!id){
return;
}
this.isIPad=navigator.userAgent.match(/iPad/i)!=null;
this.menu=null;
this.gridWidthX=10;
this.gridWidthY=10;
this.snapToGridHelper=null;
this.verticalSnapToHelperLine=null;
this.horizontalSnapToHelperLine=null;
this.snapToGeometryHelper=null;
this.figures=new draw2d.ArrayList();
this.lines=new draw2d.ArrayList();
this.commonPorts=new draw2d.ArrayList();
this.dropTargets=new draw2d.ArrayList();
this.compartments=new draw2d.ArrayList();
this.selectionListeners=new draw2d.ArrayList();
this.dialogs=new draw2d.ArrayList();
this.toolPalette=null;
this.dragging=false;
this.tooltip=null;
this.draggingLine=null;
this.draggingLineCommand=null;
this.commandStack=new draw2d.CommandStack();
this.oldScrollPosLeft=0;
this.oldScrollPosTop=0;
this.currentSelection=null;
this.currentMenu=null;
this.connectionLine=new draw2d.Line();
this.resizeHandleStart=new draw2d.LineStartResizeHandle(this);
this.resizeHandleEnd=new draw2d.LineEndResizeHandle(this);
this.resizeHandle1=new draw2d.ResizeHandle(this,1);
this.resizeHandle2=new draw2d.ResizeHandle(this,2);
this.resizeHandle3=new draw2d.ResizeHandle(this,3);
this.resizeHandle4=new draw2d.ResizeHandle(this,4);
this.resizeHandle5=new draw2d.ResizeHandle(this,5);
this.resizeHandle6=new draw2d.ResizeHandle(this,6);
this.resizeHandle7=new draw2d.ResizeHandle(this,7);
this.resizeHandle8=new draw2d.ResizeHandle(this,8);
this.resizeHandleHalfWidth=parseInt(this.resizeHandle2.getWidth()/2);
draw2d.Canvas.call(this,id);
this.setPanning(this.isIPad);
if(this.html!==null){
//this.html.style.backgroundImage="url(grid_10.png)";
this.html.className="Workflow";
oThis=this;
this.html.tabIndex="0";
var _26e8=function(){
var _26e9=arguments[0]||window.event;
_26e9.cancelBubble=true;
_26e9.returnValue=false;
_26e9.stopped=true;
var diffX=_26e9.clientX;
var diffY=_26e9.clientY;
var _26ec=oThis.getScrollLeft();
var _26ed=oThis.getScrollTop();
var _26ee=oThis.getAbsoluteX();
var _26ef=oThis.getAbsoluteY();
var line=oThis.getBestLine(diffX+_26ec-_26ee,diffY+_26ed-_26ef,null);
if(line!==null){
line.onContextMenu(diffX+_26ec-_26ee,diffY+_26ed-_26ef);
}else{
oThis.onContextMenu(diffX+_26ec-_26ee,diffY+_26ed-_26ef);
}
};
this.html.oncontextmenu=function(){
return false;
};
var oThis=this;
var _26f2=function(event){
var ctrl=event.ctrlKey;
oThis.onKeyDown(event.keyCode,ctrl);
};
var _26f5=function(){
var _26f6=arguments[0]||window.event;
if(_26f6.returnValue==false){
return;
}
var diffX=_26f6.clientX;
var diffY=_26f6.clientY;
var _26f9=oThis.getScrollLeft();
var _26fa=oThis.getScrollTop();
var _26fb=oThis.getAbsoluteX();
var _26fc=oThis.getAbsoluteY();
oThis.onMouseDown(diffX+_26f9-_26fb,diffY+_26fa-_26fc);
};
var _26fd=function(e){
var _26ff=e.touches.item(0);
var diffX=_26ff.clientX;
var diffY=_26ff.clientY;
var _2702=oThis.getScrollLeft();
var _2703=oThis.getScrollTop();
var _2704=oThis.getAbsoluteX();
var _2705=oThis.getAbsoluteY();
oThis.onMouseDown(diffX+_2702-_2704,diffY+_2703-_2705);
e.preventDefault();
};
var _2706=function(){
var _2707=arguments[0]||window.event;
if(oThis.currentMenu!==null){
oThis.removeFigure(oThis.currentMenu);
oThis.currentMenu=null;
}
if(_2707.button==2){
return;
}
var diffX=_2707.clientX;
var diffY=_2707.clientY;
var _270a=oThis.getScrollLeft();
var _270b=oThis.getScrollTop();
var _270c=oThis.getAbsoluteX();
var _270d=oThis.getAbsoluteY();
oThis.onMouseUp(diffX+_270a-_270c,diffY+_270b-_270d);
};
var _270e=function(e){
var _2710=e.touches.item(0);
var diffX=_2710.clientX;
var diffY=_2710.clientY;
var _2713=oThis.getScrollLeft();
var _2714=oThis.getScrollTop();
var _2715=oThis.getAbsoluteX();
var _2716=oThis.getAbsoluteY();
oThis.currentMouseX=diffX+_2713-_2715;
oThis.currentMouseY=diffY+_2714-_2716;
var obj=oThis.getBestFigure(oThis.currentMouseX,oThis.currentMouseY);
if(draw2d.Drag.currentHover!==null&&obj===null){
var _2718=new draw2d.DragDropEvent();
_2718.initDragDropEvent("mouseleave",false,oThis);
draw2d.Drag.currentHover.dispatchEvent(_2718);
}else{
var diffX=_2710.clientX;
var diffY=_2710.clientY;
var _2713=oThis.getScrollLeft();
var _2714=oThis.getScrollTop();
var _2715=oThis.getAbsoluteX();
var _2716=oThis.getAbsoluteY();
oThis.onMouseMove(diffX+_2713-_2715,diffY+_2714-_2716);
}
if(obj===null){
draw2d.Drag.currentHover=null;
}
e.preventDefault();
};
var _2719=function(){
var _271a=arguments[0]||window.event;
var diffX=_271a.clientX;
var diffY=_271a.clientY;
var _271d=oThis.getScrollLeft();
var _271e=oThis.getScrollTop();
var _271f=oThis.getAbsoluteX();
var _2720=oThis.getAbsoluteY();
oThis.currentMouseX=diffX+_271d-_271f;
oThis.currentMouseY=diffY+_271e-_2720;
var obj=oThis.getBestFigure(oThis.currentMouseX,oThis.currentMouseY);
if(draw2d.Drag.currentHover!==null&&obj===null){
var _2722=new draw2d.DragDropEvent();
_2722.initDragDropEvent("mouseleave",false,oThis);
draw2d.Drag.currentHover.dispatchEvent(_2722);
}else{
var diffX=_271a.clientX;
var diffY=_271a.clientY;
var _271d=oThis.getScrollLeft();
var _271e=oThis.getScrollTop();
var _271f=oThis.getAbsoluteX();
var _2720=oThis.getAbsoluteY();
oThis.onMouseMove(diffX+_271d-_271f,diffY+_271e-_2720);
}
if(obj===null){
draw2d.Drag.currentHover=null;
}
if(oThis.tooltip!==null){
if(Math.abs(oThis.currentTooltipX-oThis.currentMouseX)>10||Math.abs(oThis.currentTooltipY-oThis.currentMouseY)>10){
oThis.showTooltip(null);
}
}
};
var _2723=function(_2724){
var _2724=arguments[0]||window.event;
var diffX=_2724.clientX;
var diffY=_2724.clientY;
var _2727=oThis.getScrollLeft();
var _2728=oThis.getScrollTop();
var _2729=oThis.getAbsoluteX();
var _272a=oThis.getAbsoluteY();
var line=oThis.getBestLine(diffX+_2727-_2729,diffY+_2728-_272a,null);
if(line!==null){
line.onDoubleClick();
}
};
if(this.html.addEventListener){
this.html.addEventListener("contextmenu",_26e8,false);
this.html.addEventListener("touchstart",_26fd,false);
this.html.addEventListener("touchmove",_270e,false);
this.html.addEventListener("mousemove",_2719,false);
this.html.addEventListener("mouseup",_2706,false);
this.html.addEventListener("mousedown",_26f5,false);
this.html.addEventListener("keydown",_26f2,false);
this.html.addEventListener("dblclick",_2723,false);
}else{
if(this.html.attachEvent){
this.html.attachEvent("oncontextmenu",_26e8);
this.html.attachEvent("onmousemove",_2719);
this.html.attachEvent("onmousedown",_26f5);
this.html.attachEvent("onmouseup",_2706);
this.html.attachEvent("onkeydown",_26f2);
this.html.attachEvent("ondblclick",_2723);
}else{
throw "FreeGroup Draw2D 0.9.30 not supported in this browser.";
}
}
}
}
catch(e){
pushErrorStack(e,"draw2d.Workflow=function(/*:String*/id)");
}
};
draw2d.Workflow.prototype=new draw2d.Canvas();
draw2d.Workflow.prototype.type="draw2d.Workflow";
draw2d.Workflow.COLOR_GREEN=new draw2d.Color(0,255,0);
draw2d.Workflow.prototype.clear=function(){
this.scrollTo(0,0,true);
this.gridWidthX=10;
this.gridWidthY=10;
this.snapToGridHelper=null;
this.verticalSnapToHelperLine=null;
this.horizontalSnapToHelperLine=null;
var _272c=this.getDocument();
var _272d=_272c.getLines().clone();
for(var i=0;i<_272d.getSize();i++){
(new draw2d.CommandDelete(_272d.get(i))).execute();
}
var _272f=_272c.getFigures().clone();
for(var i=0;i<_272f.getSize();i++){
(new draw2d.CommandDelete(_272f.get(i))).execute();
}
this.commonPorts.removeAllElements();
this.dropTargets.removeAllElements();
this.compartments.removeAllElements();
this.selectionListeners.removeAllElements();
this.dialogs.removeAllElements();
this.commandStack=new draw2d.CommandStack();
this.currentSelection=null;
this.currentMenu=null;
draw2d.Drag.clearCurrent();
};
draw2d.Workflow.prototype.onScroll=function(){
var _2730=this.getScrollLeft();
var _2731=this.getScrollTop();
var _2732=_2730-this.oldScrollPosLeft;
var _2733=_2731-this.oldScrollPosTop;
for(var i=0;i<this.figures.getSize();i++){
var _2735=this.figures.get(i);
if(_2735.hasFixedPosition&&_2735.hasFixedPosition()==true){
_2735.setPosition(_2735.getX()+_2732,_2735.getY()+_2733);
}
}
this.oldScrollPosLeft=_2730;
this.oldScrollPosTop=_2731;
};
draw2d.Workflow.prototype.setPanning=function(flag){
this.panning=flag;
if(flag){
this.html.style.cursor="move";
}else{
this.html.style.cursor="default";
}
};
draw2d.Workflow.prototype.scrollTo=function(x,y,fast){
if(fast){
this.scrollArea.scrollLeft=x;
this.scrollArea.scrollTop=y;
}else{
var steps=40;
var xStep=(x-this.getScrollLeft())/steps;
var yStep=(y-this.getScrollTop())/steps;
var oldX=this.getScrollLeft();
var oldY=this.getScrollTop();
for(var i=0;i<steps;i++){
this.scrollArea.scrollLeft=oldX+(xStep*i);
this.scrollArea.scrollTop=oldY+(yStep*i);
}
}
};
draw2d.Workflow.prototype.showTooltip=function(_2740,_2741){
if(this.tooltip!==null){
this.removeFigure(this.tooltip);
this.tooltip=null;
if(this.tooltipTimer>=0){
window.clearTimeout(this.tooltipTimer);
this.tooltipTimer=-1;
}
}
this.tooltip=_2740;
if(this.tooltip!==null){
this.currentTooltipX=this.currentMouseX;
this.currentTooltipY=this.currentMouseY;
this.addFigure(this.tooltip,this.currentTooltipX+10,this.currentTooltipY+10);
var oThis=this;
var _2743=function(){
oThis.tooltipTimer=-1;
oThis.showTooltip(null);
};
if(_2741==true){
this.tooltipTimer=window.setTimeout(_2743,5000);
}
}
};
draw2d.Workflow.prototype.showDialog=function(_2744,xPos,yPos){
if(xPos){
this.addFigure(_2744,xPos,yPos);
}else{
this.addFigure(_2744,200,100);
}
this.dialogs.add(_2744);
};
draw2d.Workflow.prototype.showMenu=function(menu,xPos,yPos){
if(this.menu!==null){
this.html.removeChild(this.menu.getHTMLElement());
this.menu.setWorkflow();
}
this.menu=menu;
if(this.menu!==null){
this.menu.setWorkflow(this);
this.menu.setPosition(xPos,yPos);
this.html.appendChild(this.menu.getHTMLElement());
this.menu.paint();
}
};
draw2d.Workflow.prototype.onContextMenu=function(x,y){
var menu=this.getContextMenu();
if(menu!==null){
this.showMenu(menu,x,y);
}
};
draw2d.Workflow.prototype.getContextMenu=function(){
return null;
};
draw2d.Workflow.prototype.setToolWindow=function(_274d,x,y){
this.toolPalette=_274d;
if(y){
this.addFigure(_274d,x,y);
}else{
this.addFigure(_274d,20,20);
}
this.dialogs.add(_274d);
};
draw2d.Workflow.prototype.setSnapToGrid=function(flag){
if(flag){
this.snapToGridHelper=new draw2d.SnapToGrid(this);
}else{
this.snapToGridHelper=null;
}
};
draw2d.Workflow.prototype.setSnapToGeometry=function(flag){
if(flag){
this.snapToGeometryHelper=new draw2d.SnapToGeometry(this);
}else{
this.snapToGeometryHelper=null;
}
};
draw2d.Workflow.prototype.setGridWidth=function(dx,dy){
this.gridWidthX=dx;
this.gridWidthY=dy;
};
draw2d.Workflow.prototype.addFigure=function(_2754,xPos,yPos){
try{
draw2d.Canvas.prototype.addFigure.call(this,_2754,xPos,yPos,true);
_2754.setWorkflow(this);
var _2757=this;
if(_2754 instanceof draw2d.CompartmentFigure){
this.compartments.add(_2754);
}
if(_2754 instanceof draw2d.Line){
this.lines.add(_2754);
}else{
this.figures.add(_2754);
_2754.draggable.addEventListener("drag",function(_2758){
var _2759=_2757.getFigure(_2758.target.element.id);
if(_2759===null){
return;
}
if(_2759.isSelectable()==false){
return;
}
_2757.moveResizeHandles(_2759);
});
}
_2754.paint();
this.setDocumentDirty();
}
catch(e){
pushErrorStack(e,"draw2d.Workflow.prototype.addFigure=function(/*:draw2d.Figure*/ figure ,/*:int*/ xPos, /*:int*/ yPos)");
}
};
draw2d.Workflow.prototype.removeFigure=function(_275a){
draw2d.Canvas.prototype.removeFigure.call(this,_275a);
this.figures.remove(_275a);
this.lines.remove(_275a);
this.dialogs.remove(_275a);
_275a.setWorkflow(null);
if(_275a instanceof draw2d.CompartmentFigure){
this.compartments.remove(_275a);
}
if(_275a instanceof draw2d.Connection){
_275a.disconnect();
}
if(this.currentSelection==_275a){
this.setCurrentSelection(null);
}
this.setDocumentDirty();
_275a.onRemove(this);
};
draw2d.Workflow.prototype.moveFront=function(_275b){
this.html.removeChild(_275b.getHTMLElement());
this.html.appendChild(_275b.getHTMLElement());
};
draw2d.Workflow.prototype.moveBack=function(_275c){
this.html.removeChild(_275c.getHTMLElement());
this.html.insertBefore(_275c.getHTMLElement(),this.html.firstChild);
};
draw2d.Workflow.prototype.getBestCompartmentFigure=function(x,y,_275f){
var _2760=null;
for(var i=0;i<this.figures.getSize();i++){
var _2762=this.figures.get(i);
if((_2762 instanceof draw2d.CompartmentFigure)&&_2762.isOver(x,y)==true&&_2762!=_275f){
if(_2760===null){
_2760=_2762;
}else{
if(_2760.getZOrder()<_2762.getZOrder()){
_2760=_2762;
}
}
}
}
return _2760;
};
draw2d.Workflow.prototype.getBestFigure=function(x,y,_2765){
var _2766=null;
for(var i=0;i<this.figures.getSize();i++){
var _2768=this.figures.get(i);
if(_2768.isOver(x,y)==true&&_2768!=_2765){
if(_2766===null){
_2766=_2768;
}else{
if(_2766.getZOrder()<_2768.getZOrder()){
_2766=_2768;
}
}
}
}
return _2766;
};
draw2d.Workflow.prototype.getBestLine=function(x,y,_276b){
var _276c=null;
var count=this.lines.getSize();
for(var i=0;i<count;i++){
var line=this.lines.get(i);
if(line.containsPoint(x,y)==true&&line!=_276b){
if(_276c===null){
_276c=line;
}else{
if(_276c.getZOrder()<line.getZOrder()){
_276c=line;
}
}
}
}
return _276c;
};
draw2d.Workflow.prototype.getFigure=function(id){
for(var i=0;i<this.figures.getSize();i++){
var _2772=this.figures.get(i);
if(_2772.id==id){
return _2772;
}
}
return null;
};
draw2d.Workflow.prototype.getFigures=function(){
return this.figures;
};
draw2d.Workflow.prototype.getDocument=function(){
return new draw2d.CanvasDocument(this);
};
draw2d.Workflow.prototype.addSelectionListener=function(w){
if(w!==null){
if(w.onSelectionChanged){
this.selectionListeners.add(w);
}else{
throw "Object doesn't implement required callback method [onSelectionChanged]";
}
}
};
draw2d.Workflow.prototype.removeSelectionListener=function(w){
this.selectionListeners.remove(w);
};
draw2d.Workflow.prototype.setCurrentSelection=function(_2775){
if(_2775===null||this.currentSelection!=_2775){
this.hideResizeHandles();
this.hideLineResizeHandles();
}
this.currentSelection=_2775;
for(var i=0;i<this.selectionListeners.getSize();i++){
var w=this.selectionListeners.get(i);
if(w.onSelectionChanged){
w.onSelectionChanged(this.currentSelection,this.currentSelection?this.currentSelection.getModel():null);
}
}
if(_2775 instanceof draw2d.Line){
this.showLineResizeHandles(_2775);
if(!(_2775 instanceof draw2d.Connection)){
this.draggingLineCommand=_2775.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
if(this.draggingLineCommand!==null){
this.draggingLine=_2775;
}
}
}
};
draw2d.Workflow.prototype.getCurrentSelection=function(){
return this.currentSelection;
};
draw2d.Workflow.prototype.getLine=function(id){
var count=this.lines.getSize();
for(var i=0;i<count;i++){
var line=this.lines.get(i);
if(line.getId()==id){
return line;
}
}
return null;
};
draw2d.Workflow.prototype.getLines=function(){
return this.lines;
};
draw2d.Workflow.prototype.registerPort=function(port){
port.draggable.targets=this.dropTargets;
this.commonPorts.add(port);
this.dropTargets.add(port.dropable);
};
draw2d.Workflow.prototype.unregisterPort=function(port){
port.draggable.targets=null;
this.commonPorts.remove(port);
this.dropTargets.remove(port.dropable);
};
draw2d.Workflow.prototype.getCommandStack=function(){
return this.commandStack;
};
draw2d.Workflow.prototype.showConnectionLine=function(x1,y1,x2,y2){
this.connectionLine.setStartPoint(x1,y1);
this.connectionLine.setEndPoint(x2,y2);
if(this.connectionLine.canvas===null){
draw2d.Canvas.prototype.addFigure.call(this,this.connectionLine);
}
};
draw2d.Workflow.prototype.hideConnectionLine=function(){
if(this.connectionLine.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.connectionLine);
}
};
draw2d.Workflow.prototype.showLineResizeHandles=function(_2782){
var _2783=this.resizeHandleStart.getWidth()/2;
var _2784=this.resizeHandleStart.getHeight()/2;
var _2785=_2782.getStartPoint();
var _2786=_2782.getEndPoint();
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandleStart,_2785.x-_2783,_2785.y-_2783);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandleEnd,_2786.x-_2783,_2786.y-_2783);
this.resizeHandleStart.setCanDrag(_2782.isResizeable());
this.resizeHandleEnd.setCanDrag(_2782.isResizeable());
if(_2782.isResizeable()){
this.resizeHandleStart.setBackgroundColor(draw2d.Workflow.COLOR_GREEN);
this.resizeHandleEnd.setBackgroundColor(draw2d.Workflow.COLOR_GREEN);
this.resizeHandleStart.draggable.targets=this.dropTargets;
this.resizeHandleEnd.draggable.targets=this.dropTargets;
}else{
this.resizeHandleStart.setBackgroundColor(null);
this.resizeHandleEnd.setBackgroundColor(null);
}
};
draw2d.Workflow.prototype.hideLineResizeHandles=function(){
if(this.resizeHandleStart.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandleStart);
}
if(this.resizeHandleEnd.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandleEnd);
}
};
draw2d.Workflow.prototype.showResizeHandles=function(_2787){
this.hideLineResizeHandles();
this.hideResizeHandles();
if(this.getEnableSmoothFigureHandling()==true&&this.getCurrentSelection()!=_2787){
this.resizeHandle1.setAlpha(0.01);
this.resizeHandle2.setAlpha(0.01);
this.resizeHandle3.setAlpha(0.01);
this.resizeHandle4.setAlpha(0.01);
this.resizeHandle5.setAlpha(0.01);
this.resizeHandle6.setAlpha(0.01);
this.resizeHandle7.setAlpha(0.01);
this.resizeHandle8.setAlpha(0.01);
}
var _2788=this.resizeHandle1.getWidth();
var _2789=this.resizeHandle1.getHeight();
var _278a=_2787.getHeight();
var _278b=_2787.getWidth();
var xPos=_2787.getX();
var yPos=_2787.getY();
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle1,xPos-_2788,yPos-_2789);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle3,xPos+_278b,yPos-_2789);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle5,xPos+_278b,yPos+_278a);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle7,xPos-_2788,yPos+_278a);
this.moveFront(this.resizeHandle1);
this.moveFront(this.resizeHandle3);
this.moveFront(this.resizeHandle5);
this.moveFront(this.resizeHandle7);
this.resizeHandle1.setCanDrag(_2787.isResizeable());
this.resizeHandle3.setCanDrag(_2787.isResizeable());
this.resizeHandle5.setCanDrag(_2787.isResizeable());
this.resizeHandle7.setCanDrag(_2787.isResizeable());
if(_2787.isResizeable()){
var green=new draw2d.Color(0,255,0);
this.resizeHandle1.setBackgroundColor(green);
this.resizeHandle3.setBackgroundColor(green);
this.resizeHandle5.setBackgroundColor(green);
this.resizeHandle7.setBackgroundColor(green);
}else{
this.resizeHandle1.setBackgroundColor(null);
this.resizeHandle3.setBackgroundColor(null);
this.resizeHandle5.setBackgroundColor(null);
this.resizeHandle7.setBackgroundColor(null);
}
if(_2787.isStrechable()&&_2787.isResizeable()){
this.resizeHandle2.setCanDrag(_2787.isResizeable());
this.resizeHandle4.setCanDrag(_2787.isResizeable());
this.resizeHandle6.setCanDrag(_2787.isResizeable());
this.resizeHandle8.setCanDrag(_2787.isResizeable());
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle2,xPos+(_278b/2)-this.resizeHandleHalfWidth,yPos-_2789);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle4,xPos+_278b,yPos+(_278a/2)-(_2789/2));
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle6,xPos+(_278b/2)-this.resizeHandleHalfWidth,yPos+_278a);
draw2d.Canvas.prototype.addFigure.call(this,this.resizeHandle8,xPos-_2788,yPos+(_278a/2)-(_2789/2));
this.moveFront(this.resizeHandle2);
this.moveFront(this.resizeHandle4);
this.moveFront(this.resizeHandle6);
this.moveFront(this.resizeHandle8);
}
};
draw2d.Workflow.prototype.hideResizeHandles=function(){
if(this.resizeHandle1.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle1);
}
if(this.resizeHandle2.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle2);
}
if(this.resizeHandle3.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle3);
}
if(this.resizeHandle4.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle4);
}
if(this.resizeHandle5.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle5);
}
if(this.resizeHandle6.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle6);
}
if(this.resizeHandle7.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle7);
}
if(this.resizeHandle8.canvas!==null){
draw2d.Canvas.prototype.removeFigure.call(this,this.resizeHandle8);
}
};
draw2d.Workflow.prototype.moveResizeHandles=function(_278f){
var _2790=this.resizeHandle1.getWidth();
var _2791=this.resizeHandle1.getHeight();
var _2792=_278f.getHeight();
var _2793=_278f.getWidth();
var xPos=_278f.getX();
var yPos=_278f.getY();
this.resizeHandle1.setPosition(xPos-_2790,yPos-_2791);
this.resizeHandle3.setPosition(xPos+_2793,yPos-_2791);
this.resizeHandle5.setPosition(xPos+_2793,yPos+_2792);
this.resizeHandle7.setPosition(xPos-_2790,yPos+_2792);
if(_278f.isStrechable()){
this.resizeHandle2.setPosition(xPos+(_2793/2)-this.resizeHandleHalfWidth,yPos-_2791);
this.resizeHandle4.setPosition(xPos+_2793,yPos+(_2792/2)-(_2791/2));
this.resizeHandle6.setPosition(xPos+(_2793/2)-this.resizeHandleHalfWidth,yPos+_2792);
this.resizeHandle8.setPosition(xPos-_2790,yPos+(_2792/2)-(_2791/2));
}
};
draw2d.Workflow.prototype.onMouseDown=function(x,y){
this.dragging=true;
this.mouseDownPosX=x;
this.mouseDownPosY=y;
if(this.toolPalette!==null&&this.toolPalette.getActiveTool()!==null){
this.toolPalette.getActiveTool().execute(x,y);
}
this.showMenu(null);
var line=this.getBestLine(x,y);
if(line!==null&&line.isSelectable()){
this.setCurrentSelection(line);
}else{
this.setCurrentSelection(null);
}
};
draw2d.Workflow.prototype.onMouseUp=function(x,y){
this.dragging=false;
if(this.draggingLineCommand!==null){
this.getCommandStack().execute(this.draggingLineCommand);
this.draggingLine=null;
this.draggingLineCommand=null;
}
};
draw2d.Workflow.prototype.onMouseMove=function(x,y){
if(this.dragging===true&&this.draggingLine!==null){
var diffX=x-this.mouseDownPosX;
var diffY=y-this.mouseDownPosY;
this.draggingLine.startX=this.draggingLine.getStartX()+diffX;
this.draggingLine.startY=this.draggingLine.getStartY()+diffY;
this.draggingLine.setEndPoint(this.draggingLine.getEndX()+diffX,this.draggingLine.getEndY()+diffY);
this.mouseDownPosX=x;
this.mouseDownPosY=y;
this.showLineResizeHandles(this.currentSelection);
}else{
if(this.dragging===true&&this.panning===true){
var diffX=x-this.mouseDownPosX;
var diffY=y-this.mouseDownPosY;
this.scrollTo(this.getScrollLeft()-diffX,this.getScrollTop()-diffY,true);
this.onScroll();
}
}
};
draw2d.Workflow.prototype.onKeyDown=function(_279f,ctrl){
if(_279f==46&&this.currentSelection!==null){
this.commandStack.execute(this.currentSelection.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.DELETE)));
}else{
if(_279f==90&&ctrl){
this.commandStack.undo();
}else{
if(_279f==89&&ctrl){
this.commandStack.redo();
}
}
}
};
draw2d.Workflow.prototype.setDocumentDirty=function(){
try{
for(var i=0;i<this.dialogs.getSize();i++){
var d=this.dialogs.get(i);
if(d!==null&&d.onSetDocumentDirty){
d.onSetDocumentDirty();
}
}
if(this.snapToGeometryHelper!==null){
this.snapToGeometryHelper.onSetDocumentDirty();
}
if(this.snapToGridHelper!==null){
this.snapToGridHelper.onSetDocumentDirty();
}
}
catch(e){
pushErrorStack(e,"draw2d.Workflow.prototype.setDocumentDirty=function()");
}
};
draw2d.Workflow.prototype.snapToHelper=function(_27a3,pos){
if(this.snapToGeometryHelper!==null){
if(_27a3 instanceof draw2d.ResizeHandle){
var _27a5=_27a3.getSnapToGridAnchor();
pos.x+=_27a5.x;
pos.y+=_27a5.y;
var _27a6=new draw2d.Point(pos.x,pos.y);
var _27a7=_27a3.getSnapToDirection();
var _27a8=this.snapToGeometryHelper.snapPoint(_27a7,pos,_27a6);
if((_27a7&draw2d.SnapToHelper.EAST_WEST)&&!(_27a8&draw2d.SnapToHelper.EAST_WEST)){
this.showSnapToHelperLineVertical(_27a6.x);
}else{
this.hideSnapToHelperLineVertical();
}
if((_27a7&draw2d.SnapToHelper.NORTH_SOUTH)&&!(_27a8&draw2d.SnapToHelper.NORTH_SOUTH)){
this.showSnapToHelperLineHorizontal(_27a6.y);
}else{
this.hideSnapToHelperLineHorizontal();
}
_27a6.x-=_27a5.x;
_27a6.y-=_27a5.y;
return _27a6;
}else{
var _27a9=new draw2d.Dimension(pos.x,pos.y,_27a3.getWidth(),_27a3.getHeight());
var _27a6=new draw2d.Dimension(pos.x,pos.y,_27a3.getWidth(),_27a3.getHeight());
var _27a7=draw2d.SnapToHelper.NSEW;
var _27a8=this.snapToGeometryHelper.snapRectangle(_27a9,_27a6);
if((_27a7&draw2d.SnapToHelper.WEST)&&!(_27a8&draw2d.SnapToHelper.WEST)){
this.showSnapToHelperLineVertical(_27a6.x);
}else{
if((_27a7&draw2d.SnapToHelper.EAST)&&!(_27a8&draw2d.SnapToHelper.EAST)){
this.showSnapToHelperLineVertical(_27a6.getX()+_27a6.getWidth());
}else{
this.hideSnapToHelperLineVertical();
}
}
if((_27a7&draw2d.SnapToHelper.NORTH)&&!(_27a8&draw2d.SnapToHelper.NORTH)){
this.showSnapToHelperLineHorizontal(_27a6.y);
}else{
if((_27a7&draw2d.SnapToHelper.SOUTH)&&!(_27a8&draw2d.SnapToHelper.SOUTH)){
this.showSnapToHelperLineHorizontal(_27a6.getY()+_27a6.getHeight());
}else{
this.hideSnapToHelperLineHorizontal();
}
}
return _27a6.getTopLeft();
}
}else{
if(this.snapToGridHelper!==null){
var _27a5=_27a3.getSnapToGridAnchor();
pos.x=pos.x+_27a5.x;
pos.y=pos.y+_27a5.y;
var _27a6=new draw2d.Point(pos.x,pos.y);
this.snapToGridHelper.snapPoint(0,pos,_27a6);
_27a6.x=_27a6.x-_27a5.x;
_27a6.y=_27a6.y-_27a5.y;
return _27a6;
}
}
return pos;
};
draw2d.Workflow.prototype.showSnapToHelperLineHorizontal=function(_27aa){
if(this.horizontalSnapToHelperLine===null){
this.horizontalSnapToHelperLine=new draw2d.Line();
this.horizontalSnapToHelperLine.setColor(new draw2d.Color(175,175,255));
this.addFigure(this.horizontalSnapToHelperLine);
}
this.horizontalSnapToHelperLine.setStartPoint(0,_27aa);
this.horizontalSnapToHelperLine.setEndPoint(this.getWidth(),_27aa);
};
draw2d.Workflow.prototype.showSnapToHelperLineVertical=function(_27ab){
if(this.verticalSnapToHelperLine===null){
this.verticalSnapToHelperLine=new draw2d.Line();
this.verticalSnapToHelperLine.setColor(new draw2d.Color(175,175,255));
this.addFigure(this.verticalSnapToHelperLine);
}
this.verticalSnapToHelperLine.setStartPoint(_27ab,0);
this.verticalSnapToHelperLine.setEndPoint(_27ab,this.getHeight());
};
draw2d.Workflow.prototype.hideSnapToHelperLines=function(){
this.hideSnapToHelperLineHorizontal();
this.hideSnapToHelperLineVertical();
};
draw2d.Workflow.prototype.hideSnapToHelperLineHorizontal=function(){
if(this.horizontalSnapToHelperLine!==null){
this.removeFigure(this.horizontalSnapToHelperLine);
this.horizontalSnapToHelperLine=null;
}
};
draw2d.Workflow.prototype.hideSnapToHelperLineVertical=function(){
if(this.verticalSnapToHelperLine!==null){
this.removeFigure(this.verticalSnapToHelperLine);
this.verticalSnapToHelperLine=null;
}
};
draw2d.WindowFigure=function(title){
this.title=title;
this.titlebar=null;
draw2d.Figure.call(this);
this.dropShadow=5;
this.setDeleteable(false);
this.setCanSnapToHelper(false);
this.setZOrder(draw2d.WindowFigure.ZOrderIndex);
};
draw2d.WindowFigure.prototype=new draw2d.Figure();
draw2d.WindowFigure.prototype.type=":draw2d.WindowFigure";
draw2d.WindowFigure.ZOrderIndex=50000;
draw2d.WindowFigure.setZOrderBaseIndex=function(index){
draw2d.WindowFigure.ZOrderBaseIndex=index;
};
draw2d.WindowFigure.prototype.hasFixedPosition=function(){
return true;
};
draw2d.WindowFigure.prototype.hasTitleBar=function(){
return true;
};
draw2d.WindowFigure.prototype.createHTMLElement=function(){
var item=draw2d.Figure.prototype.createHTMLElement.call(this);
item.style.margin="0px";
item.style.padding="0px";
item.style.border="1px solid black";
item.style.backgroundImage="url(window_bg.png)";
if(this.dropShadow>0){
item.style.boxShadow=this.dropShadow+"px "+this.dropShadow+"px "+this.dropShadow+"px #ccc";
}
item.style.borderRadius="2px";
item.style.zIndex=draw2d.WindowFigure.ZOrderIndex;
item.style.cursor=null;
item.className="WindowFigure";
if(this.hasTitleBar()){
this.titlebar=document.createElement("div");
this.titlebar.style.position="absolute";
this.titlebar.style.left="0px";
this.titlebar.style.top="0px";
this.titlebar.style.width=this.getWidth()+"px";
this.titlebar.style.height="15px";
this.titlebar.style.margin="0px";
this.titlebar.style.padding="0px";
this.titlebar.style.font="normal 10px verdana";
this.titlebar.style.backgroundColor="blue";
this.titlebar.style.borderBottom="2px solid gray";
this.titlebar.style.whiteSpace="nowrap";
this.titlebar.style.textAlign="center";
this.titlebar.style.backgroundImage="url(window_toolbar.png)";
this.titlebar.className="WindowFigure_titlebar";
this.textNode=document.createTextNode(this.title);
this.titlebar.appendChild(this.textNode);
this.disableTextSelection(this.titlebar);
item.appendChild(this.titlebar);
}
return item;
};
draw2d.WindowFigure.prototype.setDocumentDirty=function(_16ff){
};
draw2d.WindowFigure.prototype.onDragend=function(){
};
draw2d.WindowFigure.prototype.onDragstart=function(x,y){
if(this.titlebar===null){
return false;
}
if(this.canDrag===true&&x<parseInt(this.titlebar.style.width)&&y<parseInt(this.titlebar.style.height)){
return true;
}
return false;
};
draw2d.WindowFigure.prototype.isSelectable=function(){
return false;
};
draw2d.WindowFigure.prototype.setCanDrag=function(flag){
draw2d.Figure.prototype.setCanDrag.call(this,flag);
this.html.style.cursor="";
if(this.titlebar===null){
return;
}
if(flag){
this.titlebar.style.cursor="move";
}else{
this.titlebar.style.cursor="";
}
};
draw2d.WindowFigure.prototype.setWorkflow=function(_1703){
var _1704=this.workflow;
draw2d.Figure.prototype.setWorkflow.call(this,_1703);
if(_1704!==null){
_1704.removeSelectionListener(this);
}
if(this.workflow!==null){
this.workflow.addSelectionListener(this);
}
};
draw2d.WindowFigure.prototype.setDropShadow=function(w){
this.dropShadow=w;
if(this.html===null){
return;
}
if(this.dropShadow>0){
this.html.style.boxShadow=w+"px "+w+"px "+w+"px #ccc";
}else{
this.html.style.boxShadow="";
}
};
draw2d.WindowFigure.prototype.setDimension=function(w,h){
draw2d.Figure.prototype.setDimension.call(this,w,h);
if(this.titlebar!==null){
this.titlebar.style.width=this.getWidth()+"px";
}
};
draw2d.WindowFigure.prototype.setTitle=function(title){
this.title=title;
};
draw2d.WindowFigure.prototype.getMinWidth=function(){
return 50;
};
draw2d.WindowFigure.prototype.getMinHeight=function(){
return 50;
};
draw2d.WindowFigure.prototype.isResizeable=function(){
return false;
};
draw2d.WindowFigure.prototype.setAlpha=function(_1709){
};
draw2d.WindowFigure.prototype.setBackgroundColor=function(color){
this.bgColor=color;
if(this.bgColor!==null){
this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
}else{
this.html.style.backgroundColor="transparent";
this.html.style.backgroundImage="";
}
};
draw2d.WindowFigure.prototype.setColor=function(color){
this.lineColor=color;
if(this.lineColor!==null){
this.html.style.border=this.lineStroke+"px solid "+this.lineColor.getHTMLStyle();
}else{
this.html.style.border="0px";
}
};
draw2d.WindowFigure.prototype.setLineWidth=function(w){
this.lineStroke=w;
this.html.style.border=this.lineStroke+"px solid black";
};
draw2d.WindowFigure.prototype.onSelectionChanged=function(_170d,model){
};
draw2d.Button=function(_266a,width,_266c){
this.x=0;
this.y=0;
this.width=24;
this.height=24;
this.id=draw2d.UUID.create();
this.enabled=true;
this.active=false;
this.palette=_266a;
this.html=this.createHTMLElement();
if(width!==undefined&&_266c!==undefined){
this.setDimension(width,_266c);
}else{
this.setDimension(24,24);
}
};
draw2d.Button.prototype.type="draw2d.Button";
draw2d.Button.prototype.dispose=function(){
};
draw2d.Button.prototype.getImageUrl=function(){
return this.type+".png";
};
draw2d.Button.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height=this.width+"px";
item.style.width=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.outline="none";
if(this.getImageUrl()!==null){
item.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
item.style.backgroundImage="";
}
var oThis=this;
this.omousedown=function(event){
if(oThis.enabled){
oThis.setActive(true);
}
event.cancelBubble=true;
event.returnValue=false;
};
this.omouseup=function(event){
if(oThis.enabled){
oThis.setActive(false);
oThis.execute();
oThis.palette.setActiveTool(null);
}
event.cancelBubble=true;
event.returnValue=false;
};
if(item.addEventListener){
item.addEventListener("mousedown",this.omousedown,false);
item.addEventListener("mouseup",this.omouseup,false);
}else{
if(item.attachEvent){
item.attachEvent("onmousedown",this.omousedown);
item.attachEvent("onmouseup",this.omouseup);
}
}
return item;
};
draw2d.Button.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
}
return this.html;
};
draw2d.Button.prototype.execute=function(){
};
draw2d.Button.prototype.setTooltip=function(_2671){
this.tooltip=_2671;
if(this.tooltip!==null){
this.html.title=this.tooltip;
}else{
this.html.title="";
}
};
draw2d.Button.prototype.getWorkflow=function(){
return this.getToolPalette().getWorkflow();
};
draw2d.Button.prototype.getToolPalette=function(){
return this.palette;
};
draw2d.Button.prototype.setActive=function(flag){
if(!this.enabled){
return;
}
this.active=flag;
if(flag===true){
this.html.style.border="1px inset";
}else{
this.html.style.border="0px";
}
};
draw2d.Button.prototype.isActive=function(){
return this.active;
};
draw2d.Button.prototype.setEnabled=function(flag){
this.enabled=flag;
if(flag){
this.html.style.filter="alpha(opacity=100)";
this.html.style.opacity="1.0";
}else{
this.html.style.filter="alpha(opacity=30)";
this.html.style.opacity="0.3";
}
};
draw2d.Button.prototype.setDimension=function(w,h){
this.width=w;
this.height=h;
if(this.html===null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
};
draw2d.Button.prototype.setPosition=function(xPos,yPos){
this.x=Math.max(0,xPos);
this.y=Math.max(0,yPos);
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
};
draw2d.Button.prototype.getWidth=function(){
return this.width;
};
draw2d.Button.prototype.getHeight=function(){
return this.height;
};
draw2d.Button.prototype.getY=function(){
return this.y;
};
draw2d.Button.prototype.getX=function(){
return this.x;
};
draw2d.Button.prototype.getPosition=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.ToggleButton=function(_2886){
draw2d.Button.call(this,_2886);
this.isDownFlag=false;
};
draw2d.ToggleButton.prototype=new draw2d.Button();
draw2d.ToggleButton.prototype.type="draw2d.ToggleButton";
draw2d.ToggleButton.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height="24px";
item.style.width="24px";
item.style.margin="0px";
item.style.padding="0px";
if(this.getImageUrl()!==null){
item.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
item.style.backgroundImage="";
}
var oThis=this;
this.omousedown=function(event){
if(oThis.enabled){
if(!oThis.isDown()){
draw2d.Button.prototype.setActive.call(oThis,true);
}
}
event.cancelBubble=true;
event.returnValue=false;
};
this.omouseup=function(event){
if(oThis.enabled){
if(oThis.isDown()){
draw2d.Button.prototype.setActive.call(oThis,false);
}
oThis.isDownFlag=!oThis.isDownFlag;
oThis.execute();
}
event.cancelBubble=true;
event.returnValue=false;
};
if(item.addEventListener){
item.addEventListener("mousedown",this.omousedown,false);
item.addEventListener("mouseup",this.omouseup,false);
}else{
if(item.attachEvent){
item.attachEvent("onmousedown",this.omousedown);
item.attachEvent("onmouseup",this.omouseup);
}
}
return item;
};
draw2d.ToggleButton.prototype.isDown=function(){
return this.isDownFlag;
};
draw2d.ToggleButton.prototype.setActive=function(flag){
draw2d.Button.prototype.setActive.call(this,flag);
this.isDownFlag=flag;
};
draw2d.ToggleButton.prototype.execute=function(){
};
draw2d.ToolGeneric=function(_25ef){
this.x=0;
this.y=0;
this.enabled=true;
this.tooltip=null;
this.palette=_25ef;
this.html=this.createHTMLElement();
this.setDimension(10,10);
};
draw2d.ToolGeneric.prototype.type="draw2d.ToolGeneric";
draw2d.ToolGeneric.prototype.dispose=function(){
};
draw2d.ToolGeneric.prototype.getImageUrl=function(){
return this.type+".png";
};
draw2d.ToolGeneric.prototype.getWorkflow=function(){
return this.getToolPalette().getWorkflow();
};
draw2d.ToolGeneric.prototype.getToolPalette=function(){
return this.palette;
};
draw2d.ToolGeneric.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.height="24px";
item.style.width="24px";
item.style.margin="0px";
item.style.padding="0px";
if(this.getImageUrl()!==null){
item.style.backgroundImage="url("+this.getImageUrl()+")";
}else{
item.style.backgroundImage="";
}
var oThis=this;
this.click=function(event){
if(oThis.enabled){
oThis.palette.setActiveTool(oThis);
}
event.cancelBubble=true;
event.returnValue=false;
};
if(item.addEventListener){
item.addEventListener("click",this.click,false);
}else{
if(item.attachEvent){
item.attachEvent("onclick",this.click);
}
}
if(this.tooltip!==null){
item.title=this.tooltip;
}else{
item.title="";
}
return item;
};
draw2d.ToolGeneric.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
}
return this.html;
};
draw2d.ToolGeneric.prototype.execute=function(x,y){
if(this.enabled){
this.palette.setActiveTool(null);
}
};
draw2d.ToolGeneric.prototype.setTooltip=function(_25f5){
this.tooltip=_25f5;
if(this.tooltip!==null){
this.html.title=this.tooltip;
}else{
this.html.title="";
}
};
draw2d.ToolGeneric.prototype.setActive=function(flag){
if(!this.enabled){
return;
}
if(flag===true){
this.html.style.border="1px inset";
}else{
this.html.style.border="0px";
}
};
draw2d.ToolGeneric.prototype.setEnabled=function(flag){
this.enabled=flag;
if(flag){
this.html.style.filter="alpha(opacity=100)";
this.html.style.opacity="1.0";
}else{
this.html.style.filter="alpha(opacity=30)";
this.html.style.opacity="0.3";
}
};
draw2d.ToolGeneric.prototype.setDimension=function(w,h){
this.width=w;
this.height=h;
if(this.html===null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
};
draw2d.ToolGeneric.prototype.setPosition=function(xPos,yPos){
this.x=Math.max(0,xPos);
this.y=Math.max(0,yPos);
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
};
draw2d.ToolGeneric.prototype.getWidth=function(){
return this.width;
};
draw2d.ToolGeneric.prototype.getHeight=function(){
return this.height;
};
draw2d.ToolGeneric.prototype.getY=function(){
return this.y;
};
draw2d.ToolGeneric.prototype.getX=function(){
return this.x;
};
draw2d.ToolGeneric.prototype.getPosition=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.ToolPalette=function(title){
draw2d.WindowFigure.call(this,title);
this.setDimension(75,400);
this.activeTool=null;
this.children={};
};
draw2d.ToolPalette.prototype=new draw2d.WindowFigure();
draw2d.ToolPalette.prototype.type="draw2d.ToolPalette";
draw2d.ToolPalette.prototype.dispose=function(){
draw2d.WindowFigure.prototype.dispose.call(this);
};
draw2d.ToolPalette.prototype.createHTMLElement=function(){
var item=draw2d.WindowFigure.prototype.createHTMLElement.call(this);
this.scrollarea=document.createElement("div");
this.scrollarea.style.position="absolute";
this.scrollarea.style.left="0px";
if(this.hasTitleBar()){
this.scrollarea.style.top="15px";
}else{
this.scrollarea.style.top="0px";
}
this.scrollarea.style.width=this.getWidth()+"px";
this.scrollarea.style.height="15px";
this.scrollarea.style.margin="0px";
this.scrollarea.style.padding="0px";
this.scrollarea.style.font="normal 10px verdana";
this.scrollarea.style.borderBottom="2px solid gray";
this.scrollarea.style.whiteSpace="nowrap";
this.scrollarea.style.textAlign="center";
this.scrollarea.style.overflowX="auto";
this.scrollarea.style.overflowY="auto";
this.scrollarea.style.overflow="auto";
item.appendChild(this.scrollarea);
return item;
};
draw2d.ToolPalette.prototype.setDimension=function(w,h){
draw2d.WindowFigure.prototype.setDimension.call(this,w,h);
if(this.scrollarea!==null){
this.scrollarea.style.width=this.getWidth()+"px";
if(this.hasTitleBar()){
this.scrollarea.style.height=(this.getHeight()-15)+"px";
}else{
this.scrollarea.style.height=this.getHeight()+"px";
}
}
};
draw2d.ToolPalette.prototype.addChild=function(item){
this.children[item.id]=item;
this.scrollarea.appendChild(item.getHTMLElement());
};
draw2d.ToolPalette.prototype.getChild=function(id){
return this.children[id];
};
draw2d.ToolPalette.prototype.getActiveTool=function(){
return this.activeTool;
};
draw2d.ToolPalette.prototype.setActiveTool=function(tool){
if(this.activeTool!=tool&&this.activeTool!==null){
this.activeTool.setActive(false);
}
if(tool!==null){
tool.setActive(true);
}
this.activeTool=tool;
};
draw2d.Dialog=function(title){
this.buttonbar=null;
if(title){
draw2d.WindowFigure.call(this,title);
}else{
draw2d.WindowFigure.call(this,"Dialog");
}
this.setDimension(400,300);
};
draw2d.Dialog.prototype=new draw2d.WindowFigure();
draw2d.Dialog.prototype.type="draw2d.Dialog";
draw2d.Dialog.prototype.createHTMLElement=function(){
var item=draw2d.WindowFigure.prototype.createHTMLElement.call(this);
var oThis=this;
this.buttonbar=document.createElement("div");
this.buttonbar.style.position="absolute";
this.buttonbar.style.left="0px";
this.buttonbar.style.bottom="0px";
this.buttonbar.style.width=this.getWidth()+"px";
this.buttonbar.style.height="30px";
this.buttonbar.style.margin="0px";
this.buttonbar.style.padding="0px";
this.buttonbar.style.font="normal 10px verdana";
this.buttonbar.style.backgroundColor="#c0c0c0";
this.buttonbar.style.borderBottom="2px solid gray";
this.buttonbar.style.whiteSpace="nowrap";
this.buttonbar.style.textAlign="center";
this.buttonbar.className="Dialog_buttonbar";
this.okbutton=document.createElement("button");
this.okbutton.style.border="1px solid gray";
this.okbutton.style.font="normal 10px verdana";
this.okbutton.style.width="80px";
this.okbutton.style.margin="5px";
this.okbutton.className="Dialog_okbutton";
this.okbutton.innerHTML="Ok";
this.okbutton.onclick=function(){
var error=null;
try{
oThis.onOk();
}
catch(e){
error=e;
}
oThis.workflow.removeFigure(oThis);
if(error!==null){
throw error;
}
};
this.buttonbar.appendChild(this.okbutton);
this.cancelbutton=document.createElement("button");
this.cancelbutton.innerHTML="Cancel";
this.cancelbutton.style.font="normal 10px verdana";
this.cancelbutton.style.border="1px solid gray";
this.cancelbutton.style.width="80px";
this.cancelbutton.style.margin="5px";
this.cancelbutton.className="Dialog_cancelbutton";
this.cancelbutton.onclick=function(){
var error=null;
try{
oThis.onCancel();
}
catch(e){
error=e;
}
oThis.workflow.removeFigure(oThis);
if(error!==null){
throw error;
}
};
this.buttonbar.appendChild(this.cancelbutton);
item.appendChild(this.buttonbar);
return item;
};
draw2d.Dialog.prototype.onOk=function(){
};
draw2d.Dialog.prototype.onCancel=function(){
};
draw2d.Dialog.prototype.setDimension=function(w,h){
draw2d.WindowFigure.prototype.setDimension.call(this,w,h);
if(this.buttonbar!==null){
this.buttonbar.style.width=this.getWidth()+"px";
}
};
draw2d.Dialog.prototype.setWorkflow=function(_1ee1){
draw2d.WindowFigure.prototype.setWorkflow.call(this,_1ee1);
this.setFocus();
};
draw2d.Dialog.prototype.setFocus=function(){
};
draw2d.Dialog.prototype.onSetDocumentDirty=function(){
};
draw2d.InputDialog=function(){
draw2d.Dialog.call(this);
this.setDimension(400,100);
};
draw2d.InputDialog.prototype=new draw2d.Dialog();
draw2d.InputDialog.prototype.type="draw2d.InputDialog";
draw2d.InputDialog.prototype.createHTMLElement=function(){
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
return item;
};
draw2d.InputDialog.prototype.onOk=function(){
this.workflow.removeFigure(this);
};
draw2d.InputDialog.prototype.onCancel=function(){
this.workflow.removeFigure(this);
};
draw2d.PropertyDialog=function(_27c1,_27c2,label){
this.figure=_27c1;
this.propertyName=_27c2;
this.label=label;
draw2d.Dialog.call(this);
this.setDimension(400,120);
};
draw2d.PropertyDialog.prototype=new draw2d.Dialog();
draw2d.PropertyDialog.prototype.type="draw2d.PropertyDialog";
draw2d.PropertyDialog.prototype.createHTMLElement=function(){
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
var _27c5=document.createElement("form");
_27c5.style.position="absolute";
_27c5.style.left="10px";
_27c5.style.top="30px";
_27c5.style.width="375px";
_27c5.style.font="normal 10px verdana";
item.appendChild(_27c5);
this.labelDiv=document.createElement("div");
this.labelDiv.innerHTML=this.label;
this.disableTextSelection(this.labelDiv);
_27c5.appendChild(this.labelDiv);
this.input=document.createElement("input");
this.input.style.border="1px solid gray";
this.input.style.font="normal 10px verdana";
this.input.type="text";
var value=this.figure.getProperty(this.propertyName);
if(value){
this.input.value=value;
}else{
this.input.value="";
}
this.input.style.width="100%";
_27c5.appendChild(this.input);
this.input.focus();
return item;
};
draw2d.PropertyDialog.prototype.onOk=function(){
draw2d.Dialog.prototype.onOk.call(this);
this.figure.setProperty(this.propertyName,this.input.value);
};
draw2d.AnnotationDialog=function(_267d){
this.figure=_267d;
draw2d.Dialog.call(this);
this.setDimension(400,100);
};
draw2d.AnnotationDialog.prototype=new draw2d.Dialog();
draw2d.AnnotationDialog.prototype.type="draw2d.AnnotationDialog";
draw2d.AnnotationDialog.prototype.createHTMLElement=function(){
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
var _267f=document.createElement("form");
_267f.style.position="absolute";
_267f.style.left="10px";
_267f.style.top="30px";
_267f.style.width="375px";
_267f.style.font="normal 10px verdana";
item.appendChild(_267f);
this.label=document.createTextNode("Text");
_267f.appendChild(this.label);
this.input=document.createElement("input");
this.input.style.border="1px solid gray";
this.input.style.font="normal 10px verdana";
this.input.type="text";
var value=this.figure.getText();
if(value){
this.input.value=value;
}else{
this.input.value="";
}
this.input.style.width="100%";
_267f.appendChild(this.input);
this.input.focus();
return item;
};
draw2d.AnnotationDialog.prototype.onOk=function(){
this.workflow.getCommandStack().execute(new draw2d.CommandSetText(this.figure,this.input.value));
this.workflow.removeFigure(this);
};
draw2d.PropertyWindow=function(){
this.currentSelection=null;
draw2d.WindowFigure.call(this,"Property Window");
this.setDimension(200,100);
};
draw2d.PropertyWindow.prototype=new draw2d.WindowFigure();
draw2d.PropertyWindow.prototype.type="draw2d.PropertyWindow";
draw2d.PropertyWindow.prototype.dispose=function(){
draw2d.WindowFigure.prototype.dispose.call(this);
};
draw2d.PropertyWindow.prototype.createHTMLElement=function(){
var item=draw2d.WindowFigure.prototype.createHTMLElement.call(this);
item.appendChild(this.createLabel("Type:",15,25));
item.appendChild(this.createLabel("X :",15,50));
item.appendChild(this.createLabel("Y :",15,70));
item.appendChild(this.createLabel("Width :",85,50));
item.appendChild(this.createLabel("Height :",85,70));
this.labelType=this.createLabel("",50,25);
this.labelX=this.createLabel("",40,50);
this.labelY=this.createLabel("",40,70);
this.labelWidth=this.createLabel("",135,50);
this.labelHeight=this.createLabel("",135,70);
this.labelType.style.fontWeight="normal";
this.labelX.style.fontWeight="normal";
this.labelY.style.fontWeight="normal";
this.labelWidth.style.fontWeight="normal";
this.labelHeight.style.fontWeight="normal";
item.appendChild(this.labelType);
item.appendChild(this.labelX);
item.appendChild(this.labelY);
item.appendChild(this.labelWidth);
item.appendChild(this.labelHeight);
return item;
};
draw2d.PropertyWindow.prototype.onSelectionChanged=function(_1a85){
draw2d.WindowFigure.prototype.onSelectionChanged.call(this,_1a85);
if(this.currentSelection!==null){
this.currentSelection.detachMoveListener(this);
}
this.currentSelection=_1a85;
if(_1a85!==null&&_1a85!=this){
this.labelType.innerHTML=_1a85.type;
if(_1a85.getX){
this.labelX.innerHTML=_1a85.getX();
this.labelY.innerHTML=_1a85.getY();
this.labelWidth.innerHTML=_1a85.getWidth();
this.labelHeight.innerHTML=_1a85.getHeight();
this.currentSelection=_1a85;
this.currentSelection.attachMoveListener(this);
}else{
this.labelX.innerHTML="";
this.labelY.innerHTML="";
this.labelWidth.innerHTML="";
this.labelHeight.innerHTML="";
}
}else{
this.labelType.innerHTML="&lt;none&gt;";
this.labelX.innerHTML="";
this.labelY.innerHTML="";
this.labelWidth.innerHTML="";
this.labelHeight.innerHTML="";
}
};
draw2d.PropertyWindow.prototype.getCurrentSelection=function(){
return this.currentSelection;
};
draw2d.PropertyWindow.prototype.onOtherFigureMoved=function(_1a86){
if(_1a86==this.currentSelection){
this.onSelectionChanged(_1a86);
}
};
draw2d.PropertyWindow.prototype.createLabel=function(text,x,y){
var l=document.createElement("div");
l.style.position="absolute";
l.style.left=x+"px";
l.style.top=y+"px";
l.style.font="normal 10px verdana";
l.style.whiteSpace="nowrap";
l.style.fontWeight="bold";
l.innerHTML=text;
this.disableTextSelection(l);
return l;
};
draw2d.ColorDialog=function(){
this.maxValue={"h":"359","s":"100","v":"100"};
this.HSV={0:359,1:100,2:100};
this.slideHSV={0:359,1:100,2:100};
this.SVHeight=165;
this.wSV=162;
this.wH=162;
draw2d.Dialog.call(this,"Color Chooser");
this.loadSV();
this.setColor(new draw2d.Color(255,0,0));
this.setDimension(219,244);
};
draw2d.ColorDialog.prototype=new draw2d.Dialog();
draw2d.ColorDialog.prototype.type="draw2d.ColorDialog";
draw2d.ColorDialog.prototype.createHTMLElement=function(){
var oThis=this;
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
this.outerDiv=document.createElement("div");
this.outerDiv.id="plugin";
this.outerDiv.style.top="15px";
this.outerDiv.style.left="0px";
this.outerDiv.style.width="201px";
this.outerDiv.style.position="absolute";
this.outerDiv.style.padding="9px";
this.outerDiv.display="block";
this.outerDiv.style.background="#0d0d0d";
this.plugHEX=document.createElement("div");
this.plugHEX.id="plugHEX";
this.plugHEX.innerHTML="F1FFCC";
this.plugHEX.style.color="white";
this.plugHEX.style.font="normal 10px verdana";
this.outerDiv.appendChild(this.plugHEX);
this.SV=document.createElement("div");
this.SV.onmousedown=function(event){
oThis.mouseDownSV(oThis.SVslide,event);
};
this.SV.id="SV";
this.SV.style.cursor="crosshair";
this.SV.style.background="#FF0000 url(SatVal.png)";
this.SV.style.position="absolute";
this.SV.style.height="166px";
this.SV.style.width="167px";
this.SV.style.marginRight="10px";
this.SV.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='SatVal.png', sizingMethod='scale')";
this.SV.style["float"]="left";
this.outerDiv.appendChild(this.SV);
this.SVslide=document.createElement("div");
this.SVslide.onmousedown=function(event){
oThis.mouseDownSV(event);
};
this.SVslide.style.top="40px";
this.SVslide.style.left="40px";
this.SVslide.style.position="absolute";
this.SVslide.style.cursor="crosshair";
this.SVslide.style.background="url(slide.gif)";
this.SVslide.style.height="9px";
this.SVslide.style.width="9px";
this.SVslide.style.lineHeight="1px";
this.outerDiv.appendChild(this.SVslide);
this.H=document.createElement("form");
this.H.id="H";
this.H.onmousedown=function(event){
oThis.mouseDownH(event);
};
this.H.style.border="1px solid #000000";
this.H.style.cursor="crosshair";
this.H.style.position="absolute";
this.H.style.width="19px";
this.H.style.top="28px";
this.H.style.left="191px";
this.outerDiv.appendChild(this.H);
this.Hslide=document.createElement("div");
this.Hslide.style.top="-7px";
this.Hslide.style.left="-8px";
this.Hslide.style.background="url(slideHue.gif)";
this.Hslide.style.height="5px";
this.Hslide.style.width="33px";
this.Hslide.style.position="absolute";
this.Hslide.style.lineHeight="1px";
this.H.appendChild(this.Hslide);
this.Hmodel=document.createElement("div");
this.Hmodel.style.height="1px";
this.Hmodel.style.width="19px";
this.Hmodel.style.lineHeight="1px";
this.Hmodel.style.margin="0px";
this.Hmodel.style.padding="0px";
this.Hmodel.style.fontSize="1px";
this.H.appendChild(this.Hmodel);
item.appendChild(this.outerDiv);
return item;
};
draw2d.ColorDialog.prototype.onOk=function(){
draw2d.Dialog.prototype.onOk.call(this);
};
draw2d.browser=function(v){
return (Math.max(navigator.userAgent.toLowerCase().indexOf(v),0));
};
draw2d.ColorDialog.prototype.showColor=function(c){
this.plugHEX.style.background="#"+c;
this.plugHEX.innerHTML=c;
};
draw2d.ColorDialog.prototype.getSelectedColor=function(){
var rgb=this.hex2rgb(this.plugHEX.innerHTML);
return new draw2d.Color(rgb[0],rgb[1],rgb[2]);
};
draw2d.ColorDialog.prototype.setColor=function(color){
if(color===null){
color=new draw2d.Color(100,100,100);
}
var hex=this.rgb2hex(Array(color.getRed(),color.getGreen(),color.getBlue()));
this.updateH(hex);
};
draw2d.ColorDialog.prototype.XY=function(e,v){
var z=draw2d.browser("msie")?Array(event.clientX+document.body.scrollLeft,event.clientY+document.body.scrollTop):Array(e.pageX,e.pageY);
return z[v];
};
draw2d.ColorDialog.prototype.mkHSV=function(a,b,c){
return (Math.min(a,Math.max(0,Math.ceil((parseInt(c)/b)*a))));
};
draw2d.ColorDialog.prototype.ckHSV=function(a,b){
if(a>=0&&a<=b){
return (a);
}else{
if(a>b){
return (b);
}else{
if(a<0){
return ("-"+oo);
}
}
}
};
draw2d.ColorDialog.prototype.mouseDownH=function(e){
this.slideHSV[0]=this.HSV[0];
var oThis=this;
this.H.onmousemove=function(e){
oThis.dragH(e);
};
this.H.onmouseup=function(e){
oThis.H.onmousemove="";
oThis.H.onmouseup="";
};
this.dragH(e);
};
draw2d.ColorDialog.prototype.dragH=function(e){
var y=this.XY(e,1)-this.getY()-40;
this.Hslide.style.top=(this.ckHSV(y,this.wH)-5)+"px";
this.slideHSV[0]=this.mkHSV(359,this.wH,this.Hslide.style.top);
this.updateSV();
this.showColor(this.commit());
this.SV.style.backgroundColor="#"+this.hsv2hex(Array(this.HSV[0],100,100));
};
draw2d.ColorDialog.prototype.mouseDownSV=function(o,e){
this.slideHSV[0]=this.HSV[0];
var oThis=this;
function reset(){
oThis.SV.onmousemove="";
oThis.SV.onmouseup="";
oThis.SVslide.onmousemove="";
oThis.SVslide.onmouseup="";
}
this.SV.onmousemove=function(e){
oThis.dragSV(e);
};
this.SV.onmouseup=reset;
this.SVslide.onmousemove=function(e){
oThis.dragSV(e);
};
this.SVslide.onmouseup=reset;
this.dragSV(e);
};
draw2d.ColorDialog.prototype.dragSV=function(e){
var x=this.XY(e,0)-this.getX()-1;
var y=this.XY(e,1)-this.getY()-20;
this.SVslide.style.left=this.ckHSV(x,this.wSV)+"px";
this.SVslide.style.top=this.ckHSV(y,this.wSV)+"px";
this.slideHSV[1]=this.mkHSV(100,this.wSV,this.SVslide.style.left);
this.slideHSV[2]=100-this.mkHSV(100,this.wSV,this.SVslide.style.top);
this.updateSV();
};
draw2d.ColorDialog.prototype.commit=function(){
var r="hsv";
var z={};
var j="";
for(var i=0;i<=r.length-1;i++){
j=r.substr(i,1);
z[i]=(j=="h")?this.maxValue[j]-this.mkHSV(this.maxValue[j],this.wH,this.Hslide.style.top):this.HSV[i];
}
return (this.updateSV(this.hsv2hex(z)));
};
draw2d.ColorDialog.prototype.updateSV=function(v){
this.HSV=v?this.hex2hsv(v):Array(this.slideHSV[0],this.slideHSV[1],this.slideHSV[2]);
if(!v){
v=this.hsv2hex(Array(this.slideHSV[0],this.slideHSV[1],this.slideHSV[2]));
}
this.showColor(v);
return v;
};
draw2d.ColorDialog.prototype.loadSV=function(){
var z="";
for(var i=this.SVHeight;i>=0;i--){
z+="<div style=\"background:#"+this.hsv2hex(Array(Math.round((359/this.SVHeight)*i),100,100))+";\"><br/></div>";
}
this.Hmodel.innerHTML=z;
};
draw2d.ColorDialog.prototype.updateH=function(v){
this.plugHEX.innerHTML=v;
this.HSV=this.hex2hsv(v);
this.SV.style.backgroundColor="#"+this.hsv2hex(Array(this.HSV[0],100,100));
this.SVslide.style.top=(parseInt(this.wSV-this.wSV*(this.HSV[1]/100))+20)+"px";
this.SVslide.style.left=(parseInt(this.wSV*(this.HSV[1]/100))+5)+"px";
this.Hslide.style.top=(parseInt(this.wH*((this.maxValue["h"]-this.HSV[0])/this.maxValue["h"]))-7)+"px";
};
draw2d.ColorDialog.prototype.toHex=function(v){
v=Math.round(Math.min(Math.max(0,v),255));
return ("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
};
draw2d.ColorDialog.prototype.hex2rgb=function(r){
return ({0:parseInt(r.substr(0,2),16),1:parseInt(r.substr(2,2),16),2:parseInt(r.substr(4,2),16)});
};
draw2d.ColorDialog.prototype.rgb2hex=function(r){
return (this.toHex(r[0])+this.toHex(r[1])+this.toHex(r[2]));
};
draw2d.ColorDialog.prototype.hsv2hex=function(h){
return (this.rgb2hex(this.hsv2rgb(h)));
};
draw2d.ColorDialog.prototype.hex2hsv=function(v){
return (this.rgb2hsv(this.hex2rgb(v)));
};
draw2d.ColorDialog.prototype.rgb2hsv=function(r){
var max=Math.max(r[0],r[1],r[2]);
var delta=max-Math.min(r[0],r[1],r[2]);
var H;
var S;
var V;
if(max!=0){
S=Math.round(delta/max*100);
if(r[0]==max){
H=(r[1]-r[2])/delta;
}else{
if(r[1]==max){
H=2+(r[2]-r[0])/delta;
}else{
if(r[2]==max){
H=4+(r[0]-r[1])/delta;
}
}
}
var H=Math.min(Math.round(H*60),360);
if(H<0){
H+=360;
}
}
return ({0:H?H:0,1:S?S:0,2:Math.round((max/255)*100)});
};
draw2d.ColorDialog.prototype.hsv2rgb=function(r){
var R;
var B;
var G;
var S=r[1]/100;
var V=r[2]/100;
var H=r[0]/360;
if(S>0){
if(H>=1){
H=0;
}
H=6*H;
F=H-Math.floor(H);
A=Math.round(255*V*(1-S));
B=Math.round(255*V*(1-(S*F)));
C=Math.round(255*V*(1-(S*(1-F))));
V=Math.round(255*V);
switch(Math.floor(H)){
case 0:
R=V;
G=C;
B=A;
break;
case 1:
R=B;
G=V;
B=A;
break;
case 2:
R=A;
G=V;
B=C;
break;
case 3:
R=A;
G=B;
B=V;
break;
case 4:
R=C;
G=A;
B=V;
break;
case 5:
R=V;
G=A;
B=B;
break;
}
return ({0:R?R:0,1:G?G:0,2:B?B:0});
}else{
return ({0:(V=Math.round(V*255)),1:V,2:V});
}
};
draw2d.LineColorDialog=function(_205e){
draw2d.ColorDialog.call(this);
this.figure=_205e;
var color=_205e.getColor();
this.updateH(this.rgb2hex(color.getRed(),color.getGreen(),color.getBlue()));
};
draw2d.LineColorDialog.prototype=new draw2d.ColorDialog();
draw2d.LineColorDialog.prototype.type="draw2d.LineColorDialog";
draw2d.LineColorDialog.prototype.onOk=function(){
var _2060=this.workflow;
draw2d.ColorDialog.prototype.onOk.call(this);
if(typeof this.figure.setColor=="function"){
_2060.getCommandStack().execute(new draw2d.CommandSetColor(this.figure,this.getSelectedColor()));
if(_2060.getCurrentSelection()==this.figure){
_2060.setCurrentSelection(this.figure);
}
}
};
draw2d.BackgroundColorDialog=function(_1d4f){
draw2d.ColorDialog.call(this);
this.figure=_1d4f;
var color=_1d4f.getBackgroundColor();
if(color!==null){
this.updateH(this.rgb2hex(color.getRed(),color.getGreen(),color.getBlue()));
}
};
draw2d.BackgroundColorDialog.prototype=new draw2d.ColorDialog();
draw2d.BackgroundColorDialog.prototype.type="draw2d.BackgroundColorDialog";
draw2d.BackgroundColorDialog.prototype.onOk=function(){
var _1d51=this.workflow;
draw2d.ColorDialog.prototype.onOk.call(this);
if(typeof this.figure.setBackgroundColor=="function"){
_1d51.getCommandStack().execute(new draw2d.CommandSetBackgroundColor(this.figure,this.getSelectedColor()));
if(_1d51.getCurrentSelection()==this.figure){
_1d51.setCurrentSelection(this.figure);
}
}
};
draw2d.AnnotationDialog=function(_267d){
this.figure=_267d;
draw2d.Dialog.call(this);
this.setDimension(400,100);
};
draw2d.AnnotationDialog.prototype=new draw2d.Dialog();
draw2d.AnnotationDialog.prototype.type="draw2d.AnnotationDialog";
draw2d.AnnotationDialog.prototype.createHTMLElement=function(){
var item=draw2d.Dialog.prototype.createHTMLElement.call(this);
var _267f=document.createElement("form");
_267f.style.position="absolute";
_267f.style.left="10px";
_267f.style.top="30px";
_267f.style.width="375px";
_267f.style.font="normal 10px verdana";
item.appendChild(_267f);
this.label=document.createTextNode("Text");
_267f.appendChild(this.label);
this.input=document.createElement("input");
this.input.style.border="1px solid gray";
this.input.style.font="normal 10px verdana";
this.input.type="text";
var value=this.figure.getText();
if(value){
this.input.value=value;
}else{
this.input.value="";
}
this.input.style.width="100%";
_267f.appendChild(this.input);
this.input.focus();
return item;
};
draw2d.AnnotationDialog.prototype.onOk=function(){
this.workflow.getCommandStack().execute(new draw2d.CommandSetText(this.figure,this.input.value));
this.workflow.removeFigure(this);
};
draw2d.Command=function(label){
this.label=label;
};
draw2d.Command.prototype.type="draw2d.Command";
draw2d.Command.prototype.getLabel=function(){
return this.label;
};
draw2d.Command.prototype.canExecute=function(){
return true;
};
draw2d.Command.prototype.execute=function(){
};
draw2d.Command.prototype.cancel=function(){
};
draw2d.Command.prototype.undo=function(){
};
draw2d.Command.prototype.redo=function(){
};
draw2d.CommandStack=function(){
this.undostack=[];
this.redostack=[];
this.maxundo=50;
this.eventListeners=new draw2d.ArrayList();
};
draw2d.CommandStack.PRE_EXECUTE=1;
draw2d.CommandStack.PRE_REDO=2;
draw2d.CommandStack.PRE_UNDO=4;
draw2d.CommandStack.POST_EXECUTE=8;
draw2d.CommandStack.POST_REDO=16;
draw2d.CommandStack.POST_UNDO=32;
draw2d.CommandStack.POST_MASK=draw2d.CommandStack.POST_EXECUTE|draw2d.CommandStack.POST_UNDO|draw2d.CommandStack.POST_REDO;
draw2d.CommandStack.PRE_MASK=draw2d.CommandStack.PRE_EXECUTE|draw2d.CommandStack.PRE_UNDO|draw2d.CommandStack.PRE_REDO;
draw2d.CommandStack.prototype.type="draw2d.CommandStack";
draw2d.CommandStack.prototype.setUndoLimit=function(count){
this.maxundo=count;
};
draw2d.CommandStack.prototype.markSaveLocation=function(){
this.undostack=[];
this.redostack=[];
};
draw2d.CommandStack.prototype.execute=function(_27fc){
if(_27fc===null){
return;
}
if(_27fc.canExecute()==false){
return;
}
this.notifyListeners(_27fc,draw2d.CommandStack.PRE_EXECUTE);
this.undostack.push(_27fc);
_27fc.execute();
this.redostack=[];
if(this.undostack.length>this.maxundo){
this.undostack=this.undostack.slice(this.undostack.length-this.maxundo);
}
this.notifyListeners(_27fc,draw2d.CommandStack.POST_EXECUTE);
};
draw2d.CommandStack.prototype.undo=function(){
var _27fd=this.undostack.pop();
if(_27fd){
this.notifyListeners(_27fd,draw2d.CommandStack.PRE_UNDO);
this.redostack.push(_27fd);
_27fd.undo();
this.notifyListeners(_27fd,draw2d.CommandStack.POST_UNDO);
}
};
draw2d.CommandStack.prototype.redo=function(){
var _27fe=this.redostack.pop();
if(_27fe){
this.notifyListeners(_27fe,draw2d.CommandStack.PRE_REDO);
this.undostack.push(_27fe);
_27fe.redo();
this.notifyListeners(_27fe,draw2d.CommandStack.POST_REDO);
}
};
draw2d.CommandStack.prototype.getRedoLabel=function(){
if(this.redostack.lenght===0){
return "";
}
var _27ff=this.redostack[this.redostack.length-1];
if(_27ff){
return _27ff.getLabel();
}
return "";
};
draw2d.CommandStack.prototype.getUndoLabel=function(){
if(this.undostack.lenght===0){
return "";
}
var _2800=this.undostack[this.undostack.length-1];
if(_2800){
return _2800.getLabel();
}
return "";
};
draw2d.CommandStack.prototype.canRedo=function(){
return this.redostack.length>0;
};
draw2d.CommandStack.prototype.canUndo=function(){
return this.undostack.length>0;
};
draw2d.CommandStack.prototype.addCommandStackEventListener=function(_2801){
if(_2801 instanceof draw2d.CommandStackEventListener){
this.eventListeners.add(_2801);
}else{
throw "Object doesn't implement required callback interface [draw2d.CommandStackListener]";
}
};
draw2d.CommandStack.prototype.removeCommandStackEventListener=function(_2802){
this.eventListeners.remove(_2802);
};
draw2d.CommandStack.prototype.notifyListeners=function(_2803,state){
var event=new draw2d.CommandStackEvent(_2803,state);
var size=this.eventListeners.getSize();
for(var i=0;i<size;i++){
this.eventListeners.get(i).stackChanged(event);
}
};
draw2d.CommandStackEvent=function(_2112,_2113){
this.command=_2112;
this.details=_2113;
};
draw2d.CommandStackEvent.prototype.type="draw2d.CommandStackEvent";
draw2d.CommandStackEvent.prototype.getCommand=function(){
return this.command;
};
draw2d.CommandStackEvent.prototype.getDetails=function(){
return this.details;
};
draw2d.CommandStackEvent.prototype.isPostChangeEvent=function(){
return 0!=(this.getDetails()&draw2d.CommandStack.POST_MASK);
};
draw2d.CommandStackEvent.prototype.isPreChangeEvent=function(){
return 0!=(this.getDetails()&draw2d.CommandStack.PRE_MASK);
};
draw2d.CommandStackEventListener=function(){
};
draw2d.CommandStackEventListener.prototype.type="draw2d.CommandStackEventListener";
draw2d.CommandStackEventListener.prototype.stackChanged=function(event){
};
draw2d.CommandAdd=function(_2b93,_2b94,x,y,_2b97){
draw2d.Command.call(this,"add figure");
if(_2b97===undefined){
_2b97=null;
}
this.parent=_2b97;
this.figure=_2b94;
this.x=x;
this.y=y;
this.workflow=_2b93;
};
draw2d.CommandAdd.prototype=new draw2d.Command();
draw2d.CommandAdd.prototype.type="draw2d.CommandAdd";
draw2d.CommandAdd.prototype.execute=function(){
this.redo();
};
draw2d.CommandAdd.prototype.redo=function(){
if(this.x&&this.y){
this.workflow.addFigure(this.figure,this.x,this.y);
}else{
this.workflow.addFigure(this.figure);
}
this.workflow.setCurrentSelection(this.figure);
if(this.parent!==null){
this.parent.addChild(this.figure);
}
};
draw2d.CommandAdd.prototype.undo=function(){
this.workflow.removeFigure(this.figure);
this.workflow.setCurrentSelection(null);
if(this.parent!==null){
this.parent.removeChild(this.figure);
}
};
draw2d.CommandDelete=function(_2008){
draw2d.Command.call(this,"delete figure");
this.parent=_2008.parent;
this.figure=_2008;
this.workflow=_2008.workflow;
this.connections=null;
this.compartmentDeleteCommands=null;
};
draw2d.CommandDelete.prototype=new draw2d.Command();
draw2d.CommandDelete.prototype.type="draw2d.CommandDelete";
draw2d.CommandDelete.prototype.execute=function(){
this.redo();
};
draw2d.CommandDelete.prototype.undo=function(){
if(this.figure instanceof draw2d.CompartmentFigure){
for(var i=0;i<this.compartmentDeleteCommands.getSize();i++){
var _200a=this.compartmentDeleteCommands.get(i);
this.figure.addChild(_200a.figure);
this.workflow.getCommandStack().undo();
}
}
this.workflow.addFigure(this.figure);
if(this.figure instanceof draw2d.Connection){
this.figure.reconnect();
}
this.workflow.setCurrentSelection(this.figure);
if(this.parent!==null){
this.parent.addChild(this.figure);
}
for(var i=0;i<this.connections.getSize();++i){
this.workflow.addFigure(this.connections.get(i));
this.connections.get(i).reconnect();
}
};
draw2d.CommandDelete.prototype.redo=function(){
if(this.figure instanceof draw2d.CompartmentFigure){
if(this.compartmentDeleteCommands===null){
this.compartmentDeleteCommands=new draw2d.ArrayList();
var _200b=this.figure.getChildren().clone();
for(var i=0;i<_200b.getSize();i++){
var child=_200b.get(i);
this.figure.removeChild(child);
var _200e=new draw2d.CommandDelete(child);
this.compartmentDeleteCommands.add(_200e);
this.workflow.getCommandStack().execute(_200e);
}
}else{
for(var i=0;i<this.compartmentDeleteCommands.getSize();i++){
this.workflow.redo();
}
}
}
this.workflow.removeFigure(this.figure);
this.workflow.setCurrentSelection(null);
if(this.figure instanceof draw2d.Node&&this.connections===null){
this.connections=new draw2d.ArrayList();
var ports=this.figure.getPorts();
for(var i=0;i<ports.getSize();i++){
var port=ports.get(i);
for(var c=0,c_size=port.getConnections().getSize();c<c_size;c++){
if(!this.connections.contains(port.getConnections().get(c))){
this.connections.add(port.getConnections().get(c));
}
}
}
}
if(this.connections===null){
this.connections=new draw2d.ArrayList();
}
if(this.parent!==null){
this.parent.removeChild(this.figure);
}
for(var i=0;i<this.connections.getSize();++i){
this.workflow.removeFigure(this.connections.get(i));
}
};
draw2d.CommandMove=function(_2859,x,y){
draw2d.Command.call(this,"move figure");
this.figure=_2859;
if(x==undefined){
this.oldX=_2859.getX();
this.oldY=_2859.getY();
}else{
this.oldX=x;
this.oldY=y;
}
this.oldCompartment=_2859.getParent();
};
draw2d.CommandMove.prototype=new draw2d.Command();
draw2d.CommandMove.prototype.type="draw2d.CommandMove";
draw2d.CommandMove.prototype.setStartPosition=function(x,y){
this.oldX=x;
this.oldY=y;
};
draw2d.CommandMove.prototype.setPosition=function(x,y){
this.newX=x;
this.newY=y;
this.newCompartment=this.figure.workflow.getBestCompartmentFigure(x,y,this.figure);
};
draw2d.CommandMove.prototype.canExecute=function(){
return this.newX!=this.oldX||this.newY!=this.oldY;
};
draw2d.CommandMove.prototype.execute=function(){
this.redo();
};
draw2d.CommandMove.prototype.undo=function(){
this.figure.setPosition(this.oldX,this.oldY);
if(this.newCompartment!==null){
this.newCompartment.removeChild(this.figure);
}
if(this.oldCompartment!==null){
this.oldCompartment.addChild(this.figure);
}
this.figure.workflow.moveResizeHandles(this.figure);
};
draw2d.CommandMove.prototype.redo=function(){
this.figure.setPosition(this.newX,this.newY);
if(this.oldCompartment!==null){
this.oldCompartment.removeChild(this.figure);
}
if(this.newCompartment!==null){
this.newCompartment.addChild(this.figure);
}
this.figure.workflow.moveResizeHandles(this.figure);
};
draw2d.CommandResize=function(_2bfe,width,_2c00){
draw2d.Command.call(this,"resize figure");
this.figure=_2bfe;
if(width===undefined){
this.oldWidth=_2bfe.getWidth();
this.oldHeight=_2bfe.getHeight();
}else{
this.oldWidth=width;
this.oldHeight=_2c00;
}
};
draw2d.CommandResize.prototype=new draw2d.Command();
draw2d.CommandResize.prototype.type="draw2d.CommandResize";
draw2d.CommandResize.prototype.setDimension=function(width,_2c02){
this.newWidth=width;
this.newHeight=_2c02;
};
draw2d.CommandResize.prototype.canExecute=function(){
return this.newWidth!=this.oldWidth||this.newHeight!=this.oldHeight;
};
draw2d.CommandResize.prototype.execute=function(){
this.redo();
};
draw2d.CommandResize.prototype.undo=function(){
this.figure.setDimension(this.oldWidth,this.oldHeight);
this.figure.workflow.moveResizeHandles(this.figure);
};
draw2d.CommandResize.prototype.redo=function(){
this.figure.setDimension(this.newWidth,this.newHeight);
this.figure.workflow.moveResizeHandles(this.figure);
};
draw2d.CommandSetText=function(_1fcf,text){
draw2d.Command.call(this,"set text");
this.figure=_1fcf;
this.newText=text;
this.oldText=_1fcf.getText();
};
draw2d.CommandSetText.prototype=new draw2d.Command();
draw2d.CommandSetText.prototype.type="draw2d.CommandSetText";
draw2d.CommandSetText.prototype.execute=function(){
this.redo();
};
draw2d.CommandSetText.prototype.redo=function(){
this.figure.setText(this.newText);
};
draw2d.CommandSetText.prototype.undo=function(){
this.figure.setText(this.oldText);
};
draw2d.CommandSetColor=function(_287d,color){
draw2d.Command.call(this,"set color");
this.figure=_287d;
this.newColor=color;
this.oldColor=_287d.getColor();
};
draw2d.CommandSetColor.prototype=new draw2d.Command();
draw2d.CommandSetColor.prototype.type="draw2d.CommandSetColor";
draw2d.CommandSetColor.prototype.execute=function(){
this.redo();
};
draw2d.CommandSetColor.prototype.undo=function(){
this.figure.setColor(this.oldColor);
};
draw2d.CommandSetColor.prototype.redo=function(){
this.figure.setColor(this.newColor);
};
draw2d.CommandSetBackgroundColor=function(_2003,color){
draw2d.Command.call(this,"set background color");
this.figure=_2003;
this.newColor=color;
this.oldColor=_2003.getBackgroundColor();
};
draw2d.CommandSetBackgroundColor.prototype=new draw2d.Command();
draw2d.CommandSetBackgroundColor.prototype.type="draw2d.CommandSetBackgroundColor";
draw2d.CommandSetBackgroundColor.prototype.execute=function(){
this.redo();
};
draw2d.CommandSetBackgroundColor.prototype.undo=function(){
this.figure.setBackgroundColor(this.oldColor);
};
draw2d.CommandSetBackgroundColor.prototype.redo=function(){
this.figure.setBackgroundColor(this.newColor);
};
draw2d.CommandConnect=function(_236e,_236f,_2370){
draw2d.Command.call(this,"create connection");
this.workflow=_236e;
this.source=_236f;
this.target=_2370;
this.connection=null;
};
draw2d.CommandConnect.prototype=new draw2d.Command();
draw2d.CommandConnect.prototype.type="draw2d.CommandConnect";
draw2d.CommandConnect.prototype.setConnection=function(_2371){
this.connection=_2371;
};
draw2d.CommandConnect.prototype.execute=function(){
if(this.connection===null){
this.connection=new draw2d.Connection();
}
this.connection.setSource(this.source);
this.connection.setTarget(this.target);
this.workflow.addFigure(this.connection);
};
draw2d.CommandConnect.prototype.redo=function(){
this.workflow.addFigure(this.connection);
this.connection.reconnect();
};
draw2d.CommandConnect.prototype.undo=function(){
this.workflow.removeFigure(this.connection);
};
draw2d.CommandReconnect=function(con){
draw2d.Command.call(this,"reconnect connection");
this.con=con;
this.oldSourcePort=con.getSource();
this.oldTargetPort=con.getTarget();
this.oldRouter=con.getRouter();
this.con.setRouter(new draw2d.NullConnectionRouter());
};
draw2d.CommandReconnect.prototype=new draw2d.Command();
draw2d.CommandReconnect.prototype.type="draw2d.CommandReconnect";
draw2d.CommandReconnect.prototype.canExecute=function(){
return true;
};
draw2d.CommandReconnect.prototype.setNewPorts=function(_1ce8,_1ce9){
this.newSourcePort=_1ce8;
this.newTargetPort=_1ce9;
};
draw2d.CommandReconnect.prototype.execute=function(){
this.redo();
};
draw2d.CommandReconnect.prototype.cancel=function(){
var start=this.con.sourceAnchor.getLocation(this.con.targetAnchor.getReferencePoint());
var end=this.con.targetAnchor.getLocation(this.con.sourceAnchor.getReferencePoint());
this.con.setStartPoint(start.x,start.y);
this.con.setEndPoint(end.x,end.y);
this.con.getWorkflow().showLineResizeHandles(this.con);
this.con.setRouter(this.oldRouter);
};
draw2d.CommandReconnect.prototype.undo=function(){
this.con.setSource(this.oldSourcePort);
this.con.setTarget(this.oldTargetPort);
this.con.setRouter(this.oldRouter);
if(this.con.getWorkflow().getCurrentSelection()==this.con){
this.con.getWorkflow().showLineResizeHandles(this.con);
}
};
draw2d.CommandReconnect.prototype.redo=function(){
this.con.setSource(this.newSourcePort);
this.con.setTarget(this.newTargetPort);
this.con.setRouter(this.oldRouter);
if(this.con.getWorkflow().getCurrentSelection()==this.con){
this.con.getWorkflow().showLineResizeHandles(this.con);
}
};
draw2d.CommandMoveLine=function(line,_2a78,_2a79,endX,endY){
draw2d.Command.call(this,"move line");
this.line=line;
this.startX1=_2a78;
this.startY1=_2a79;
this.endX1=endX;
this.endY1=endY;
};
draw2d.CommandMoveLine.prototype=new draw2d.Command();
draw2d.CommandMoveLine.prototype.type="draw2d.CommandMoveLine";
draw2d.CommandMoveLine.prototype.canExecute=function(){
return this.startX1!=this.startX2||this.startY1!=this.startY2||this.endX1!=this.endX2||this.endY1!=this.endY2;
};
draw2d.CommandMoveLine.prototype.execute=function(){
this.startX2=this.line.getStartX();
this.startY2=this.line.getStartY();
this.endX2=this.line.getEndX();
this.endY2=this.line.getEndY();
this.redo();
};
draw2d.CommandMoveLine.prototype.undo=function(){
this.line.setStartPoint(this.startX1,this.startY1);
this.line.setEndPoint(this.endX1,this.endY1);
if(this.line.workflow.getCurrentSelection()==this.line){
this.line.workflow.showLineResizeHandles(this.line);
}
};
draw2d.CommandMoveLine.prototype.redo=function(){
this.line.setStartPoint(this.startX2,this.startY2);
this.line.setEndPoint(this.endX2,this.endY2);
if(this.line.workflow.getCurrentSelection()==this.line){
this.line.workflow.showLineResizeHandles(this.line);
}
};
draw2d.CommandMovePort=function(port){
draw2d.Command.call(this,"move port");
this.port=port;
};
draw2d.CommandMovePort.prototype=new draw2d.Command();
draw2d.CommandMovePort.prototype.type="draw2d.CommandMovePort";
draw2d.CommandMovePort.prototype.execute=function(){
this.port.setAlpha(1);
this.port.setPosition(this.port.originX,this.port.originY);
this.port.parentNode.workflow.hideConnectionLine();
};
draw2d.CommandMovePort.prototype.undo=function(){
};
draw2d.CommandMovePort.prototype.redo=function(){
};
draw2d.CommandMovePort.prototype.setPosition=function(x,y){
};
draw2d.Menu=function(){
this.menuItems=new draw2d.ArrayList();
draw2d.Figure.call(this);
this.setSelectable(false);
this.setDeleteable(false);
this.setCanDrag(false);
this.setResizeable(false);
this.setSelectable(false);
this.setZOrder(10000);
this.dirty=false;
};
draw2d.Menu.prototype=new draw2d.Figure();
draw2d.Menu.prototype.type="draw2d.Menu";
draw2d.Menu.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.style.position="absolute";
item.style.left=this.x+"px";
item.style.top=this.y+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.zIndex=""+draw2d.Figure.ZOrderBaseIndex;
item.style.border="1px solid gray";
item.style.background="lavender";
item.style.cursor="pointer";
item.style.width="auto";
item.style.height="auto";
item.style.boxShadow="5px 5px 5px #ccc";
item.style.borderRadius="2px";
item.className="Menu";
return item;
};
draw2d.Menu.prototype.setWorkflow=function(_175c){
this.workflow=_175c;
};
draw2d.Menu.prototype.setDimension=function(w,h){
};
draw2d.Menu.prototype.appendMenuItem=function(item){
this.menuItems.add(item);
item.parentMenu=this;
this.dirty=true;
};
draw2d.Menu.prototype.getHTMLElement=function(){
var html=draw2d.Figure.prototype.getHTMLElement.call(this);
if(this.dirty){
this.createList();
}
return html;
};
draw2d.Menu.prototype.createList=function(){
this.dirty=false;
this.html.innerHTML="";
var oThis=this;
for(var i=0;i<this.menuItems.getSize();i++){
var item=this.menuItems.get(i);
var li=document.createElement("a");
li.innerHTML=item.getLabel();
li.style.display="block";
li.style.fontFamily="Verdana, Arial, Helvetica, sans-serif";
li.style.fontSize="9pt";
li.style.color="dimgray";
li.style.borderBottom="1px solid silver";
li.style.paddingLeft="5px";
li.style.paddingRight="5px";
li.style.whiteSpace="nowrap";
li.style.cursor="pointer";
li.className="MenuItem";
this.html.appendChild(li);
li.menuItem=item;
if(li.addEventListener){
li.addEventListener("click",function(event){
var _1766=arguments[0]||window.event;
_1766.cancelBubble=true;
_1766.returnValue=false;
var diffX=_1766.clientX;
var diffY=_1766.clientY;
var _1769=document.body.parentNode.scrollLeft;
var _176a=document.body.parentNode.scrollTop;
this.menuItem.execute(diffX+_1769,diffY+_176a);
},false);
li.addEventListener("mouseup",function(event){
event.cancelBubble=true;
event.returnValue=false;
},false);
li.addEventListener("mousedown",function(event){
event.cancelBubble=true;
event.returnValue=false;
},false);
li.addEventListener("mouseover",function(event){
this.style.backgroundColor="silver";
},false);
li.addEventListener("mouseout",function(event){
this.style.backgroundColor="transparent";
},false);
}else{
if(li.attachEvent){
li.attachEvent("onclick",function(event){
var _1770=arguments[0]||window.event;
_1770.cancelBubble=true;
_1770.returnValue=false;
var diffX=_1770.clientX;
var diffY=_1770.clientY;
var _1773=document.body.parentNode.scrollLeft;
var _1774=document.body.parentNode.scrollTop;
event.srcElement.menuItem.execute(diffX+_1773,diffY+_1774);
});
li.attachEvent("onmousedown",function(event){
event.cancelBubble=true;
event.returnValue=false;
});
li.attachEvent("onmouseup",function(event){
event.cancelBubble=true;
event.returnValue=false;
});
li.attachEvent("onmouseover",function(event){
event.srcElement.style.backgroundColor="silver";
});
li.attachEvent("onmouseout",function(event){
event.srcElement.style.backgroundColor="transparent";
});
}
}
}
};
draw2d.MenuItem=function(label,_2871,_2872){
this.label=label;
this.iconUrl=_2871;
this.parentMenu=null;
this.action=_2872;
};
draw2d.MenuItem.prototype.type="draw2d.MenuItem";
draw2d.MenuItem.prototype.isEnabled=function(){
return true;
};
draw2d.MenuItem.prototype.getLabel=function(){
return this.label;
};
draw2d.MenuItem.prototype.execute=function(x,y){
this.parentMenu.workflow.showMenu(null);
this.action(x,y);
};
draw2d.Locator=function(){
};
draw2d.Locator.prototype.type="draw2d.Locator";
draw2d.Locator.prototype.relocate=function(_1a82){
};
draw2d.ConnectionLocator=function(_2b89){
draw2d.Locator.call(this);
this.connection=_2b89;
};
draw2d.ConnectionLocator.prototype=new draw2d.Locator;
draw2d.ConnectionLocator.prototype.type="draw2d.ConnectionLocator";
draw2d.ConnectionLocator.prototype.getConnection=function(){
return this.connection;
};
draw2d.ManhattanMidpointLocator=function(_1fd1){
draw2d.ConnectionLocator.call(this,_1fd1);
};
draw2d.ManhattanMidpointLocator.prototype=new draw2d.ConnectionLocator;
draw2d.ManhattanMidpointLocator.prototype.type="draw2d.ManhattanMidpointLocator";
draw2d.ManhattanMidpointLocator.prototype.relocate=function(_1fd2){
var conn=this.getConnection();
var p=new draw2d.Point();
var _1fd5=conn.getPoints();
var index=Math.floor((_1fd5.getSize()-2)/2);
if(_1fd5.getSize()<=index+1){
return;
}
var p1=_1fd5.get(index);
var p2=_1fd5.get(index+1);
p.x=(p2.x-p1.x)/2+p1.x+5;
p.y=(p2.y-p1.y)/2+p1.y+5;
_1fd2.setPosition(p.x,p.y);
};
draw2d.BezierMidpointLocator=function(_15f9){
draw2d.ConnectionLocator.call(this,_15f9);
};
draw2d.BezierMidpointLocator.prototype=new draw2d.ConnectionLocator;
draw2d.BezierMidpointLocator.prototype.type="draw2d.BezierMidpointLocator";
draw2d.BezierMidpointLocator.prototype.relocate=function(_15fa){
var conn=this.getConnection();
var p=new draw2d.Point();
var _15fd=conn.getPoints();
var index=Math.floor((_15fd.getSize()-2)/2);
if(_15fd.getSize()<=index+1){
return;
}
var p1=_15fd.get(index);
var p2=_15fd.get(index+1);
p.x=(p2.x-p1.x)/2+p1.x+5;
p.y=(p2.y-p1.y)/2+p1.y+5;
_15fa.setPosition(p.x,p.y);
};
draw2d.EditPartFactory=function(){
};
draw2d.EditPartFactory.prototype.type="draw2d.EditPartFactory";
draw2d.EditPartFactory.prototype.createEditPart=function(model){
};
draw2d.AbstractObjectModel=function(){
this.listeners=new draw2d.ArrayList();
this.id=draw2d.UUID.create();
};
draw2d.AbstractObjectModel.EVENT_ELEMENT_ADDED="element added";
draw2d.AbstractObjectModel.EVENT_ELEMENT_REMOVED="element removed";
draw2d.AbstractObjectModel.EVENT_CONNECTION_ADDED="connection addedx";
draw2d.AbstractObjectModel.EVENT_CONNECTION_REMOVED="connection removed";
draw2d.AbstractObjectModel.prototype.type="draw2d.AbstractObjectModel";
draw2d.AbstractObjectModel.prototype.getModelChildren=function(){
return new draw2d.ArrayList();
};
draw2d.AbstractObjectModel.prototype.getModelParent=function(){
return this.modelParent;
};
draw2d.AbstractObjectModel.prototype.setModelParent=function(_20a4){
this.modelParent=_20a4;
};
draw2d.AbstractObjectModel.prototype.getId=function(){
return this.id;
};
draw2d.AbstractObjectModel.prototype.firePropertyChange=function(_20a5,_20a6,_20a7){
var count=this.listeners.getSize();
if(count===0){
return;
}
var event=new draw2d.PropertyChangeEvent(this,_20a5,_20a6,_20a7);
for(var i=0;i<count;i++){
try{
this.listeners.get(i).propertyChange(event);
}
catch(e){
alert("Method: draw2d.AbstractObjectModel.prototype.firePropertyChange\n"+e+"\nProperty: "+_20a5+"\nListener Class:"+this.listeners.get(i).type);
}
}
};
draw2d.AbstractObjectModel.prototype.addPropertyChangeListener=function(_20ab){
if(_20ab!==null){
this.listeners.add(_20ab);
}
};
draw2d.AbstractObjectModel.prototype.removePropertyChangeListener=function(_20ac){
if(_20ac!==null){
this.listeners.remove(_20ac);
}
};
draw2d.AbstractObjectModel.prototype.getPersistentAttributes=function(){
return {id:this.id};
};
draw2d.AbstractConnectionModel=function(){
draw2d.AbstractObjectModel.call(this);
};
draw2d.AbstractConnectionModel.prototype=new draw2d.AbstractObjectModel();
draw2d.AbstractConnectionModel.prototype.type="draw2d.AbstractConnectionModel";
draw2d.AbstractConnectionModel.prototype.getSourceModel=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getSourceModel]";
};
draw2d.AbstractConnectionModel.prototype.getTargetModel=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getTargetModel]";
};
draw2d.AbstractConnectionModel.prototype.getSourcePortName=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getSourcePortName]";
};
draw2d.AbstractConnectionModel.prototype.getTargetPortName=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getTargetPortName]";
};
draw2d.AbstractConnectionModel.prototype.getSourcePortModel=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getSourcePortModel]";
};
draw2d.AbstractConnectionModel.prototype.getTargetPortModel=function(){
throw "you must override the method [AbstractConnectionModel.prototype.getTargetPortModel]";
};
draw2d.PropertyChangeEvent=function(model,_244a,_244b,_244c){
this.model=model;
this.property=_244a;
this.oldValue=_244b;
this.newValue=_244c;
};
draw2d.PropertyChangeEvent.prototype.type="draw2d.PropertyChangeEvent";
draw2d.GraphicalViewer=function(id){
try{
draw2d.Workflow.call(this,id);
this.factory=null;
this.model=null;
this.initDone=false;
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer=function(/*:String*/ id)");
}
};
draw2d.GraphicalViewer.prototype=new draw2d.Workflow();
draw2d.GraphicalViewer.prototype.type="draw2d.GraphicalViewer";
draw2d.GraphicalViewer.prototype.setEditPartFactory=function(_1ebe){
this.factory=_1ebe;
this.checkInit();
};
draw2d.GraphicalViewer.prototype.setModel=function(model){
try{
if(model instanceof draw2d.AbstractObjectModel){
this.model=model;
this.checkInit();
this.model.addPropertyChangeListener(this);
}else{
alert("Invalid model class type:"+model.type);
}
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer.prototype.setModel=function(/*:draw2d.AbstractObjectModel*/ model )");
}
};
draw2d.GraphicalViewer.prototype.propertyChange=function(event){
switch(event.property){
case draw2d.AbstractObjectModel.EVENT_ELEMENT_REMOVED:
var _1ec1=this.getFigure(event.oldValue.getId());
this.removeFigure(_1ec1);
break;
case draw2d.AbstractObjectModel.EVENT_ELEMENT_ADDED:
var _1ec1=this.factory.createEditPart(event.newValue);
_1ec1.setId(event.newValue.getId());
this.addFigure(_1ec1);
this.setCurrentSelection(_1ec1);
break;
}
};
draw2d.GraphicalViewer.prototype.checkInit=function(){
if(this.factory!==null&&this.model!==null&&this.initDone==false){
try{
var _1ec2=this.model.getModelChildren();
var count=_1ec2.getSize();
for(var i=0;i<count;i++){
var child=_1ec2.get(i);
var _1ec6=this.factory.createEditPart(child);
_1ec6.setId(child.getId());
this.addFigure(_1ec6);
}
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer.prototype.checkInit=function()[addFigures]");
}
try{
var _1ec7=this.getDocument().getFigures();
var count=_1ec7.getSize();
for(var i=0;i<count;i++){
var _1ec6=_1ec7.get(i);
if(_1ec6 instanceof draw2d.Node){
this.refreshConnections(_1ec6);
}
}
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer.prototype.checkInit=function()[refreshConnections]");
}
}
};
draw2d.GraphicalViewer.prototype.refreshConnections=function(node){
try{
var _1ec9=new draw2d.ArrayList();
var _1eca=node.getModelSourceConnections();
var count=_1eca.getSize();
for(var i=0;i<count;i++){
var _1ecd=_1eca.get(i);
_1ec9.add(_1ecd.getId());
var _1ece=this.getLine(_1ecd.getId());
if(_1ece===null){
_1ece=this.factory.createEditPart(_1ecd);
var _1ecf=_1ecd.getSourceModel();
var _1ed0=_1ecd.getTargetModel();
var _1ed1=this.getFigure(_1ecf.getId());
var _1ed2=this.getFigure(_1ed0.getId());
var _1ed3=_1ed1.getOutputPort(_1ecd.getSourcePortName());
var _1ed4=_1ed2.getInputPort(_1ecd.getTargetPortName());
_1ece.setTarget(_1ed4);
_1ece.setSource(_1ed3);
_1ece.setId(_1ecd.getId());
this.addFigure(_1ece);
this.setCurrentSelection(_1ece);
}
}
var ports=node.getOutputPorts();
count=ports.getSize();
for(var i=0;i<count;i++){
var _1ed6=ports.get(i).getConnections();
var _1ed7=_1ed6.getSize();
for(var ii=0;ii<_1ed7;ii++){
var _1ed9=_1ed6.get(ii);
if(!_1ec9.contains(_1ed9.getId())){
this.removeFigure(_1ed9);
_1ec9.add(_1ed9.getId());
}
}
}
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalViewer.prototype.refreshConnections=function(/*:draw2d.Node*/ node )");
}
};
draw2d.GraphicalEditor=function(id){
try{
this.view=new draw2d.GraphicalViewer(id);
this.initializeGraphicalViewer();
}
catch(e){
pushErrorStack(e,"draw2d.GraphicalEditor=function(/*:String*/ id)");
}
};
draw2d.GraphicalEditor.prototype.type="draw2d.GraphicalEditor";
draw2d.GraphicalEditor.prototype.initializeGraphicalViewer=function(){
};
draw2d.GraphicalEditor.prototype.getGraphicalViewer=function(){
return this.view;
};
draw2d.GraphicalEditor.prototype.executeCommand=function(_2950){
this.view.getCommandStack().execute(_2950);
};
var whitespace="\n\r\t ";
XMLP=function(_28aa){
_28aa=SAXStrings.replace(_28aa,null,null,"\r\n","\n");
_28aa=SAXStrings.replace(_28aa,null,null,"\r","\n");
this.m_xml=_28aa;
this.m_iP=0;
this.m_iState=XMLP._STATE_PROLOG;
this.m_stack=new Stack();
this._clearAttributes();
};
XMLP._NONE=0;
XMLP._ELM_B=1;
XMLP._ELM_E=2;
XMLP._ELM_EMP=3;
XMLP._ATT=4;
XMLP._TEXT=5;
XMLP._ENTITY=6;
XMLP._PI=7;
XMLP._CDATA=8;
XMLP._COMMENT=9;
XMLP._DTD=10;
XMLP._ERROR=11;
XMLP._CONT_XML=0;
XMLP._CONT_ALT=1;
XMLP._ATT_NAME=0;
XMLP._ATT_VAL=1;
XMLP._STATE_PROLOG=1;
XMLP._STATE_DOCUMENT=2;
XMLP._STATE_MISC=3;
XMLP._errs=[];
XMLP._errs[XMLP.ERR_CLOSE_PI=0]="PI: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_DTD=1]="DTD: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_COMMENT=2]="Comment: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_CDATA=3]="CDATA: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_ELM=4]="Element: missing closing sequence";
XMLP._errs[XMLP.ERR_CLOSE_ENTITY=5]="Entity: missing closing sequence";
XMLP._errs[XMLP.ERR_PI_TARGET=6]="PI: target is required";
XMLP._errs[XMLP.ERR_ELM_EMPTY=7]="Element: cannot be both empty and closing";
XMLP._errs[XMLP.ERR_ELM_NAME=8]="Element: name must immediatly follow \"<\"";
XMLP._errs[XMLP.ERR_ELM_LT_NAME=9]="Element: \"<\" not allowed in element names";
XMLP._errs[XMLP.ERR_ATT_VALUES=10]="Attribute: values are required and must be in quotes";
XMLP._errs[XMLP.ERR_ATT_LT_NAME=11]="Element: \"<\" not allowed in attribute names";
XMLP._errs[XMLP.ERR_ATT_LT_VALUE=12]="Attribute: \"<\" not allowed in attribute values";
XMLP._errs[XMLP.ERR_ATT_DUP=13]="Attribute: duplicate attributes not allowed";
XMLP._errs[XMLP.ERR_ENTITY_UNKNOWN=14]="Entity: unknown entity";
XMLP._errs[XMLP.ERR_INFINITELOOP=15]="Infininte loop";
XMLP._errs[XMLP.ERR_DOC_STRUCTURE=16]="Document: only comments, processing instructions, or whitespace allowed outside of document element";
XMLP._errs[XMLP.ERR_ELM_NESTING=17]="Element: must be nested correctly";
XMLP.prototype._addAttribute=function(name,value){
this.m_atts[this.m_atts.length]=new Array(name,value);
};
XMLP.prototype._checkStructure=function(_28ad){
if(XMLP._STATE_PROLOG==this.m_iState){
if((XMLP._TEXT==_28ad)||(XMLP._ENTITY==_28ad)){
if(SAXStrings.indexOfNonWhitespace(this.getContent(),this.getContentBegin(),this.getContentEnd())!=-1){
return this._setErr(XMLP.ERR_DOC_STRUCTURE);
}
}
if((XMLP._ELM_B==_28ad)||(XMLP._ELM_EMP==_28ad)){
this.m_iState=XMLP._STATE_DOCUMENT;
}
}
if(XMLP._STATE_DOCUMENT==this.m_iState){
if((XMLP._ELM_B==_28ad)||(XMLP._ELM_EMP==_28ad)){
this.m_stack.push(this.getName());
}
if((XMLP._ELM_E==_28ad)||(XMLP._ELM_EMP==_28ad)){
var _28ae=this.m_stack.pop();
if((_28ae===null)||(_28ae!=this.getName())){
return this._setErr(XMLP.ERR_ELM_NESTING);
}
}
if(this.m_stack.count()===0){
this.m_iState=XMLP._STATE_MISC;
return _28ad;
}
}
if(XMLP._STATE_MISC==this.m_iState){
if((XMLP._ELM_B==_28ad)||(XMLP._ELM_E==_28ad)||(XMLP._ELM_EMP==_28ad)||(XMLP.EVT_DTD==_28ad)){
return this._setErr(XMLP.ERR_DOC_STRUCTURE);
}
if((XMLP._TEXT==_28ad)||(XMLP._ENTITY==_28ad)){
if(SAXStrings.indexOfNonWhitespace(this.getContent(),this.getContentBegin(),this.getContentEnd())!=-1){
return this._setErr(XMLP.ERR_DOC_STRUCTURE);
}
}
}
return _28ad;
};
XMLP.prototype._clearAttributes=function(){
this.m_atts=[];
};
XMLP.prototype._findAttributeIndex=function(name){
for(var i=0;i<this.m_atts.length;i++){
if(this.m_atts[i][XMLP._ATT_NAME]==name){
return i;
}
}
return -1;
};
XMLP.prototype.getAttributeCount=function(){
return this.m_atts?this.m_atts.length:0;
};
XMLP.prototype.getAttributeName=function(index){
return ((index<0)||(index>=this.m_atts.length))?null:this.m_atts[index][XMLP._ATT_NAME];
};
XMLP.prototype.getAttributeValue=function(index){
return ((index<0)||(index>=this.m_atts.length))?null:__unescapeString(this.m_atts[index][XMLP._ATT_VAL]);
};
XMLP.prototype.getAttributeValueByName=function(name){
return this.getAttributeValue(this._findAttributeIndex(name));
};
XMLP.prototype.getColumnNumber=function(){
return SAXStrings.getColumnNumber(this.m_xml,this.m_iP);
};
XMLP.prototype.getContent=function(){
return (this.m_cSrc==XMLP._CONT_XML)?this.m_xml:this.m_cAlt;
};
XMLP.prototype.getContentBegin=function(){
return this.m_cB;
};
XMLP.prototype.getContentEnd=function(){
return this.m_cE;
};
XMLP.prototype.getLineNumber=function(){
return SAXStrings.getLineNumber(this.m_xml,this.m_iP);
};
XMLP.prototype.getName=function(){
return this.m_name;
};
XMLP.prototype.next=function(){
return this._checkStructure(this._parse());
};
XMLP.prototype._parse=function(){
if(this.m_iP==this.m_xml.length){
return XMLP._NONE;
}
if(this.m_iP==this.m_xml.indexOf("<?",this.m_iP)){
return this._parsePI(this.m_iP+2);
}else{
if(this.m_iP==this.m_xml.indexOf("<!DOCTYPE",this.m_iP)){
return this._parseDTD(this.m_iP+9);
}else{
if(this.m_iP==this.m_xml.indexOf("<!--",this.m_iP)){
return this._parseComment(this.m_iP+4);
}else{
if(this.m_iP==this.m_xml.indexOf("<![CDATA[",this.m_iP)){
return this._parseCDATA(this.m_iP+9);
}else{
if(this.m_iP==this.m_xml.indexOf("<",this.m_iP)){
return this._parseElement(this.m_iP+1);
}else{
if(this.m_iP==this.m_xml.indexOf("&",this.m_iP)){
return this._parseEntity(this.m_iP+1);
}else{
return this._parseText(this.m_iP);
}
}
}
}
}
}
};
XMLP.prototype._parseAttribute=function(iB,iE){
var iNB,iNE,iEq,iVB,iVE;
var _28b7,strN,strV;
this.m_cAlt="";
iNB=SAXStrings.indexOfNonWhitespace(this.m_xml,iB,iE);
if((iNB==-1)||(iNB>=iE)){
return iNB;
}
iEq=this.m_xml.indexOf("=",iNB);
if((iEq==-1)||(iEq>iE)){
return this._setErr(XMLP.ERR_ATT_VALUES);
}
iNE=SAXStrings.lastIndexOfNonWhitespace(this.m_xml,iNB,iEq);
iVB=SAXStrings.indexOfNonWhitespace(this.m_xml,iEq+1,iE);
if((iVB==-1)||(iVB>iE)){
return this._setErr(XMLP.ERR_ATT_VALUES);
}
_28b7=this.m_xml.charAt(iVB);
if(SAXStrings.QUOTES.indexOf(_28b7)==-1){
return this._setErr(XMLP.ERR_ATT_VALUES);
}
iVE=this.m_xml.indexOf(_28b7,iVB+1);
if((iVE==-1)||(iVE>iE)){
return this._setErr(XMLP.ERR_ATT_VALUES);
}
strN=this.m_xml.substring(iNB,iNE+1);
strV=this.m_xml.substring(iVB+1,iVE);
if(strN.indexOf("<")!=-1){
return this._setErr(XMLP.ERR_ATT_LT_NAME);
}
if(strV.indexOf("<")!=-1){
return this._setErr(XMLP.ERR_ATT_LT_VALUE);
}
strV=SAXStrings.replace(strV,null,null,"\n"," ");
strV=SAXStrings.replace(strV,null,null,"\t"," ");
iRet=this._replaceEntities(strV);
if(iRet==XMLP._ERROR){
return iRet;
}
strV=this.m_cAlt;
if(this._findAttributeIndex(strN)==-1){
this._addAttribute(strN,strV);
}else{
return this._setErr(XMLP.ERR_ATT_DUP);
}
this.m_iP=iVE+2;
return XMLP._ATT;
};
XMLP.prototype._parseCDATA=function(iB){
var iE=this.m_xml.indexOf("]]>",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_CDATA);
}
this._setContent(XMLP._CONT_XML,iB,iE);
this.m_iP=iE+3;
return XMLP._CDATA;
};
XMLP.prototype._parseComment=function(iB){
var iE=this.m_xml.indexOf("-"+"->",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_COMMENT);
}
this._setContent(XMLP._CONT_XML,iB,iE);
this.m_iP=iE+3;
return XMLP._COMMENT;
};
XMLP.prototype._parseDTD=function(iB){
var iE,strClose,iInt,iLast;
iE=this.m_xml.indexOf(">",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_DTD);
}
iInt=this.m_xml.indexOf("[",iB);
strClose=((iInt!=-1)&&(iInt<iE))?"]>":">";
while(true){
if(iE==iLast){
return this._setErr(XMLP.ERR_INFINITELOOP);
}
iLast=iE;
iE=this.m_xml.indexOf(strClose,iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_DTD);
}
if(this.m_xml.substring(iE-1,iE+2)!="]]>"){
break;
}
}
this.m_iP=iE+strClose.length;
return XMLP._DTD;
};
XMLP.prototype._parseElement=function(iB){
var iE,iDE,iNE,iRet;
var iType,strN,iLast;
iDE=iE=this.m_xml.indexOf(">",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_ELM);
}
if(this.m_xml.charAt(iB)=="/"){
iType=XMLP._ELM_E;
iB++;
}else{
iType=XMLP._ELM_B;
}
if(this.m_xml.charAt(iE-1)=="/"){
if(iType==XMLP._ELM_E){
return this._setErr(XMLP.ERR_ELM_EMPTY);
}
iType=XMLP._ELM_EMP;
iDE--;
}
iDE=SAXStrings.lastIndexOfNonWhitespace(this.m_xml,iB,iDE);
if(iE-iB!=1){
if(SAXStrings.indexOfNonWhitespace(this.m_xml,iB,iDE)!=iB){
return this._setErr(XMLP.ERR_ELM_NAME);
}
}
this._clearAttributes();
iNE=SAXStrings.indexOfWhitespace(this.m_xml,iB,iDE);
if(iNE==-1){
iNE=iDE+1;
}else{
this.m_iP=iNE;
while(this.m_iP<iDE){
if(this.m_iP==iLast){
return this._setErr(XMLP.ERR_INFINITELOOP);
}
iLast=this.m_iP;
iRet=this._parseAttribute(this.m_iP,iDE);
if(iRet==XMLP._ERROR){
return iRet;
}
}
}
strN=this.m_xml.substring(iB,iNE);
if(strN.indexOf("<")!=-1){
return this._setErr(XMLP.ERR_ELM_LT_NAME);
}
this.m_name=strN;
this.m_iP=iE+1;
return iType;
};
XMLP.prototype._parseEntity=function(iB){
var iE=this.m_xml.indexOf(";",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_ENTITY);
}
this.m_iP=iE+1;
return this._replaceEntity(this.m_xml,iB,iE);
};
XMLP.prototype._parsePI=function(iB){
var iE,iTB,iTE,iCB,iCE;
iE=this.m_xml.indexOf("?>",iB);
if(iE==-1){
return this._setErr(XMLP.ERR_CLOSE_PI);
}
iTB=SAXStrings.indexOfNonWhitespace(this.m_xml,iB,iE);
if(iTB==-1){
return this._setErr(XMLP.ERR_PI_TARGET);
}
iTE=SAXStrings.indexOfWhitespace(this.m_xml,iTB,iE);
if(iTE==-1){
iTE=iE;
}
iCB=SAXStrings.indexOfNonWhitespace(this.m_xml,iTE,iE);
if(iCB==-1){
iCB=iE;
}
iCE=SAXStrings.lastIndexOfNonWhitespace(this.m_xml,iCB,iE);
if(iCE==-1){
iCE=iE-1;
}
this.m_name=this.m_xml.substring(iTB,iTE);
this._setContent(XMLP._CONT_XML,iCB,iCE+1);
this.m_iP=iE+2;
return XMLP._PI;
};
XMLP.prototype._parseText=function(iB){
var iE,iEE;
iE=this.m_xml.indexOf("<",iB);
if(iE==-1){
iE=this.m_xml.length;
}
iEE=this.m_xml.indexOf("&",iB);
if((iEE!=-1)&&(iEE<=iE)){
iE=iEE;
}
this._setContent(XMLP._CONT_XML,iB,iE);
this.m_iP=iE;
return XMLP._TEXT;
};
XMLP.prototype._replaceEntities=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return "";
}
iB=iB||0;
iE=iE||strD.length;
var iEB,iEE,strRet="";
iEB=strD.indexOf("&",iB);
iEE=iB;
while((iEB>0)&&(iEB<iE)){
strRet+=strD.substring(iEE,iEB);
iEE=strD.indexOf(";",iEB)+1;
if((iEE===0)||(iEE>iE)){
return this._setErr(XMLP.ERR_CLOSE_ENTITY);
}
iRet=this._replaceEntity(strD,iEB+1,iEE-1);
if(iRet==XMLP._ERROR){
return iRet;
}
strRet+=this.m_cAlt;
iEB=strD.indexOf("&",iEE);
}
if(iEE!=iE){
strRet+=strD.substring(iEE,iE);
}
this._setContent(XMLP._CONT_ALT,strRet);
return XMLP._ENTITY;
};
XMLP.prototype._replaceEntity=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
switch(strD.substring(iB,iE)){
case "amp":
strEnt="&";
break;
case "lt":
strEnt="<";
break;
case "gt":
strEnt=">";
break;
case "apos":
strEnt="'";
break;
case "quot":
strEnt="\"";
break;
default:
if(strD.charAt(iB)=="#"){
strEnt=String.fromCharCode(parseInt(strD.substring(iB+1,iE)));
}else{
return this._setErr(XMLP.ERR_ENTITY_UNKNOWN);
}
break;
}
this._setContent(XMLP._CONT_ALT,strEnt);
return XMLP._ENTITY;
};
XMLP.prototype._setContent=function(iSrc){
var args=arguments;
if(XMLP._CONT_XML==iSrc){
this.m_cAlt=null;
this.m_cB=args[1];
this.m_cE=args[2];
}else{
this.m_cAlt=args[1];
this.m_cB=0;
this.m_cE=args[1].length;
}
this.m_cSrc=iSrc;
};
XMLP.prototype._setErr=function(iErr){
var _28d1=XMLP._errs[iErr];
this.m_cAlt=_28d1;
this.m_cB=0;
this.m_cE=_28d1.length;
this.m_cSrc=XMLP._CONT_ALT;
return XMLP._ERROR;
};
SAXDriver=function(){
this.m_hndDoc=null;
this.m_hndErr=null;
this.m_hndLex=null;
};
SAXDriver.DOC_B=1;
SAXDriver.DOC_E=2;
SAXDriver.ELM_B=3;
SAXDriver.ELM_E=4;
SAXDriver.CHARS=5;
SAXDriver.PI=6;
SAXDriver.CD_B=7;
SAXDriver.CD_E=8;
SAXDriver.CMNT=9;
SAXDriver.DTD_B=10;
SAXDriver.DTD_E=11;
SAXDriver.prototype.parse=function(strD){
var _28d3=new XMLP(strD);
if(this.m_hndDoc&&this.m_hndDoc.setDocumentLocator){
this.m_hndDoc.setDocumentLocator(this);
}
this.m_parser=_28d3;
this.m_bErr=false;
if(!this.m_bErr){
this._fireEvent(SAXDriver.DOC_B);
}
this._parseLoop();
if(!this.m_bErr){
this._fireEvent(SAXDriver.DOC_E);
}
this.m_xml=null;
this.m_iP=0;
};
SAXDriver.prototype.setDocumentHandler=function(hnd){
this.m_hndDoc=hnd;
};
SAXDriver.prototype.setErrorHandler=function(hnd){
this.m_hndErr=hnd;
};
SAXDriver.prototype.setLexicalHandler=function(hnd){
this.m_hndLex=hnd;
};
SAXDriver.prototype.getColumnNumber=function(){
return this.m_parser.getColumnNumber();
};
SAXDriver.prototype.getLineNumber=function(){
return this.m_parser.getLineNumber();
};
SAXDriver.prototype.getMessage=function(){
return this.m_strErrMsg;
};
SAXDriver.prototype.getPublicId=function(){
return null;
};
SAXDriver.prototype.getSystemId=function(){
return null;
};
SAXDriver.prototype.getLength=function(){
return this.m_parser.getAttributeCount();
};
SAXDriver.prototype.getName=function(index){
return this.m_parser.getAttributeName(index);
};
SAXDriver.prototype.getValue=function(index){
return this.m_parser.getAttributeValue(index);
};
SAXDriver.prototype.getValueByName=function(name){
return this.m_parser.getAttributeValueByName(name);
};
SAXDriver.prototype._fireError=function(_28da){
this.m_strErrMsg=_28da;
this.m_bErr=true;
if(this.m_hndErr&&this.m_hndErr.fatalError){
this.m_hndErr.fatalError(this);
}
};
SAXDriver.prototype._fireEvent=function(iEvt){
var hnd,func,args=arguments,iLen=args.length-1;
if(this.m_bErr){
return;
}
if(SAXDriver.DOC_B==iEvt){
func="startDocument";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.DOC_E==iEvt){
func="endDocument";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.ELM_B==iEvt){
func="startElement";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.ELM_E==iEvt){
func="endElement";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.CHARS==iEvt){
func="characters";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.PI==iEvt){
func="processingInstruction";
hnd=this.m_hndDoc;
}else{
if(SAXDriver.CD_B==iEvt){
func="startCDATA";
hnd=this.m_hndLex;
}else{
if(SAXDriver.CD_E==iEvt){
func="endCDATA";
hnd=this.m_hndLex;
}else{
if(SAXDriver.CMNT==iEvt){
func="comment";
hnd=this.m_hndLex;
}
}
}
}
}
}
}
}
}
if(hnd&&hnd[func]){
if(0==iLen){
hnd[func]();
}else{
if(1==iLen){
hnd[func](args[1]);
}else{
if(2==iLen){
hnd[func](args[1],args[2]);
}else{
if(3==iLen){
hnd[func](args[1],args[2],args[3]);
}
}
}
}
}
};
SAXDriver.prototype._parseLoop=function(_28dd){
var _28de,_28dd;
_28dd=this.m_parser;
while(!this.m_bErr){
_28de=_28dd.next();
if(_28de==XMLP._ELM_B){
this._fireEvent(SAXDriver.ELM_B,_28dd.getName(),this);
}else{
if(_28de==XMLP._ELM_E){
this._fireEvent(SAXDriver.ELM_E,_28dd.getName());
}else{
if(_28de==XMLP._ELM_EMP){
this._fireEvent(SAXDriver.ELM_B,_28dd.getName(),this);
this._fireEvent(SAXDriver.ELM_E,_28dd.getName());
}else{
if(_28de==XMLP._TEXT){
this._fireEvent(SAXDriver.CHARS,_28dd.getContent(),_28dd.getContentBegin(),_28dd.getContentEnd()-_28dd.getContentBegin());
}else{
if(_28de==XMLP._ENTITY){
this._fireEvent(SAXDriver.CHARS,_28dd.getContent(),_28dd.getContentBegin(),_28dd.getContentEnd()-_28dd.getContentBegin());
}else{
if(_28de==XMLP._PI){
this._fireEvent(SAXDriver.PI,_28dd.getName(),_28dd.getContent().substring(_28dd.getContentBegin(),_28dd.getContentEnd()));
}else{
if(_28de==XMLP._CDATA){
this._fireEvent(SAXDriver.CD_B);
this._fireEvent(SAXDriver.CHARS,_28dd.getContent(),_28dd.getContentBegin(),_28dd.getContentEnd()-_28dd.getContentBegin());
this._fireEvent(SAXDriver.CD_E);
}else{
if(_28de==XMLP._COMMENT){
this._fireEvent(SAXDriver.CMNT,_28dd.getContent(),_28dd.getContentBegin(),_28dd.getContentEnd()-_28dd.getContentBegin());
}else{
if(_28de==XMLP._DTD){
}else{
if(_28de==XMLP._ERROR){
this._fireError(_28dd.getContent());
}else{
if(_28de==XMLP._NONE){
return;
}
}
}
}
}
}
}
}
}
}
}
}
};
SAXStrings=function(){
};
SAXStrings.WHITESPACE=" \t\n\r";
SAXStrings.QUOTES="\"'";
SAXStrings.getColumnNumber=function(strD,iP){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iP=iP||strD.length;
var arrD=strD.substring(0,iP).split("\n");
var _28e2=arrD[arrD.length-1];
arrD.length--;
var _28e3=arrD.join("\n").length;
return iP-_28e3;
};
SAXStrings.getLineNumber=function(strD,iP){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iP=iP||strD.length;
return strD.substring(0,iP).split("\n").length;
};
SAXStrings.indexOfNonWhitespace=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iB;i<iE;i++){
if(SAXStrings.WHITESPACE.indexOf(strD.charAt(i))==-1){
return i;
}
}
return -1;
};
SAXStrings.indexOfWhitespace=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iB;i<iE;i++){
if(SAXStrings.WHITESPACE.indexOf(strD.charAt(i))!=-1){
return i;
}
}
return -1;
};
SAXStrings.isEmpty=function(strD){
return (strD===null)||(strD.length===0);
};
SAXStrings.lastIndexOfNonWhitespace=function(strD,iB,iE){
if(SAXStrings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iE-1;i>=iB;i--){
if(SAXStrings.WHITESPACE.indexOf(strD.charAt(i))==-1){
return i;
}
}
return -1;
};
SAXStrings.replace=function(strD,iB,iE,strF,strR){
if(SAXStrings.isEmpty(strD)){
return "";
}
iB=iB||0;
iE=iE||strD.length;
return strD.substring(iB,iE).split(strF).join(strR);
};
Stack=function(){
this.m_arr=[];
};
Stack.prototype.clear=function(){
this.m_arr=[];
};
Stack.prototype.count=function(){
return this.m_arr.length;
};
Stack.prototype.destroy=function(){
this.m_arr=null;
};
Stack.prototype.peek=function(){
if(this.m_arr.length===0){
return null;
}
return this.m_arr[this.m_arr.length-1];
};
Stack.prototype.pop=function(){
if(this.m_arr.length===0){
return null;
}
var o=this.m_arr[this.m_arr.length-1];
this.m_arr.length--;
return o;
};
Stack.prototype.push=function(o){
this.m_arr[this.m_arr.length]=o;
};
function isEmpty(str){
return (str===null)||(str.length==0);
}
function trim(_28fb,_28fc,_28fd){
if(isEmpty(_28fb)){
return "";
}
if(_28fc===null){
_28fc=true;
}
if(_28fd===null){
_28fd=true;
}
var left=0;
var right=0;
var i=0;
var k=0;
if(_28fc==true){
while((i<_28fb.length)&&(whitespace.indexOf(_28fb.charAt(i++))!=-1)){
left++;
}
}
if(_28fd==true){
k=_28fb.length-1;
while((k>=left)&&(whitespace.indexOf(_28fb.charAt(k--))!=-1)){
right++;
}
}
return _28fb.substring(left,_28fb.length-right);
}
function __escapeString(str){
var _2903=/&/g;
var _2904=/</g;
var _2905=/>/g;
var _2906=/"/g;
var _2907=/'/g;
str=str.replace(_2903,"&amp;");
str=str.replace(_2904,"&lt;");
str=str.replace(_2905,"&gt;");
str=str.replace(_2906,"&quot;");
str=str.replace(_2907,"&apos;");
return str;
}
function __unescapeString(str){
var _2909=/&amp;/g;
var _290a=/&lt;/g;
var _290b=/&gt;/g;
var _290c=/&quot;/g;
var _290d=/&apos;/g;
str=str.replace(_2909,"&");
str=str.replace(_290a,"<");
str=str.replace(_290b,">");
str=str.replace(_290c,"\"");
str=str.replace(_290d,"'");
return str;
}
function addClass(_1d99,_1d9a){
if(_1d99){
if(_1d99.indexOf("|"+_1d9a+"|")<0){
_1d99+=_1d9a+"|";
}
}else{
_1d99="|"+_1d9a+"|";
}
return _1d99;
}
DOMException=function(code){
this._class=addClass(this._class,"DOMException");
this.code=code;
};
DOMException.INDEX_SIZE_ERR=1;
DOMException.DOMSTRING_SIZE_ERR=2;
DOMException.HIERARCHY_REQUEST_ERR=3;
DOMException.WRONG_DOCUMENT_ERR=4;
DOMException.INVALID_CHARACTER_ERR=5;
DOMException.NO_DATA_ALLOWED_ERR=6;
DOMException.NO_MODIFICATION_ALLOWED_ERR=7;
DOMException.NOT_FOUND_ERR=8;
DOMException.NOT_SUPPORTED_ERR=9;
DOMException.INUSE_ATTRIBUTE_ERR=10;
DOMException.INVALID_STATE_ERR=11;
DOMException.SYNTAX_ERR=12;
DOMException.INVALID_MODIFICATION_ERR=13;
DOMException.NAMESPACE_ERR=14;
DOMException.INVALID_ACCESS_ERR=15;
DOMImplementation=function(){
this._class=addClass(this._class,"DOMImplementation");
this._p=null;
this.preserveWhiteSpace=false;
this.namespaceAware=true;
this.errorChecking=true;
};
DOMImplementation.prototype.escapeString=function DOMNode__escapeString(str){
return __escapeString(str);
};
DOMImplementation.prototype.unescapeString=function DOMNode__unescapeString(str){
return __unescapeString(str);
};
DOMImplementation.prototype.hasFeature=function DOMImplementation_hasFeature(_1d9e,_1d9f){
var ret=false;
if(_1d9e.toLowerCase()=="xml"){
ret=(!_1d9f||(_1d9f=="1.0")||(_1d9f=="2.0"));
}else{
if(_1d9e.toLowerCase()=="core"){
ret=(!_1d9f||(_1d9f=="2.0"));
}
}
return ret;
};
DOMImplementation.prototype.loadXML=function DOMImplementation_loadXML(_1da1){
var _1da2;
try{
_1da2=new XMLP(_1da1);
}
catch(e){
alert("Error Creating the SAX Parser. Did you include xmlsax.js or tinyxmlsax.js in your web page?\nThe SAX parser is needed to populate XML for <SCRIPT>'s W3C DOM Parser with data.");
}
var doc=new DOMDocument(this);
this._parseLoop(doc,_1da2);
doc._parseComplete=true;
return doc;
};
DOMImplementation.prototype.translateErrCode=function DOMImplementation_translateErrCode(code){
var msg="";
switch(code){
case DOMException.INDEX_SIZE_ERR:
msg="INDEX_SIZE_ERR: Index out of bounds";
break;
case DOMException.DOMSTRING_SIZE_ERR:
msg="DOMSTRING_SIZE_ERR: The resulting string is too long to fit in a DOMString";
break;
case DOMException.HIERARCHY_REQUEST_ERR:
msg="HIERARCHY_REQUEST_ERR: The Node can not be inserted at this location";
break;
case DOMException.WRONG_DOCUMENT_ERR:
msg="WRONG_DOCUMENT_ERR: The source and the destination Documents are not the same";
break;
case DOMException.INVALID_CHARACTER_ERR:
msg="INVALID_CHARACTER_ERR: The string contains an invalid character";
break;
case DOMException.NO_DATA_ALLOWED_ERR:
msg="NO_DATA_ALLOWED_ERR: This Node / NodeList does not support data";
break;
case DOMException.NO_MODIFICATION_ALLOWED_ERR:
msg="NO_MODIFICATION_ALLOWED_ERR: This object cannot be modified";
break;
case DOMException.NOT_FOUND_ERR:
msg="NOT_FOUND_ERR: The item cannot be found";
break;
case DOMException.NOT_SUPPORTED_ERR:
msg="NOT_SUPPORTED_ERR: This implementation does not support function";
break;
case DOMException.INUSE_ATTRIBUTE_ERR:
msg="INUSE_ATTRIBUTE_ERR: The Attribute has already been assigned to another Element";
break;
case DOMException.INVALID_STATE_ERR:
msg="INVALID_STATE_ERR: The object is no longer usable";
break;
case DOMException.SYNTAX_ERR:
msg="SYNTAX_ERR: Syntax error";
break;
case DOMException.INVALID_MODIFICATION_ERR:
msg="INVALID_MODIFICATION_ERR: Cannot change the type of the object";
break;
case DOMException.NAMESPACE_ERR:
msg="NAMESPACE_ERR: The namespace declaration is incorrect";
break;
case DOMException.INVALID_ACCESS_ERR:
msg="INVALID_ACCESS_ERR: The object does not support this function";
break;
default:
msg="UNKNOWN: Unknown Exception Code ("+code+")";
}
return msg;
};
DOMImplementation.prototype._parseLoop=function DOMImplementation__parseLoop(doc,p){
var iEvt,iNode,iAttr,strName;
iNodeParent=doc;
var _1da9=0;
var _1daa=[];
var _1dab=[];
if(this.namespaceAware){
var iNS=doc.createNamespace("");
iNS.setValue("http://www.w3.org/2000/xmlns/");
doc._namespaces.setNamedItem(iNS);
}
while(true){
iEvt=p.next();
if(iEvt==XMLP._ELM_B){
var pName=p.getName();
pName=trim(pName,true,true);
if(!this.namespaceAware){
iNode=doc.createElement(p.getName());
for(var i=0;i<p.getAttributeCount();i++){
strName=p.getAttributeName(i);
iAttr=iNode.getAttributeNode(strName);
if(!iAttr){
iAttr=doc.createAttribute(strName);
}
iAttr.setValue(p.getAttributeValue(i));
iNode.setAttributeNode(iAttr);
}
}else{
iNode=doc.createElementNS("",p.getName());
iNode._namespaces=iNodeParent._namespaces._cloneNodes(iNode);
for(var i=0;i<p.getAttributeCount();i++){
strName=p.getAttributeName(i);
if(this._isNamespaceDeclaration(strName)){
var _1daf=this._parseNSName(strName);
if(strName!="xmlns"){
iNS=doc.createNamespace(strName);
}else{
iNS=doc.createNamespace("");
}
iNS.setValue(p.getAttributeValue(i));
iNode._namespaces.setNamedItem(iNS);
}else{
iAttr=iNode.getAttributeNode(strName);
if(!iAttr){
iAttr=doc.createAttributeNS("",strName);
}
iAttr.setValue(p.getAttributeValue(i));
iNode.setAttributeNodeNS(iAttr);
if(this._isIdDeclaration(strName)){
iNode.id=p.getAttributeValue(i);
}
}
}
if(iNode._namespaces.getNamedItem(iNode.prefix)){
iNode.namespaceURI=iNode._namespaces.getNamedItem(iNode.prefix).value;
}
for(var i=0;i<iNode.attributes.length;i++){
if(iNode.attributes.item(i).prefix!=""){
if(iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix)){
iNode.attributes.item(i).namespaceURI=iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix).value;
}
}
}
}
if(iNodeParent.nodeType==DOMNode.DOCUMENT_NODE){
iNodeParent.documentElement=iNode;
}
iNodeParent.appendChild(iNode);
iNodeParent=iNode;
}else{
if(iEvt==XMLP._ELM_E){
iNodeParent=iNodeParent.parentNode;
}else{
if(iEvt==XMLP._ELM_EMP){
pName=p.getName();
pName=trim(pName,true,true);
if(!this.namespaceAware){
iNode=doc.createElement(pName);
for(var i=0;i<p.getAttributeCount();i++){
strName=p.getAttributeName(i);
iAttr=iNode.getAttributeNode(strName);
if(!iAttr){
iAttr=doc.createAttribute(strName);
}
iAttr.setValue(p.getAttributeValue(i));
iNode.setAttributeNode(iAttr);
}
}else{
iNode=doc.createElementNS("",p.getName());
iNode._namespaces=iNodeParent._namespaces._cloneNodes(iNode);
for(var i=0;i<p.getAttributeCount();i++){
strName=p.getAttributeName(i);
if(this._isNamespaceDeclaration(strName)){
var _1daf=this._parseNSName(strName);
if(strName!="xmlns"){
iNS=doc.createNamespace(strName);
}else{
iNS=doc.createNamespace("");
}
iNS.setValue(p.getAttributeValue(i));
iNode._namespaces.setNamedItem(iNS);
}else{
iAttr=iNode.getAttributeNode(strName);
if(!iAttr){
iAttr=doc.createAttributeNS("",strName);
}
iAttr.setValue(p.getAttributeValue(i));
iNode.setAttributeNodeNS(iAttr);
if(this._isIdDeclaration(strName)){
iNode.id=p.getAttributeValue(i);
}
}
}
if(iNode._namespaces.getNamedItem(iNode.prefix)){
iNode.namespaceURI=iNode._namespaces.getNamedItem(iNode.prefix).value;
}
for(var i=0;i<iNode.attributes.length;i++){
if(iNode.attributes.item(i).prefix!=""){
if(iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix)){
iNode.attributes.item(i).namespaceURI=iNode._namespaces.getNamedItem(iNode.attributes.item(i).prefix).value;
}
}
}
}
if(iNodeParent.nodeType==DOMNode.DOCUMENT_NODE){
iNodeParent.documentElement=iNode;
}
iNodeParent.appendChild(iNode);
}else{
if(iEvt==XMLP._TEXT||iEvt==XMLP._ENTITY){
var _1db0=p.getContent().substring(p.getContentBegin(),p.getContentEnd());
if(!this.preserveWhiteSpace){
if(trim(_1db0,true,true)==""){
_1db0="";
}
}
if(_1db0.length>0){
var _1db1=doc.createTextNode(_1db0);
iNodeParent.appendChild(_1db1);
if(iEvt==XMLP._ENTITY){
_1daa[_1daa.length]=_1db1;
}else{
_1dab[_1dab.length]=_1db1;
}
}
}else{
if(iEvt==XMLP._PI){
iNodeParent.appendChild(doc.createProcessingInstruction(p.getName(),p.getContent().substring(p.getContentBegin(),p.getContentEnd())));
}else{
if(iEvt==XMLP._CDATA){
_1db0=p.getContent().substring(p.getContentBegin(),p.getContentEnd());
if(!this.preserveWhiteSpace){
_1db0=trim(_1db0,true,true);
_1db0.replace(/ +/g," ");
}
if(_1db0.length>0){
iNodeParent.appendChild(doc.createCDATASection(_1db0));
}
}else{
if(iEvt==XMLP._COMMENT){
var _1db0=p.getContent().substring(p.getContentBegin(),p.getContentEnd());
if(!this.preserveWhiteSpace){
_1db0=trim(_1db0,true,true);
_1db0.replace(/ +/g," ");
}
if(_1db0.length>0){
iNodeParent.appendChild(doc.createComment(_1db0));
}
}else{
if(iEvt==XMLP._DTD){
}else{
if(iEvt==XMLP._ERROR){
throw (new DOMException(DOMException.SYNTAX_ERR));
}else{
if(iEvt==XMLP._NONE){
if(iNodeParent==doc){
break;
}else{
throw (new DOMException(DOMException.SYNTAX_ERR));
}
}
}
}
}
}
}
}
}
}
}
}
var _1db2=_1daa.length;
for(intLoop=0;intLoop<_1db2;intLoop++){
var _1db3=_1daa[intLoop];
var _1db4=_1db3.getParentNode();
if(_1db4){
_1db4.normalize();
if(!this.preserveWhiteSpace){
var _1db5=_1db4.getChildNodes();
var _1db6=_1db5.getLength();
for(intLoop2=0;intLoop2<_1db6;intLoop2++){
var child=_1db5.item(intLoop2);
if(child.getNodeType()==DOMNode.TEXT_NODE){
var _1db8=child.getData();
_1db8=trim(_1db8,true,true);
_1db8.replace(/ +/g," ");
child.setData(_1db8);
}
}
}
}
}
if(!this.preserveWhiteSpace){
var _1db2=_1dab.length;
for(intLoop=0;intLoop<_1db2;intLoop++){
var node=_1dab[intLoop];
if(node.getParentNode()!==null){
var _1dba=node.getData();
_1dba=trim(_1dba,true,true);
_1dba.replace(/ +/g," ");
node.setData(_1dba);
}
}
}
};
DOMImplementation.prototype._isNamespaceDeclaration=function DOMImplementation__isNamespaceDeclaration(_1dbb){
return (_1dbb.indexOf("xmlns")>-1);
};
DOMImplementation.prototype._isIdDeclaration=function DOMImplementation__isIdDeclaration(_1dbc){
return (_1dbc.toLowerCase()=="id");
};
DOMImplementation.prototype._isValidName=function DOMImplementation__isValidName(name){
return name.match(re_validName);
};
re_validName=/^[a-zA-Z_:][a-zA-Z0-9\.\-_:]*$/;
DOMImplementation.prototype._isValidString=function DOMImplementation__isValidString(name){
return (name.search(re_invalidStringChars)<0);
};
re_invalidStringChars=/\x01|\x02|\x03|\x04|\x05|\x06|\x07|\x08|\x0B|\x0C|\x0E|\x0F|\x10|\x11|\x12|\x13|\x14|\x15|\x16|\x17|\x18|\x19|\x1A|\x1B|\x1C|\x1D|\x1E|\x1F|\x7F/;
DOMImplementation.prototype._parseNSName=function DOMImplementation__parseNSName(_1dbf){
var _1dc0={};
_1dc0.prefix=_1dbf;
_1dc0.namespaceName="";
delimPos=_1dbf.indexOf(":");
if(delimPos>-1){
_1dc0.prefix=_1dbf.substring(0,delimPos);
_1dc0.namespaceName=_1dbf.substring(delimPos+1,_1dbf.length);
}
return _1dc0;
};
DOMImplementation.prototype._parseQName=function DOMImplementation__parseQName(_1dc1){
var _1dc2={};
_1dc2.localName=_1dc1;
_1dc2.prefix="";
delimPos=_1dc1.indexOf(":");
if(delimPos>-1){
_1dc2.prefix=_1dc1.substring(0,delimPos);
_1dc2.localName=_1dc1.substring(delimPos+1,_1dc1.length);
}
return _1dc2;
};
DOMNodeList=function(_1dc3,_1dc4){
this._class=addClass(this._class,"DOMNodeList");
this._nodes=[];
this.length=0;
this.parentNode=_1dc4;
this.ownerDocument=_1dc3;
this._readonly=false;
};
DOMNodeList.prototype.getLength=function DOMNodeList_getLength(){
return this.length;
};
DOMNodeList.prototype.item=function DOMNodeList_item(index){
var ret=null;
if((index>=0)&&(index<this._nodes.length)){
ret=this._nodes[index];
}
return ret;
};
DOMNodeList.prototype._findItemIndex=function DOMNodeList__findItemIndex(id){
var ret=-1;
if(id>-1){
for(var i=0;i<this._nodes.length;i++){
if(this._nodes[i]._id==id){
ret=i;
break;
}
}
}
return ret;
};
DOMNodeList.prototype._insertBefore=function DOMNodeList__insertBefore(_1dca,_1dcb){
if((_1dcb>=0)&&(_1dcb<this._nodes.length)){
var _1dcc=[];
_1dcc=this._nodes.slice(0,_1dcb);
if(_1dca.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
_1dcc=_1dcc.concat(_1dca.childNodes._nodes);
}else{
_1dcc[_1dcc.length]=_1dca;
}
this._nodes=_1dcc.concat(this._nodes.slice(_1dcb));
this.length=this._nodes.length;
}
};
DOMNodeList.prototype._replaceChild=function DOMNodeList__replaceChild(_1dcd,_1dce){
var ret=null;
if((_1dce>=0)&&(_1dce<this._nodes.length)){
ret=this._nodes[_1dce];
if(_1dcd.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
var _1dd0=[];
_1dd0=this._nodes.slice(0,_1dce);
_1dd0=_1dd0.concat(_1dcd.childNodes._nodes);
this._nodes=_1dd0.concat(this._nodes.slice(_1dce+1));
}else{
this._nodes[_1dce]=_1dcd;
}
}
return ret;
};
DOMNodeList.prototype._removeChild=function DOMNodeList__removeChild(_1dd1){
var ret=null;
if(_1dd1>-1){
ret=this._nodes[_1dd1];
var _1dd3=[];
_1dd3=this._nodes.slice(0,_1dd1);
this._nodes=_1dd3.concat(this._nodes.slice(_1dd1+1));
this.length=this._nodes.length;
}
return ret;
};
DOMNodeList.prototype._appendChild=function DOMNodeList__appendChild(_1dd4){
if(_1dd4.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
this._nodes=this._nodes.concat(_1dd4.childNodes._nodes);
}else{
this._nodes[this._nodes.length]=_1dd4;
}
this.length=this._nodes.length;
};
DOMNodeList.prototype._cloneNodes=function DOMNodeList__cloneNodes(deep,_1dd6){
var _1dd7=new DOMNodeList(this.ownerDocument,_1dd6);
for(var i=0;i<this._nodes.length;i++){
_1dd7._appendChild(this._nodes[i].cloneNode(deep));
}
return _1dd7;
};
DOMNodeList.prototype.toString=function DOMNodeList_toString(){
var ret="";
for(var i=0;i<this.length;i++){
ret+=this._nodes[i].toString();
}
return ret;
};
DOMNamedNodeMap=function(_1ddb,_1ddc){
this._class=addClass(this._class,"DOMNamedNodeMap");
this.DOMNodeList=DOMNodeList;
this.DOMNodeList(_1ddb,_1ddc);
};
DOMNamedNodeMap.prototype=new DOMNodeList;
DOMNamedNodeMap.prototype.getNamedItem=function DOMNamedNodeMap_getNamedItem(name){
var ret=null;
var _1ddf=this._findNamedItemIndex(name);
if(_1ddf>-1){
ret=this._nodes[_1ddf];
}
return ret;
};
DOMNamedNodeMap.prototype.setNamedItem=function DOMNamedNodeMap_setNamedItem(arg){
if(this.ownerDocument.implementation.errorChecking){
if(this.ownerDocument!=arg.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(this._readonly||(this.parentNode&&this.parentNode._readonly)){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(arg.ownerElement&&(arg.ownerElement!=this.parentNode)){
throw (new DOMException(DOMException.INUSE_ATTRIBUTE_ERR));
}
}
var _1de1=this._findNamedItemIndex(arg.name);
var ret=null;
if(_1de1>-1){
ret=this._nodes[_1de1];
if(this.ownerDocument.implementation.errorChecking&&ret._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}else{
this._nodes[_1de1]=arg;
}
}else{
this._nodes[this.length]=arg;
}
this.length=this._nodes.length;
arg.ownerElement=this.parentNode;
return ret;
};
DOMNamedNodeMap.prototype.removeNamedItem=function DOMNamedNodeMap_removeNamedItem(name){
var ret=null;
if(this.ownerDocument.implementation.errorChecking&&(this._readonly||(this.parentNode&&this.parentNode._readonly))){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
var _1de5=this._findNamedItemIndex(name);
if(this.ownerDocument.implementation.errorChecking&&(_1de5<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
var _1de6=this._nodes[_1de5];
if(this.ownerDocument.implementation.errorChecking&&_1de6._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
return this._removeChild(_1de5);
};
DOMNamedNodeMap.prototype.getNamedItemNS=function DOMNamedNodeMap_getNamedItemNS(_1de7,_1de8){
var ret=null;
var _1dea=this._findNamedItemNSIndex(_1de7,_1de8);
if(_1dea>-1){
ret=this._nodes[_1dea];
}
return ret;
};
DOMNamedNodeMap.prototype.setNamedItemNS=function DOMNamedNodeMap_setNamedItemNS(arg){
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly||(this.parentNode&&this.parentNode._readonly)){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.ownerDocument!=arg.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(arg.ownerElement&&(arg.ownerElement!=this.parentNode)){
throw (new DOMException(DOMException.INUSE_ATTRIBUTE_ERR));
}
}
var _1dec=this._findNamedItemNSIndex(arg.namespaceURI,arg.localName);
var ret=null;
if(_1dec>-1){
ret=this._nodes[_1dec];
if(this.ownerDocument.implementation.errorChecking&&ret._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}else{
this._nodes[_1dec]=arg;
}
}else{
this._nodes[this.length]=arg;
}
this.length=this._nodes.length;
arg.ownerElement=this.parentNode;
return ret;
};
DOMNamedNodeMap.prototype.removeNamedItemNS=function DOMNamedNodeMap_removeNamedItemNS(_1dee,_1def){
var ret=null;
if(this.ownerDocument.implementation.errorChecking&&(this._readonly||(this.parentNode&&this.parentNode._readonly))){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
var _1df1=this._findNamedItemNSIndex(_1dee,_1def);
if(this.ownerDocument.implementation.errorChecking&&(_1df1<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
var _1df2=this._nodes[_1df1];
if(this.ownerDocument.implementation.errorChecking&&_1df2._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
return this._removeChild(_1df1);
};
DOMNamedNodeMap.prototype._findNamedItemIndex=function DOMNamedNodeMap__findNamedItemIndex(name){
var ret=-1;
for(var i=0;i<this._nodes.length;i++){
if(this._nodes[i].name==name){
ret=i;
break;
}
}
return ret;
};
DOMNamedNodeMap.prototype._findNamedItemNSIndex=function DOMNamedNodeMap__findNamedItemNSIndex(_1df6,_1df7){
var ret=-1;
if(_1df7){
for(var i=0;i<this._nodes.length;i++){
if((this._nodes[i].namespaceURI==_1df6)&&(this._nodes[i].localName==_1df7)){
ret=i;
break;
}
}
}
return ret;
};
DOMNamedNodeMap.prototype._hasAttribute=function DOMNamedNodeMap__hasAttribute(name){
var ret=false;
var _1dfc=this._findNamedItemIndex(name);
if(_1dfc>-1){
ret=true;
}
return ret;
};
DOMNamedNodeMap.prototype._hasAttributeNS=function DOMNamedNodeMap__hasAttributeNS(_1dfd,_1dfe){
var ret=false;
var _1e00=this._findNamedItemNSIndex(_1dfd,_1dfe);
if(_1e00>-1){
ret=true;
}
return ret;
};
DOMNamedNodeMap.prototype._cloneNodes=function DOMNamedNodeMap__cloneNodes(_1e01){
var _1e02=new DOMNamedNodeMap(this.ownerDocument,_1e01);
for(var i=0;i<this._nodes.length;i++){
_1e02._appendChild(this._nodes[i].cloneNode(false));
}
return _1e02;
};
DOMNamedNodeMap.prototype.toString=function DOMNamedNodeMap_toString(){
var ret="";
for(var i=0;i<this.length-1;i++){
ret+=this._nodes[i].toString()+" ";
}
if(this.length>0){
ret+=this._nodes[this.length-1].toString();
}
return ret;
};
DOMNamespaceNodeMap=function(_1e06,_1e07){
this._class=addClass(this._class,"DOMNamespaceNodeMap");
this.DOMNamedNodeMap=DOMNamedNodeMap;
this.DOMNamedNodeMap(_1e06,_1e07);
};
DOMNamespaceNodeMap.prototype=new DOMNamedNodeMap;
DOMNamespaceNodeMap.prototype._findNamedItemIndex=function DOMNamespaceNodeMap__findNamedItemIndex(_1e08){
var ret=-1;
for(var i=0;i<this._nodes.length;i++){
if(this._nodes[i].localName==_1e08){
ret=i;
break;
}
}
return ret;
};
DOMNamespaceNodeMap.prototype._cloneNodes=function DOMNamespaceNodeMap__cloneNodes(_1e0b){
var _1e0c=new DOMNamespaceNodeMap(this.ownerDocument,_1e0b);
for(var i=0;i<this._nodes.length;i++){
_1e0c._appendChild(this._nodes[i].cloneNode(false));
}
return _1e0c;
};
DOMNamespaceNodeMap.prototype.toString=function DOMNamespaceNodeMap_toString(){
var ret="";
for(var ind=0;ind<this._nodes.length;ind++){
var ns=null;
try{
var ns=this.parentNode.parentNode._namespaces.getNamedItem(this._nodes[ind].localName);
}
catch(e){
break;
}
if(!(ns&&(""+ns.nodeValue==""+this._nodes[ind].nodeValue))){
ret+=this._nodes[ind].toString()+" ";
}
}
return ret;
};
DOMNode=function(_1e11){
this._class=addClass(this._class,"DOMNode");
if(_1e11){
this._id=_1e11._genId();
}
this.namespaceURI="";
this.prefix="";
this.localName="";
this.nodeName="";
this.nodeValue="";
this.nodeType=0;
this.parentNode=null;
this.childNodes=new DOMNodeList(_1e11,this);
this.firstChild=null;
this.lastChild=null;
this.previousSibling=null;
this.nextSibling=null;
this.attributes=new DOMNamedNodeMap(_1e11,this);
this.ownerDocument=_1e11;
this._namespaces=new DOMNamespaceNodeMap(_1e11,this);
this._readonly=false;
};
DOMNode.ELEMENT_NODE=1;
DOMNode.ATTRIBUTE_NODE=2;
DOMNode.TEXT_NODE=3;
DOMNode.CDATA_SECTION_NODE=4;
DOMNode.ENTITY_REFERENCE_NODE=5;
DOMNode.ENTITY_NODE=6;
DOMNode.PROCESSING_INSTRUCTION_NODE=7;
DOMNode.COMMENT_NODE=8;
DOMNode.DOCUMENT_NODE=9;
DOMNode.DOCUMENT_TYPE_NODE=10;
DOMNode.DOCUMENT_FRAGMENT_NODE=11;
DOMNode.NOTATION_NODE=12;
DOMNode.NAMESPACE_NODE=13;
DOMNode.prototype.hasAttributes=function DOMNode_hasAttributes(){
if(this.attributes.length===0){
return false;
}else{
return true;
}
};
DOMNode.prototype.getNodeName=function DOMNode_getNodeName(){
return this.nodeName;
};
DOMNode.prototype.getNodeValue=function DOMNode_getNodeValue(){
return this.nodeValue;
};
DOMNode.prototype.setNodeValue=function DOMNode_setNodeValue(_1e12){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.nodeValue=_1e12;
};
DOMNode.prototype.getNodeType=function DOMNode_getNodeType(){
return this.nodeType;
};
DOMNode.prototype.getParentNode=function DOMNode_getParentNode(){
return this.parentNode;
};
DOMNode.prototype.getChildNodes=function DOMNode_getChildNodes(){
return this.childNodes;
};
DOMNode.prototype.getFirstChild=function DOMNode_getFirstChild(){
return this.firstChild;
};
DOMNode.prototype.getLastChild=function DOMNode_getLastChild(){
return this.lastChild;
};
DOMNode.prototype.getPreviousSibling=function DOMNode_getPreviousSibling(){
return this.previousSibling;
};
DOMNode.prototype.getNextSibling=function DOMNode_getNextSibling(){
return this.nextSibling;
};
DOMNode.prototype.getAttributes=function DOMNode_getAttributes(){
return this.attributes;
};
DOMNode.prototype.getOwnerDocument=function DOMNode_getOwnerDocument(){
return this.ownerDocument;
};
DOMNode.prototype.getNamespaceURI=function DOMNode_getNamespaceURI(){
return this.namespaceURI;
};
DOMNode.prototype.getPrefix=function DOMNode_getPrefix(){
return this.prefix;
};
DOMNode.prototype.setPrefix=function DOMNode_setPrefix(_1e13){
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(!this.ownerDocument.implementation._isValidName(_1e13)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
if(!this.ownerDocument._isValidNamespace(this.namespaceURI,_1e13+":"+this.localName)){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if((_1e13=="xmlns")&&(this.namespaceURI!="http://www.w3.org/2000/xmlns/")){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if((_1e13=="")&&(this.localName=="xmlns")){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
}
this.prefix=_1e13;
if(this.prefix!=""){
this.nodeName=this.prefix+":"+this.localName;
}else{
this.nodeName=this.localName;
}
};
DOMNode.prototype.getLocalName=function DOMNode_getLocalName(){
return this.localName;
};
DOMNode.prototype.insertBefore=function DOMNode_insertBefore(_1e14,_1e15){
var _1e16;
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.ownerDocument!=_1e14.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(this._isAncestor(_1e14)){
throw (new DOMException(DOMException.HIERARCHY_REQUEST_ERR));
}
}
if(_1e15){
var _1e17=this.childNodes._findItemIndex(_1e15._id);
if(this.ownerDocument.implementation.errorChecking&&(_1e17<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
var _1e18=_1e14.parentNode;
if(_1e18){
_1e18.removeChild(_1e14);
}
this.childNodes._insertBefore(_1e14,this.childNodes._findItemIndex(_1e15._id));
_1e16=_1e15.previousSibling;
if(_1e14.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
if(_1e14.childNodes._nodes.length>0){
for(var ind=0;ind<_1e14.childNodes._nodes.length;ind++){
_1e14.childNodes._nodes[ind].parentNode=this;
}
_1e15.previousSibling=_1e14.childNodes._nodes[_1e14.childNodes._nodes.length-1];
}
}else{
_1e14.parentNode=this;
_1e15.previousSibling=_1e14;
}
}else{
_1e16=this.lastChild;
this.appendChild(_1e14);
}
if(_1e14.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
if(_1e14.childNodes._nodes.length>0){
if(_1e16){
_1e16.nextSibling=_1e14.childNodes._nodes[0];
}else{
this.firstChild=_1e14.childNodes._nodes[0];
}
_1e14.childNodes._nodes[0].previousSibling=_1e16;
_1e14.childNodes._nodes[_1e14.childNodes._nodes.length-1].nextSibling=_1e15;
}
}else{
if(_1e16){
_1e16.nextSibling=_1e14;
}else{
this.firstChild=_1e14;
}
_1e14.previousSibling=_1e16;
_1e14.nextSibling=_1e15;
}
return _1e14;
};
DOMNode.prototype.replaceChild=function DOMNode_replaceChild(_1e1a,_1e1b){
var ret=null;
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.ownerDocument!=_1e1a.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(this._isAncestor(_1e1a)){
throw (new DOMException(DOMException.HIERARCHY_REQUEST_ERR));
}
}
var index=this.childNodes._findItemIndex(_1e1b._id);
if(this.ownerDocument.implementation.errorChecking&&(index<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
var _1e1e=_1e1a.parentNode;
if(_1e1e){
_1e1e.removeChild(_1e1a);
}
ret=this.childNodes._replaceChild(_1e1a,index);
if(_1e1a.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
if(_1e1a.childNodes._nodes.length>0){
for(var ind=0;ind<_1e1a.childNodes._nodes.length;ind++){
_1e1a.childNodes._nodes[ind].parentNode=this;
}
if(_1e1b.previousSibling){
_1e1b.previousSibling.nextSibling=_1e1a.childNodes._nodes[0];
}else{
this.firstChild=_1e1a.childNodes._nodes[0];
}
if(_1e1b.nextSibling){
_1e1b.nextSibling.previousSibling=_1e1a;
}else{
this.lastChild=_1e1a.childNodes._nodes[_1e1a.childNodes._nodes.length-1];
}
_1e1a.childNodes._nodes[0].previousSibling=_1e1b.previousSibling;
_1e1a.childNodes._nodes[_1e1a.childNodes._nodes.length-1].nextSibling=_1e1b.nextSibling;
}
}else{
_1e1a.parentNode=this;
if(_1e1b.previousSibling){
_1e1b.previousSibling.nextSibling=_1e1a;
}else{
this.firstChild=_1e1a;
}
if(_1e1b.nextSibling){
_1e1b.nextSibling.previousSibling=_1e1a;
}else{
this.lastChild=_1e1a;
}
_1e1a.previousSibling=_1e1b.previousSibling;
_1e1a.nextSibling=_1e1b.nextSibling;
}
return ret;
};
DOMNode.prototype.removeChild=function DOMNode_removeChild(_1e20){
if(this.ownerDocument.implementation.errorChecking&&(this._readonly||_1e20._readonly)){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
var _1e21=this.childNodes._findItemIndex(_1e20._id);
if(this.ownerDocument.implementation.errorChecking&&(_1e21<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
this.childNodes._removeChild(_1e21);
_1e20.parentNode=null;
if(_1e20.previousSibling){
_1e20.previousSibling.nextSibling=_1e20.nextSibling;
}else{
this.firstChild=_1e20.nextSibling;
}
if(_1e20.nextSibling){
_1e20.nextSibling.previousSibling=_1e20.previousSibling;
}else{
this.lastChild=_1e20.previousSibling;
}
_1e20.previousSibling=null;
_1e20.nextSibling=null;
return _1e20;
};
DOMNode.prototype.appendChild=function DOMNode_appendChild(_1e22){
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.ownerDocument!=_1e22.ownerDocument){
throw (new DOMException(DOMException.WRONG_DOCUMENT_ERR));
}
if(this._isAncestor(_1e22)){
throw (new DOMException(DOMException.HIERARCHY_REQUEST_ERR));
}
}
var _1e23=_1e22.parentNode;
if(_1e23){
_1e23.removeChild(_1e22);
}
this.childNodes._appendChild(_1e22);
if(_1e22.nodeType==DOMNode.DOCUMENT_FRAGMENT_NODE){
if(_1e22.childNodes._nodes.length>0){
for(var ind=0;ind<_1e22.childNodes._nodes.length;ind++){
_1e22.childNodes._nodes[ind].parentNode=this;
}
if(this.lastChild){
this.lastChild.nextSibling=_1e22.childNodes._nodes[0];
_1e22.childNodes._nodes[0].previousSibling=this.lastChild;
this.lastChild=_1e22.childNodes._nodes[_1e22.childNodes._nodes.length-1];
}else{
this.lastChild=_1e22.childNodes._nodes[_1e22.childNodes._nodes.length-1];
this.firstChild=_1e22.childNodes._nodes[0];
}
}
}else{
_1e22.parentNode=this;
if(this.lastChild){
this.lastChild.nextSibling=_1e22;
_1e22.previousSibling=this.lastChild;
this.lastChild=_1e22;
}else{
this.lastChild=_1e22;
this.firstChild=_1e22;
}
}
return _1e22;
};
DOMNode.prototype.hasChildNodes=function DOMNode_hasChildNodes(){
return (this.childNodes.length>0);
};
DOMNode.prototype.cloneNode=function DOMNode_cloneNode(deep){
try{
return this.ownerDocument.importNode(this,deep);
}
catch(e){
return null;
}
};
DOMNode.prototype.normalize=function DOMNode_normalize(){
var inode;
var _1e27=new DOMNodeList();
if(this.nodeType==DOMNode.ELEMENT_NODE||this.nodeType==DOMNode.DOCUMENT_NODE){
var _1e28=null;
for(var i=0;i<this.childNodes.length;i++){
inode=this.childNodes.item(i);
if(inode.nodeType==DOMNode.TEXT_NODE){
if(inode.length<1){
_1e27._appendChild(inode);
}else{
if(_1e28){
_1e28.appendData(inode.data);
_1e27._appendChild(inode);
}else{
_1e28=inode;
}
}
}else{
_1e28=null;
inode.normalize();
}
}
for(var i=0;i<_1e27.length;i++){
inode=_1e27.item(i);
inode.parentNode.removeChild(inode);
}
}
};
DOMNode.prototype.isSupported=function DOMNode_isSupported(_1e2a,_1e2b){
return this.ownerDocument.implementation.hasFeature(_1e2a,_1e2b);
};
DOMNode.prototype.getElementsByTagName=function DOMNode_getElementsByTagName(_1e2c){
return this._getElementsByTagNameRecursive(_1e2c,new DOMNodeList(this.ownerDocument));
};
DOMNode.prototype._getElementsByTagNameRecursive=function DOMNode__getElementsByTagNameRecursive(_1e2d,_1e2e){
if(this.nodeType==DOMNode.ELEMENT_NODE||this.nodeType==DOMNode.DOCUMENT_NODE){
if((this.nodeName==_1e2d)||(_1e2d=="*")){
_1e2e._appendChild(this);
}
for(var i=0;i<this.childNodes.length;i++){
_1e2e=this.childNodes.item(i)._getElementsByTagNameRecursive(_1e2d,_1e2e);
}
}
return _1e2e;
};
DOMNode.prototype.getXML=function DOMNode_getXML(){
return this.toString();
};
DOMNode.prototype.getElementsByTagNameNS=function DOMNode_getElementsByTagNameNS(_1e30,_1e31){
return this._getElementsByTagNameNSRecursive(_1e30,_1e31,new DOMNodeList(this.ownerDocument));
};
DOMNode.prototype._getElementsByTagNameNSRecursive=function DOMNode__getElementsByTagNameNSRecursive(_1e32,_1e33,_1e34){
if(this.nodeType==DOMNode.ELEMENT_NODE||this.nodeType==DOMNode.DOCUMENT_NODE){
if(((this.namespaceURI==_1e32)||(_1e32=="*"))&&((this.localName==_1e33)||(_1e33=="*"))){
_1e34._appendChild(this);
}
for(var i=0;i<this.childNodes.length;i++){
_1e34=this.childNodes.item(i)._getElementsByTagNameNSRecursive(_1e32,_1e33,_1e34);
}
}
return _1e34;
};
DOMNode.prototype._isAncestor=function DOMNode__isAncestor(node){
return ((this==node)||((this.parentNode)&&(this.parentNode._isAncestor(node))));
};
DOMNode.prototype.importNode=function DOMNode_importNode(_1e37,deep){
var _1e39;
this.getOwnerDocument()._performingImportNodeOperation=true;
try{
if(_1e37.nodeType==DOMNode.ELEMENT_NODE){
if(!this.ownerDocument.implementation.namespaceAware){
_1e39=this.ownerDocument.createElement(_1e37.tagName);
for(var i=0;i<_1e37.attributes.length;i++){
_1e39.setAttribute(_1e37.attributes.item(i).name,_1e37.attributes.item(i).value);
}
}else{
_1e39=this.ownerDocument.createElementNS(_1e37.namespaceURI,_1e37.nodeName);
for(var i=0;i<_1e37.attributes.length;i++){
_1e39.setAttributeNS(_1e37.attributes.item(i).namespaceURI,_1e37.attributes.item(i).name,_1e37.attributes.item(i).value);
}
for(var i=0;i<_1e37._namespaces.length;i++){
_1e39._namespaces._nodes[i]=this.ownerDocument.createNamespace(_1e37._namespaces.item(i).localName);
_1e39._namespaces._nodes[i].setValue(_1e37._namespaces.item(i).value);
}
}
}else{
if(_1e37.nodeType==DOMNode.ATTRIBUTE_NODE){
if(!this.ownerDocument.implementation.namespaceAware){
_1e39=this.ownerDocument.createAttribute(_1e37.name);
}else{
_1e39=this.ownerDocument.createAttributeNS(_1e37.namespaceURI,_1e37.nodeName);
for(var i=0;i<_1e37._namespaces.length;i++){
_1e39._namespaces._nodes[i]=this.ownerDocument.createNamespace(_1e37._namespaces.item(i).localName);
_1e39._namespaces._nodes[i].setValue(_1e37._namespaces.item(i).value);
}
}
_1e39.setValue(_1e37.value);
}else{
if(_1e37.nodeType==DOMNode.DOCUMENT_FRAGMENT){
_1e39=this.ownerDocument.createDocumentFragment();
}else{
if(_1e37.nodeType==DOMNode.NAMESPACE_NODE){
_1e39=this.ownerDocument.createNamespace(_1e37.nodeName);
_1e39.setValue(_1e37.value);
}else{
if(_1e37.nodeType==DOMNode.TEXT_NODE){
_1e39=this.ownerDocument.createTextNode(_1e37.data);
}else{
if(_1e37.nodeType==DOMNode.CDATA_SECTION_NODE){
_1e39=this.ownerDocument.createCDATASection(_1e37.data);
}else{
if(_1e37.nodeType==DOMNode.PROCESSING_INSTRUCTION_NODE){
_1e39=this.ownerDocument.createProcessingInstruction(_1e37.target,_1e37.data);
}else{
if(_1e37.nodeType==DOMNode.COMMENT_NODE){
_1e39=this.ownerDocument.createComment(_1e37.data);
}else{
throw (new DOMException(DOMException.NOT_SUPPORTED_ERR));
}
}
}
}
}
}
}
}
if(deep){
for(var i=0;i<_1e37.childNodes.length;i++){
_1e39.appendChild(this.ownerDocument.importNode(_1e37.childNodes.item(i),true));
}
}
this.getOwnerDocument()._performingImportNodeOperation=false;
return _1e39;
}
catch(eAny){
this.getOwnerDocument()._performingImportNodeOperation=false;
throw eAny;
}
};
DOMNode.prototype.__escapeString=function DOMNode__escapeString(str){
return __escapeString(str);
};
DOMNode.prototype.__unescapeString=function DOMNode__unescapeString(str){
return __unescapeString(str);
};
DOMDocument=function(_1e3d){
this._class=addClass(this._class,"DOMDocument");
this.DOMNode=DOMNode;
this.DOMNode(this);
this.doctype=null;
this.implementation=_1e3d;
this.documentElement=null;
this.all=[];
this.nodeName="#document";
this.nodeType=DOMNode.DOCUMENT_NODE;
this._id=0;
this._lastId=0;
this._parseComplete=false;
this.ownerDocument=this;
this._performingImportNodeOperation=false;
};
DOMDocument.prototype=new DOMNode;
DOMDocument.prototype.getDoctype=function DOMDocument_getDoctype(){
return this.doctype;
};
DOMDocument.prototype.getImplementation=function DOMDocument_implementation(){
return this.implementation;
};
DOMDocument.prototype.getDocumentElement=function DOMDocument_getDocumentElement(){
return this.documentElement;
};
DOMDocument.prototype.createElement=function DOMDocument_createElement(_1e3e){
if(this.ownerDocument.implementation.errorChecking&&(!this.ownerDocument.implementation._isValidName(_1e3e))){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
var node=new DOMElement(this);
node.tagName=_1e3e;
node.nodeName=_1e3e;
this.all[this.all.length]=node;
return node;
};
DOMDocument.prototype.createDocumentFragment=function DOMDocument_createDocumentFragment(){
var node=new DOMDocumentFragment(this);
return node;
};
DOMDocument.prototype.createTextNode=function DOMDocument_createTextNode(data){
var node=new DOMText(this);
node.data=data;
node.nodeValue=data;
node.length=data.length;
return node;
};
DOMDocument.prototype.createComment=function DOMDocument_createComment(data){
var node=new DOMComment(this);
node.data=data;
node.nodeValue=data;
node.length=data.length;
return node;
};
DOMDocument.prototype.createCDATASection=function DOMDocument_createCDATASection(data){
var node=new DOMCDATASection(this);
node.data=data;
node.nodeValue=data;
node.length=data.length;
return node;
};
DOMDocument.prototype.createProcessingInstruction=function DOMDocument_createProcessingInstruction(_1e47,data){
if(this.ownerDocument.implementation.errorChecking&&(!this.implementation._isValidName(_1e47))){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
var node=new DOMProcessingInstruction(this);
node.target=_1e47;
node.nodeName=_1e47;
node.data=data;
node.nodeValue=data;
node.length=data.length;
return node;
};
DOMDocument.prototype.createAttribute=function DOMDocument_createAttribute(name){
if(this.ownerDocument.implementation.errorChecking&&(!this.ownerDocument.implementation._isValidName(name))){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
var node=new DOMAttr(this);
node.name=name;
node.nodeName=name;
return node;
};
DOMDocument.prototype.createElementNS=function DOMDocument_createElementNS(_1e4c,_1e4d){
if(this.ownerDocument.implementation.errorChecking){
if(!this.ownerDocument._isValidNamespace(_1e4c,_1e4d)){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if(!this.ownerDocument.implementation._isValidName(_1e4d)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
}
var node=new DOMElement(this);
var qname=this.implementation._parseQName(_1e4d);
node.nodeName=_1e4d;
node.namespaceURI=_1e4c;
node.prefix=qname.prefix;
node.localName=qname.localName;
node.tagName=_1e4d;
this.all[this.all.length]=node;
return node;
};
DOMDocument.prototype.createAttributeNS=function DOMDocument_createAttributeNS(_1e50,_1e51){
if(this.ownerDocument.implementation.errorChecking){
if(!this.ownerDocument._isValidNamespace(_1e50,_1e51,true)){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if(!this.ownerDocument.implementation._isValidName(_1e51)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
}
var node=new DOMAttr(this);
var qname=this.implementation._parseQName(_1e51);
node.nodeName=_1e51;
node.namespaceURI=_1e50;
node.prefix=qname.prefix;
node.localName=qname.localName;
node.name=_1e51;
node.nodeValue="";
return node;
};
DOMDocument.prototype.createNamespace=function DOMDocument_createNamespace(_1e54){
var node=new DOMNamespace(this);
var qname=this.implementation._parseQName(_1e54);
node.nodeName=_1e54;
node.prefix=qname.prefix;
node.localName=qname.localName;
node.name=_1e54;
node.nodeValue="";
return node;
};
DOMDocument.prototype.getElementById=function DOMDocument_getElementById(_1e57){
retNode=null;
for(var i=0;i<this.all.length;i++){
var node=this.all[i];
if((node.id==_1e57)&&(node._isAncestor(node.ownerDocument.documentElement))){
retNode=node;
break;
}
}
return retNode;
};
DOMDocument.prototype._genId=function DOMDocument__genId(){
this._lastId+=1;
return this._lastId;
};
DOMDocument.prototype._isValidNamespace=function DOMDocument__isValidNamespace(_1e5a,_1e5b,_1e5c){
if(this._performingImportNodeOperation==true){
return true;
}
var valid=true;
var qName=this.implementation._parseQName(_1e5b);
if(this._parseComplete==true){
if(qName.localName.indexOf(":")>-1){
valid=false;
}
if((valid)&&(!_1e5c)){
if(!_1e5a){
valid=false;
}
}
if((valid)&&(qName.prefix=="")){
valid=false;
}
}
if((valid)&&(qName.prefix=="xml")&&(_1e5a!="http://www.w3.org/XML/1998/namespace")){
valid=false;
}
return valid;
};
DOMDocument.prototype.toString=function DOMDocument_toString(){
return ""+this.childNodes;
};
DOMElement=function(_1e5f){
this._class=addClass(this._class,"DOMElement");
this.DOMNode=DOMNode;
this.DOMNode(_1e5f);
this.tagName="";
this.id="";
this.nodeType=DOMNode.ELEMENT_NODE;
};
DOMElement.prototype=new DOMNode;
DOMElement.prototype.getTagName=function DOMElement_getTagName(){
return this.tagName;
};
DOMElement.prototype.getAttribute=function DOMElement_getAttribute(name){
var ret="";
var attr=this.attributes.getNamedItem(name);
if(attr){
ret=attr.value;
}
return ret;
};
DOMElement.prototype.setAttribute=function DOMElement_setAttribute(name,value){
var attr=this.attributes.getNamedItem(name);
if(!attr){
attr=this.ownerDocument.createAttribute(name);
}
var value=new String(value);
if(this.ownerDocument.implementation.errorChecking){
if(attr._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(!this.ownerDocument.implementation._isValidString(value)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
}
if(this.ownerDocument.implementation._isIdDeclaration(name)){
this.id=value;
}
attr.value=value;
attr.nodeValue=value;
if(value.length>0){
attr.specified=true;
}else{
attr.specified=false;
}
this.attributes.setNamedItem(attr);
};
DOMElement.prototype.removeAttribute=function DOMElement_removeAttribute(name){
return this.attributes.removeNamedItem(name);
};
DOMElement.prototype.getAttributeNode=function DOMElement_getAttributeNode(name){
return this.attributes.getNamedItem(name);
};
DOMElement.prototype.setAttributeNode=function DOMElement_setAttributeNode(_1e68){
if(this.ownerDocument.implementation._isIdDeclaration(_1e68.name)){
this.id=_1e68.value;
}
return this.attributes.setNamedItem(_1e68);
};
DOMElement.prototype.removeAttributeNode=function DOMElement_removeAttributeNode(_1e69){
if(this.ownerDocument.implementation.errorChecking&&_1e69._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
var _1e6a=this.attributes._findItemIndex(_1e69._id);
if(this.ownerDocument.implementation.errorChecking&&(_1e6a<0)){
throw (new DOMException(DOMException.NOT_FOUND_ERR));
}
return this.attributes._removeChild(_1e6a);
};
DOMElement.prototype.getAttributeNS=function DOMElement_getAttributeNS(_1e6b,_1e6c){
var ret="";
var attr=this.attributes.getNamedItemNS(_1e6b,_1e6c);
if(attr){
ret=attr.value;
}
return ret;
};
DOMElement.prototype.setAttributeNS=function DOMElement_setAttributeNS(_1e6f,_1e70,value){
var attr=this.attributes.getNamedItem(_1e6f,_1e70);
if(!attr){
attr=this.ownerDocument.createAttributeNS(_1e6f,_1e70);
}
var value=new String(value);
if(this.ownerDocument.implementation.errorChecking){
if(attr._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(!this.ownerDocument._isValidNamespace(_1e6f,_1e70)){
throw (new DOMException(DOMException.NAMESPACE_ERR));
}
if(!this.ownerDocument.implementation._isValidString(value)){
throw (new DOMException(DOMException.INVALID_CHARACTER_ERR));
}
}
if(this.ownerDocument.implementation._isIdDeclaration(name)){
this.id=value;
}
attr.value=value;
attr.nodeValue=value;
if(value.length>0){
attr.specified=true;
}else{
attr.specified=false;
}
this.attributes.setNamedItemNS(attr);
};
DOMElement.prototype.removeAttributeNS=function DOMElement_removeAttributeNS(_1e73,_1e74){
return this.attributes.removeNamedItemNS(_1e73,_1e74);
};
DOMElement.prototype.getAttributeNodeNS=function DOMElement_getAttributeNodeNS(_1e75,_1e76){
return this.attributes.getNamedItemNS(_1e75,_1e76);
};
DOMElement.prototype.setAttributeNodeNS=function DOMElement_setAttributeNodeNS(_1e77){
if((_1e77.prefix=="")&&this.ownerDocument.implementation._isIdDeclaration(_1e77.name)){
this.id=_1e77.value;
}
return this.attributes.setNamedItemNS(_1e77);
};
DOMElement.prototype.hasAttribute=function DOMElement_hasAttribute(name){
return this.attributes._hasAttribute(name);
};
DOMElement.prototype.hasAttributeNS=function DOMElement_hasAttributeNS(_1e79,_1e7a){
return this.attributes._hasAttributeNS(_1e79,_1e7a);
};
DOMElement.prototype.toString=function DOMElement_toString(){
var ret="";
var ns=this._namespaces.toString();
if(ns.length>0){
ns=" "+ns;
}
var attrs=this.attributes.toString();
if(attrs.length>0){
attrs=" "+attrs;
}
ret+="<"+this.nodeName+ns+attrs+">";
ret+=this.childNodes.toString();
ret+="</"+this.nodeName+">";
return ret;
};
DOMAttr=function(_1e7e){
this._class=addClass(this._class,"DOMAttr");
this.DOMNode=DOMNode;
this.DOMNode(_1e7e);
this.name="";
this.specified=false;
this.value="";
this.nodeType=DOMNode.ATTRIBUTE_NODE;
this.ownerElement=null;
this.childNodes=null;
this.attributes=null;
};
DOMAttr.prototype=new DOMNode;
DOMAttr.prototype.getName=function DOMAttr_getName(){
return this.nodeName;
};
DOMAttr.prototype.getSpecified=function DOMAttr_getSpecified(){
return this.specified;
};
DOMAttr.prototype.getValue=function DOMAttr_getValue(){
return this.nodeValue;
};
DOMAttr.prototype.setValue=function DOMAttr_setValue(value){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.setNodeValue(value);
};
DOMAttr.prototype.setNodeValue=function DOMAttr_setNodeValue(value){
this.nodeValue=new String(value);
this.value=this.nodeValue;
this.specified=(this.value.length>0);
};
DOMAttr.prototype.toString=function DOMAttr_toString(){
var ret="";
ret+=this.nodeName+"=\""+this.__escapeString(this.nodeValue)+"\"";
return ret;
};
DOMAttr.prototype.getOwnerElement=function(){
return this.ownerElement;
};
DOMNamespace=function(_1e82){
this._class=addClass(this._class,"DOMNamespace");
this.DOMNode=DOMNode;
this.DOMNode(_1e82);
this.name="";
this.specified=false;
this.value="";
this.nodeType=DOMNode.NAMESPACE_NODE;
};
DOMNamespace.prototype=new DOMNode;
DOMNamespace.prototype.getValue=function DOMNamespace_getValue(){
return this.nodeValue;
};
DOMNamespace.prototype.setValue=function DOMNamespace_setValue(value){
this.nodeValue=new String(value);
this.value=this.nodeValue;
};
DOMNamespace.prototype.toString=function DOMNamespace_toString(){
var ret="";
if(this.nodeName!=""){
ret+=this.nodeName+"=\""+this.__escapeString(this.nodeValue)+"\"";
}else{
ret+="xmlns=\""+this.__escapeString(this.nodeValue)+"\"";
}
return ret;
};
DOMCharacterData=function(_1e85){
this._class=addClass(this._class,"DOMCharacterData");
this.DOMNode=DOMNode;
this.DOMNode(_1e85);
this.data="";
this.length=0;
};
DOMCharacterData.prototype=new DOMNode;
DOMCharacterData.prototype.getData=function DOMCharacterData_getData(){
return this.nodeValue;
};
DOMCharacterData.prototype.setData=function DOMCharacterData_setData(data){
this.setNodeValue(data);
};
DOMCharacterData.prototype.setNodeValue=function DOMCharacterData_setNodeValue(data){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.nodeValue=new String(data);
this.data=this.nodeValue;
this.length=this.nodeValue.length;
};
DOMCharacterData.prototype.getLength=function DOMCharacterData_getLength(){
return this.nodeValue.length;
};
DOMCharacterData.prototype.substringData=function DOMCharacterData_substringData(_1e88,count){
var ret=null;
if(this.data){
if(this.ownerDocument.implementation.errorChecking&&((_1e88<0)||(_1e88>this.data.length)||(count<0))){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
if(!count){
ret=this.data.substring(_1e88);
}else{
ret=this.data.substring(_1e88,_1e88+count);
}
}
return ret;
};
DOMCharacterData.prototype.appendData=function DOMCharacterData_appendData(arg){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.setData(""+this.data+arg);
};
DOMCharacterData.prototype.insertData=function DOMCharacterData_insertData(_1e8c,arg){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.data){
if(this.ownerDocument.implementation.errorChecking&&((_1e8c<0)||(_1e8c>this.data.length))){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
this.setData(this.data.substring(0,_1e8c).concat(arg,this.data.substring(_1e8c)));
}else{
if(this.ownerDocument.implementation.errorChecking&&(_1e8c!=0)){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
this.setData(arg);
}
};
DOMCharacterData.prototype.deleteData=function DOMCharacterData_deleteData(_1e8e,count){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.data){
if(this.ownerDocument.implementation.errorChecking&&((_1e8e<0)||(_1e8e>this.data.length)||(count<0))){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
if(!count||(_1e8e+count)>this.data.length){
this.setData(this.data.substring(0,_1e8e));
}else{
this.setData(this.data.substring(0,_1e8e).concat(this.data.substring(_1e8e+count)));
}
}
};
DOMCharacterData.prototype.replaceData=function DOMCharacterData_replaceData(_1e90,count,arg){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if(this.data){
if(this.ownerDocument.implementation.errorChecking&&((_1e90<0)||(_1e90>this.data.length)||(count<0))){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
this.setData(this.data.substring(0,_1e90).concat(arg,this.data.substring(_1e90+count)));
}else{
this.setData(arg);
}
};
DOMText=function(_1e93){
this._class=addClass(this._class,"DOMText");
this.DOMCharacterData=DOMCharacterData;
this.DOMCharacterData(_1e93);
this.nodeName="#text";
this.nodeType=DOMNode.TEXT_NODE;
};
DOMText.prototype=new DOMCharacterData;
DOMText.prototype.splitText=function DOMText_splitText(_1e94){
var data,inode;
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if((_1e94<0)||(_1e94>this.data.length)){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
}
if(this.parentNode){
data=this.substringData(_1e94);
inode=this.ownerDocument.createTextNode(data);
if(this.nextSibling){
this.parentNode.insertBefore(inode,this.nextSibling);
}else{
this.parentNode.appendChild(inode);
}
this.deleteData(_1e94);
}
return inode;
};
DOMText.prototype.toString=function DOMText_toString(){
return this.__escapeString(""+this.nodeValue);
};
DOMCDATASection=function(_1e96){
this._class=addClass(this._class,"DOMCDATASection");
this.DOMCharacterData=DOMCharacterData;
this.DOMCharacterData(_1e96);
this.nodeName="#cdata-section";
this.nodeType=DOMNode.CDATA_SECTION_NODE;
};
DOMCDATASection.prototype=new DOMCharacterData;
DOMCDATASection.prototype.splitText=function DOMCDATASection_splitText(_1e97){
var data,inode;
if(this.ownerDocument.implementation.errorChecking){
if(this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
if((_1e97<0)||(_1e97>this.data.length)){
throw (new DOMException(DOMException.INDEX_SIZE_ERR));
}
}
if(this.parentNode){
data=this.substringData(_1e97);
inode=this.ownerDocument.createCDATASection(data);
if(this.nextSibling){
this.parentNode.insertBefore(inode,this.nextSibling);
}else{
this.parentNode.appendChild(inode);
}
this.deleteData(_1e97);
}
return inode;
};
DOMCDATASection.prototype.toString=function DOMCDATASection_toString(){
var ret="";
ret+="<![CDATA["+this.nodeValue+"]]>";
return ret;
};
DOMComment=function(_1e9a){
this._class=addClass(this._class,"DOMComment");
this.DOMCharacterData=DOMCharacterData;
this.DOMCharacterData(_1e9a);
this.nodeName="#comment";
this.nodeType=DOMNode.COMMENT_NODE;
};
DOMComment.prototype=new DOMCharacterData;
DOMComment.prototype.toString=function DOMComment_toString(){
var ret="";
ret+="<!--"+this.nodeValue+"-->";
return ret;
};
DOMProcessingInstruction=function(_1e9c){
this._class=addClass(this._class,"DOMProcessingInstruction");
this.DOMNode=DOMNode;
this.DOMNode(_1e9c);
this.target="";
this.data="";
this.nodeType=DOMNode.PROCESSING_INSTRUCTION_NODE;
};
DOMProcessingInstruction.prototype=new DOMNode;
DOMProcessingInstruction.prototype.getTarget=function DOMProcessingInstruction_getTarget(){
return this.nodeName;
};
DOMProcessingInstruction.prototype.getData=function DOMProcessingInstruction_getData(){
return this.nodeValue;
};
DOMProcessingInstruction.prototype.setData=function DOMProcessingInstruction_setData(data){
this.setNodeValue(data);
};
DOMProcessingInstruction.prototype.setNodeValue=function DOMProcessingInstruction_setNodeValue(data){
if(this.ownerDocument.implementation.errorChecking&&this._readonly){
throw (new DOMException(DOMException.NO_MODIFICATION_ALLOWED_ERR));
}
this.nodeValue=new String(data);
this.data=this.nodeValue;
};
DOMProcessingInstruction.prototype.toString=function DOMProcessingInstruction_toString(){
var ret="";
ret+="<?"+this.nodeName+" "+this.nodeValue+" ?>";
return ret;
};
DOMDocumentFragment=function(_1ea0){
this._class=addClass(this._class,"DOMDocumentFragment");
this.DOMNode=DOMNode;
this.DOMNode(_1ea0);
this.nodeName="#document-fragment";
this.nodeType=DOMNode.DOCUMENT_FRAGMENT_NODE;
};
DOMDocumentFragment.prototype=new DOMNode;
DOMDocumentFragment.prototype.toString=function DOMDocumentFragment_toString(){
var xml="";
var _1ea2=this.getChildNodes().getLength();
for(intLoop=0;intLoop<_1ea2;intLoop++){
xml+=this.getChildNodes().item(intLoop).toString();
}
return xml;
};
DOMDocumentType=function(){
alert("DOMDocumentType.constructor(): Not Implemented");
};
DOMEntity=function(){
alert("DOMEntity.constructor(): Not Implemented");
};
DOMEntityReference=function(){
alert("DOMEntityReference.constructor(): Not Implemented");
};
DOMNotation=function(){
alert("DOMNotation.constructor(): Not Implemented");
};
Strings=new Object();
Strings.WHITESPACE=" \t\n\r";
Strings.QUOTES="\"'";
Strings.isEmpty=function Strings_isEmpty(strD){
return (strD===null)||(strD.length===0);
};
Strings.indexOfNonWhitespace=function Strings_indexOfNonWhitespace(strD,iB,iE){
if(Strings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iB;i<iE;i++){
if(Strings.WHITESPACE.indexOf(strD.charAt(i))==-1){
return i;
}
}
return -1;
};
Strings.lastIndexOfNonWhitespace=function Strings_lastIndexOfNonWhitespace(strD,iB,iE){
if(Strings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iE-1;i>=iB;i--){
if(Strings.WHITESPACE.indexOf(strD.charAt(i))==-1){
return i;
}
}
return -1;
};
Strings.indexOfWhitespace=function Strings_indexOfWhitespace(strD,iB,iE){
if(Strings.isEmpty(strD)){
return -1;
}
iB=iB||0;
iE=iE||strD.length;
for(var i=iB;i<iE;i++){
if(Strings.WHITESPACE.indexOf(strD.charAt(i))!=-1){
return i;
}
}
return -1;
};
Strings.replace=function Strings_replace(strD,iB,iE,strF,strR){
if(Strings.isEmpty(strD)){
return "";
}
iB=iB||0;
iE=iE||strD.length;
return strD.substring(iB,iE).split(strF).join(strR);
};
Strings.getLineNumber=function Strings_getLineNumber(strD,iP){
if(Strings.isEmpty(strD)){
return -1;
}
iP=iP||strD.length;
return strD.substring(0,iP).split("\n").length;
};
Strings.getColumnNumber=function Strings_getColumnNumber(strD,iP){
if(Strings.isEmpty(strD)){
return -1;
}
iP=iP||strD.length;
var arrD=strD.substring(0,iP).split("\n");
var _1eba=arrD[arrD.length-1];
arrD.length--;
var _1ebb=arrD.join("\n").length;
return iP-_1ebb;
};
StringBuffer=function(){
this._a=[];
};
StringBuffer.prototype.append=function StringBuffer_append(d){
this._a[this._a.length]=d;
};
StringBuffer.prototype.toString=function StringBuffer_toString(){
return this._a.join("");
};
draw2d.XMLSerializer=function(){
alert("do not init this class. Use the static methods instead");
};
draw2d.XMLSerializer.toXML=function(obj,_15b4,_15b5){
if(_15b4==undefined){
_15b4="model";
}
_15b5=_15b5?_15b5:"";
var t=draw2d.XMLSerializer.getTypeName(obj);
var s=_15b5+"<"+_15b4+" type=\""+t+"\">";
switch(t){
case "int":
case "number":
case "boolean":
s+=obj;
break;
case "string":
s+=draw2d.XMLSerializer.xmlEncode(obj);
break;
case "date":
s+=obj.toLocaleString();
break;
case "Array":
case "array":
s+="\n";
var _15b8=_15b5+"   ";
for(var i=0;i<obj.length;i++){
s+=draw2d.XMLSerializer.toXML(obj[i],("element"),_15b8);
}
s+=_15b5;
break;
default:
if(obj!==null){
s+="\n";
if(obj instanceof draw2d.ArrayList){
obj.trimToSize();
}
var _15ba=obj.getPersistentAttributes();
var _15b8=_15b5+"   ";
for(var name in _15ba){
s+=draw2d.XMLSerializer.toXML(_15ba[name],name,_15b8);
}
s+=_15b5;
}
break;
}
s+="</"+_15b4+">\n";
return s;
};
draw2d.XMLSerializer.isSimpleVar=function(t){
switch(t){
case "int":
case "string":
case "String":
case "Number":
case "number":
case "Boolean":
case "boolean":
case "bool":
case "dateTime":
case "Date":
case "date":
case "float":
return true;
}
return false;
};
draw2d.XMLSerializer.getTypeName=function(obj){
if(obj===null){
return "undefined";
}
if(obj instanceof Array){
return "Array";
}
if(obj instanceof Date){
return "Date";
}
var t=typeof (obj);
if(t=="number"){
return (parseInt(obj).toString()==obj)?"int":"number";
}
if(draw2d.XMLSerializer.isSimpleVar(t)){
return t;
}
return obj.type.replace("@NAMESPACE"+"@","");
};
draw2d.XMLSerializer.xmlEncode=function(_15bf){
var _15c0=_15bf;
var amp=/&/gi;
var gt=/>/gi;
var lt=/</gi;
var quot=/"/gi;
var apos=/'/gi;
var _15c6="&#62;";
var _15c7="&#38;#60;";
var _15c8="&#38;#38;";
var _15c9="&#34;";
var _15ca="&#39;";
_15c0=_15c0.replace(amp,_15c8);
_15c0=_15c0.replace(quot,_15c9);
_15c0=_15c0.replace(lt,_15c7);
_15c0=_15c0.replace(gt,_15c6);
_15c0=_15c0.replace(apos,_15ca);
return _15c0;
};
draw2d.XMLDeserializer=function(){
alert("do not init this class. Use the static methods instead");
};
draw2d.XMLDeserializer.fromXML=function(node,_1fe5){
var _1fe6=""+node.getAttributes().getNamedItem("type").getNodeValue();
var value=node.getNodeValue();
switch(_1fe6){
case "int":
try{
return parseInt(""+node.getChildNodes().item(0).getNodeValue());
}
catch(e){
alert("Error:"+e+"\nDataType:"+_1fe6+"\nXML Node:"+node);
}
case "string":
case "String":
try{
if(node.getChildNodes().getLength()>0){
return ""+node.getChildNodes().item(0).getNodeValue();
}
return "";
}
catch(e){
alert("Error:"+e+"\nDataType:"+_1fe6+"\nXML Node:"+node);
}
case "Number":
case "number":
try{
return parseFloat(""+node.getChildNodes().item(0).getNodeValue());
}
catch(e){
alert("Error:"+e+"\nDataType:"+_1fe6+"\nXML Node:"+node);
}
case "Boolean":
case "boolean":
case "bool":
try{
return "true"==(""+node.getChildNodes().item(0).getNodeValue()).toLowerCase();
}
catch(e){
alert("Error:"+e+"\nDataType:"+_1fe6+"\nXML Node:"+node);
}
case "dateTime":
case "Date":
case "date":
try{
return new Date(""+node.getChildNodes().item(0).getNodeValue());
}
catch(e){
alert("Error:"+e+"\nDataType:"+_1fe6+"\nXML Node:"+node);
}
case "float":
try{
return parseFloat(""+node.getChildNodes().item(0).getNodeValue());
}
catch(e){
alert("Error:"+e+"\nDataType:"+_1fe6+"\nXML Node:"+node);
}
break;
}
_1fe6=_1fe6.replace("@NAMESPACE"+"@","");
var obj=eval("new "+_1fe6+"()");
if(_1fe5!=undefined&&obj.setModelParent!=undefined){
obj.setModelParent(_1fe5);
}
var _1fe9=node.getChildNodes();
for(var i=0;i<_1fe9.length;i++){
var child=_1fe9.item(i);
var _1fec=child.getNodeName();
if(obj instanceof Array){
_1fec=i;
}
obj[_1fec]=draw2d.XMLDeserializer.fromXML(child,obj instanceof draw2d.AbstractObjectModel?obj:_1fe5);
}
return obj;
};
draw2d.EditPolicy=function(_1cd7){
this.policy=_1cd7;
};
draw2d.EditPolicy.DELETE="DELETE";
draw2d.EditPolicy.MOVE="MOVE";
draw2d.EditPolicy.CONNECT="CONNECT";
draw2d.EditPolicy.RESIZE="RESIZE";
draw2d.EditPolicy.prototype.type="draw2d.EditPolicy";
draw2d.EditPolicy.prototype.getPolicy=function(){
return this.policy;
};
draw2d.AbstractPalettePart=function(){
this.x=0;
this.y=0;
this.html=null;
};
draw2d.AbstractPalettePart.prototype.type="draw2d.AbstractPalettePart";
draw2d.AbstractPalettePart.prototype=new draw2d.Draggable();
draw2d.AbstractPalettePart.prototype.createHTMLElement=function(){
var item=document.createElement("div");
item.id=this.id;
item.style.position="absolute";
item.style.height="24px";
item.style.width="24px";
return item;
};
draw2d.AbstractPalettePart.prototype.setEnviroment=function(_2c75,_2c76){
this.palette=_2c76;
this.workflow=_2c75;
};
draw2d.AbstractPalettePart.prototype.getHTMLElement=function(){
if(this.html===null){
this.html=this.createHTMLElement();
draw2d.Draggable.call(this,this.html);
}
return this.html;
};
draw2d.AbstractPalettePart.prototype.onDrop=function(_2c77,_2c78){
var _2c79=this.workflow.getScrollLeft();
var _2c7a=this.workflow.getScrollTop();
var _2c7b=this.workflow.getAbsoluteX();
var _2c7c=this.workflow.getAbsoluteY();
this.setPosition(this.x,this.y);
this.execute(_2c77+_2c79-_2c7b,_2c78+_2c7a-_2c7c);
};
draw2d.AbstractPalettePart.prototype.execute=function(x,y){
alert("inerited class should override the method 'draw2d.AbstractPalettePart.prototype.execute'");
};
draw2d.AbstractPalettePart.prototype.setTooltip=function(_2c7f){
this.tooltip=_2c7f;
if(this.tooltip!==null){
this.html.title=this.tooltip;
}else{
this.html.title="";
}
};
draw2d.AbstractPalettePart.prototype.setDimension=function(w,h){
this.width=w;
this.height=h;
if(this.html===null){
return;
}
this.html.style.width=this.width+"px";
this.html.style.height=this.height+"px";
};
draw2d.AbstractPalettePart.prototype.setPosition=function(xPos,yPos){
this.x=Math.max(0,xPos);
this.y=Math.max(0,yPos);
if(this.html===null){
return;
}
this.html.style.left=this.x+"px";
this.html.style.top=this.y+"px";
this.html.style.cursor="move";
};
draw2d.AbstractPalettePart.prototype.getWidth=function(){
return this.width;
};
draw2d.AbstractPalettePart.prototype.getHeight=function(){
return this.height;
};
draw2d.AbstractPalettePart.prototype.getY=function(){
return this.y;
};
draw2d.AbstractPalettePart.prototype.getX=function(){
return this.x;
};
draw2d.AbstractPalettePart.prototype.getPosition=function(){
return new draw2d.Point(this.x,this.y);
};
draw2d.AbstractPalettePart.prototype.disableTextSelection=function(e){
if(typeof e.onselectstart!="undefined"){
e.onselectstart=function(){
return false;
};
}else{
if(typeof e.style.MozUserSelect!="undefined"){
e.style.MozUserSelect="none";
}
}
};
draw2d.ExternalPalette=function(_1a6e,divId){
this.html=document.getElementById(divId);
this.workflow=_1a6e;
this.parts=new draw2d.ArrayList();
};
draw2d.ExternalPalette.prototype.type="draw2d.ExternalPalette";
draw2d.ExternalPalette.prototype.getHTMLElement=function(){
return this.html;
};
draw2d.ExternalPalette.prototype.addPalettePart=function(part){
if(!(part instanceof draw2d.AbstractPalettePart)){
throw "parameter is not instanceof [draw2d.AbstractPalettePart]";
}
this.parts.add(part);
this.html.appendChild(part.getHTMLElement());
part.setEnviroment(this.workflow,this);
};
