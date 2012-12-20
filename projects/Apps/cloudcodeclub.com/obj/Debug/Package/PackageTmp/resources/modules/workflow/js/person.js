draw2d.Person=function(logo){
    draw2d.ImageFigure.call(this, logo);
this.inputPort=null;
this.setDimension(50, 50);
};
draw2d.Person.prototype=new draw2d.ImageFigure();
draw2d.Person.prototype.type="person";
draw2d.Person.prototype.setWorkflow = function (_1ff3) {

    draw2d.ImageFigure.prototype.setWorkflow.call(this,_1ff3);
    if (_1ff3 !== null && this.inputPort === null)
    {
        this.inputPort=new draw2d.InputPort();
        this.inputPort.setWorkflow(_1ff3);
        this.inputPort.setBackgroundColor(new draw2d.Color(115,115,245));
        this.inputPort.setColor(null);
        this.addPort(this.inputPort,0,this.height/2);
    }
};
