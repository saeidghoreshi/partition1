Ext.define('Ext.ux.tree.TreeEditing', {
    alias: 'plugin.treeediting'
    ,extend: 'Ext.grid.plugin.CellEditing'
    
    
    /**
     * @override
     * @private Collects all information necessary for any subclasses to perform their editing functions.
     * @param record
     * @param columnHeader
     * @returns {Object} The editing context based upon the passed record and column
     */
    ,getEditingContext: function(record, columnHeader) {
        var me = this,
            grid = me.grid,
            store = grid.store,
            rowIdx,
            colIdx,
            view = grid.getView(),
            root = grid.getRootNode(),
            value;

        // If they'd passed numeric row, column indices, look them up.
        if (Ext.isNumber(record)) {
            rowIdx = record;
            record = root.getChildAt(rowIdx);
        } else {
            rowIdx = root.indexOf(record);
        }
        if (Ext.isNumber(columnHeader)) {
            colIdx = columnHeader;
            columnHeader = grid.headerCt.getHeaderAtIndex(colIdx);
        } else {
            colIdx = columnHeader.getIndex();
        }

        value = record.get(columnHeader.dataIndex);
        return {
            grid: grid,
            record: record,
            field: columnHeader.dataIndex,
            value: value,
            row: view.getNode(rowIdx),
            column: columnHeader,
            rowIdx: rowIdx,
            colIdx: colIdx
        };
    }
    

});//eo class

//end of file