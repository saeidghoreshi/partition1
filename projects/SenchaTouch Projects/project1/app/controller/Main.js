Ext.define('GS.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {//component query on any component
              
              blog:'blog'
        },
        control: {
          'blog list'  :
          {
              itemtap:'showPost'
          }
        }
    },
    showPost:function(list,index,el,rec)
    {
        console.log(rec.get('title'));
        this.getBlog().push(
        {
            xtype:'panel',
            title:rec.get('title'),
            html:rec.get('content'),
            scrollable:true,
            styleHtmlContent:true
        });
    }
    
    
});