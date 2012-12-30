(function ($$) {
    (function ($) {

    $('#tree').ready(function () {
        $('#tree').tree({
            url: '/datasource/tree.json',
            loadFilter: function (rows) {

                return convert(rows);
            }
        });
        function convert(rows) {
            function exists(rows, parentId) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].id == parentId) return true;
                }
                return false;
            }

            var nodes = [];
            // get the top level nodes  
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (!exists(rows, row.parentId)) {
                    nodes.push({
                        id: row.id,
                        text: row.name
                    });
                }
            }

            var toDo = [];
            for (var i = 0; i < nodes.length; i++) {
                toDo.push(nodes[i]);
            }
            while (toDo.length) {
                var node = toDo.shift();    // the parent node  
                // get the children nodes  
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row.parentId == node.id) {
                        var child = { id: row.id, text: row.name };
                        if (node.children) {
                            node.children.push(child);
                        } else {
                            node.children = [child];
                        }
                        toDo.push(child);
                    }
                }
            }
            return nodes;
        }

        $('#tree').tree({
            onDblClick: function (node) {
                alert(node.id);
            }
        });
    });

} (jQuery));
}(Prototype));