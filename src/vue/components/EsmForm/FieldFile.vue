<template lang="pug">
  .wrapper
    input.form-control(
      type="file",
      @change="onChange",
      :disabled="disabled",
      :accept="schema.accept",
      :alt="schema.alt",
      :dirname="schema.dirname",
      :multiple="schema.multiple",
      :name="schema.inputName",
      :placeholder="schema.placeholder",
      :readonly="schema.readonly",
      :required="schema.required",
      :width="schema.width",
      :files="schema.files"
    )
</template>

<script>
  import {abstractField} from 'vue-form-generator';


  export default {
    mixins: [abstractField],

    methods: {
      onChange(event){
        this.value = event.target.files;
      },
    },

  };

</script>
