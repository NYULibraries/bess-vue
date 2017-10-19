// Require global config
let config = require('../config.json');

// External dependencies
let $ = require('jquery').noConflict();

// Internal dependency tree
let urlParser = require('./url_parser');
let searchForm = require('./search_form').searchForm;

// Get config instance variables from <script> tag
let srcUrl = $('#primo_explore_search_embed').attr('src');
let vid = urlParser.querystring.get(srcUrl, 'vid');
let elId = urlParser.querystring.get(srcUrl, 'element_id');

// Document ready
(function($) {
  $(function(){
    let $el = $('#'+elId);

    // Add the form html to the element
    $el.html(searchForm.init(vid));
  });
})($);
