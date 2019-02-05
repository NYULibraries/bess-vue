import SearchForm from '../../components/SearchForm.vue';
import { shallowMount } from '@vue/test-utils';
import { primoSearch, guidesSearch, getitSearch } from '../../utils/searchRedirects';


const propsData = {
  searchKey: 'test',
  engine: {
    type: 'primo',
    prop1: `prop1`,
    prop2: `prop2`,
  },
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
      expect(Object.keys(wrapper.props()).length).toEqual(2);
      expect(wrapper.props().searchKey).toEqual(propsData.searchKey);
      expect(wrapper.props().engine).toEqual(propsData.engine);
    });
  });

  describe(`methods`, () => {
    describe(`isEngineType`, () => {
      it('returns true if an argument matches this.engine', () => {
        const isEngineType = wrapper.vm.isEngineType;

        expect(isEngineType('primo', 'abc', 'def')).toBe(true);
        expect(isEngineType('abc', 'def', 'primo')).toBe(true);
        expect(isEngineType('abc', 'def')).toBe(false);

        wrapper.setProps({ engine: { type: 'getit' } });

        expect(isEngineType('primo')).toBe(false);
      });
    });
  });

  describe(`computed`, () => {
    describe(`engineType`, () => {
      it(`evaluates engine type`, () => {
        expect(wrapper.vm.engineType).toBe(propsData.engine.type);
      });

      it(`is undefined if engine is undefined`, () => {
        wrapper.setProps({ engine: undefined });
        expect(wrapper.vm.engineType).toBe(undefined);
      });
    });

    describe(`searchFunction`, () => {
      it(`is properly mapped to engines`, () => {
        expect(wrapper.vm.searchFunction).toBe(primoSearch);
        wrapper.setProps({ engine: { type: 'guides' } });
        expect(wrapper.vm.searchFunction).toBe(guidesSearch);
        wrapper.setProps({ engine: { type: 'getit' } });
        expect(wrapper.vm.searchFunction).toBe(getitSearch);
      });
    });

    describe(`inputAriaLabel`, () => {
      it(`has appropriate label for 'primo' engine`, () => {
        expect(wrapper.vm.inputAriaLabel).toBe(`Search Bobcat`);
      });
      it(`has appropriate label for 'guides' engine`, () => {
        wrapper.setProps({ engine: { type: 'guides' } });
        expect(wrapper.vm.inputAriaLabel).toBe(`Search for subject guides`);
      });
    });
  });

  describe(`shallow render`, () => {
    it('renders <search-redirect-form> if primo or guides engine', () => {
      expect(wrapper.contains('search-redirect-form-stub')).toBe(true);
      wrapper.setProps({ engine: { type: 'guides' } });
      expect(wrapper.contains('search-redirect-form-stub')).toBe(true);
      expect(wrapper.contains('getit-search-form-stub')).toBe(false);
    });

    it('renders <getit-search-form> if primo or guides engine', () => {
      wrapper.setProps({ engine: { type: 'getit' } });
      expect(wrapper.contains('search-redirect-form-stub')).toBe(false);
      expect(wrapper.contains('getit-search-form-stub')).toBe(true);
    });
  });
});