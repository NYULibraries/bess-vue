<template>
  <form target="_blank" method="get" action="https://web1.library.nyu.edu/bobcat/index.php" accept-charset="utf-8" name="form1" _lpchecked="1">
    <input name="system" type="hidden" value="primo">
    <input name="search" type="hidden" value="search">
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
        <label for="query_primo_all_NYUHP">Search for</label>
        <input type="text" name="addSearchFields[primoQueryTemp]" class="bobcat_embed_searchbox_textfield" id="query_primo_all_NYUHP" :placeholder="placeholder">
      </span>
      <span class="bobat_embed_searchbox_submit_container">
        <input aria-label="Search" class="bobcat_embed_searchbox_submit" name="Submit" type="submit" value="GO">
      </span>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    placeholder: String
  }
};
</script>
