const qsSortBy = (orderArr) => (m, n) => orderArr.indexOf(m) - orderArr.indexOf(n);

const queryStringify = (dict, { sort, encode = true }) => (Object.keys(dict)
  .sort(sort)
  .reduce((res, k, idx, keys) => {
    const v = dict[k];
    const queryString = v ? `${encode ? encodeURIComponent(k) : k}=${encode ? encodeURIComponent(v) : v}` : '';
    return `${res}${queryString}${queryString && idx !== keys.length - 1 ? '&' : ''}`;
  }, ''));

export const getitSearch = ({ institution, issn, title, type, getitUrl }) => {
  const baseGetIt = `${getitUrl}/search/journal_search?`;

  const staticParams = {
    rfr_id: "info:sid/sfxit.com:citation"
  };
  const dynamicParams = {
    'umlaut.title_search_type': title ? type : undefined,
    'rft.jtitle': title,
    'rft.issn': issn,
    'umlaut.institution': institution,
  };
  const qsOrder = [
    'rfr_id',
    'umlaut.title_search_type',
    'rft.jtitle',
    'rft.issn',
    'umlaut.institution',
  ];
  const qsParams = queryStringify(
    {...staticParams, ...dynamicParams },
    { sort: qsSortBy(qsOrder) }
  );

  if (issn || title) {
    return `${baseGetIt}${qsParams}`;
  } else {
    return `${getitUrl}/?umlaut.institution=${institution}`;
  }
};

export const primoSearch = ({ tab, scope, bobcatUrl, search, institution, vid }) => {
  const staticParams = {
    mode: 'basic',
    displayMode: 'full',
    bulkSize: '10',
    highlight: 'true',
    dum: 'true',
    displayField: 'all',
    sortby: 'rank',
    lang: 'en_US',
  };

  const dynamicParams = {
    institution,
    vid,
    tab,
    search_scope: scope,
    query: `any,contains,${encodeURIComponent(search)}`,
    primoQueryTemp: encodeURIComponent(search),
  };

  const qsOrder = [
    'institution',
    'vid',
    'tab',
    'search_scope',
    'mode',
    'displayMode',
    'bulkSize',
    'highlight',
    'dum',
    'displayField',
    'primoQueryTemp',
    'query',
    'sortby',
    'lang',
  ];
  const qsParams = queryStringify(
    { ...staticParams, ...dynamicParams },
    { sort: qsSortBy(qsOrder), encode: false }
  );

  return `${bobcatUrl}/primo-explore/search?${qsParams}`;
};

export const guidesSearch = ({ search, guidesUrl }) => {
  return `${guidesUrl}/srch.php?&q=${encodeURIComponent(search)}`;
};
