let config = require('../config.json');
let scopes = require('./scopes');
let urlParser = require('./url_parser');
let jQuery = require('jquery');

(($) => {
  let srcUrl = $('#primo_explore_search_embed').attr('src');
  let vid = urlParser.querystring.get(srcUrl, 'vid');
  let elId = urlParser.querystring.get(srcUrl, 'element_id');
  let vidConfig = config.institutions[vid];

  let searchPrimo = function() {
    document.getElementById("primoQuery").value = "any,contains," + document.getElementById("primoQueryTemp").value.replace(/[,]/g, " ");
    document.forms["searchForm"].submit();
  }

  $(function(){
    let $el = $('#'+elId);
    let formOptions = {
      method: 'get',
      target: '_blank',
      name: 'searchForm',
      id: 'simple',
      enctype: 'application/x-www-form-urlencoded; charset=utf-8',
      action: config.bobcat_url + '/primo-explore/search'
    };

    let hiddenInputs = {
      "mode": "Basic",
      "displayMode": "full",
      "bulkSize": "10",
      "highlight": "true",
      "dum": "true",
      "displayField": "all",
      "pcAvailabiltyMode": "true",
      "institution": vid,
      "vid": vid,
      "tab": vidConfig.default_tab,
      "search_scope": vidConfig.default_scope
    };

    let $q = $('<input />').attr({ type: 'text', id: 'primoQueryTemp', size: '35', placeholder: vidConfig.placeholder});
    let $button = $('<input />').attr({ id: 'go', title: 'Search', type: 'submit', value: 'Search', alt: 'Search' }).on('click', searchPrimo);
    let $form = $('<form />').attr(formOptions).on('submit', searchPrimo);
    $.each(hiddenInputs, function (name, value) {
      $form.append($('<input />').attr({ name: name, value: value, hidden: true }));
    });
    $form.append($('<input />').attr({ name: 'query', id: 'primoQuery', hidden: true }));
    $form.append($q).append($button);
    $el.append($('<div />').html($form));
  });
})(jQuery);
