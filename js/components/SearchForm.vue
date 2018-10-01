<template>

  <primo-search-input
    v-if="engine==='primo'"
    :institution="institution"
    :searchKey="searchKey"
  ></primo-search-input>

  <getit-search-input
    v-else-if="engine==='getit'"
    :institution="institution"
    :typeOptions="typeOptions"
  ></getit-search-input>

  <form v-else v-on:submit.prevent="openSearch()">
    <div class="bobcat_embed_search_field">

      <guides-search-input
      v-if="engine==='guides'"
      v-model="guideSearchValues.search"
      ></guides-search-input>

      <span class="bobat_embed_searchbox_submit_container">
        <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
      </span>
    </div>
  </form>
</template>

<script>
import { guidesSearch } from '../utils/searchRedirects';
import PrimoSearchInput from './PrimoSearchInput.vue';
import GetitSearchInput from './GetitSearchInput.vue';
import GuidesSearchInput from './GuidesSearchInput.vue';

export default {
  data() {
    return ({
      getitSearchValues: {
        title: '',
        issn: '',
        type: 'contains',
      },
      guideSearchValues: {
        search: '',
      }
    });
  },
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
  computed: {
    typeOptions() {
      return CONFIG.institutions[this.institution].getitSearchValues[this.searchKey].searchTypes;
    },
    searchFunction() {
      return {
        guides: guidesSearch,
      }[this.engine];
    },
    searchValues() {
      return {
        guides: {
          ...this.guideSearchValues
        },
      }[this.engine];
    },
  },
  methods: {
    openSearch() {
      const url = this.searchFunction({
        institution: this.institution,
        ...(this.searchValues),
      });

      window.open(url);
    },
  },
};
</script>

<style lang="scss">
</style>
