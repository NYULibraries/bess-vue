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
          <option v-for="option in searchEngineProps.searchTypes" :key="option.value" :value="option.value">{{ option.label}}</option>
        </select>
        <input type="text" name="title" id="journal_title" class="bobcat_embed_searchbox_textfield" v-model="title" :key="searchKey" aria-label="Title">
      </span>
      <span class="bobcat_embed_spacer"><div></div></span>
      <span><label for="issn">OR ISSN</label>
        <input
          type="text"
          name="issn"
          id="issn"
          class="bobcat_embed_searchbox_textfield"
          aria-label="ISSN"
          v-model="issn"
          :key="searchKey">
      </span>

      <span class="bobat_embed_searchbox_submit_container">
        <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
      </span>
    </div>
  </form>
</template>

<script>
export default {
  name: "getit-search-form",
  data() {
    return {
      type: 'contains',
      title: '',
      issn: '',
    };
  },
  props: [
    'searchKey',
    'searchEngineProps',
    'searchFunction',
  ],
  methods: {
    openSearch() {
      window.open(this.searchFunction(this.searchValues));
    }
  },
  computed: {
    searchValues() {
      return {
        ...this.$data,
        ...this.searchEngineProps,
      };
    },
  }
};
</script>

<style lang="scss">
</style>
