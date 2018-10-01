<template lang="html">

  <form @submit.prevent="openSearch" class="guides-search-form">
    <div class="bobcat_embed_search_field">

      <span class="bobcat_embed_"><label for="guides-query">Search for</label>
        <input
          aria-label="Search for subject guides"
          type="text"
          id="guides-query"
          class="bobcat_embed_searchbox_textfield"
          v-model="search"
          :key="searchKey"
        >
      </span>

      <submit-button></submit-button>
    </div>
  </form>
</template>

<script>
import { guidesSearch } from '../../utils/searchRedirects';
import SubmitButton from './components/SubmitButton.vue';

export default {
  name: "guides-search-form",
  data() {
    return {
      search: '',
    };
  },
  components: {
    SubmitButton,
  },
  props: ['searchKey', 'institution'],
  methods: {
    openSearch() {
      window.open(guidesSearch(this.searchValues));
    }
  },
  computed: {
    searchValues() {
      return { search: this.search };
    },
  },
};
</script>

<style lang="css">
</style>
