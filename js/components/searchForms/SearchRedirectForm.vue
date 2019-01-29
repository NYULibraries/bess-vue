<template lang="html">
  <form @submit.prevent="openSearch" :class="`${searchKey}-search-form`">
    <div class="bobcat_embed_search_field">
      <span class="bobcat_embed_"><label :for="`${searchKey}-query`">Search for</label>
        <input
          :aria-label="inputAriaLabel"
          type="text"
          :id="`${searchKey}-query`"
          class="bobcat_embed_searchbox_textfield"
          v-model="search"
          :key="searchKey"
        >
      </span>

      <span class="bobat_embed_searchbox_submit_container">
        <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
      </span>
    </div>
  </form>
</template>

<script>

export default {
  name: "guides-search-form",
  data() {
    return {
      search: '',
    };
  },
  props: [
    'searchKey',
    'searchFunction',
    'searchEngineProps',
    'inputAriaLabel',
  ],
  methods: {
    openSearch() {
      window.open(this.searchFunction(this.searchValues));
    }
  },
  computed: {
    searchValues() {
      return {
        search: this.search,
        ...this.searchEngineProps,
      };
    },
  },
};
</script>

<style lang="css">
</style>
