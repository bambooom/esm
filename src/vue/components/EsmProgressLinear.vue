<template lang="pug">
  .esm-progress-linear
    .esm-pl-container
      span.esm-pl-bar
</template>


<script>
  export default {
  };
</script>


<style lang="scss">
  .esm-progress-linear {
    display: block;
    position: relative;
    width: 100%;
    height: 5px;
    background-color: #aad1f9;

    .esm-pl-container {
      display:block;
      position: relative;
      overflow: hidden;

      width:100%;
      height: 5px;

      .esm-pl-bar {
        position: absolute;

        left: 0;
        top: 0;
        bottom: 0;
        background-color: #106cc8;

        width: 100%;
        height: 5px;
        animation: esm-progress-linear-query .8s infinite cubic-bezier(0.390, 0.575, 0.565, 1.000);
      }

      &.ng-hide .esm-pl-bar {
        animation-name: none;
      }
    }
  }

  @keyframes esm-progress-linear-query {
    0% {
      opacity: 1;
      transform: translateX(35%) scale(.3, 1);
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) scale(0, 1);
    }
  }
</style>
