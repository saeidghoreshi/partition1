

Class('application',
{
	isa:abstractBase,
    has:
        {
            componentLibLoaded:
            {
                is: 'rw',
                init: {}
            }
        },

    methods:
        {
            init: function () {
                var me = this;
				
				
				me.tagReady(me.getId(), function () 
				{
					var cb = function () {
						
						var callback = function () {

							me.baseController = new baseControllerClass({ parentId: me.getId() });
							me.baseController.init();
					
						}
						me.componentLoader("base", callback);
					
					}
					me.modulesLoader(cb);
					
				});
				//Load google Visualization
				google.load('visualization', '1', { packages: ['orgchart'] });
            }
        }
});

var app = new application({parentId:'body'});
app.init();
