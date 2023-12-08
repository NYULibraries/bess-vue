import { primoSearch, guidesSearch } from '../../utils/searchRedirects';

describe('primoSearch', () => {
  const params = {
    tab: 'all',
    scope: 'uniscope',
    bobcatUrl: 'http://bobcat.university.edu',
    search: 'monk and music', // "monk%20and%20music"
    institution: 'UNI',
    vid: 'UNI-NUI',
  };

  it('should return an appropriately composed search url', () => {
    expect(primoSearch(params)).toEqual('http://bobcat.university.edu/discovery/search?institution=UNI&vid=UNI-NUI&tab=all&search_scope=uniscope&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&displayField=all&primoQueryTemp=monk%20and%20music&query=any,contains,monk%20and%20music&sortby=rank&lang=en_US');
  });

  it('can modify the search method', () => {
    expect(primoSearch({ searchMethod: 'jsearch', ...params })).toEqual('http://bobcat.university.edu/discovery/jsearch?institution=UNI&vid=UNI-NUI&tab=all&search_scope=uniscope&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&displayField=all&primoQueryTemp=monk%20and%20music&query=any,contains,monk%20and%20music&sortby=rank&lang=en_US')
  });
});

describe('guidesSearch', () => {
  it('should return an appropriately composed search url', () => {
    expect(
      guidesSearch({ search: 'this is a search', guidesUrl: 'http://guides.university.edu' }) //'this%20is%20a%20search'
    ).toEqual('http://guides.university.edu/srch.php?&q=this%20is%20a%20search');
  });
});
