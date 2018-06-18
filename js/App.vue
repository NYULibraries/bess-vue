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

export default {
  data() {
    return {
      tab: 'default_tab',
      default_scope: 'default_scope',
      show_scopes: true,
      placeholder: 'Search anything',
      advanced_search: true,
      links: [
        {
          label: 'Articles & Databases',
          href: 'http://guides.nyu.edu/arch',
          title: '',
          alt: ''
        },
        {
          label: 'Journals',
          href: 'https://getit.library.nyu.edu'
        },
        {
          label: 'Course Reserves',
          href: 'http://bobcat.library.nyu.edu/primo-explore/search?tab=default_tab&search_scope=nyucr&vid=NYU-NUI'
        }
      ]
    }
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
