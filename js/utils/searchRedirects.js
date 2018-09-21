export const getitSearch = ({ institution, issn, title, searchType }) => {
  if (issn) {
    return `https://getit.library.nyu.edu/search/journal_search?&rfr_id=info%3Asid%2Fsfxit.com%3Acitation&rft.title=&rft.object_id=&umlaut.title_search_type=contains&rft.jtitle=${encodeURI(title)}&rft.issn=${encodeURI(issn)}&umlaut.institution=${institution}`;
  } else if (title) {
    return `https://getit.library.nyu.edu/search/journal_search?utf8=%E2%9C%93&umlaut.institution=${institution}&rfr_id=info%3Asid%2Fsfxit.com%3Acitation&rft.title=&rft.object_id=&rft.issn=&umlaut.title_search_type=${searchType}&rft.jtitle=${encodeURI(title)}&Generate_OpenURL2=Search`;
  }
    return `https://getit.library.nyu.edu/?umlaut.institution=${institution}`;
};

export const primoSearch = ({ tab, scope, bobcatUrl, search, institution, vid }) => {
  return `${bobcatUrl}/primo-explore/search?institution=${institution}&vid=${vid}&tab=${tab}&search_scope=${scope}&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&displayField=all&primoQueryTemp=${search}&query=any,contains,${search}&sortby=rank&lang=en_US`;
};
