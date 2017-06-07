<template lang="pug">
  table(width="100%", :class="tableClass")
    thead
      tr
        th(v-for="col in columns", :class="col.colDef.headerClass")
          | {{ col.colDef.headerName }}
    tbody
      Row(v-for="row in rowNodes", :row="row")
</template>


<script>
  import Row from './EsmTable/Row.vue';


  export default {
    components: {
      Row,
    },

    props: {
      gridOptions: {},
      columnDefs: {},
      rowData: {},
    },

    computed: {
      tableClass() {
        return 'table table-striped table-bordered table-hover';
      },

      columns() {
        return this.columnDefs.map((colDef, index) => ({
          index,
          colDef,
        }));
      },

      rowNodes() {
        return this.rowData.map((data, rowIndex) => {
          let rowNode = {
            data,
            rowIndex,
          };

          rowNode.cells = this.columns.map(column => {
            return {
              value: column.colDef.field ? data[column.colDef.field] : undefined,
              column,
              colDef: column.colDef,
              rowNode,
            };
          });

          return rowNode;
        });
      },

    },
  };
</script>
