<template>
  <div class="bobcat_embed">
    <div class="bobcat_embed_tabs_wrapper">
      <div class="bobcat_embed_tabs">
        <ul role="tablist">
          <tab-item
            v-for="tab in tabs"
            :key="tab.id"
            :class="tabClasses( tab )"
            :update-tab="updateTab"
            :tab="tab"
            role="tab"
          >
            {{ tab.label }}
          </tab-item>
        </ul>
      </div>
    </div>
    <div class="bobcat_embed_searchbox">
      <div class="bobcat_embed_tab_content">
        <search-form
          v-if="engine"
          :search-key="selectedTab"
          :engine="engine"
        />
        <div class="bobcat_embed_links">
          <ul>
            <li
              v-for="( html, idx ) in more"
              :key="idx"
              v-html="html"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue';
import TabItem from './components/TabItem.vue';

export default {
    components: {
        SearchForm,
        TabItem,
    },
    data() {
        return {
            selectedTab: 1,
            tabs       : this.$config.map( ( tab, idx ) => ( { id: idx + 1, ...tab } ) ),
        };
    },
    computed: {
        tabConfig() {
            return this.tabs.find( tab => tab.id === this.selectedTab );
        },
        more() {
            return this.tabConfig.more;
        },
        engine() {
            return this.tabConfig.engine;
        },
    },
    methods: {
        updateTab( event, tab ) {
            if ( !tab.open ) {
                event.preventDefault();
                this.selectedTab = tab.id;
            }
        },
        tabClasses( tab ) {
            return {
                bobcat_embed_tabs_selected: this.selectedTab === tab.id,
                bobcat_embed_tabs_first   : tab.id === 1,
                bobcat_embed_tabs_inside  : tab.id > 1 && tab.id < this.tabs.length,
                bobcat_embed_tabs_last    : tab.id === this.tabs.length,
            };
        },
    },
};
</script>

<style>
.bobcat_embed {
  color       : #000000;
  font-family : Verdana, Arial, Helvetica, sans-serif;
  font-size   : 12px;
  background  : #ffffff;
  background  : -webkit-linear-gradient(down, white, #efefef);
  background  : -o-linear-gradient(down, white, #efefef);
  background  : -moz-linear-gradient(down, white, #efefef);
  background  : linear-gradient(to bottom, white, #efefef)
}

.bobcat_embed a {
  text-decoration : none
}

.bobcat_embed a:visited {
  color           : #0000cc;
  text-decoration : none
}

.bobcat_embed a:active {
  color           : #ffcc33;
  text-decoration : none
}

.bobcat_embed a:hover {
  text-decoration : underline
}

.bobcat_embed input[type=submit] {
  background-color : #66412b;
  color            : #ffffff;
  border           : 2px #66412b outset;
  font-weight      : bold;
  padding          : 2.5px 5px;
  font-family      : Arial, Verdana, Helvetica, sans-serif;
  font-size        : 12px
}

.bobcat_embed input[type=submit]:hover {
  background-color : #66412b;
  color            : #ffffff;
  border           : 2px #66412b outset;
  font-weight      : bold;
  padding          : 2.5px 5px;
  cursor           : pointer
}

.bobcat_embed input[type=submit]:active {
  background-color : #66412b;
  color            : #ffffff;
  border           : 2px #66412b inset;
  font-weight      : bold;
  padding          : 2.5px 5px;
  cursor           : pointer
}

.bobcat_embed .bobcat_embed_tabs {
  font-family : Verdana, Arial Helvetica, sans-serif !important;
  font-size   : 12px !important
}

.bobcat_embed .bobcat_embed_tabs ul li {
  background-image : none !important;
  margin           : 0px !important;
  padding          : 0px !important;
  line-height      : auto
}

.bobcat_embed .bobcat_embed_tabs ul {
  margin      : 0px !important;
  margin-left : 1px !important;
  padding     : 0 0px;
  list-style  : none !important
}

.bobcat_embed .bobcat_embed_tabs ul li {
  float : left !important
}

.bobcat_embed .bobcat_embed_tabs ul li a {
  display          : block;
  margin-top       : 1px !important;
  padding          : 2px 8px !important;
  background-color : #efefef;
  border-top       : 1px solid rgba(0, 0, 0, 0);
  border-left      : 1px solid #cccccc;
  border-right     : 1px solid rgba(0, 0, 0, 0);
  border-bottom    : 1px solid #cccccc
}

.bobcat_embed .bobcat_embed_tabs ul li.bobcat_embed_tabs_selected a {
  display          : block;
  padding          : 2px 8px !important;
  background-color : #ffffff
}

.bobcat_embed .bobcat_embed_tabs ul li.bobcat_embed_tabs_first a {
  border-left : 0
}

.bobcat_embed .bobcat_embed_tabs ul li.bobcat_embed_tabs_last a {
  border-right : 1px solid #cccccc
}

.bobcat_embed .bobcat_embed_tabs ul li.bobcat_embed_tabs_first.bobcat_embed_tabs_selected a {
  border-bottom : 0;
  border-right  : 1px solid #cccccc
}

.bobcat_embed .bobcat_embed_tabs ul li.bobcat_embed_tabs_inside.bobcat_embed_tabs_selected a {
  border-right  : 1px solid #cccccc;
  border-bottom : 1px solid #ffffff
}

.bobcat_embed .bobcat_embed_tabs ul li.bobcat_embed_tabs_last.bobcat_embed_tabs_selected a {
  border-bottom : 0;
  border-right  : 0
}

.bobcat_embed form fieldset {
  border        : none;
  padding       : 0px;
  margin-bottom : 1.5em
}

.bobcat_embed input[type=text], .bobcat_embed textarea {
  display : inline
}

.bobcat_embed select {
  display : inline
}

.bobcat_embed input[type=text], .bobcat_embed input[type=password], .bobcat_embed select {
  margin-right : 1em
}

.bobcat_embed .bobcat_embed_searchbox {
  padding             : 20px;
  margin              : 0px;
  background-repeat   : repeat-x;
  background-position : bottom;
  border-top-width    : 1px;
  border-right-width  : 1px;
  border-bottom-width : 2px;
  border-left-width   : 1px;
  border-top-style    : solid;
  border-right-style  : solid;
  border-bottom-style : solid;
  border-left-style   : solid;
  border-top-color    : #cccccc;
  border-right-color  : #cccccc;
  border-bottom-color : #999999;
  border-left-color   : #cccccc;
  margin-top          : 10px;
  text-align          : left
}

.bobcat_embed .bobcat_embed_searchbox form div.bobcat_embed_search_field {
  padding-top    : 20px;
  padding-bottom : 10px;
  clear          : both
}

.bobcat_embed .bobcat_embed_searchbox form div.bobcat_embed_limit_to {
  padding-bottom : 10px
}

.bobcat_embed .bobcat_embed_searchbox form div.bobcat_embed_search_field input[type=text] {
  width : 60%
}

.bobcat_embed .bobcat_embed_searchbox form div.bobcat_embed_limit_to select {
  margin       : 0;
  padding      : 0;
  margin-right : 5px
}

.bobcat_embed .bobcat_embed_searchbox ul {
  padding : 0
}

.bobcat_embed .bobcat_embed_searchbox .bobcat_embed_search_spacer {
  margin-top : 30px
}

.bobcat_embed .bobcat_embed_searchbox ul li {
  list-style       : none;
  background-image : none;
  padding          : 0
}

.bobcat_embed .bobcat_embed_searchbox ul li:before {
  content : "\BB\20\20\20"
}

.bobcat_embed .bobcat_embed_tabs ul li[id^=bobcat_beta] a {
  background-color : #f8e71c
}

.bobcat_embed_tab_content {
  clear : both
}
</style>
