﻿function makeExtJSStaticStore(fields, data) {
        return Ext.create('Ext.data.Store', { fields: fields, data: data });
}


function EXTJSGrid(config) {

    var me = this;
    //var grid1 = new extjsGrid1(config);
	var grid1 = new extjsGrid(config);
    grid1.init();
    
}

Ext.onReady(function () {

    EXTJSGrid(
    {
        parentID: "extcomponent"
    });
});