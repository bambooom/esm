<template lang="pug">
  div(:class="vfgClasses")
    fieldset.vue-form-generator(v-if='schema != null')
      template(v-for='field in fields')
        component(
          v-if="fieldVisible(field) && field.specialField",
          :is='field.component',
          :disabled='fieldDisabled(field)',
          :model='model',
          :schema.sync='field',
          @model-updated='modelUpdated',
          @validated="onFieldValidated"
        )
        .form-group(v-if='fieldVisible(field) && !field.specialField', :class='getFieldRowClasses(field)')
          label
            | {{ field.label }}
            span.help(v-if='field.help')
              i.icon
              .helpText(v-html='field.help')
          .field-wrap
            component(:is='getFieldType(field)', :disabled='fieldDisabled(field)', :model='model', :schema.sync='field', @model-updated='modelUpdated', @validated="onFieldValidated")
            .buttons(v-if='buttonVisibility(field)')
              button(v-for='btn in field.buttons', @click='btn.onclick(model, field)', :class='btn.classes') {{ btn.label }}
          .hint(v-if='field.hint') {{ field.hint }}
          .errors(v-if='fieldErrors(field).length > 0')
            span(v-for='(error, index) in fieldErrors(field)', track-by='index') {{ error }}
</template>


<script>
  import Vue from 'vue';

  require('vue-multiselect/dist/vue-multiselect.min.css');
  import Multiselect from 'vue-multiselect';

  require('vue-form-generator/dist/vfg.css');
  import vfg from 'vue-form-generator';
  import fieldComponent from './EsmForm/vfgComponent.vue';
  import fieldFile from './EsmForm/FieldFile.vue';

  Vue.component('Multiselect', Multiselect);

  const VueForm = vfg.component;

  const EsmForm = {
    components: {
      ...VueForm.components,
      fieldComponent, // { type: 'component', component: xxx }
      fieldFile,
    },

    props:  {...VueForm.props},
    data: VueForm.data,

    computed: {
      ...VueForm.computed,

      vfgClasses() {
        /* size 支持
         *   sm - 150px  (default)
         *   xs - 100px
         *   lg - 225px
         */
        return this.options.labelAtLeft ? 'label-at-left' : null;
      },
    },
    watch: {...VueForm.watch},
    mounted: VueForm.mounted,

    methods: {
      ...VueForm.methods,
    },

  };

  export default EsmForm;
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
    .label-at-left > fieldset.vue-form-generator .form-group {
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
