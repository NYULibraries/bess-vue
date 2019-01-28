import { shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import config from './config';

describe('App', () => {
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

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});