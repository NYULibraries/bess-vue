import { shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import config from './config';

describe('methods', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, {
      mocks: {
        $config: config
      },
      attachToDocument: false
    });
  });

  describe('updateTab', () => {
    let eventSpy = {
      preventDefault() {}
    };
    beforeEach(() => {
      spyOn(eventSpy, 'preventDefault');
    });

    describe(`if given an 'engine' tab`, () => {
      beforeEach(() => {
        wrapper.vm.updateTab(eventSpy, {
          key: 'two',
          ...config.tabs.two
        });
      });

      it('does preventDefault the event', () => {
        expect(eventSpy.preventDefault).toHaveBeenCalled();
      });

      it('changes the selectedTab data', () => {
        expect(wrapper.vm.selectedTab).toEqual('two');
      });
    });

    describe(`if given an 'href' (external link) tab`, () => {
      beforeEach(() => {
        wrapper.setData({
          selectedTab: 'two'
        });

        wrapper.vm.updateTab(eventSpy, {
          key: 'one',
          ...config.tabs.one
        });
      });

      it('does not preventDefault the event', () => {
        expect(eventSpy.preventDefault).not.toHaveBeenCalled();
      });

      it('does not change the selectedTab data', () => {
        expect(wrapper.vm.selectedTab).toEqual('two');
      });
    });
  });

  describe('tabClasses', () => {
    let klasses;
    beforeEach(() => {
      wrapper.setData({
        selectedTab: 'two',
        tabs: [{
            key: 'one',
            ...config.tabs.one
          },
          {
            key: 'two',
            ...config.tabs.two
          },
          {
            key: 'three',
            ...config.tabs.three
          },
        ]
      });
    });

    describe('given the first, unselected tab', () => {
      beforeEach(() => {
        klasses = wrapper.vm.tabClasses({
          key: 'one'
        }, 0);
      });

      it(`has the 'first' class only`, () => {
        expect(klasses).toEqual({
          bobcat_embed_tabs_selected: false,
          bobcat_embed_tabs_first: true,
          bobcat_embed_tabs_inner: false,
          bobcat_embed_tabs_last: false,
        });
      });

      describe('given the second, selected tab', () => {
        beforeEach(() => {
          klasses = wrapper.vm.tabClasses({
            key: 'two'
          }, 1);
        });

        it(`has the 'inner' and 'selected' classes`, () => {
          expect(klasses).toEqual({
            bobcat_embed_tabs_selected: true,
            bobcat_embed_tabs_first: false,
            bobcat_embed_tabs_inner: true,
            bobcat_embed_tabs_last: false,
          });
        });
      });

      describe('given the last, unselected tab', () => {
        beforeEach(() => {
          klasses = wrapper.vm.tabClasses({
            key: 'three'
          }, 2);
        });

        it(`has the 'last' class`, () => {
          expect(klasses).toEqual({
            bobcat_embed_tabs_selected: false,
            bobcat_embed_tabs_first: false,
            bobcat_embed_tabs_inner: false,
            bobcat_embed_tabs_last: true,
          });
        });
      });
    });
  });
});