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
  form(vid) {
    let $wrapper = $('<div />').addClass('row');
    let $q = $('<div />').addClass('col s8').append($('<input />').attr({ type: 'text', id: 'primoQueryTemp', size: '35', placeholder: this.vidConfig(vid).placeholder}));
    let $button = $('<div />').addClass('col s4').append($('<button />').attr({ id: 'go', name: 'Search', title: 'Search', type: 'submit', alt: 'Search' }).addClass('btn waves-effect waves-light').html($('<i />').addClass('material-icons right').html('send')));
    let $form = $('<form />').addClass('col s12').attr(this.formOptions);
    $.each(this.hiddenInputs(vid), function (name, value) {
      $form.append($('<input />').attr({ name: name, value: value, hidden: true }));
    });
    $button.on('click', this.searchPrimo);
    $form.on('submit', this.searchPrimo);
    $form.append($('<input />').attr({ name: 'query', id: 'primoQuery', hidden: true }));
    $form.append($('<div />').addClass('row').append($q).append($button));
    $wrapper.append($form);
    return $wrapper;
  }
};

module.exports = {
  searchForm: searchForm
};
