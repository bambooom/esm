/**
 * Follow Ag-Grid interface
 */
import Vue from 'vue';


class AsyncDataSource {
  constructor(getFn) {
    this.getFn = getFn;
  }

  init(params) {
    this.params = params;
  }

  destroy() {
    // TODO: destroy
  }

  setViewportRange(first, last) {
    this.getFn({first, last})
      .then(({meta, data}) => {
        this.params.setRowCount(meta.count);
        this.params.setRowData(data);
      });
  }

  /*
   changes.forEach(change => {
     var rowNode = this.params.getRow(change.rowIndex);
     // if the rowNode is missing, it means the grid is not displaying that row.
     // if the data is missing, it means the rowNode is there, but that data has not
     // loaded into it yet, so to early to set delta changes.
     if (!rowNode || !rowNode.data) {
       return;
     }
     // rowNode.data[change.columnId] = change.newValue;
     // this is a trick, it gets the row to refresh
     rowNode.setDataValue(change.columnId, change.newValue);
   });
   */
}


export class StaticDataSource {
  constructor(getRows) {
    this.getRows = getRows;
  }

  init(params) {
    this.params = params;
  }

  destroy() {
    // TODO: destroy
  }

  setViewportRange(first, last) {
    Vue.nextTick(() => {
      let rows = this.getRows();
      let data = rows.slice(first, last + 1);

      this.params.setRowCount(rows.length);
      this.params.setRowData(data);
    })
  }
}


/* used for EsmTable as dataSource */
export function createAsyncDataSource(getFn) {
  return new AsyncDataSource(getFn);
}
