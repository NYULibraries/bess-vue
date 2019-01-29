import GetitSearchForm from '../../../components/searchForms/GetitSearchForm.vue';
import { shallowMount } from '@vue/test-utils';


const searchFunctionSpy = jasmine.createSpy('searchFunction', () => 'example.com');
const searchEngineProps = {
  prop1: 'getit-prop1',
  prop2: 'getit-prop2',
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

  });
});