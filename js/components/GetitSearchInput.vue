<template lang="html">
  <form @submit.prevent="openSearch">
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
        <input type="text" name="title" id="journal_title" class="bobcat_embed_searchbox_textfield" v-model="title">
      </span>
      <span class="bobcat_embed_spacer"><div></div></span>
      <span><label for="issn">OR ISSN</label>
        <input type="text" name="issn" id="issn" class="bobcat_embed_searchbox_textfield" aria-label="ISSN"
        v-model="issn">
      </span>

      <span class="bobat_embed_searchbox_submit_container">
        <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
      </span>
    </div>
  </form>
</template>

<script>
import { getitSearch } from '../utils/searchRedirects';

export default {
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
      const url = getitSearch({
        ...(this.searchValues),
      });

      window.open(url);
    }
  },
  computed: {
    typeOptions() {
      return CONFIG.institutions[this.institution].getitSearchValues[this.searchKey].searchTypes;
    },
    searchValues() {
      const { type, title, issn, institution } = this;
      return {
        type,
        title,
        issn,
        institution,
      };
    },
  }
};
</script>

<style lang="scss">
</style>
