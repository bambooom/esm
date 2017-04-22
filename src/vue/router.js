/**
 * see https://github.com/vuejs/vue-router/issues/745
 */
export function getEmptyView() {
  return {
    render(h) {
      return h('router-view');
    }
  };
}

