import SearchRedirectForm from '../../../components/searchForms/SearchRedirectForm.vue';
import { shallowMount } from '@vue/test-utils';

const inputAriaLabel = `Search in library guides`;
const searchFunctionSpy = jasmine.createSpy('searchFunction');

const propsData = {
  searchKey: 'guides',
  searchFunction: searchFunctionSpy,
  searchEngineProps: {
    guidesUrl: 'http://guides.library.edu',
    prop1: 'prop1',
    prop2: 'prop2',
    placeholder: 'Placeholder text'
  },
  inputAriaLabel,
};

describe('SearchRedirectForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(SearchRedirectForm, {
      propsData,
      attachToDocument: false,
    });
  });

  afterEach(() => {
    searchFunctionSpy.calls.reset();
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe('props', () => {
    it('includes searchKey, searchFunction, searchEngineProps, and inputAriaLabel as props', () => {
      expect(Object.keys(wrapper.props()).length).toEqual(4);
      expect(wrapper.props().searchKey).toEqual(propsData.searchKey);
      expect(wrapper.props().searchFunction).toEqual(propsData.searchFunction);
      expect(wrapper.props().searchEngineProps).toEqual(propsData.searchEngineProps);
      expect(wrapper.props().inputAriaLabel).toEqual(propsData.inputAriaLabel);
    });
  });

  describe('data', () => {
    it(`initializes with empty string for 'search'`, () => {
      expect(wrapper.vm.search).toBe('');
    });
  });

  describe('methods', () => {
    const search = 'this is a search term';

    describe(`openSearch`, () => {
      beforeEach(() => {
        wrapper.setData({
          search,
        });

        spyOn(window, 'open');
        wrapper.vm.openSearch();
      });

      it(`should call open window with searchFunction`, () => {
        expect(window.open).toHaveBeenCalled();
        expect(searchFunctionSpy).toHaveBeenCalled();
        expect(searchFunctionSpy).toHaveBeenCalledWith({
          search,
          ...propsData.searchEngineProps,
        });
      });
    });
  });

  describe('computed', () => {
    describe(`searchValues`, () => {
      const search = 'this is a search term';
      beforeEach(() => {
        wrapper.setData({
          search,
        });
      });
      it(`builds required paramaters for guidesSearch as POJO from this.search (data) and this.engineValues (computed)`, () => {
        expect(wrapper.vm.searchValues).toEqual({
          search,
          ...propsData.searchEngineProps,
        });
      });
    });
  });

  describe(`shallow render`, () => {
    it(`has a form`, () => {
      expect(wrapper.contains('form')).toBe(true);
    });

    it(`form a div with class "bobcat_embed_search_field"`, () => {
      expect(wrapper.find('form').contains('div.bobcat_embed_search_field')).toBe(true);
    });

    describe(`the input`, () => {
      let input;
      beforeEach(() => {
        input = wrapper.find('input[type=text]');
      });

      it('exists', () => {
        expect(input).toBeTruthy();
      });

      it('has an aria-label based on inputAriaLabel', () => {
        expect(input.attributes('aria-label')).toEqual(propsData.inputAriaLabel);
      });

      it('has an id and corresponding label', () => {
        expect(input.attributes('id')).toEqual(`${propsData.searchKey}-query`);
        expect(wrapper.findAll(`label[for="${propsData.searchKey}-query"]`).length).toEqual(1);
      });

      it(`has class "bobcat_embed_searchbox_textfield"`, () => {
        expect(input.classes("bobcat_embed_searchbox_textfield")).toBe(true);
      });

      it(`is wrapped in a span with class "bobcat_embed_"`, () => {
        const parentEl = input.element.parentElement;
        const klasses = Array.from(parentEl.classList);
        expect(klasses.indexOf('bobcat_embed_') > -1).toBe(true);
      });

      it(`should be bound to 'search' in data`, () => {
        input.setValue('typing');
        expect(wrapper.vm.search).toEqual('typing');
      });

      it(`has placeholder text, if defined`, () => {
        const expected = propsData.searchEngineProps.placeholder;
        expect(input.attributes('placeholder')).toBe(expected);
      });

      it(`has aria-describedby according to placeholder text, if defined`, () => {
        const expected = propsData.searchEngineProps.placeholder;
        expect(input.attributes('aria-describedby')).toBe(expected);
      });
    });

    it(`includes a submit button`, () => {
      expect(wrapper.findAll(`input[type=submit]`).length).toEqual(1);
    });

    describe('form submit', () => {
      const openSearchSpy = jasmine.createSpy('openSearch');

      afterEach(() => {
        openSearchSpy.calls.reset();
      });

      beforeEach(() => {
        wrapper.setMethods({
          openSearch: openSearchSpy,
        });

        wrapper.find('form').trigger('submit');
      });

      it('should trigger openSearch method', () => {
        expect(openSearchSpy).toHaveBeenCalled();
      });
    });
  });
});