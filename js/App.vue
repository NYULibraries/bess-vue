<template>
<div class="bobcat_embed">
  <div class="bobcat_embed_tabs_wrapper">
    <div class="bobcat_embed_tabs">
      <ul role="tablist">
        <tab-item
          v-for="tab in tabs"
          :key="tab.id"
          :class="tabClasses(tab)"
          :update-tab="updateTab"
          :tab="tab"
          role="tab"
        >{{ tab.label }}</tab-item>
      </ul>
    </div>
  </div>
  <div class="bobcat_embed_searchbox">
    <div class="bobcat_embed_tab_content">
      <search-form v-if="engine"
        :search-key="selectedTab"
        :engine="engine"
      ></search-form>
      <div class="bobcat_embed_links">
        <ul>
          <li v-for="(html, idx) in more" :key="idx" v-html="html"></li>
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
    return {
      selectedTab: 1,
      tabs: this.$config.map((tab, idx) => ({ id: idx + 1, ...tab })),
    };
  },
  computed: {
    tabConfig() {
      return this.tabs.find(tab => tab.id === this.selectedTab);
    },
    more() {
      return this.tabConfig.more;
    },
    engine() {
      return this.tabConfig.engine;
    },
  },
  components: {
    SearchForm,
    TabItem
  },
  methods: {
    updateTab(event, tab) {
      if (!tab.open) {
        event.preventDefault();
        this.selectedTab = tab.id;
      }
    },
    tabClasses(tab) {
      return {
        bobcat_embed_tabs_selected: this.selectedTab === tab.id,
        bobcat_embed_tabs_first: tab.id === 1,
        bobcat_embed_tabs_inside: tab.id > 1 && tab.id < this.tabs.length,
        bobcat_embed_tabs_last: tab.id === this.tabs.length,
      };
    },
  }
};
</script>

<style lang="scss">
@import '../scss/default';
// @import '../scss/library-nyu-edu';
// @import '../scss/library-nyuad';
// @import '../scss/library-nyush';
@include default;

.bobcat_embed_tab_content {
  clear: both;
}

// Use the below code to test styles imported above

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

// .bobcat_embed_tabs ul {
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: row;
// }

// .bobcat_embed_searchbox {
//   margin: 0 !important;
// }
</style>
