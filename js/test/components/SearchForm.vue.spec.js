import SearchForm from '../../components/SearchForm.vue';
import { shallowMount } from '@vue/test-utils';
import { primoSearch, guidesSearch, getitSearch } from '../../utils/searchRedirects';


const propsData = {
  searchKey: 'test',
  engine: 'primo',
  engineProps: {
    prop1: `prop1`,
    prop2: `prop2`,
  }
};

describe('SearchForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SearchForm, {
      propsData,
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe(`props`, () => {
    it('includes searchKey and engine', () => {
      expect(Object.keys(wrapper.props()).length).toEqual(3);
      expect(wrapper.props().searchKey).toEqual(propsData.searchKey);
      expect(wrapper.props().engine).toEqual(propsData.engine);
      expect(wrapper.props().engineProps).toEqual(propsData.engineProps);
    });
  });

  describe(`methods`, () => {
    describe(`isEngine`, () => {
      it('returns true if an argument matches this.engine', () => {
        const isEngine = wrapper.vm.isEngine;

        expect(isEngine('primo', 'abc', 'def')).toBe(true);
        expect(isEngine('abc', 'def', 'primo')).toBe(true);
        expect(isEngine('abc', 'def')).toBe(false);

        wrapper.setProps({ engine: 'getit' });

        expect(isEngine('primo')).toBe(false);
      });
    });
  });

  describe(`computed`, () => {
    describe(`searchFunction`, () => {
      it(`is properly mapped to engines`, () => {
        expect(wrapper.vm.searchFunction).toBe(primoSearch);
        wrapper.setProps({ engine: 'guides' });
        expect(wrapper.vm.searchFunction).toBe(guidesSearch);
        wrapper.setProps({ engine: 'getit' });
        expect(wrapper.vm.searchFunction).toBe(getitSearch);
      });
    });

    describe(`inputAriaLabel`, () => {
      it(`has appropriate label for 'primo' engine`, () => {
        expect(wrapper.vm.inputAriaLabel).toBe(`Search Bobcat`);
      });
      it(`has appropriate label for 'guides' engine`, () => {
        wrapper.setProps({ engine: 'guides' });
        expect(wrapper.vm.inputAriaLabel).toBe(`Search for subject guides`);
      });
    });
  });

  describe(`shallow render`, () => {
    it('renders <search-redirect-form> if primo or guides engine', () => {
      expect(wrapper.contains('search-redirect-form-stub')).toBe(true);
      wrapper.setProps({ engine: 'guides' });
      expect(wrapper.contains('search-redirect-form-stub')).toBe(true);
      expect(wrapper.contains('getit-search-form-stub')).toBe(false);
    });

    it('renders <getit-search-form> if primo or guides engine', () => {
      wrapper.setProps({ engine: 'getit' });
      expect(wrapper.contains('search-redirect-form-stub')).toBe(false);
      expect(wrapper.contains('getit-search-form-stub')).toBe(true);
    });
  });
});