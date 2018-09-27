<template lang="html">
  <span class="bobcat_embed_"><label for="primo-query">Search for</label>
    <input
      type="text"
      class="bobcat_embed_searchbox_textfield"
      aria-label="Search"
      id="primo-query"
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

<style lang="scss">
</style>
