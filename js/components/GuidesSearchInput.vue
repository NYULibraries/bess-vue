<template lang="html">

  <form @submit.prevent="openSearch">
    <div class="bobcat_embed_search_field">

      <span class="bobcat_embed_"><label for="guides-query">Search for</label>
        <input
          aria-label="Search for subject guides"
          type="text"
          id="guides-query"
          class="bobcat_embed_searchbox_textfield"
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
import { guidesSearch } from '../utils/searchRedirects';

export default {
  data() {
    return {
      search: '',
    };
  },
  methods: {
    openSearch() {
      const url = guidesSearch({
        search: this.search,
      });

      window.open(url);
    }
  },
};
</script>

<style lang="css">
</style>
