// Require global config
let config = require('../config.json');

// External dependencies
let $ = require('jquery').noConflict();

// Internal dependency tree
let scopes = require('./scopes');

// Object to create an HTML form with the proper elements
const searchForm = {
  vidConfig(vid) {
    return config.institutions[vid];
  },
  submitTitle(vid) {
    if (this.vidConfig(vid).submit_text) {
      return this.vidConfig(vid).submit_text;
    } else {
      return 'Search';
    }
  },
  advancedSearchText(vid) {
    if (this.vidConfig(vid).advanced_search_text) {
      return this.vidConfig(vid).advanced_search_text;
    } else {
      return 'Advanced Search';
    }
  },
  formOptions: {
    method: 'get',
    target: '_blank',
    name: 'primoExploreSearchForm',
    id: 'primoExploreSearchFormSimple',
    enctype: 'application/x-www-form-urlencoded; charset=utf-8',
    action: config.bobcat_url + '/primo-explore/search'
  },
  hiddenInputs(vid) {
    return {
      "mode": "Basic",
      "displayMode": "full",
      "bulkSize": "10",
      "highlight": "true",
      "dum": "true",
      "displayField": "all",
      "pcAvailabiltyMode": "true",
      "institution": vid,
      "vid": vid,
      "tab": this.vidConfig(vid).default_tab,
      "search_scope": this.vidConfig(vid).default_scope
    }
  },
  searchPrimo: function() {
    document.getElementById("primoQuery").value = "any,contains," + document.getElementById("primoQueryTemp").value.replace(/[,]/g, " ");
    document.forms["primoExploreSearchForm"].submit();
  },
  q(vid) {
    let $q = $('<div />').append($('<input />').attr({ type: 'text', id: 'primoQueryTemp', size: '35', placeholder: this.vidConfig(vid).placeholder}));
    return $q;
  },
  submit(vid) {
    let $submit = $('<div />').append($('<button />').attr({ id: 'primoExploreSearchFormGo', name: this.submitTitle(vid), title: this.submitTitle(vid), type: 'submit', alt: this.submitTitle(vid) }).html($('<i />').html(this.submitTitle(vid).toLowerCase())));
    $submit.on('click', this.searchPrimo);
    return $submit;
  },
  advancedSearch(vid) {
    if (this.vidConfig(vid).advanced_search) {
      let advancedSearchUrl = this.formOptions.action + '?vid=' + vid + '&mode=advanced';
      let $advancedSearchLink = $('<div />').addClass('advanced_search').append($('<a />').attr({ href: advancedSearchUrl, target: '_blank' }).html(this.advancedSearchText(vid)))
      return $advancedSearchLink;
    }
  },
  links(vid) {
    let $links = $('<div />').addClass('links');
    let $ul = $('<ul />');
    $.each(this.vidConfig(vid).links, function(i, obj) {
      $.each(obj, function(title, href) {
        let $li = $('<li />');
        let $a = $('<a />').attr({ href: href, target: '_blank' }).html(title);
        $ul.append($li.append($a));
      });
    });
    $links.append($ul);
    return $links;
  },
  form(vid) {
    let $form = $('<form />').attr(this.formOptions);
    $.each(this.hiddenInputs(vid), function (name, value) {
      $form.append($('<input />').attr({ name: name, value: value, hidden: true }));
    });
    $form.on('submit', this.searchPrimo);
    $form.append($('<input />').attr({ name: 'query', id: 'primoQuery', hidden: true }));
    $form.append($('<div />').append(this.q(vid)).append(this.submit(vid)));
    return $form;
  },
  init(vid) {
    let $wrapper = $('<div />').addClass('wrapper');
    $wrapper.append(this.form(vid));
    $wrapper.append(this.advancedSearch(vid));
    $wrapper.append(this.links(vid));
    return $wrapper;
  }
};

module.exports = {
  searchForm: searchForm
};
