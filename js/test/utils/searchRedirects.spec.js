import { getitSearch, primoSearch, guidesSearch } from '../../utils/searchRedirects';
const SEARCH_TYPES = ['contains', 'begins', 'exact'];
const type = 'contains';
const getitUrl = 'https://getit.university.edu';
const institution = 'UNI';
const defaultParams = { institution, type, getitUrl };


describe('getitSearch', () => {
  describe('issn and title', () => {
    it('should return a getit query url with both issn and title parameters', () => {
      expect(getitSearch({
        ...defaultParams,
        issn: '12345',
        title: 'American Journal of Computer Science',
      })).toEqual('https://getit.university.edu/search/journal_search?rfr_id=info%3Asid%2Fsfxit.com%3Acitation&umlaut.title_search_type=contains&rft.jtitle=American%20Journal%20of%20Computer%20Science&rft.issn=12345&umlaut.institution=UNI');

    });
    SEARCH_TYPES.forEach((type) => {
      describe(`with search type: ${type}`, () => {
        it(`should properly query umlaut.title_search_type=${type}`, () => {
          expect(getitSearch({
            ...defaultParams,
            type,
            issn: '12345',
            title: 'American Journal of Computer Science'
          })).toEqual(`https://getit.university.edu/search/journal_search?rfr_id=info%3Asid%2Fsfxit.com%3Acitation&umlaut.title_search_type=${type}&rft.jtitle=American%20Journal%20of%20Computer%20Science&rft.issn=12345&umlaut.institution=UNI`);
        });
      });
    });
  });

  describe('issn only', () => {
    it('should return a getit query url with only issn parameters', () => {
      expect(getitSearch({
        ...defaultParams,
        issn: '12345',
      })).toEqual('https://getit.university.edu/search/journal_search?rfr_id=info%3Asid%2Fsfxit.com%3Acitation&rft.issn=12345&umlaut.institution=UNI');
    });
  });

  describe('title only', () => {
    SEARCH_TYPES.forEach((type) => {
      describe(`with search type: ${type}`, () => {
        it('should return a query url with only the title', () => {
          expect(getitSearch({
            ...defaultParams,
            type,
            title: 'American Journal of Computer Science',
          })).toEqual(`https://getit.university.edu/search/journal_search?rfr_id=info%3Asid%2Fsfxit.com%3Acitation&umlaut.title_search_type=${type}&rft.jtitle=American%20Journal%20of%20Computer%20Science&umlaut.institution=UNI`);
        });
      });
    });
  });

  describe('no search params', () => {
    it('should return the institution\'s getit page', () => {
      expect(getitSearch({
        ...defaultParams,
      })).toEqual('https://getit.university.edu/?umlaut.institution=UNI');
    });
  });
});

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
    expect(primoSearch(params)).toEqual('http://bobcat.university.edu/primo-explore/search?institution=UNI&vid=UNI-NUI&tab=all&search_scope=uniscope&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&displayField=all&primoQueryTemp=monk%20and%20music&query=any,contains,monk%20and%20music&sortby=rank&lang=en_US');
  });

  it('can modify the search method', () => {
    expect(primoSearch({ searchMethod: 'jsearch', ...params })).toEqual('http://bobcat.university.edu/primo-explore/jsearch?institution=UNI&vid=UNI-NUI&tab=all&search_scope=uniscope&mode=basic&displayMode=full&bulkSize=10&highlight=true&dum=true&displayField=all&primoQueryTemp=monk%20and%20music&query=any,contains,monk%20and%20music&sortby=rank&lang=en_US')
  });
});

describe('guidesSearch', () => {
  it('should return an appropriately composed search url', () => {
    expect(
      guidesSearch({ search: 'this is a search', guidesUrl: 'http://guides.university.edu' }) //'this%20is%20a%20search'
    ).toEqual('http://guides.university.edu/srch.php?&q=this%20is%20a%20search');
  });
});