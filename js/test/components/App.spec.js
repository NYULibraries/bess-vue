import { shallowMount } from '@vue/test-utils';
import App from '../../App.vue';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, {
      mocks: {
        $root: {
          $data: {
            config: {
              tabsList: [
                'one',
                'two'
              ],
              tabs: {
                one: {
                  label: 'external link',
                  title: 'this is tab one title',
                  alt: 'this is tab one alt',
                  href: 'http://example.com',
                  target: '_blank'
                },
                two: {
                  label: 'search tab',
                  title: 'this is tab two title',
                  alt: 'this is tab two alt',
                  engine: 'elastic',
                },
              },
              tabLinks: {
                one: [{
                  label: 'tab1-link1',
                  href: 'example1.com',
                }],
                two: [{
                    label: 'tab2-link1',
                    href: 'example2.com',
                  },
                  {
                    label: 'tab2-link2',
                    href: 'example3.com',
                  }
                ]
              }
            }
          },
        }
      },
      attachToDocument: true
    });
  });

  it('is a Vue instance', () => {
    // expect(wrapper.props().institution).toEqual('UNI');
    console.log(wrapper.html());
    expect(wrapper.contains('div')).toBeTruthy();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});