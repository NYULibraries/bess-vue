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

  describe('more', () => {
    it(`starts with first tab's more by default`, () => {
      expect(wrapper.vm.more).toEqual(config[0].more);
    });

    describe('when selectedTab is manipulated', () => {
      it('updates the more', () => {
        wrapper.setData({
          selectedTab: 'two'
        });
        expect(wrapper.vm.more).toEqual(config[1].more);
      });
    });
  });

  describe('engine', () => {
    it(`starts with first tab's engine by default`, () => {
      expect(wrapper.vm.engine).toEqual(config[0].engine);
    });

    describe('when selectedTab is manipulated', () => {
      it('updates the engine', () => {
        wrapper.setData({
          selectedTab: 'two'
        });
        expect(wrapper.vm.engine).toEqual(config[1].engine);
      });
    });
  });
});