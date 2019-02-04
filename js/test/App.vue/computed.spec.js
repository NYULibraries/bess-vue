import { shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import config from './config';

describe('computed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, {
      mocks: {
        $config: config
      },
      attachToDocument: false
    });
  });

  describe('links', () => {
    it(`starts with first tab's links by default`, () => {
      expect(wrapper.vm.links).toEqual(config.tabLinks.one);
    });

    describe('when selectedTab is manipulated', () => {
      it('updates the links', () => {
        wrapper.setData({
          selectedTab: 'two'
        });
        expect(wrapper.vm.links).toEqual(config.tabLinks.two);
      });
    });
  });
});