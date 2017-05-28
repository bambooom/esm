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

  setViewportRange(opt) {
    this.getFn(opt)
      .then(({meta, data}) => {
        this.params.setRowCount(meta.count);
        this.params.setRowData(data);
      }, rej => {
        this.params.onLoadFail(rej);
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

  setViewportRange(opt) {
    // TODO: support sort

    Vue.nextTick(() => {
      let rows = this.getRows();
      let data = rows.slice(opt.start, opt.end + 1);

      this.params.setRowCount(rows.length);
      this.params.setRowData(data);
    });
  }
}


/* used for EsmTable as dataSource */
export function createAsyncDataSource(getFn) {
  return new AsyncDataSource(getFn);
}
