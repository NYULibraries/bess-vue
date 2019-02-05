import GetitSearchForm from '../../../components/searchForms/GetitSearchForm.vue';
import { shallowMount } from '@vue/test-utils';

const searchFunctionSpy = jasmine.createSpy('searchFunction', () => 'example.com');
const searchEngineProps = {
  prop1: 'getit-prop1',
  prop2: 'getit-prop2',
  searchTypes: [
    {
      label: 'contains',
      value: 'contains',
    },
    {
      label: 'begins with',
      value: 'begins',
    },
    {
      label: 'exact match',
      value: 'exact',
    },
    {
      label: 'does not have',
      value: 'without',
    },
  ],
};
describe(`GetitSearchForm`, () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(GetitSearchForm, {
      propsData: {
        searchKey: 'getit',
        searchEngineProps,
        searchFunction: searchFunctionSpy,
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe(`methods`, () => {
    describe(`openSearch`, () => {
      beforeEach(() => {
        spyOn(window, 'open');
        wrapper.vm.openSearch();
      });

      afterEach(() => {
        window.open.calls.reset();
      });

      it(`opens window with result of searchFunction`, () => {
        expect(window.open).toHaveBeenCalled();
        expect(window.open).toHaveBeenCalledWith(searchFunctionSpy());
      });

      it(`calls the searchFunction with searchValues`, () => {
        expect(searchFunctionSpy).toHaveBeenCalledWith(wrapper.vm.searchValues);
      });
    });
  });

  describe('computed', () => {
    describe(`searchValues`, () => {
      it(`merges $data and searchEngineProps`, () => {
        expect(wrapper.vm.searchValues).toEqual({
          ...wrapper.vm.$data,
          ...wrapper.vm.searchEngineProps,
        });
      });
    });
  });

  describe(`shallow render`, () => {
    describe(`select input`, () => {
      let selectWrapper, optionsWrappers;
      beforeEach(() => {
        selectWrapper = wrapper.find('select');
        optionsWrappers = selectWrapper.findAll('option')
      });

      it(`exists`, () => {
        expect(wrapper.contains('select')).toBeTruthy();
      });

      describe('options', () => {
        it(`contains as many options as options engineValues.searchTypes`, () => {
          expect(optionsWrappers.length).toEqual(searchEngineProps.searchTypes.length)
        });

        it(`have text from searchValue's 'label' property`, () => {
          optionsWrappers.wrappers.forEach((wrapper, idx) => {
            const expected = searchEngineProps.searchTypes[idx];
            expect(wrapper.text()).toEqual(expected.label);
          });
        });

        it(`have value from searchValue's 'value' property`, () => {
          optionsWrappers.wrappers.forEach((wrapper, idx) => {
            const expected = searchEngineProps.searchTypes[idx];
            expect(wrapper.attributes('value')).toEqual(expected.value);
          });
        });
      });
    });

    describe(`title input`, () => {
      let input;
      beforeEach(() => {
        input = wrapper.find('input[name=title]');
      });

      it('exists', () => {
        expect(wrapper.contains('input[name=title]')).toBeTruthy();
      });
    });
  });
});