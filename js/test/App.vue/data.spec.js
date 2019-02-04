import {
  shallowMount
} from '@vue/test-utils';
import App from '../../App.vue';
import config from './config';

describe('data', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, {
      mocks: {
        $config: config
      },
      attachToDocument: false
    });
  });

  describe('selectedTab', () => {
    it('exists', () => {
      expect(wrapper.vm.selectedTab).toBeDefined();
    });

    it('defaults to first tab', () => {
      expect(wrapper.vm.selectedTab).toEqual(config.tabs[0].key);
    });
  });

  describe('tabs', () => {
    it('exists', () => {
      expect(wrapper.vm.tabs).toBeDefined();
    });
    it(`has tabs mapped from config`, () => {
      expect(wrapper.vm.tabs).toEqual(config.tabs);
    });
  });
});