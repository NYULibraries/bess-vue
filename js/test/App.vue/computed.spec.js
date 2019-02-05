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
      expect(wrapper.vm.links).toEqual(config[0].links);
    });

    describe('when selectedTab is manipulated', () => {
      it('updates the links', () => {
        wrapper.setData({
          selectedTab: 'two'
        });
        expect(wrapper.vm.links).toEqual(config[1].links);
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