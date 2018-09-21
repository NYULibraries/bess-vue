<template>
  <form v-on:submit.prevent="openSearch()">

    <div class="bobcat_embed_search_field">
      <!-- ENGINE: PRIMO -->
      <span v-if="engine == 'primo'" class="bobcat_embed_"><label for="query">Search for</label>
        <input type="text" name="search" class="bobcat_embed_searchbox_textfield" aria-label="Search" v-model="primoSearch" >
      </span>

      <!-- ENGINE: GETIT -->
      <div v-if="engine == 'getit'">
        <span class="bobcat_embed_journal_search_type"><label for="umlaut_title_search_type">Journal Title</label>
          <select class="sfx_title_search" aria-label="Precision operator" id="umlaut_title_search_type"  v-model="getitSearchType">
            <option v-for="searchType in searchTypeOptions" :key="searchType.value" :value="searchType.value">{{ searchType.label}}</option>
          </select>
          <input type="text" name="title" id="journal_title" class="bobcat_embed_searchbox_textfield" v-model="getitTitle">
        </span>

        <span><label for="issn">OR ISSN</label>
          <input type="text" name="issn" id="issn" class="bobcat_embed_searchbox_textfield" v-model="getitISSN" aria-label="ISSN">
        </span>
      </div>
    </div>

    <span class="bobat_embed_searchbox_submit_container">
      <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
    </span>
  </form>
</template>

<script>
import { primoSearch, getitSearch } from '../utils/searchRedirects';
const { bobcatUrl } = CONFIG;

export default {
  data() {
    return ({
      getitTitle: '',
      getitISSN: '',
      getitSearchType: 'contains',
      primoSearch: ''
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
    vid: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true
    }
  },
  computed: {
    searchTypeOptions() {
      return CONFIG.vids[this.vid].getitSearchValues[this.searchKey].searchTypes;
    },
    searchFunction() {
      return {
        primo: primoSearch,
        getit: getitSearch,
      }[this.engine];
    },
    primoValues() {
      return {
        bobcatUrl,
        vid: this.vid,
        search: this.primoSearch,
        // scope and tab values
        ...CONFIG.vids[this.vid].primoSearchValues[this.searchKey],
      };
    },
    getitValues() {
      return {
        searchType: this.getitSearchType,
        title: this.getitTitle,
        issn: this.getitISSN,
      };
    }
  },
  methods: {
    openSearch() {
      const url = this.searchFunction({
        institution: this.institution,
        ...this.primoValues,
        ...this.getitValues,
      });

      window.open(url);
    }
  },
};
</script>

<style lang="css">
</style>
