<template>
  <primo-search-input
    v-if="engine==='primo'"
    :institution="institution"
    :searchKey="searchKey"
  ></primo-search-input>

  <getit-search-input
    v-else-if="engine==='getit'"
    :institution="institution"
    :searchKey="this.searchKey"
  ></getit-search-input>

  <guides-search-input
    v-else-if="engine==='guides'"
  ></guides-search-input>
</template>

<script>
import PrimoSearchInput from './PrimoSearchInput.vue';
import GetitSearchInput from './GetitSearchInput.vue';
import GuidesSearchInput from './GuidesSearchInput.vue';

export default {
  props: [
    'searchKey',
    'institution',
    'engine',
  ],
  components: {
    PrimoSearchInput,
    GetitSearchInput,
    GuidesSearchInput
  },
};
</script>

<style lang="scss">
</style>
