<template>
  <div class="bobcat_embed">
    <div class="bobcat_embed_tabs_wrapper">
      <div class="bobcat_embed_tabs">
        <ul role="tablist">
          <tab-item
            v-for="tab in tabs"
            :key="tab.id"
            :class="tabClasses( tab )"
            :update-tab="updateTab"
            :tab="tab"
            role="tab"
          >
            {{ tab.label }}
          </tab-item>
        </ul>
      </div>
    </div>
    <div class="bobcat_embed_searchbox">
      <div class="bobcat_embed_tab_content">
        <search-form
          v-if="engine"
          :search-key="selectedTab"
          :engine="engine"
        />
        <div class="bobcat_embed_links">
          <ul>
            <li
              v-for="( html, idx ) in more"
              :key="idx"
              v-html="html"
            />
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
    components: {
        SearchForm,
        TabItem,
    },
    data() {
        return {
            selectedTab: 1,
            tabs       : this.$config.map( ( tab, idx ) => ( { id: idx + 1, ...tab } ) ),
        };
    },
    computed: {
        tabConfig() {
            return this.tabs.find( tab => tab.id === this.selectedTab );
        },
        more() {
            return this.tabConfig.more;
        },
        engine() {
            return this.tabConfig.engine;
        },
    },
    methods: {
        updateTab( event, tab ) {
            if ( !tab.open ) {
                event.preventDefault();
                this.selectedTab = tab.id;
            }
        },
        tabClasses( tab ) {
            return {
                bobcat_embed_tabs_selected: this.selectedTab === tab.id,
                bobcat_embed_tabs_first   : tab.id === 1,
                bobcat_embed_tabs_inside  : tab.id > 1 && tab.id < this.tabs.length,
                bobcat_embed_tabs_last    : tab.id === this.tabs.length,
            };
        },
    },
};
</script>

