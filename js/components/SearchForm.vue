<template>
  <form target="_blank">
    <div class="bobcat_embed_search_field">
      <span class="bobcat_embed_">
        <label for="query_primo_all_NYU">Search for</label>
        <input type="text" name="addSearchFields[primoQueryTemp]" class="bobcat_embed_searchbox_textfield" id="query_primo_all_NYU" :placeholder="placeholder">
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
