<template>
  <search-redirect-form
    v-if="isEngine('primo', 'guides')"
    :search-key="searchKey"
    :search-function="searchFunction"
    :search-engine-props="searchEngineProps"
    :input-aria-label="inputAriaLabel"
  ></search-redirect-form>

  <getit-search-form
    v-else-if="isEngine('getit')"
    :search-key="searchKey"
    :search-engine-props="searchEngineProps"
    :search-function="searchFunction"
  ></getit-search-form>
</template>

<script>
import GetitSearchForm from './searchForms/GetitSearchForm.vue';
import SearchRedirectForm from './searchForms/SearchRedirectForm.vue';
import { primoSearch, guidesSearch, getitSearch } from '../utils/searchRedirects';

export default {
  props: [
    'searchKey',
    'engine',
  ],
  components: {
    SearchRedirectForm,
    GetitSearchForm,
  },
  methods: {
    isEngine(...engineNames) {
      return engineNames.indexOf(this.engine) > -1;
    }
  },
  computed: {
    searchFunction() {
      const fxns = {
        primo: primoSearch,
        guides: guidesSearch,
        getit: getitSearch
      };

      return fxns[this.engine];
    },
    searchEngineProps() {
      return this.$config.engineValues[this.engine][this.searchKey];
    },
    inputAriaLabel() {
      const labels = {
        primo: `Search Bobcat`,
        guides: `Search for subject guides`,
      }

      return labels[this.engine];
    }
  }
};
</script>

<style lang="scss">
</style>
