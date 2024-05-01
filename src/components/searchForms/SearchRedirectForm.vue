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
        };
    },
    computed: {
        searchValues() {
            return {
                search: this.search,
                ...this.searchEngineProps,
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
