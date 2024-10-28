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
          :placeholder="placeholder"
          :aria-describedby="placeholder"
        >
      </span>

      <!-- Dropdown for selecting search scope -->
      <select
        v-if="ui.searchScopeDropdown"
        :id="`tab-${ searchKey }-scope`"
        v-model="selectedSearchScope"
        class="bobcat_embed_select_value"
        aria-label="Select search scope"
      >
        <option
          v-for="( searchScopeOption ) in ui.searchScopeDropdown.options"
          :key="searchScopeOption.value"
          :value="searchScopeOption.value"
        >
          {{ searchScopeOption.label }}
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
    props: {
        inputAriaLabel: {
            type    : String,
            required: true,
        },
        searchEngineProps: {
            type   : Object,
            default: undefined,
        },
        searchFunction: {
            type   : Function,
            default: undefined,
        },
        searchKey: {
            type    : String,
            required: true,
        },
        ui: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            search             : '',
            selectedSearchScope: this.ui.searchScopeDropdown?.defaultOption || this.searchEngineProps?.scope,
        };
    },
    computed: {
        placeholder() {
            if ( !this.ui.searchScopeDropdown ) {
                return undefined;
            }

            return this.option( this.selectedSearchScope )?.placeholder;
        },
        searchValues() {
            return {
                search: this.search,
                ...this.searchEngineProps,
                scope : this.selectedSearchScope,
            };
        },
    },
    watch: {
        // Get new search scope when user changes tabs.
        searchEngineProps( newValue ) {
            if ( newValue?.scope ) {
                this.selectedSearchScope = newValue.scope;
            }
        },
    },
    methods: {
        openSearch() {
            window.open( this.searchFunction( this.searchValues ) );
        },
        option() {
            return this.ui.searchScopeDropdown.options.find(
                option => {
                    return option.value === this.selectedSearchScope;
                },
            );
        },
    },
};
</script>

<style lang="css">
</style>
