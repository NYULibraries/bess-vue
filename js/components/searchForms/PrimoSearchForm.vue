<template lang="html">
  <form @submit.prevent="openSearch" class="primo-search-form">
    <div class="bobcat_embed_search_field">
      <span class="bobcat_embed_"><label for="primo-query">Search for</label>
        <input
          type="text"
          class="bobcat_embed_searchbox_textfield"
          aria-label="Search"
          id="primo-query"
          v-model="search"
        >
      </span>

      <submit-button></submit-button>
    </div>
  </form>
</template>

<script>
import { primoSearch } from '../../utils/searchRedirects';
import SubmitButton from './components/SubmitButton.vue';

export default {
  name: "primo-search-form",
  data() {
    return {
      search: '',
    };
  },
  props: ['institution', 'searchKey'],
  methods: {
    openSearch() {
      window.open(primoSearch(this.searchValues));
    }
  },
  components: {
    SubmitButton,
  },
  computed: {
    searchValues() {
      return {
        search: this.search,
        institution: this.institution,
        ...CONFIG.institutions[this.institution].primoSearchValues[this.searchKey],
      };
    },
  }
};
</script>

<style lang="scss">
</style>
