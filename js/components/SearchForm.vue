<template>
  <search-redirect-form
    :search-key="searchKey"
    :search-function="searchFunction"
    :search-engine-props="engine"
    :input-aria-label="inputAriaLabel"
  ></search-redirect-form>
</template>

<script>
import SearchRedirectForm from './searchForms/SearchRedirectForm.vue';
import { primoSearch, guidesSearch } from '../utils/searchRedirects';

export default {
  props: [
    'searchKey',
    'engine'
  ],
  components: {
    SearchRedirectForm,
  },
  computed: {
    engineType() {
      return this.engine && this.engine.type;
    },
    searchFunction() {
      const fxns = {
        primo: primoSearch,
        guides: guidesSearch,
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
