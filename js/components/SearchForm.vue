<template>
  <form v-on:submit.prevent="openSearch()">

    <div class="bobcat_embed_search_field">
      <!-- ENGINE: PRIMO -->
      <span v-if="engine == 'primo'" class="bobcat_embed_"><label for="query">Search for</label>
        <input type="text" name="search" class="bobcat_embed_searchbox_textfield" aria-label="Search" v-model="search" >
      </span>

      <!-- ENGINE: GETIT -->
      <div v-if="engine == 'getit'">
        <span class="bobcat_embed_journal_search_type"><label for="umlaut_title_search_type">Journal Title</label>
          <select class="sfx_title_search" aria-label="Precision operator" id="umlaut_title_search_type"  v-model="selectedSearchType">
            <option v-for="searchType in getitSearchValues[searchKey].searchTypes" :key="searchType.value" :value="searchType.value">{{ searchType.label}}</option>
          </select>
          <input type="text" name="title" id="journal_title" class="bobcat_embed_searchbox_textfield" v-model="title">
        </span>

        <span><label for="issn">OR ISSN</label>
          <input type="text" name="issn" id="issn" class="bobcat_embed_searchbox_textfield" v-model="issn" aria-label="ISSN">
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
      search: '',
      title: '',
      issn: '',
      getitSearchValues: CONFIG.vids[this.vid].getitSearchValues,
      primoSearchValues: CONFIG.vids[this.vid].primoSearchValues,
      selectedSearchType: 'contains',
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
    searchFunction() {
      return {
        primo: primoSearch,
        getit: getitSearch,
      }[this.engine];
    }
  },
  methods: {
    openSearch() {
      const url = this.searchFunction({
        bobcatUrl,
        search: this.search,
        title: this.title,
        issn: this.issn,
        vid: this.vid,
        institution: this.institution,
        searchType: this.selectedSearchType,
        ...this.primoSearchValues[this.searchKey]
      });

      window.open(url);
    }
  },
};
</script>

<style lang="css">
</style>
