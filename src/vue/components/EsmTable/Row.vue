<template lang="pug">
  tr
    Cell(v-for="cell in row.cells", :cell="cell")
</template>


<script>
  import Cell from './Cell.vue';


  export default {
    components: {Cell},

    props: {
      row: {
        required: true,
      },
    },
  };
</script>
