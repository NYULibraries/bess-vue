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
          id: 2,
          ...config[1],
        });
      });

      it('does preventDefault the event', () => {
        expect(eventSpy.preventDefault).toHaveBeenCalled();
      });

      it('changes the selectedTab data', () => {
        expect(wrapper.vm.selectedTab).toEqual(2);
      });
    });

    describe(`if given an 'href' (external link) tab`, () => {
      beforeEach(() => {
        wrapper.setData({
          selectedTab: 2
        });

        wrapper.vm.updateTab(eventSpy, {
          id: 1,
          ...config[0],
        });
      });

      it('does not preventDefault the event', () => {
        expect(eventSpy.preventDefault).not.toHaveBeenCalled();
      });

      it('does not change the selectedTab data', () => {
        expect(wrapper.vm.selectedTab).toEqual(2);
      });
    });
  });

  describe('tabClasses', () => {
    let klasses;
    beforeEach(() => {
      wrapper.setData({
        selectedTab: 2,
        tabs: [{
            id: 1,
            ...config[0]
          },
          {
            id: 2,
            ...config[1]
          },
          {
            id: 3,
            ...config[2]
          },
        ]
      });
    });

    describe('given the first, unselected tab', () => {
      beforeEach(() => {
        klasses = wrapper.vm.tabClasses({ id: 1 });
      });

      it(`has the 'first' class only`, () => {
        expect(klasses).toEqual({
          bobcat_embed_tabs_selected: false,
          bobcat_embed_tabs_first: true,
          bobcat_embed_tabs_inside: false,
          bobcat_embed_tabs_last: false,
        });
      });

      describe('given the second, selected tab', () => {
        beforeEach(() => {
          klasses = wrapper.vm.tabClasses({ id: 2 });
        });

        it(`has the 'inside' and 'selected' classes`, () => {
          expect(klasses).toEqual({
            bobcat_embed_tabs_selected: true,
            bobcat_embed_tabs_first: false,
            bobcat_embed_tabs_inside: true,
            bobcat_embed_tabs_last: false,
          });
        });
      });

      describe('given the last, unselected tab', () => {
        beforeEach(() => {
          klasses = wrapper.vm.tabClasses({ id: 3 });
        });

        it(`has the 'last' class`, () => {
          expect(klasses).toEqual({
            bobcat_embed_tabs_selected: false,
            bobcat_embed_tabs_first: false,
            bobcat_embed_tabs_inside: false,
            bobcat_embed_tabs_last: true,
          });
        });
      });
    });
  });
});