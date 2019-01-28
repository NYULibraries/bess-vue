import { shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import config from './config';

describe('engine', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, {
      propsData: {
        institution: 'UNI'
      },
      mocks: {
        $config: config
      },
      attachToDocument: false
    });
  });

  it(`starts with first tab's engine by default`, () => {
    expect(wrapper.vm.engine).toEqual(config.tabs.one.engine);
  });

  describe('when selectedTab is manipulated', () => {
    it('updates the engine', () => {
      wrapper.setData({
        selectedTab: 'two'
      });
      expect(wrapper.vm.engine).toEqual(config.tabs.two.engine);
    });
  });
});