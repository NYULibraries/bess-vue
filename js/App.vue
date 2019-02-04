<template>
<div class="bobcat_embed">
  <div class="bobcat_embed_tabs_wrapper">
    <div class="bobcat_embed_tabs">
      <ul role="tablist">
        <tab-item
          v-for="(tab, idx) in tabs"
          :key="tab.key"
          :class="tabClasses(tab, idx)"
          :update-tab="updateTab"
          :tab="tab"
          role="tab"
        >{{ tab.label }}</tab-item>
      </ul>
    </div>
  </div>
  <div class="bobcat_embed_searchbox">
    <div class="bobcat_embed_tab_content">
      <search-form
        :search-key="selectedTab"
        :engine="engine"
        :key="selectedTab"
      ></search-form>
      <div class="bobcat_embed_links">
        <ul>
          <li v-for="link in links" :key="link.label">
            <a target="_blank" :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SearchForm from './components/SearchForm.vue';
import TabItem from './components/TabItem.vue';

export default {
  data() {
    const { tabs } = this.$config;
    return {
      selectedTab: tabs[0].key,
      tabs,
    };
  },
  computed: {
    links() {
      return this.$config.tabLinks[this.selectedTab];
    },
    engine() {
      return this.$config.tabs.find(tab => this.selectedTab === tab.key).engine;
    },
  },
  components: {
    SearchForm,
    TabItem
  },
  methods: {
    updateTab(event, tab) {
      if (!tab.href) {
        event.preventDefault();
        this.selectedTab = tab.key;
      }
    },
    tabClasses(tab, idx) {
      return {
        bobcat_embed_tabs_selected: this.selectedTab === tab.key,
        bobcat_embed_tabs_first: idx === 0,
        bobcat_embed_tabs_inner: idx > 0 && idx < this.tabs.length - 1,
        bobcat_embed_tabs_last: idx === this.tabs.length - 1,
      };
    },
  }
};
</script>

<style lang="scss">
// @import '../css/default';
// @import '../css/library-nyu-edu';
// @import '../css/library-nyuad';
// @import '../css/library-nyush';

// @include default;
// section[id=nyu] {
//   @include library-nyu-edu;
// }
// section[id=nyuad] {
//   @include nyuad;
// }
// section[id=nyush] {
//   @include default;
//   @include nyush;
// }
</style>
