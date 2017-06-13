<template lang="pug">
  div.cell-actions
    template(v-for="action in params.actions",
      v-if="isVisible(action) && hasPerm(action)")
      router-link.btn.btn-link(
        v-if="action.type === 'router-link'",
        :target="action.target || null",
        :to="getRouteTo(action)",
        :class="{[`btn-${action.size || 'xs'}`]: true}",
      ) {{ action.label }}
      a.btn(
        v-else,
        @click.prevent="doClick(action)",
        v-text="action.label",
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

      hasPerm(action) {
        const {checkFn, checkRole} = action;

        // TODO: perm check
        return true;
      },

      getRouteTo(action) {
        if (isFunction(action.routeTo)) {
          return action.routeTo({action, params: this.params});
        }
        return action.routeTo;
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

<style lang="scss">
  .cell-actions {
    > .btn {
      margin-right: 5px;
    }
  }
</style>
