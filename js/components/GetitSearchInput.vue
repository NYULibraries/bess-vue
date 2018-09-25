<template lang="html">
  <div>
    <span class="bobcat_embed_journal_search_type"><label for="umlaut_title_search_type">Journal Title</label>
      <select class="sfx_title_search" aria-label="Precision operator" id="umlaut_title_search_type" @change="emitUpdate" name="type">
        <option v-for="option in typeOptions" :key="option.value" :value="option.value">{{ option.label}}</option>
      </select>
      <input type="text" name="title" id="journal_title" class="bobcat_embed_searchbox_textfield" @input="emitUpdate">
    </span>

    <span><label for="issn">OR ISSN</label>
      <input type="text" name="issn" id="issn" class="bobcat_embed_searchbox_textfield" aria-label="ISSN"
      @input="emitUpdate"
      >
    </span>
  </div>
</template>

<script>
export default {
  computed: {

  },
  props: ['title', 'issn', 'type', 'typeOptions'],
  methods: {
    emitUpdate($event) {
      this.$emit('updateGetitForm', $event.target.name, $event.target.value);
    },
  }
};
</script>

<style lang="css">
</style>
