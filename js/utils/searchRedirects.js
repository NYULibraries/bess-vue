import qs from 'query-string';

export const getitSearch = ({ institution, issn, title, type, getitUrl }) => {
  const baseGetIt = `${getitUrl}/search/journal_search?`;

  const qsSortBy = (orderArr) => (m, n) => orderArr.indexOf(m) >= orderArr.indexOf(n);
  const staticParams = {
    rfr_id: "info:sid/sfxit.com:citation"
  };
  const dynamicParams = {
    'umlaut.title_search_type': title ? type : undefined,
    'rft.jtitle': title,
    'rft.issn': issn,
    'umlaut.institution': institution,
  };
  const qsOrder = ['rfr_id', 'umlaut.title_search_type', 'rft.jtitle', 'rft.issn', 'umlaut.institution'];

  const qsParams = qs.stringify(
    {...staticParams, ...dynamicParams },
    { sort: qsSortBy(qsOrder) }
  );

  if (issn) {
    return `${baseGetIt}${qsParams}`;
  } else if (title) {
    return `${baseGetIt}${qsParams}`;
  } else {
    return `${getitUrl}/?umlaut.institution=${institution}`;
  }
};

export const primoSearch = ({ tab, scope, bobcatUrl, search, institution, vid }) => {
  return `${bobcatUrl}/primo-explore/search?institution=${institution}&vid=${vid}&tab=${tab}&search_scope=${scope}&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&displayField=all&primoQueryTemp=${encodeURIComponent(search)}&query=any,contains,${encodeURIComponent(search)}&sortby=rank&lang=en_US`;
};

export const guidesSearch = ({ search }) => {
  return `https://guides.nyu.edu/srch.php?&q=${encodeURIComponent(search)}`;
};
