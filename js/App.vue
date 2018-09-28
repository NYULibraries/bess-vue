<template>
<div class="bobcat_embed">
  <div class="bobcat_embed_tabs_wrapper">
    <div class="bobcat_embed_tabs">
      <ul role="tablist">
        <li v-for="tab in tabs" :key="tab.searchKey" :class="tabClasses(tab)" role="tab">
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
    tabClasses(tab) {
      const idx = tabsList.indexOf(tab.searchKey);
      const klasses = {
        selected: this.searchKey === tab.searchKey,
        first: idx === 0,
        last: idx === tabsList.length - 1,
        inner: idx > 0 && idx < tabsList.length - 1
      };

      return Object.keys(klasses).reduce((acc, klass) =>
        klasses[klass] ? [...acc, `bobcat_embed_tabs_${klass}`] : acc
      , []);
    },
  }
};
</script>

<style lang="scss">
@import '../css/default.css';
</style>
