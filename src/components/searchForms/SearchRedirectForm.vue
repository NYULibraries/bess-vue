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
      <select
        :id="`tab-${ searchKey }-scope`"
        v-model="selectedScope"
        class="bobcat_embed_select_value"
        aria-label="Select search scope"
      >
        <option
          v-for="( config, scopeValue ) in scopesConfig"
          :key="scopeValue"
          :value="scopeValue"
        >
          {{ config.label }}
        </option>
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
            search       : '',
            selectedScope: 'CI_NYU_CONSORTIA',
        };
    },
    computed: {
        searchValues() {
            return {
                search: this.search,
                ...this.searchEngineProps,
                scope : this.selectedScope,
            };
        },
    },
    watch: {
        selectedScope( scope ) {
            this.updatePlaceholder( scope );
        },
    },
    created() {
        this.updatePlaceholder( this.selectedScope );
    },
    methods: {
        openSearch() {
            console.log( 'searchvalues:', this.searchValues  );
            window.open( this.searchFunction( this.searchValues ) );
        },
        updatePlaceholder( scope ) {
            const newPlaceholder = this.scopesConfig[scope]?.placeholder || '';
            if ( this.searchEngineProps.placeholder !== newPlaceholder ) {
                this.$emit( 'update:searchEngineProps', {
                    ...this.searchEngineProps,
                    placeholder: newPlaceholder,
                } );
            }
        },
    },
};
</script>

<style lang="css">
</style>
