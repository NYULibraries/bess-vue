<template lang="html">
  <div class="bobcat_embed_search_field">
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
  </div>
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

<style lang="scss">
</style>
