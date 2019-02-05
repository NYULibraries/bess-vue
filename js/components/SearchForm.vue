<template>
  <search-redirect-form
    v-if="isEngineType('primo', 'guides')"
    :search-key="searchKey"
    :search-function="searchFunction"
    :search-engine-props="engine"
    :input-aria-label="inputAriaLabel"
  ></search-redirect-form>

  <getit-search-form
    v-else-if="isEngineType('getit')"
    :search-key="searchKey"
    :search-engine-props="engine"
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
    'engine'
  ],
  components: {
    SearchRedirectForm,
    GetitSearchForm,
  },
  methods: {
    isEngineType(...engineNames) {
      return engineNames.indexOf(this.engineType) > -1;
    }
  },
  computed: {
    engineType() {
      return this.engine && this.engine.type;
    },
    searchFunction() {
      const fxns = {
        primo: primoSearch,
        guides: guidesSearch,
        getit: getitSearch
      };

      return fxns[this.engineType];
    },
    inputAriaLabel() {
      const labels = {
        primo: `Search Bobcat`,
        guides: `Search for subject guides`,
      }

      return labels[this.engineType];
    }
  }
};
</script>

<style lang="scss">
</style>
