<template lang="html">
  <div class="bobcat_embed_search_field">
    <span class="bobcat_embed_"><label for="query">Search for</label>
      <input
        aria-label="Search for subject guides"
        type="text"
        name="query"
        class="bobcat_embed_searchbox_textfield"
        :value="value"
        @input="emitUpdate"
      >
    </span>
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    emitUpdate($event) {
      this.$emit('input', $event.target.value);
    }
  }
};
</script>

<style lang="css">
</style>
