<template lang="pug">
  .form-group(:class='getFieldRowClasses(field)', :is="tag")
    label
      | {{ field.label }}
      span.help(v-if='field.help')
        i.icon
        .helpText(v-html='field.help')
    .field-wrap
      slot
      .buttons(v-if='buttonVisibility(field)')
        button(v-for='btn in field.buttons', @click='btn.onclick(model, field)', :class='btn.classes') {{ btn.label }}
    .hint(v-if='field.hint') {{ field.hint }}
    .errors(v-if='errors.length > 0')
      span(v-for='(error, index) in errors', track-by='index') {{ error }}
</template>


<script>
  import {each, isArray, isString, isFunction, isNil} from 'lodash';

  export default {
    props: {
      field: Object,
      errors: {
        type: Array,
        default() {
          return [];
        },
      },
      tag: {
        default: 'div',
      },
    },

    data () {
      return {
      };
    },

    computed: {
    },

    methods: {
      getFieldRowClasses(field) {
        let baseClasses = {
          error: this.errors.length > 0,
          required: this.fieldRequired(field),
        };

        if (isArray(field.styleClasses)) {
          each(field.styleClasses, (c) => baseClasses[c] = true);
        } else if (isString(field.styleClasses)) {
          baseClasses[field.styleClasses] = true;
        }

        return baseClasses;
      },

      fieldRequired(field) {
        if (isFunction(field.required))
          return field.required.call(this, this.model, field, this);

        if (isNil(field.required))
          return false;

        return field.required;
      },

      buttonVisibility(field) {
        return field.buttons && field.buttons.length > 0;
      },

    },
  };

</script>
