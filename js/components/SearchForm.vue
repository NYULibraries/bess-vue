<template>
  <form v-on:submit.prevent="openSearch()">
    <div class="bobcat_embed_search_field">
      <primo-search-input
        v-if="engine==='primo'"
        v-model="primoSearchValues.search"
      ></primo-search-input>

      <getit-search-input
        v-if="engine==='getit'"
        :title="getitSearchValues.title"
        :issn="getitSearchValues.issn"
        :type="getitSearchValues.type"
        :typeOptions="typeOptions"
        @updateGetitForm="updateGetitForm"
      ></getit-search-input>
    </div>

    <span class="bobat_embed_searchbox_submit_container">
      <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
    </span>
  </form>
</template>

<script>
import { primoSearch, getitSearch } from '../utils/searchRedirects';
import PrimoSearchInput from './PrimoSearchInput.vue';
import GetitSearchInput from './GetitSearchInput.vue';

export default {
  data() {
    return ({
      getitSearchValues: {
        title: '',
        issn: '',
        type: 'contains',
      },
      primoSearchValues: {
        search: ''
      }
    });
  },
  props: {
    searchKey: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
      required: false,
    },
    institution: {
      type: String,
      required: true
    }
  },
  components: {
    PrimoSearchInput,
    GetitSearchInput
  },
  computed: {
    typeOptions() {
      return CONFIG.institutions[this.institution].getitSearchValues[this.searchKey].searchTypes;
    },
    searchFunction() {
      return {
        primo: primoSearch,
        getit: getitSearch,
      }[this.engine];
    },
    primoValues() {
      return {
        ...this.primoSearchValues,
        // Bobcat search parameters
        ...CONFIG.institutions[this.institution].primoSearchValues[this.searchKey],
      };
    },
    getitValues() {
      return {...this.getitSearchValues};
    }
  },
  methods: {
    openSearch() {
      const url = this.searchFunction({
        institution: this.institution,
        ...(this.engine == 'primo' ? this.primoValues : {}),
        ...(this.engine == 'getit' ? this.getitValues : {}),
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
