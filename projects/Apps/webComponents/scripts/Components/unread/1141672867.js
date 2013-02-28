loadExtJSAccordion: function (PH) {
    var me = this;

    app.tagReady(PH, function () {
        $.ajax(
                {
                    url: "/sandbox/json_getModuleFeatures",
                    type: "get"
                }).done(function (data) {

                    var items = []
                    for (var i = 0; i < data.length; i++) {
                        items.push
                        (
                            Ext.create('Ext.Panel', {
                                title: data[i].text,
                                html: '<img src="/resources/components/rightTabsComponent/images/' + data[i].text + '.png" />'
                            })

                        );
                    }


                    var accordion = Ext.create('Ext.Panel', {
                        renderTo: PH,
                        height: 400,
                        border: 0,
                        layout: 'accordion',
                        items: items
                    });
                });
    });
}