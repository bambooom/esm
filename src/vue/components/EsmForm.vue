<template lang="pug">
  div
    VueForm(:schema="schema", :model="model", :options="options", :class="vfgClasses")
</template>


<script>
  import Vue from 'vue';

  require('vue-multiselect/dist/vue-multiselect.min.css');
  import Multiselect from 'vue-multiselect';

  require('vue-form-generator/dist/vfg.css');
  import VueForm from 'vue-form-generator';
  import vfgComponent from './EsmForm/vfgComponent.vue';
  import FieldFile from './EsmForm/FieldFile.vue';

  Vue.component('Multiselect', Multiselect);
  /*
   * { type: 'component', component: xxx }
   */
  VueForm.component.components.fieldComponent = vfgComponent;
  VueForm.component.components.fieldFile = FieldFile;

  export default {
    components: {
      VueForm: VueForm.component,
    },

    props: {
      schema: {},
      model: {},
      options: {},
    },

    computed: {
      vfgClasses() {
        /* size 支持
         *   sm - 150px  (default)
         *   xs - 100px
         *   lg - 225px
         */
        return this.options.labelAtLeft ? 'label-at-left' : null;
      },
    },

  };

</script>


<style lang="scss">
  body { // 增加优先级

    // 让其 显示上与其他 input 一致
    .multiselect__tags {
      border-color: #ccc;
      border-radius: 0;
      padding-top: 6px;
    }
    .multiselect__input,
    .multiselect__single {
      margin-bottom: 6px;
    }

    fieldset.vue-form-generator {
      > .form-group {
        min-height: 32px;
      }

      .radio-list {
        padding-top: 6px;
      }

      .form-group.radios-in-row {
        .radio-list {
          display: flex;
          flex-wrap: wrap;

          > label {
            margin-right: 1.5em;
          }
        }
      }
    }

    // 让表单 Label 水平居左
    .label-at-left > fieldset.vue-form-generator > .form-group {
      padding-left: 150px;
      position: relative;

      > label {
        position: absolute;
        left: 0;
        width: 135px;
        text-align: right;
        padding-top: 7px;
      }
    }
  }

</style>
