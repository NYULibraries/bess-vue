<template>
  <div class="bobcat_embed" id="bobcat_embed_9e6fa4b027">
  <div class="bobcat_embed_tabs_wrapper" id="bobcat_embed_tabs_wrapper_9e6fa4b027">
    <div class="bobcat_embed_tabs" id="bobcat_embed_tabs_9e6fa4b027">
      <ul>
        <li v-for="link in links">
          <a :href="link.href" :title="link.title" :alt="link.alt">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="bobcat_embed_searchbox" id="bobcat_embed_searchbox_9e6fa4b027">
    <div class="bobcat_embed_tab_content bobcat_embed_tab_content_9e6fa4b027" id="bobcat_embed_tab_content_all_9e6fa4b027">
      <form target="_blank" method="get" action="https://web1.library.nyu.edu/bobcat/index.php" accept-charset="utf-8" name="form1">
        <input name="system" type="hidden" value="primo"><input name="search" type="hidden" value="search">
        <input name="action" type="hidden" value="search"><input name="nui" type="hidden" value="true">
        <input type="hidden" name="addSearchFields[institution]" value="NYU">

        <input type="hidden" name="addSearchFields[vid]" value="NYU">

        <input type="hidden" name="addSearchFields[tab]" value="all">

        <input type="hidden" name="addSearchFields[search_scope]" value="all">

        <input type="hidden" name="addSearchFields[mode]" value="basic">

        <input type="hidden" name="addSearchFields[displayMode]" value="full">

        <input type="hidden" name="addSearchFields[bulkSize]" value="10">

        <input type="hidden" name="addSearchFields[highlight]" value="true">

        <input type="hidden" name="addSearchFields[dum]" value="true">

        <input type="hidden" name="addSearchFields[displayField]" value="all">
        <div class="bobcat_embed_search_field">
          <span class="bobcat_embed_">
            <label for="query_primo_all_NYU">Search for</label>
            <input type="text" name="addSearchFields[primoQueryTemp]" class="bobcat_embed_searchbox_textfield" id="query_primo_all_NYU">
          </span>
          <span class="bobat_embed_searchbox_submit_container">
            <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
          </span>
        </div>
        <div class="bobcat_embed_links">
          <ul>
            <li>
              <a target="_blank" href="http://bobcat.library.nyu.edu/primo-explore/search?vid=NYU&amp;mode=advanced">Advanced search</a>
            </li>
          </ul>
        </div>
      </form>
    </div>
    <div class="bobcat_embed_tab_content bobcat_embed_tab_content_9e6fa4b027" id="bobcat_embed_tab_content_articles_9e6fa4b027" style="display:none;">
      <form target="_blank" method="get" action="https://web1.library.nyu.edu/bobcat/index.php" accept-charset="utf-8" name="form1">
        <input name="system" type="hidden" value="">
        <input name="search" type="hidden" value="">
        <input name="action" type="hidden" value="search">
        <input name="tab" type="hidden" value="articles">
        <input name="vid" type="hidden" value="NYU">
        <div class="bobcat_embed_search_spacer">
        </div>
      </form>
    </div>
    <div class="bobcat_embed_tab_content bobcat_embed_tab_content_9e6fa4b027" id="bobcat_embed_tab_content_journals_9e6fa4b027" style="display:none;">
      <form target="_blank" method="get" action="https://web1.library.nyu.edu/bobcat/index.php" accept-charset="utf-8" name="form1">
        <input name="system" type="hidden" value="umlaut">
        <input name="search" type="hidden" value="">
        <input name="action" type="hidden" value="search">
        <input name="tab" type="hidden" value="journals">
        <input name="vid" type="hidden" value="NYU">
        <input type="hidden" name="umlaut.institution" value="NYU">

        <input type="hidden" name="addSearchFields[rfr_id]" value="info:sid/sfxit.com:citation">

        <input type="hidden" id="rft_title" name="addSearchFields[rft.title]">

        <input type="hidden" id="rft_object_id" name="addSearchFields[rft.object_id]">
        <div class="bobcat_embed_search_field">
          <span class="bobcat_embed_journal_search_type"><label for="umlaut_title_search_type">Journal Title</label>
            <select name="addSearchFields[umlaut.title_search_type]" aria-label="Precision operator" id="umlaut_title_search_type" class="sfx_title_search">
              <option value="contains">contains</option>
              <option value="begins">begins with</option>
              <option value="exact">exact match</option>
            </select>
          </span><span class="bobcat_embed_journal_title">
            <label for="journal_title" style="display:none;">Journal title</label>
            <input aria-label="Journal title" id="journal_title" name="addSearchFields[rft.jtitle]" type="text">
          </span>
          <span class="bobcat_embed_spacer"><div></div></span>
          <span class="bobcat_embed_journal_issn">
            <label for="issn">OR ISSN</label>
            <input id="issn" type="text" name="addSearchFields[rft.issn]">
          </span>
          <span class="bobat_embed_searchbox_submit_container">
            <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
          </span>
        </div>
        <div class="bobcat_embed_links"><ul><li><a target="_blank" href="https://getit.library.nyu.edu">Advanced search</a></li></ul></div>
      </form></div>
      <div class="bobcat_embed_tab_content bobcat_embed_tab_content_9e6fa4b027" id="bobcat_embed_tab_content_reserves_9e6fa4b027" style="display:none;">
        <form target="_blank" method="get" action="https://web1.library.nyu.edu/bobcat/index.php" accept-charset="utf-8" name="form1">
          <input name="system" type="hidden" value="primo">
          <input name="search" type="hidden" value="search">
          <input name="action" type="hidden" value="search">
          <input name="nui" type="hidden" value="true">
          <input type="hidden" name="addSearchFields[institution]" value="NYU">

          <input type="hidden" name="addSearchFields[vid]" value="NYU">

          <input type="hidden" name="addSearchFields[tab]" value="reserves">

          <input type="hidden" name="addSearchFields[search_scope]" value="bobstcr">

          <input type="hidden" name="addSearchFields[mode]" value="basic">

          <input type="hidden" name="addSearchFields[displayMode]" value="full">

          <input type="hidden" name="addSearchFields[bulkSize]" value="10">

          <input type="hidden" name="addSearchFields[highlight]" value="true">

          <input type="hidden" name="addSearchFields[dum]" value="true">

          <input type="hidden" name="addSearchFields[displayField]" value="all">
          <div class="bobcat_embed_search_field">
            <span class="bobcat_embed_"><label for="query_primo_reserves_NYU">Search for</label>
              <input type="text" name="addSearchFields[primoQueryTemp]" class="bobcat_embed_searchbox_textfield" id="query_primo_reserves_NYU">
            </span><span class="bobat_embed_searchbox_submit_container"><input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO"></span>
          </div>
          <div class="bobcat_embed_links"><ul>
            <li><a target="_blank" href="http://bobcat.library.nyu.edu/primo-explore/search?tab=reserves&amp;search_scope=bobstcr&amp;vid=NYU&amp;mode=advanced">Advanced search</a>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</div>

</template>

<script>
module.exports = {
  data: () => ({
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
  })
}
</script>

<style>
.bobcat_embed {
  color: red;
}
</style>
