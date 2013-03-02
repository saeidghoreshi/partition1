var extjs4Lib;
(function ($) {

	extjs4Lib=cls.define({ });

    //static Methods
    extjs4Lib.openDialog= function (title, size) {

		var PH = app.idGenerator('PH');
		var win = Ext.create('widget.window',
		{
			title: title,
			width: size.width,
			height: size.height,
			items:
			[
				{
					flex: 1,
					height: "100%",
					padding: 5,
					border: 0
				}
			],


			frame: false,
			border: 0,
			draggable: true,
			resizable: false,
			closable: true,
			closeAction: 'destroy',
			modal: true,
			autoScroll: true,
			animCollapse: true,
			animateTarget: 'body'
		});

		win.show();
		return { win: win, phId: PH };

	};
	
	extjs4Lib.closeDialog= function (dialog) {
		dialog.win.destroy();
	};
	
	extjs4Lib.showWin= function (finalPanel, title, winHandlers, topItems, bottomItems) 
	{
		if (bottomItems == null)
			bottomItems = []

		var dockedItems =
		[
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					items: ['->'].concat(bottomItems)

				},
				{
					xtype: 'toolbar',
					dock: 'top',
					items: topItems
				}
		]

		if (topItems == null || topItems.length == 0)
			dockedItems.splice(1, 1);
		if (bottomItems == [])
			dockedItems.splice(0, 1);

		var win = Ext.create('widget.window',
		{
			title: title,
			width: finalPanel.config.width + 30,
			height: finalPanel.config.height,
			items: [finalPanel],

			frame: false,
			draggable: true,
			closable: true,
			closeAction: 'destroy',
			modal: true,
			resizable: false,
			autoScroll: true,

			tools:
			[
				/*{id: 'left',handler:winHandlers.left},
				{id: 'right',handler:winHandlers.right},
				{id: 'print'},
				{id: 'minimize',handler:winHandlers.minimize},
				{id: 'refresh'},
				{id: 'help'},
				{id: 'search'},
				{id: 'save'},
				{id: 'pin'},
				*/
			],

			dockedItems: dockedItems

		});

		win.show();
		return { win: win, form: finalPanel };
	};

	extjs4Lib.makeExtJSStaticStore= function (fields, data) {
		return Ext.create('Ext.data.Store', { fields: fields, data: data });
	};

	extjs4Lib.hideWin= function (win, finalPanel) {
		win.hide();
		finalPanel.destroy();
	};

} (jQuery));