import GuidesSearchForm from '../../../components/searchForms/GuidesSearchForm.vue';
import { shallowMount } from '@vue/test-utils';
import { getitSearch } from '../../../utils/searchRedirects';

const config = {
  engineValues: {
    guides: {
      guides: {
        guidesUrl: 'http://guides.library.edu'
      },
    }
  }
};

const defaultParams = {
  propsData: {
    searchKey: 'guides'
  },
  mocks: {
    $config: config
  },
  attachToDocument: false,
};

describe('GuidesSearchForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(getitSearch, defaultParams);
  });
});