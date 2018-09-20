<template>
<div class="bobcat_embed">
  <div class="bobcat_embed_tabs_wrapper">
    <div class="bobcat_embed_tabs">
      <ul v-for="tab in tabs" :key="tab.id">
        <li :class="isSelected(tab) ? 'selected' : ''">
          <a :href="tab.href || '#'" :title="tab.title" :alt="tab.alt" :target="tab.target" @click="event => updateTab(event, tab)">{{ tab.label }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="bobcat_embed_searchbox">
    <div class="bobcat_embed_tab_content">
      <div class="bobcat_embed_search_field" id="query">
        <search-form :search-key="searchKey" :institution="institution" :vid="vid"></search-form>
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
import searchForm from './components/SearchForm.vue';

// source: https://stackoverflow.com/a/4716930/8603212
const queryString = document.currentScript.src.replace(/^[^?]+\??/,'');
const { vid } = qs.parse(queryString);
const { bobcatUrl } = CONFIG;
const { links, advancedSearchLinks, advancedSearch, institution } = CONFIG.institutions[vid];

export default {
  data() {
    return {
      vid,
      institution,
      advancedSearchLink: advancedSearchLinks.books,
      advancedSearch,
      search: '',
      searchKey: 'books',
      tabs: [
        { id: 0, label: 'Books & More', searchKey: 'books' },
        { id: 1, label: 'Articles & Databases', searchKey: 'articles', ...links.articles },
        { id: 2, label: 'Journals', searchKey: 'journals' },
        { id: 3, label: 'Course Reserves', searchKey: 'reserves' },
      ],
    };
  },
  components: {
    searchForm
  },
  methods: {
    openPrimoSearch(search) {
      const url = primoSearch({ search, institution, vid, scope: 'all', tab: 'all', bobcatUrl });
      window.open(url, '_blank');
    },
    updateTab(event, tab) {
      if (!event.srcElement.href) {
        event.preventDefault();
        this.searchKey = tab.searchKey;
      }
    },
    isSelected(tab) {
      return this.searchKey == tab.searchKey;
    }
  },

};
</script>

<style>
.bobcat_embed {

}

.selected {
  font-weight: bold;
}
</style>
