<template>
  <transition name="md-spinner" appear>
    <div class="md-spinner" :class="[classes]" :style="styles">
      <svg class="md-spinner-draw" viewBox="25 25 50 50">
        <circle class="md-spinner-path" cx="50" cy="50" r="20" :stroke-width="mdStroke" :stroke-dasharray="dashProgress" />
      </svg>
    </div>
  </transition>
</template>


<script>
  // https://github.com/vuematerial/vue-material/blob/master/src/components/mdSpinner/mdSpinner.vue

  export default {
    props: {
      mdSize: {
        type: Number,
        default: 50
      },
      mdStroke: {
        type: Number,
        default: 3.5
      },
      mdIndeterminate: Boolean,
      mdProgress: {
        type: Number,
        default: 0
      }
    },
    computed: {
      classes() {
        return {
          'md-indeterminate': this.mdIndeterminate
        };
      },
      styles() {
        const newSize = this.mdSize + 'px';
        return {
          width: newSize,
          height: newSize
        };
      },
      dashProgress() {
        let progress = this.mdProgress * 125 / 100;
        if (this.mdIndeterminate) {
          return false;
        }
        if (progress >= 125) {
          progress = 130;
        }
        return `${progress}, 200`;
      }
    }
  };
</script>


<style lang="scss">
  $swift-ease-out-duration: .4s !default;
  $swift-ease-out-timing-function: cubic-bezier(.25, .8, .25, 1) !default;
  $swift-ease-out: all $swift-ease-out-duration $swift-ease-out-timing-function !default;

  $swift-ease-in-duration: .3s !default;
  $swift-ease-in-timing-function: cubic-bezier(.55, 0, .55, .2) !default;
  $swift-ease-in: all $swift-ease-in-duration $swift-ease-in-timing-function !default;

  $swift-ease-in-out-duration: .5s !default;
  $swift-ease-in-out-timing-function: cubic-bezier(.35, 0, .25, 1) !default;
  $swift-ease-in-out: all $swift-ease-in-out-duration $swift-ease-in-out-timing-function !default;

  $swift-linear-duration: .15s !default;
  $swift-linear-timing-function: linear !default;
  $swift-linear: all $swift-linear-duration $swift-linear-timing-function !default;

  .md-spinner {
    display: inline-block;
    position: relative;
    pointer-events: none;
    will-change: transform, opacity;

    &.md-indeterminate {
      .md-spinner-draw {
        animation: spinner-rotate 1.9s linear infinite;
        transform: rotate(0deg) translateZ(0);
      }

      .md-spinner-path {
        stroke-dasharray: 2, 200;
        animation: spinner-dash 1.425s ease-in-out infinite;
      }
    }

    &.md-spinner-leave-active {
      opacity: 0;
      transform: scale(.8) translateZ(0);
      transition: $swift-ease-out;
    }

    &:not(.md-indeterminate) {
      &.md-spinner-enter-active {
        transition-duration: 2s;

        .md-spinner-draw {
          animation: spinner-initial-rotate 1.98s $swift-ease-out-timing-function forwards;
        }
      }
    }
  }

  .md-spinner-draw {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: rotate(270deg) translateZ(0);
    transform-origin: center center;
    will-change: transform, opacity;
  }

  .md-spinner-path {
    fill: none;
    stroke: #69abef;
    stroke-dashoffset: 0;
    stroke-miterlimit: 10;
    transition: $swift-ease-out;
  }

  @keyframes spinner-rotate {
    to {
      transform: rotate(360deg) translateZ(0);
    }
  }

  @keyframes spinner-initial-rotate {
    0% {
      opacity: 0;
      transform: rotate(-90deg) translateZ(0);
    }

    20% {
      opacity: 1;
    }

    100% {
      transform: rotate(270deg) translateZ(0);
    }
  }

  @keyframes spinner-dash {
    0% {
      stroke-dasharray: 2, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }

    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
</style>