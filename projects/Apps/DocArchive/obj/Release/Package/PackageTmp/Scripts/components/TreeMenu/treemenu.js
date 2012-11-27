function treeMenu() {

    this.initiate = function (placeHolder) {
        var me = this;
        var tvConfig =
        {

            id: baseClass.idGenerator('tree'),
            renderTo: placeHolder,
            width: "100%",
            height: "100%",
            collapsible: false,
            border: 0,
            fields: ['id', 'parent_id', 'title'],
            sorters: false,
            url: "/home/json_getTopicsFoldering",
            extraParams: {},

            //properties
            useArrows: true,
            rootVisible: false,
            multiSelect: false,
            singleExpand: true,
            searchBar: false,

            columns:
            [
                {
                    xtype: 'treecolumn',
                    dataIndex: 'title',
                    editor:
                    {
                        allowBlank: false,
                        xtype: 'textfield'
                    },
                    flex: 1,
                    header: "List"
                }
            ]

        }//tv Config


        //app.maskUI(placeHolder, "Loading ...");
        me.tree = new Ext.treePanelClass(tvConfig);
        //app.unmaskUI(placeHolder);



        //get Ids
        $.ajax(
        {
            url: "/home/json_getTopicsFolderingIds"
        }).done(function (data) {

            me.treeIds = data;
        });

        //getIds End
        me.tree.on("itemclick", function (a, b, c) {

            //(1)Get Selcted Node
            var dataId = me.tree.getSelectionModel().getSelection()[0].data.id;
            var node = me.tree.getStore().getNodeById(dataId);

            App.sliderObject.build(dataId);



        }); //item click
        me.tree.on('itemcontextmenu', function (view, record, HTMLElement, index, e, Object) {
            var rec = record;
            var contextMenu = new Ext.menu.Menu({
                items:
                                          [
                                              {
                                                  text: 'Create New',
                                                  icon: '',
                                                  handler: function () {

                                                      var dialog = baseClass.openDialog('New Sub Folder', { width: 200, height: 100 });
                                                      $('#' + dialog.phId).ready(function () {

                                                          $.ajax(
                                                          {
                                                              url: "/home/createNewPage"
                                                          }).done(function (page) {

                                                              $('#' + dialog.phId).ready(function () {
                                                                  $('#' + dialog.phId).html(page);

                                                                  $('#newFolder-savebtn').click(function () {

                                                                      var folder_id = me.tree.getSelection()[0].data.id;

                                                                      $.ajax(
                                                                      {
                                                                          url: "/home/saveNewFolder",
                                                                          type: "post",
                                                                          data:
                                                                          {
                                                                              folder_id: folder_id,
                                                                              title: $('#newFolder-title').val().trim()
                                                                          }
                                                                      });

                                                                      baseClass.closeDialog(dialog);
                                                                      me.tree.refresh();
                                                                      return false;
                                                                  });
                                                              });
                                                          });
                                                      }); //ready End
                                                  }
                                              },
                                              {
                                                  text: 'Edit Name',
                                                  icon: '',
                                                  handler: function () {

                                                      var dialog = baseClass.openDialog('New Sub Folder', { width: 200, height: 100 });
                                                      $('#' + dialog.phId).ready(function () {

                                                          $.ajax(
                                                          {
                                                              url: "/home/createNewPage"
                                                          }).done(function (page) {

                                                              $('#' + dialog.phId).ready(function () {
                                                                  $('#' + dialog.phId).html(page);

                                                                  $('#newFolder-savebtn').click(function () {

                                                                      var folder_id = me.tree.getSelection()[0].data.id;

                                                                      $.ajax(
                                                                      {
                                                                          url: "/home/updateFolderTitle",
                                                                          type: "post",
                                                                          data:
                                                                          {
                                                                              folder_id: folder_id,
                                                                              title: $('#newFolder-title').val().trim()
                                                                          }
                                                                      });

                                                                      baseClass.closeDialog(dialog);

                                                                      return false;
                                                                  });
                                                              });
                                                          });
                                                      }); //ready End
                                                  }
                                              },
                                              {
                                                  text: 'Save Ordering',
                                                  icon: '',
                                                  handler: function () {

                                                      //get id-parentId collection
                                                      var idparentCollection = '';
                                                      for (var i = 0; i < me.treeIds.length; i++) {

                                                          //for nodes who are disabled from top parents
                                                          if (me.tree.getStore().getNodeById(me.treeIds[i].id) == undefined) continue;

                                                          var record = me.tree.getStore().getNodeById(me.treeIds[i].id).data;


                                                          idparentCollection += record.parentId + '-' + record.id + ',';
                                                      }
                                                      if (idparentCollection != '')
                                                          idparentCollection = idparentCollection.substring(0, idparentCollection.length - 1);

                                                      $.ajax(
                                                      {
                                                          url: "/home/treeMenuFolderingSaveOrdering",
                                                          type: "post",
                                                          data:
                                                          {
                                                              ids: idparentCollection
                                                          }
                                                      });
                                                  }
                                              },
                                              {
                                                  text: 'New Category',
                                                  icon: '',
                                                  handler: function () {

                                                      var result = baseClass.openDialog('New Category', { width: 250, height: 150 });
                                                      $('#' + result.phId).ready(function () {

                                                          $.ajax(
                                                      {
                                                          url: '/home/get_NewTopicPage'
                                                      }).done(function (data) {
                                                          $('#' + result.phId).html(data);

                                                          //AssignEvents
                                                          $('#newTopic-form').ready(function () {

                                                              $('#newTopic-save').click(function () {
                                                                  $.ajax(
                                                                    {
                                                                        url: "/home/saveNewTopic",
                                                                        type: "POST",
                                                                        data:
                                                                        {
                                                                            folder_id: me.tree.getSelection()[0].data.id,
                                                                            title: $('#newTopic-name').val(),
                                                                            description: $('#newTopic-description').val()
                                                                        }
                                                                    });
                                                                  return false;
                                                              });
                                                          });
                                                      }); //end Done
                                                      }); //End Check Ready
                                                  }
                                              }
                                          ]
            });

            e.stopEvent();
            e.preventDefault();
            contextMenu.showAt(e.getXY());
            return false;
        });
    }
}
