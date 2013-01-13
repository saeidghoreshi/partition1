require(["dojo/dom", "dojo/on", "dojo/parser", "dojo/ready", "dijit/registry", "dijit/form/Button",
  "dojo/parser", "dojo/ready", "dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane"
  , "dijit/Editor"],
  function (dom, on, parser, ready, registry) {


    var myClick = function(evt){
      console.log("I was clicked");
    };
 
    ready(function(){
      parser.parse();
 
      //on(dom.byId("button1"), "click", myClick);
      //on(registry.byId("button2"), "click", myClick);
  });

  });




var grid, dataStore, store;
require([
				"dojox/grid/DataGrid",
				"dojo/store/Memory",
				"dojo/data/ObjectStore",
				"dojo/request",
				"dojo/domReady!"
			], function (DataGrid, Memory, ObjectStore, request) {
			    request.get("http://dojotoolkit.org/documentation/tutorials/1.8/datagrid/demo/hof-batting.json", {
			        handleAs: "json"
			    }).then(function (data) {
			        store = new Memory({ data: data.items });
			        dataStore = new ObjectStore({ objectStore: store });

			        grid = new DataGrid({
			            store: dataStore,
			            query: { id: "*" },
			            structure: [
							{ name: "First Name", field: "first", width: "84px" },
							{ name: "Last Name", field: "last", width: "84px" },
							{ name: "Bats", field: "bats", width: "70px" },
							{ name: "Throws", field: "throws", width: "70px" },
							{ name: "G", field: "totalG", width: "60px" },
							{ name: "AB", field: "totalAB", width: "60px" },
							{ name: "Games as Batter", field: "totalGAB", width: "120px" },
							{ name: "R", field: "totalR", width: "60px" },
							{ name: "RBI", field: "totalRBI", width: "60px" },
							{ name: "BB", field: "totalBB", width: "60px" },
							{ name: "K", field: "totalK", width: "60px" },
							{ name: "H", field: "totalH", width: "60px" },
							{ name: "2B", field: "total2B", width: "60px" },
							{ name: "3B", field: "total3B", width: "60px" },
							{ name: "HR", field: "totalHR", width: "60px" }
						]
			        }, "grid");

			        // since we created this grid programmatically, call startup to render it
			        grid.startup();
			    });
			})