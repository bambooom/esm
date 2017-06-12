<template lang="pug">
  div
    a.btn(
      v-for="action in params.actions",
      @click.prevent="doClick(action)",
      v-text="action.label",
      v-if="isVisible(action)",
      :class="{[`btn-${action.style || 'default'}`]: true, [`btn-${action.size || 'xs'}`]: true}"
    )
</template>


<script>
  import {isFunction} from 'lodash';

  export default {
    props: {params: {}},

    methods: {
      doClick(action) {
        action.doAction && action.doAction({action, params: this.params});
      },

      isVisible(action) {
        const {visible = null} = action;
        if (visible === null) {
          return true;
        }

        if (isFunction(visible)) {
          return visible({action, params: this.params});
        }

        return visible;
      },
    },
  };
</script>
