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
    it('should return a getit query url with only issn paramters', () => {
      expect(getitSearch({
        ...defaultParams,
        issn: '12345',
      })).toEqual('https://getit.university.edu/search/journal_search?rfr_id=info%3Asid%2Fsfxit.com%3Acitation&rft.issn=12345&umlaut.institution=UNI');
    });
  });

  describe('title only', () => {
    SEARCH_TYPES.forEach((type) => {
      describe(`with search type: ${type}`, () => {

      });
    });
  });

  describe('no search params', () => {

  });
});