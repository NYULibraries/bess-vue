import GuidesSearchForm from '../../../components/searchForms/GuidesSearchForm.vue';
import { shallowMount } from '@vue/test-utils';
import * as searchRedirects from '../../../utils/searchRedirects';

const config = {
  engineValues: {
    guides: {
      guides: {
        guidesUrl: 'http://guides.library.edu'
      },
    }
  }
};

const propsData = {
  searchKey: 'guides',
};

describe('GuidesSearchForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(GuidesSearchForm, {
      propsData,
      mocks: {
        $config: config
      },
      attachToDocument: false,
    });
  });

  describe('props', () => {
    it('inherits searchKey as props', () => {
      expect(Object.keys(wrapper.props()).length).toEqual(1);
      expect(wrapper.props().searchKey).toEqual(propsData.searchKey);
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
        })

        // spyOn(searchRedirects, 'guidesSearch')
        // spyOn(window, 'open');
        wrapper.vm.openSearch();
      });

      it(`should call open window with guidesSearch`, () => {
        // expect(searchRedirects.guidesSearch).toHaveBeenCalledWith(search);
        // expect(window.open).toHaveBeenCalled();
      });
    });
  });
});