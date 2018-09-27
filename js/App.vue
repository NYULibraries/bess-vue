<template>
<div class="bobcat_embed">
  <div class="bobcat_embed_tabs_wrapper">
    <div class="bobcat_embed_tabs">
      <ul v-for="tab in tabs" :key="tab.searchKey">
        <li :class="tabClass(tab)">
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
      <search-form v-if="engine" :search-key="searchKey" :engine="engine" :institution="institution"></search-form>
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
const { institution } = qs.parse(queryString);
const { tabs, tabsList, tabLinks } = CONFIG.institutions[institution];

export default {
  data() {
    return {
      institution,
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
    tabClass(tab) {
      let klass = '';
      const idx = tabsList.indexOf(tab.searchKey);

      klass += this.searchKey === tab.searchKey ? ' bobcat_embed_tabs_selected' : '';
      klass += idx === 0 ? ' bobcat_embed_tabs_first' : '';
      klass += idx === tabsList.length - 1 ? ' bobcat_embed_tabs_last' : '';
      klass += idx > 0 && idx < tabsList.length - 1 ? ' bobcat_embed_tabs_inner' : '';

      return klass;
    },
  }
};
</script>

<style lang="scss">
@import '../css/default.css';
</style>
