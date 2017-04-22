<template lang="pug">
  component(:is='component', :model='model', :schema.sync='schema', @modelUpdated='modelUpdated', @validated="validated")
</template>


<script>
  import {abstractField} from 'vue-form-generator';

  /*
   * { type: 'component', component: xxx }
   */
  export default {
    mixins: [ abstractField ],

    computed: {
      component() {
        return this.schema.component;
      },
    },

    methods: {
      modelUpdated(...args) {
        this.$emit('modelUpdated', ...args);
      },

      validated(...args) {
        this.$emit('validated', ...args);
      },

    },

  };

</script>


<style lang="scss">
</style>
