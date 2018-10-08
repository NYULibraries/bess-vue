export const getitSearch = ({ institution, issn, title, type, getitUrl }) => {
  const baseGetIt = `${getitUrl}/search/journal_search?rfr_id=info%3Asid%2Fsfxit.com%3Acitation`;
  const titleParams = title ? `&umlaut.title_search_type=${type}&rft.jtitle=${encodeURIComponent(title)}` : '';
  const issnParams = issn ? `&rft.issn=${encodeURIComponent(issn)}` : '';
  const institutionParams = `umlaut.institution=${institution}`;

  if (issn) {
    return `${baseGetIt}${titleParams}${issnParams}&${institutionParams}`;
  } else if (title) {
    return `${baseGetIt}${titleParams}&utf8=%E2%9C%93&Generate_OpenURL2=Search&${institutionParams}`;
  } else {
    return `${getitUrl}/?${institutionParams}`;
  }
};

export const primoSearch = ({ tab, scope, bobcatUrl, search, institution, vid }) => {
  return `${bobcatUrl}/primo-explore/search?institution=${institution}&vid=${vid}&tab=${tab}&search_scope=${scope}&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&displayField=all&primoQueryTemp=${search}&query=any,contains,${search}&sortby=rank&lang=en_US`;
};

export const guidesSearch = ({ search }) => {
  return `https://guides.nyu.edu/srch.php?&q=${encodeURIComponent(search)}`;
};
