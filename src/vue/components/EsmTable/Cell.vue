<template lang="pug">
  td(:class="cell.colDef.cellClass")
    component(:is="component", :params="cellRendererParams")
</template>


<script>
  import escapeHtml from 'lodash/escape';
  import isNil from 'lodash/isNil';
  import {isNodeOrElement as isDom} from 'esm/dom/utils';


  const DefaultCellRenderer = {
    name: 'CellRenderer',

    props: {params: {}},

    render(h) {
      return h('div');
    },

    computed: {
      cellRenderer() {
        return this.params.colDef.cellRenderer || this.defaultRenderer;
      },

      cellContent() {
        return this.cellRenderer(this.params);
      },
    },

    watch: {
      cellContent() {
        this.renderCell();
      },
    },

    methods: {
      defaultRenderer(params) {
        return isNil(params.value) ? '' : escapeHtml(String(params.value));
      },

      renderCell() {
        let content = this.cellContent;

        if (!content || !isDom(content)) {
          this.$el.innerHTML = isNil(content) ? '' : String(content);
        } else {
          this.$el.innerHTML = '';
          this.$el.appendChild(content);
        }
      },

    },

    mounted() {
      this.renderCell();
    },
  };


  export default {
    data() {
      return {
        cellRendererComponent: null,
      };
    },

    props: {
      cell: {
        required: true,
      },
    },

    computed: {
      component() {
        return this.cell.colDef.cellRendererFramework || DefaultCellRenderer;
      },

      cellRendererParams() {
        let {value, rowNode: node, column, colDef} = this.cell;

        return {
          value,
          node,
          column,
          colDef,
          data: node.data,

          ...(colDef.cellRendererParams || {}),
        };
      },

    },
  };
</script>
