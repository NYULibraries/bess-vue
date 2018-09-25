<template lang="html">
  <span class="bobcat_embed_"><label for="query">Search for</label>
    <input
      type="text"
      name="search"
      class="bobcat_embed_searchbox_textfield"
      aria-label="Search"
      :value="getitTitle"
      @input="emitUpdate"
    >
  </span>
</template>

<script>
export default {
  props: ['getitTitle'],
  methods: {
    emitUpdate($event) {
      this.$emit('input', $event.target.value);
    }
  }
};
</script>

<style lang="css">
</style>
