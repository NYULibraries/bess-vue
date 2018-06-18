<template>
<div class="bobcat_embed" id="bobcat_embed_9e6fa4b027">
  <div class="bobcat_embed_tabs_wrapper" id="bobcat_embed_tabs_wrapper_9e6fa4b027">
    <div class="bobcat_embed_tabs" id="bobcat_embed_tabs_9e6fa4b027">
      <links-list :links="links"></links-list>
    </div>
  </div>
  <div class="bobcat_embed_searchbox" id="bobcat_embed_searchbox_9e6fa4b027">
    <div class="bobcat_embed_tab_content bobcat_embed_tab_content_9e6fa4b027" id="bobcat_embed_tab_content_all_9e6fa4b027">
      <search-form></search-form>
    </div>
  </div>
</div>
</template>

<script>
import LinksList from './components/LinksList.vue';
import SearchForm from './components/SearchForm.vue';
import qs from 'query-string'

// source: https://stackoverflow.com/a/4716930/8603212
const queryString = document.currentScript.src.replace(/^[^\?]+\??/,'');
const { vid } = qs.parse(queryString);

export default {
  data() {
    return CONFIG.institutions[vid]
  },
  components: {
    LinksList,
    SearchForm
  }
}
</script>

<style>
.bobcat_embed {
  color: red;
}
</style>
