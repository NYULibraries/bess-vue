export const getitSearch = ({ institution, issn, title, type, getitUrl }) => {
  if (issn) {
    return `${getitUrl}/search/journal_search?&rfr_id=info%3Asid%2Fsfxit.com%3Acitation&rft.title=&rft.object_id=&umlaut.title_search_type=contains&rft.jtitle=${encodeURIComponent(title)}&rft.issn=${encodeURIComponent(issn)}&umlaut.institution=${institution}`;
  } else if (title) {
    return `${getitUrl}/search/journal_search?utf8=%E2%9C%93&umlaut.institution=${institution}&rfr_id=info%3Asid%2Fsfxit.com%3Acitation&rft.title=&rft.object_id=&rft.issn=&umlaut.title_search_type=${type}&rft.jtitle=${encodeURIComponent(title)}&Generate_OpenURL2=Search`;
  }
    return `${getitUrl}/?umlaut.institution=${institution}`;
};

export const primoSearch = ({ tab, scope, bobcatUrl, search, institution, vid }) => {
  return `${bobcatUrl}/primo-explore/search?institution=${institution}&vid=${vid}&tab=${tab}&search_scope=${scope}&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&displayField=all&primoQueryTemp=${search}&query=any,contains,${search}&sortby=rank&lang=en_US`;
};

export const guidesSearch = ({ search }) => {
  return `https://guides.nyu.edu/srch.php?&q=${encodeURIComponent(search)}`;
};
