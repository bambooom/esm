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
    )
    ul(v-if="showFileNames")
      li(v-for="file in filesInfo") {{ file.name }}
</template>

<script>
  import {map} from 'lodash';
  import {abstractField} from 'vue-form-generator';

  import {processFiles} from './utils';

  /*
   * field: {
   *   type: 'file',
   *   multiple: false,
   *   showFileNames: false,
   *   base64Content: false,    // value = base64 ? {name, content, size, type}[] : File[]
   * }
   */

  export default {
    mixins: [abstractField],

    data() {
      return {
        filesInfo: null,
      };
    },

    computed: {
      base64Content() {
        let {base64Content = false} = this.schema;
        return !!base64Content;
      },

      showFileNames() {
        let {showFileNames = false} = this.schema;
        return !!showFileNames;
      },

      hasFiles() {
        return this.files && this.files.length > 0;
      },
    },

    watch: {
      base64Content() {
        this.updateValue();
      },
    },

    methods: {
      onChange(event){
        this.files = event.target.files;
        this.filesInfo = map(this.files, ({name}) => ({name}));

        this.updateValue();
      },

      updateValue() {
        if (this.hasFiles) {
          if (!this.base64Content) {
            this.value = this.files;
          } else {
            processFiles(this.files, {fillName: false})
              .then(
                filesInfo => {
                  this.value = map(filesInfo, ({name, dataURL: content, size, type}) => ({
                    name,
                    content,
                    size,
                    type,
                  }));
                }
              );
          }
        } else {
          this.value = null;
        }
      },
    },

    created() {
      this.files = [];
    },
  };

</script>
