<template lang="html">
  <span class="bobcat_embed_"><label for="guides-query">Search for</label>
    <input
      aria-label="Search for subject guides"
      type="text"
      id="guides-query"
      class="bobcat_embed_searchbox_textfield"
      :value="value"
      @input="emitUpdate"
    >
  </span>
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
