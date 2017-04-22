<template lang="pug">
  div
    a.btn(
      v-for="action in params.actions",
      @click.prevent="doClick(action)",
      v-text="action.label",
      :class="{[`btn-${action.style || 'default'}`]: true, [`btn-${action.size || 'xs'}`]: true}"
    )
</template>


<script>
  export default {
    props: {params: {}},

    methods: {
      doClick(action) {
        action.doAction && action.doAction({action, params: this.params});
      },
    },
  };
</script>
