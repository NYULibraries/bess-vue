<template>

  <primo-search-input
  v-if="engine==='primo'"
  :institution="institution"
  :searchKey="searchKey"
  ></primo-search-input>

  <form v-else v-on:submit.prevent="openSearch()">
    <div class="bobcat_embed_search_field">
      <getit-search-input
      v-if="engine==='getit'"
      :title="getitSearchValues.title"
      :issn="getitSearchValues.issn"
      :type="getitSearchValues.type"
      :typeOptions="typeOptions"
      @updateGetitForm="updateGetitForm"
      ></getit-search-input>

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
import { primoSearch, getitSearch, guidesSearch } from '../utils/searchRedirects';
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
      primoSearchValues: {
        search: '',
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
        primo: primoSearch,
        getit: getitSearch,
        guides: guidesSearch,
      }[this.engine];
    },
    searchValues() {
      return {
        primo: {
          ...this.primoSearchValues,
          // Bobcat search parameters
          ...CONFIG.institutions[this.institution].primoSearchValues[this.searchKey],
        },
        getit: {
          ...this.getitSearchValues
        },
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
    updateGetitForm(param, value) {
      if (this.getitSearchValues[param] !== undefined) {
        this.getitSearchValues[param] = value;
      }
    }
  },
};
</script>

<style lang="scss">
</style>
