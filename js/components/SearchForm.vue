<template>
  <primo-search-form
    v-if="isEngine('primo')"
    :institution="institution"
    :searchKey="searchKey"
  ></primo-search-form>

  <getit-search-form
    v-else-if="isEngine('getit')"
    :institution="institution"
    :searchKey="this.searchKey"
  ></getit-search-form>

  <guides-search-form
    v-else-if="isEngine('guides')"
    :institution="institution"
    :searchKey="searchKey"
  ></guides-search-form>
</template>

<script>
import PrimoSearchForm from './searchForms/PrimoSearchForm.vue';
import GetitSearchForm from './searchForms/GetitSearchForm.vue';
import GuidesSearchForm from './searchForms/GuidesSearchForm.vue';

export default {
  props: [
    'searchKey',
    'institution',
    'engine',
  ],
  components: {
    PrimoSearchForm,
    GetitSearchForm,
    GuidesSearchForm
  },
  methods: {
    isEngine(engineName) {
      return engineName === this.engine;
    }
  }
};
</script>

<style lang="scss">
</style>
