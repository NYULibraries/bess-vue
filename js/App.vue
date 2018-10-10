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
            @click="updateTab($event, tab)"
          >{{ tab.label }}</a>
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
import searchForm from './components/SearchForm.vue';

export default {
  data() {
    const { tabs, tabsList, tabLinks } = this.$config;
    return {
      searchKey: 'books',
      tabLinks,
      tabsList,
      tabs: tabsList.map(searchKey => ({ searchKey, ...tabs[searchKey] })),
    };
  },
  computed: {
    links() {
      return this.tabLinks[this.searchKey];
    },
    engine() {
      return this.tabs.find(({ searchKey }) => this.searchKey === searchKey).engine;
    }
  },
  props: ['institution'],
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
      const idx = this.tabsList.indexOf(tab.searchKey);
      return {
        bobcat_embed_tabs_selected: this.searchKey === tab.searchKey,
        bobcat_embed_tabs_first: idx === 0,
        bobcat_embed_tabs_last: idx === this.tabsList.length - 1,
        bobcat_embed_tabs_inner: idx > 0 && idx < this.tabsList.length - 1
      };
    },
  }
};
</script>

<style lang="scss">
@import '../css/default.css';
// @import '../css/library-nyuad.css';
// @import '../css/library-nyu-edu.scss';
// @import '../css/library-nyush';
</style>
