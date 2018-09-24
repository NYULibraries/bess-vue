<template lang="html">
  <span class="bobcat_embed_"><label for="query">Search for</label>
    <input
      type="text"
      name="search"
      class="bobcat_embed_searchbox_textfield"
      aria-label="Search"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  </span>
</template>

<script>
export default {
  props: {
    vid: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    }
  }
};
</script>

<style lang="css">
</style>
