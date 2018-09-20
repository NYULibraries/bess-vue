<template>
<div class="bobcat_embed">
  <div class="bobcat_embed_tabs_wrapper">
    <div class="bobcat_embed_tabs">
      <!-- TABS GO HERE -->
    </div>
  </div>
  <div class="bobcat_embed_searchbox">
    <div class="bobcat_embed_tab_content">
      <div class="bobcat_embed_search_field" id="query">
        <form v-on:submit.prevent="openPrimoSearch(search)">
          <span class="bobcat_embed_"><label for="query">Search for</label>
            <input type="text" name="search" class="bobcat_embed_searchbox_textfield" v-model="search" >
          </span>

          <span class="bobat_embed_searchbox_submit_container">
            <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
          </span>
        </form>
      </div>

      <div class="bobcat_embed_links">
        <ul>
          <li v-if="advancedSearch">
            <a target="_blank" :href="advancedSearchLink">Advanced search</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import qs from 'query-string';
import { primoSearch } from './utils/searchRedirects';

// source: https://stackoverflow.com/a/4716930/8603212
const queryString = document.currentScript.src.replace(/^[^?]+\??/,'');
const { vid } = qs.parse(queryString);
const { bobcatUrl } = CONFIG;
const { links, advancedSearchLinks, advancedSearch, institution } = CONFIG.institutions[vid];

export default {
  data() {
    return {
      links,
      advancedSearchLink: advancedSearchLinks.books,
      advancedSearch,
      search: '',
    };
  },
  components: {},
  methods: {
    openPrimoSearch(search) {
      const url = primoSearch({ search, institution, vid, scope: 'all', tab: 'all', bobcatUrl });
      window.open(url, '_blank');
    }
  },

};
</script>

<style>
.bobcat_embed {

}
</style>
