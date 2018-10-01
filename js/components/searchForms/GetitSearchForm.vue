<template lang="html">
  <form @submit.prevent="openSearch" class="getit-search-form">
    <div class="bobcat_embed_search_field">
      <span class="bobcat_embed_journal_search_type"><label for="umlaut_title_search_type">Journal Title</label>
        <select
        class="sfx_title_search"
        aria-label="Precision operator"
        id="umlaut_title_search_type"
        name="type"
        v-model="type"
        >
          <option v-for="option in typeOptions" :key="option.value" :value="option.value">{{ option.label}}</option>
        </select>
        <input type="text" name="title" id="journal_title" class="bobcat_embed_searchbox_textfield" v-model="title" :key="searchKey">
      </span>
      <span class="bobcat_embed_spacer"><div></div></span>
      <span><label for="issn">OR ISSN</label>
        <input type="text" name="issn" id="issn" class="bobcat_embed_searchbox_textfield" aria-label="ISSN"
        v-model="issn" :key="searchKey">
      </span>

      <submit-button></submit-button>
    </div>
  </form>
</template>

<script>
import { getitSearch } from '../../utils/searchRedirects';
import SubmitButton from './components/SubmitButton.vue';

export default {
  name: "getit-search-form",
  data() {
    return {
      type: 'contains',
      title: '',
      issn: '',
    };
  },
  props: ['institution', 'searchKey'],
  methods: {
    openSearch() {
      window.open(getitSearch(this.searchValues));
    }
  },
  components: {
    SubmitButton
  },
  computed: {
    typeOptions() {
      return CONFIG.institutions[this.institution].getitSearchValues[this.searchKey].searchTypes;
    },
    searchValues() {
      const { type, title, issn, institution } = this;
      return { type, title, issn, institution };
    },
  }
};
</script>

<style lang="scss">
</style>
