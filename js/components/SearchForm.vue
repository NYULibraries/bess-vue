<template>
  <form v-on:submit.prevent="openSearch()">

    <div class="bobcat_embed_search_field">
      <span v-if="['books', 'reserves'].indexOf(searchKey) >= 0" class="bobcat_embed_"><label for="query">Search for</label>
        <input type="text" name="search" class="bobcat_embed_searchbox_textfield" aria-label="Search" v-model="search" >
      </span>

      <div v-if="searchKey == 'journals'">
        <span><label for="title">Journal Title</label>
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
import { primoSearch, getItSearch } from '../utils/searchRedirects';
const { bobcatUrl } = CONFIG;


export default {
  data() {
    return ({
      search: '',
      title: '',
      issn: '',
    });
  },
  props: {
    searchKey: {
      type: String,
      required: true,
    },
    vid: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true
    },
  },
  methods: {
    openSearch() {
      const searchFunction = {
        books: primoSearch({ tab: 'all', scope: 'all', bobcatUrl }),
        journals: getItSearch,
        reserves: primoSearch({ tab: 'reserves', scope: 'bobstcr', bobcatUrl })
      }[this.searchKey];

      const url = searchFunction({
        search: this.search,
        title: this.title,
        issn: this.issn,
        vid: this.vid,
        institution: this.institution,
        searchType: 'contains'
      });

      window.open(url);
    }
  },
};
</script>

<style lang="css">
</style>
