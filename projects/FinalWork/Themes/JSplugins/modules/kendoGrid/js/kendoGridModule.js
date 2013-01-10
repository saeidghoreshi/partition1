(function ($) {
    Class('kendoGridModuleClass',
    {
        has:
            {
                config:
                {
                    is: 'rw',
                    init: {}
                }
            },
        methods:
            {
                initialize: function (config) {
                    var me = this;

                    me.config = config;
                    me.config.id = app.idGenerator('placeholder');
                    $('#' + me.config.parentId).html('<div id=' + me.config.id + '></div>');
                },
                getId: function () {
                    var me = this;
                    return me.config.id;
                },

                init: function () {
                    var me = this;

                    me.result = '';
                    app.tagReady(me.getId(), function () {
                        me.buildGUI();
                    });
                },

                buildGUI2: function () {

                    var me = this;

                    app.tagReady(me.getId(), function () {

                        $("#" + me.getId()).kendoGrid({
                            dataSource: {
                                //data: me.config.data,
                                type: "odata",
                                transport: {
                                    read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
                                },

                                schema: {
                                    model: {
                                        fields: {
                                            OrderID: { type: "number" },
                                            Freight: { type: "number" },
                                            ShipName: { type: "string" },
                                            OrderDate: { type: "date" },
                                            ShipCity: { type: "string" }
                                        }
                                    }
                                },
                                pageSize: 10,
                                serverPaging: true,
                                serverFiltering: true,
                                serverSorting: true
                            },
                            pageable: {
                                input: true,
                                numeric: false
                            },
                            columns: [
                                {
                                    field: "OrderID",
                                    filterable: false
                                },
                                "Freight",
                                {
                                    field: "OrderDate",
                                    title: "Order Date",
                                    width: 100,
                                    format: "{0:MM/dd/yyyy}"
                                }, {
                                    field: "ShipName",
                                    title: "Ship Name",
                                    width: 200
                                }, {
                                    field: "ShipCity",
                                    title: "Ship City"
                                }
                            ],


                            scrollable: true,
                            sortable: true,
                            filterable: true,
                            columnMenu: true

                        }); //Grid
                    });
                }, //2
                buildGUI3: function () {

                    var me = this;

                    app.tagReady(me.getId(), function () {

                        var template1 =
                        '<div class="tabstrip">' +
                            '<ul>' +
                                '<li class="k-state-active">' +
                                   'Orders' +
                                '</li>' +
                                '<li>' +
                                    'Contact Information' +
                                '</li>' +
                            '</ul>' +
                            '<div>' +
                                '<div class="orders"></div>' +
                            '</div>' +
                            '<div>' +
                                '<div class="employee-details">' +
                                    '<ul>' +
                                        '<li><label>Country:</label>#= Country #</li>' +
                                        '<li><label>City:</label>#= City #</li>' +
                                        '<li><label>Address:</label>#= Address #</li>' +
                                        '<li><label>Home Phone:</label>#= HomePhone #</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

                        me.grid2 = $("#" + me.getId()).kendoGrid({
                            dataSource: {
                                type: "odata",
                                transport: {
                                    read: "http://demos.kendoui.com/service/Northwind.svc/Employees"
                                },
                                pageSize: 5,
                                serverPaging: true,
                                serverSorting: true
                            },
                            height: 450,
                            sortable: true,
                            pageable: true,
                            detailTemplate: kendo.template(template1),
                            detailInit: detailInit,
                            dataBound: function () {
                                this.expandRow(this.tbody.find("tr.k-master-row").first());
                            },
                            columns: [
                                        {
                                            field: "FirstName",
                                            title: "First Name"
                                        },
                                        {
                                            field: "LastName",
                                            title: "Last Name"
                                        },
                                        {
                                            field: "Country"
                                        },
                                        {
                                            field: "City"
                                        },
                                        {
                                            field: "Title"
                                        }
                                    ]
                        });
                    });

                    function detailInit(e) {
                        var detailRow = e.detailRow;

                        detailRow.find(".tabstrip").kendoTabStrip({
                            animation: { open: { effects: "fadeIn"} }
                        });

                        detailRow.find(".orders").kendoGrid({
                            dataSource: {
                                type: "odata",
                                transport: {
                                    read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
                                },
                                serverPaging: true,
                                serverSorting: true,
                                serverFiltering: true,
                                pageSize: 6,
                                filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
                            },
                            scrollable: false,
                            sortable: true,
                            pageable: true,
                            columns: [
                                        { field: "OrderID", width: 70 },
                                        { field: "ShipCountry", title: "Ship Country", width: 100 },
                                        { field: "ShipAddress", title: "Ship Address" },
                                        { field: "ShipName", title: "Ship Name", width: 200 }
                                    ]
                        });
                    }
                }, //1
                buildGUI: function () {

                    var me = this;

                    app.tagReady(me.getId(), function () {

                        
                          me.grid3= $("#"+me.getId()).kendoGrid({
                                dataSource: {
                                    type: "odata",
                                    transport: {
                                        read: "http://demos.kendoui.com/service/Northwind.svc/Employees"
                                    },
                                    pageSize: 6,
                                    serverPaging: true,
                                    serverSorting: true
                                },
                                height: 450,
                                sortable: true,
                                pageable: true,
                                detailInit: detailInit,
                                dataBound: function () {
                                    this.expandRow(this.tbody.find("tr.k-master-row").first());
                                },
                                columns: [
                                    {
                                        field: "FirstName",
                                        title: "First Name"
                                    },
                                    {
                                        field: "LastName",
                                        title: "Last Name"
                                    },
                                    {
                                        field: "Country"
                                    },
                                    {
                                        field: "City"
                                    },
                                    {
                                        field: "Title"
                                    }
                                ]
                            
                        });

                        function detailInit(e) {
                            $("<div/>").appendTo(e.detailCell).kendoGrid({
                                dataSource: {
                                    type: "odata",
                                    transport: {
                                        read: "http://demos.kendoui.com/service/Northwind.svc/Orders"
                                    },
                                    serverPaging: true,
                                    serverSorting: true,
                                    serverFiltering: true,
                                    pageSize: 6,
                                    filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
                                },
                                scrollable: false,
                                sortable: true,
                                pageable: true,
                                columns: [
                                    { field: "OrderID", width: 70 },
                                    { field: "ShipCountry", title: "Ship Country", width: 100 },
                                    { field: "ShipAddress", title: "Ship Address" },
                                    { field: "ShipName", title: "Ship Name", width: 200 }
                                ]
                            });
                        }
                        
                    });
                } //1
            }
    });
})(jQuery);