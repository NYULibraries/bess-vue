<template>
  <form v-on:submit.prevent="openSearch(search)">
    <span class="bobcat_embed_"><label for="query">Search for</label>
      <input type="text" name="search" class="bobcat_embed_searchbox_textfield" v-model="search" >
    </span>

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
    openSearch(search) {
      const searchFunction = {
        books: primoSearch({ tab: 'all', scope: 'all', bobcatUrl }),
        journals: getItSearch,
      }[this.searchKey];

      const url = searchFunction({
        search,
        title: search,
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
