<template>
<div class="bobcat_embed">
  <div class="bobcat_embed_tabs_wrapper">
    <div class="bobcat_embed_tabs">
      <ul v-for="tab in tabs" :key="tab.searchKey">
        <li :class="selectedClass(tab)">
          <a :href="tab.href || '#'"
            :title="tab.title"
            :alt="tab.alt"
            :target="tab.target"
            @click="updateTab($event, tab)">{{ tab.label }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="bobcat_embed_searchbox">
    <div class="bobcat_embed_tab_content">
      <div class="bobcat_embed_search_field" id="query">
        <search-form :search-key="searchKey" :engine="engine" :institution="institution" :vid="vid"></search-form>
      </div>

      <div class="bobcat_embed_links">
        <ul v-for="link in links" :key="link.label">
          <li>
            <a target="_blank" :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import qs from 'query-string';
import searchForm from './components/SearchForm.vue';

// source: https://stackoverflow.com/a/4716930/8603212
const queryString = document.currentScript.src.replace(/^[^?]+\??/,'');
const { vid } = qs.parse(queryString);
const { tabs, institution, tabsList, tabLinks } = CONFIG.vids[vid];

export default {
  data() {
    return {
      vid,
      institution,
      search: '',
      searchKey: 'books',
      tabs: tabsList.map(searchKey => ({ searchKey, ...tabs[searchKey] }))
    };
  },
  computed: {
    links() {
      return tabLinks[this.searchKey];
    },
    engine() {
      return tabs[this.searchKey].engine;
    }
  },
  components: {
    searchForm
  },
  methods: {
    updateTab(event, tab) {
      if (!tab.href) {
        event.preventDefault();
        this.searchKey = tab.searchKey;
      }
    },
    selectedClass(tab) {
      return this.searchKey === tab.searchKey ? 'bobcat_embed_tabs_selected' : '';
    },
  }
};
</script>

<style>
.bobcat_embed {

}

.bobcat_embed_tabs_selected {
  font-weight: bold;
}
</style>
