<template lang="pug">
  div
    div.dt-toolbar
      |
    EsmTable(:gridOptions="gridOptions", :columnDefs="columnDefs", :rowData="localRowData")

    div.dt-toolbar-footer.row
      div.col-sm-6.col-xs-12.hidden-xs
        span.dt-data-info
          span(v-text="pageText")
      div.col-sm-6.col-xs-12.text-right
        ul.pagination
          li(v-for="page in pages")
            a(:class="{active: page.active}", v-text="page.text", @click.prevent="goPage(page.number)")
          li(:class="{disabled: !prevNext.hasPrev}")
            a.previous(@click.prevent="goPrevPage()")
              i.fa.fa-angle-left
          li(:class="{disabled: !prevNext.hasNext}")
            a.next(@click.prevent="goNextPage()")
              i.fa.fa-angle-right
</template>


<script>
  import EsmTable from './EsmTable.vue';
  import {buildPages} from 'esm/ui/pagination';

  import {StaticDataSource} from '../helpers/table';


  export default {
    components: {
      EsmTable,
    },

    data() {
      return {
        pageInfo: {
          page: 1,
          rowCount: -1,
        },
        localRowData: [],
      };
    },

    props: {
      gridOptions: {},
      columnDefs: {},
      rowData: {},
      pagination: {},
    },

    computed: {
      pageSize() {
        let {pageSize = 20} = this.pagination || {};

        return pageSize;
      },
      totalPages() {
        let {rowCount} = this.pageInfo;

        if (rowCount === -1) {
          return -1;
        }

        return Math.ceil(rowCount / this.pageSize);
      },

      pageText() {
        if (this.pageInfo.rowCount === -1) {
          return null;
        } else {
          let {start, end} = this.getPageInfo();
          return `${start + 1} - ${end + 1} / ${this.pageInfo.rowCount}`;
        }
      },

      pages() {
        let {page = null} = this.pageInfo;
        let isAnyNull = page === null || this.totalPages === -1;

        return isAnyNull ? null : buildPages(page, this.totalPages, {maxSize: 5, boundaryLinkNumbers: true});
      },

      prevNext() {
        let {page = null} = this.pageInfo;
        let isAnyNull = page === null || this.totalPages === -1;

        return {
          hasPrev: isAnyNull ? false : page !== 1,
          hasNext: isAnyNull ? false : page !== this.totalPages,
        };
      },

      dataSource() {
        let {dataSource = null} = this.gridOptions;

        if (dataSource === null) {
          if (!this._staticDataSource) {
            this._staticDataSource = new StaticDataSource(() => this.rowData || []);
          }

          dataSource = this._staticDataSource;
        }

        if (!dataSource._inited) {
          dataSource.init({
            setRowCount: (count: number) => this.setRowCount(count),
            setRowData: (rowData) => this.setRowData(rowData),
            getRow: (rowIndex: number) => this.getRowNode(rowIndex),
          });

          dataSource._inited = true;
        }

        return dataSource;
      },
    },

    watch: {
    },

    methods: {
      refresh({page = null} = {}) {
        if (page !== null) {
          this.pageInfo.page = page;
        }

        this.loadData();
      },

      goPage(page) {
        if (this.pageInfo.page === page) {
          return;
        }

        this.pageInfo.page = page;
        this.loadData();
      },
      goPrevPage() {
        if (!this.prevNext.hasPrev) {
          return;
        }

        this.goPage(this.pageInfo.page - 1);
      },
      goNextPage() {
        if (!this.prevNext.hasNext) {
          return;
        }

        this.goPage(this.pageInfo.page + 1);
      },

      loadData() {
        let {start, end, page, pageSize} = this.getPageInfo();

        this.dataSource.setViewportRange(start, end, {start, end, page, pageSize});
      },

      getPageInfo() {
        let {pageSize} = this;
        let {page} = this.pageInfo;

        let start = (page - 1) * pageSize;
        let end = start + pageSize - 1;

        return {
          start,
          end,
          pageSize,
          page,
        };

      },

      setRowCount(count) {
        this.pageInfo.rowCount = count;
      },

      setRowData(rowData) {
        this.localRowData = rowData;
      },

      getRowNode(rowIndex) {
        throw new Error('getRowNode not impl yet');
      },
    },

    beforeMount() {
      this.$nextTick(() => {
        this.loadData();
      });
    },

  };


  /**
   * = gridOptions:
   *   * dataSource
   *
   * = rowData
   *
   * = columnDefs
   *
   * = pagination
   *   * pageSize
   */
</script>


<style lang="scss">
  .dt-data-info {
    display: inline-block;
    margin: 18px 0;
    font-family: 'Roboto', sans-serif;
  }

  ul.pagination {
    a.previous,
    a.next {
      i {
        transform: scale(1.5);
      }
    }

    a.active {
      font-weight: bold;
      color: black;
    }
  }
</style>
