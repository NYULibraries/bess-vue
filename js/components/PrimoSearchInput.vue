<template lang="html">
  <form @submit.prevent="openSearch">
    <div class="bobcat_embed_search_field">
      <span class="bobcat_embed_"><label for="primo-query">Search for</label>
        <input
          type="text"
          class="bobcat_embed_searchbox_textfield"
          aria-label="Search"
          id="primo-query"
          v-model="search"
        >
      </span>

      <span class="bobat_embed_searchbox_submit_container">
        <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
      </span>
    </div>
  </form>
</template>

<script>
import { primoSearch } from '../utils/searchRedirects';

export default {
  data() {
    return {
      search: '',
    };
  },
  props: ['institution', 'searchKey'],
  methods: {
    openSearch() {
      const url = primoSearch({
        ...this.searchValues,
      });

      window.open(url);
    }
  },
  computed: {
    searchValues() {
      return {
        search: this.search,
        institution: this.institution,
        ...CONFIG.institutions[this.institution].primoSearchValues[this.searchKey],
      };
    },
  }
};
</script>

<style lang="scss">
</style>
