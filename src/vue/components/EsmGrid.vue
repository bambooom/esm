<template lang="pug">
  div.esm-grid
    div.dt-toolbar
      |
    EsmTable(:gridOptions="gridOptions", :columnDefs="columnDefs", :rowData="localRowData", :customTableClass="customTableClass")
    div.esm-grid-info-box(v-if="pageInfo.rowCount === 0") {{ noDataText }}
    div.esm-grid-info-box(v-if="!loading && loadFail")
      | Load data fail{{ loadFail.rej && loadFail.rej.msg ? ` (${loadFail.rej.msg})` : '' }}
      br
      a.btn.btn-primary.btn-sm(@click.prevent="refresh()") Try again
    |
    div.dt-toolbar-footer.clearfix(v-if="shouldShowPager")
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
    |
    .esm-grid-loading(v-if="loading")
      EsmProgressLinear

</template>


<script>
  import EsmTable from './EsmTable.vue';
  import EsmProgressLinear from './EsmProgressLinear.vue';
  import {buildPages} from 'esm/ui/pagination';

  import {StaticDataSource} from '../helpers/table';


  export default {
    components: {
      EsmTable,
      EsmProgressLinear,
    },

    data() {
      return {
        loading: true,
        loadFail: null,
        pageInfo: {
          page: 1,
          rowCount: -1,
        },
        localRowData: [],
      };
    },

    props: {
      gridOptions: Object,
      columnDefs: Array,
      rowData: Array,
      pagination: {
        type: Object,
        default() {
          return {};
        },
      },
      customTableClass: String,
      noDataText: {
        type: String,
        default: 'No Data',
      },
    },

    computed: {
      pageSize() {
        let {pageSize = 20} = this.pagination;

        return pageSize;
      },
      totalPages() {
        let {rowCount} = this.pageInfo;

        if (rowCount === -1) {
          return -1;
        }

        return Math.ceil(rowCount / this.pageSize);
      },
      shouldShowPager() {
        const {forceShowPager = false} = this.pagination;
        return this.totalPages > 1 || (this.totalPages === 1 && forceShowPager === true);
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
            onLoadFail: rej => this.onLoadFail(rej),
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

        let opt = {start, end, page, pageSize};
        console.log('loadData', opt);

        this.loading = true;
        this.loadFail = null;
        this.dataSource.setViewportRange(opt);
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
        this.loading = false;
      },

      onLoadFail(rej) {
        this.localRowData = [];
        this.pageInfo.rowCount = -1;

        this.loading = false;
        this.loadFail = {
          rej,
        };
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
  .esm-grid {
    position: relative;

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
  }
  .esm-grid-info-box {
    margin-top: -20px;
    padding: 20px 10px 10px;
    text-align: center;
    border: 1px solid #ddd;
    border-top: 0;
  }

  .esm-grid-loading {
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    padding-top: 5px;
  }
</style>
