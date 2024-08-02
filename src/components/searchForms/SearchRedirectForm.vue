<template lang="html">
  <form
    :class="`tab-${ searchKey }-search-form`"
    @submit.prevent="openSearch"
  >
    <div class="bobcat_embed_search_field">
      <span class="bobcat_embed_"><label :for="`tab-${ searchKey }-query`">Search for </label>
        <input
          :id="`tab-${ searchKey }-query`"
          :key="searchKey"
          v-model="search"
          :aria-label="inputAriaLabel"
          type="text"
          class="bobcat_embed_searchbox_textfield"
          :placeholder="searchEngineProps.placeholder"
          :aria-describedby="searchEngineProps.placeholder"
        >
      </span>

      <!-- Dropdown for selecting search scope -->
      <select v-model="selectedScope" :id="`tab-${searchKey}-scope`" class="bobcat_embed_searchbox_textfield"
        aria-label="Select search scope">
        <option value="Library catalog">Library catalog</option>
        <option value="Library catalog (excluding articles)">Library catalog (excluding articles)</option>
        <option value="Articles">Articles</option>
        <option value="NYU Avery Fisher Center (A/V materials)">NYU Avery Fisher Center (A/V materials)</option>
        <option value="NYU Special Collections">NYU Special Collections</option>
      </select>

      <span class="bobat_embed_searchbox_submit_container">
        <input
          aria-label="Search"
          class="bobcat_embed_searchbox_submit"
          name="Submit"
          type="submit"
          value="GO"
        >
      </span>
    </div>
  </form>
</template>

<script>
export default {
    name : 'GuidesSearchForm',
    props: [
        'searchKey',
        'searchFunction',
        'searchEngineProps',
        'inputAriaLabel',
    ],
    data() {
        return {
            search: '',
            selectedScope: 'Library catalog',
        };
    },
    computed: {
        searchValues() {
            return {
                search: this.search,
                ...this.searchEngineProps,
                scope: this.selectedScope,
            };
        },
    },
    methods: {
        openSearch() {
            window.open( this.searchFunction( this.searchValues ) );
        },
    },
};
</script>

<style lang="css">
</style>
