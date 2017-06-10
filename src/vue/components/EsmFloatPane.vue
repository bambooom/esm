<template lang="pug">
  .esm-float-pane-box
    transition-group(name="esm-float-pane" tag="div")
      .esm-float-pane(v-for="(pane, index) in panes", :key="pane")
        .esm-float-pane-content
          component(v-if="pane.component", :is="pane.component", v-bind="getPaneComponentProps(pane)")
        .esm-float-pane-tab(:style="getPaneTabStyle(pane, index)", :class="getPaneTabClass(pane, index)")
          div(@click="onClosePane(index)")

    transition(name="esm-float-pane-overlay")
      .esm-float-pane-overlay(v-if="this.paneCount", @click="onClickOverlay")
</template>


<script>
  import indexOf from 'lodash/indexOf';


  export default {
    data() {
      return {
        panes: [],
        dfds: [],
      };
    },

    computed: {
      paneCount() {
        return this.panes.length;
      },
    },

    methods: {
      getPaneTabStyle(pene, index) {
        let rIndex = this.paneCount - 1 - index;

        return {
          top: `${rIndex * 44 - 4}px`,
        };
      },

      getPaneTabClass(pene, index) {
        let rIndex = this.paneCount - 1 - index;

        return {
          active: rIndex === 0,
        };
      },

      addPane(pane) {
        let dfd = (function() {
          let dfd = {};

          dfd.promise = new Promise((resolve, reject) => {
            dfd.resolve = resolve;
            dfd.reject = reject;
          });

          return dfd;
        }());

        this.panes.push(pane);
        this.dfds.push(dfd);

        return dfd.promise;
      },

      filter(fn) {
        return this.panes.filter(fn);
      },

      // 这个接口主要是内部使用，所以不怕传错 index
      removePane(paneIndex) {
        this.panes.splice(paneIndex, 1);
      },

      // rejectPane & resolvePane 主要给 pane component 用, 所以使用 pane 更安全
      rejectPane(rej, pane) {
        let idx = indexOf(this.panes, pane);
        if (idx < 0) {
          return;
        }

        this.dfds[idx].reject(rej);
        this.dfds.splice(idx, 1);
        this.removePane(idx);
      },
      resolvePane(res, pane) {
        let idx = indexOf(this.panes, pane);
        if (idx < 0) {
          return;
        }

        this.dfds[idx].resolve(res);
        this.dfds.splice(idx, 1);
        this.removePane(idx);
      },

      getPaneComponentProps(pane) {
        return {
          ...(pane.props || {}),

          resolvePane: res => this.resolvePane(res, pane),
          rejectPane: rej => this.rejectPane(rej, pane),
        };
      },

      onClosePane(paneIndex, ref = 'closeButton') {
        let pane = this.panes[paneIndex];

        this.rejectPane({type: 'cancel', ref,}, pane);
      },

      onClickOverlay() {
        this.onClosePane(this.paneCount - 1, 'overlay');
      },
    },
  };
</script>


<style lang="scss">
  .esm-float-pane-overlay {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    z-index: 1000;
    overflow: auto;

    &.dark {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }

  .esm-float-pane {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    max-width: 100%;
    z-index: 1005;
    transition: opacity .2s;
    min-width: 75%;
    width: 907px;
    box-sizing: border-box;
    background-color: white;

    @media (max-width: 950px) {
      min-width: 80%;
      width: 730px;
    }
  }
  .esm-float-pane-content {
    position: absolute;
    z-index: 1005;
    top: 20px;
    right: 20px;
    bottom: 20px;
    left: 20px;
    overflow-y: auto;
  }

  .esm-float-pane-tab {
    width: 40px;
    height: 58px;
    position: absolute;
    top: 0;
    left: 0;
    margin-left: -40px;
    transition: top .2s;
    perspective: 45px;
    overflow: hidden;

    &:before {
      display: block;
      content: " ";
      background: #eee;
      position: absolute;
      width: 100%;
      height: 100%;
      transform: rotateY(-32deg) scaleY(0.7);
      border-radius: 10px 0 0 10px;
      box-shadow: -5px 2px 11px #5f5f5f;
    }

    &.active {
      &:before {
        background: white;
      }

      div {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.2;
        cursor: pointer;
        transform: rotateZ(45deg) translate(-1px, -2px);

        &:before {
          content: " ";
          display: block;
          width: 20px;
          height: 2px;
          background: black;
          transform: translate(13px, 28px);
          overflow: hidden;
        }
        &:after {
          content: " ";
          display: block;
          width: 2px;
          height: 20px;
          background: black;
          transform: translate(22px, 17px);
          overflow: hidden;
        }
      }

      &:hover div {
        opacity: 0.6;
      }
    }
  }

  @keyframes slideOut {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(60%, 0, 0);
      opacity: 0;
    }
  }

  @keyframes slideIn {
    0% {
      transform: translate3d(50%, 0, 0);
      opacity: 0;
    }
    100% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0.01;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.01;
    }
  }

  .esm-float-pane-leave-active {
    animation: slideOut .3s linear;
  }

  .esm-float-pane-enter-active {
    animation: slideIn .4s;
  }

  .esm-float-pane-overlay-enter-active {
    animation: fadeIn .2s;
  }

  .esm-float-pane-overlay-leave-active {
    animation: fadeOut .3s;
  }
</style>
