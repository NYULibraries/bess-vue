import { shallowMount } from '@vue/test-utils';
import App from '../../App.vue';
import config from './config';

describe('shallow render', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, {
      mocks: {
        $config: config
      },
      attachToDocument: false
    });
  });

  it('has a list of tabs', () => {
    expect(wrapper.contains('div.bobcat_embed_tabs ul')).toBe(true);
  });

  it(`lists the first tab's advanced links`, () => {
    const linksWrapper = wrapper.find('.bobcat_embed_links');
    const links = linksWrapper.findAll('.bobcat_embed_links ul li a').wrappers;
    const expectedLinks = config.tabLinks.one;

    expect(links.length).toEqual(expectedLinks.length);

    links.forEach((link, idx) => {
      expect(link.attributes('href')).toEqual(expectedLinks[idx].href);
      expect(link.text()).toEqual(expectedLinks[idx].label);
      expect(link.attributes('target')).toEqual('_blank');
    });
  });

  describe('<tab-item>', () => {
    let tabWrappers;
    beforeEach(() => {
      tabWrappers = wrapper.findAll({ name: 'tab-item' }).wrappers;
    });

    it('has an appropriate number of tabs', () => {
      expect(tabWrappers.length).toEqual(2);
    });

    describe('initial state', () => {
      describe('the first tab', () => {
        const tabProps = config.tabs.one;
        let firstTab;
        beforeEach(() => {
          firstTab = tabWrappers[0];
        });

        it('is selected by default', () => {
          expect(firstTab.classes('bobcat_embed_tabs_selected')).toBe(true);
        });

        it('has the appropriate "first" class', () => {
          expect(firstTab.classes('bobcat_embed_tabs_first')).toBe(true);
        });

        it('does not have inner, last classes', () => {
          expect(firstTab.classes('bobcat_embed_tabs_inner')).toBe(false);
          expect(firstTab.classes('bobcat_embed_tabs_last')).toBe(false);
        });

        it('has a tab with the appropriate properties', () => {
          const vm = firstTab.vm;

          expect(vm.tab).toBeDefined();
          Object.keys(tabProps).forEach(prop => {
            expect(vm.tab[prop]).toEqual(tabProps[prop]);
          });
        });

        it('has an update-tab function', () => {
          expect(firstTab.vm.updateTab).toBeDefined();
          expect(typeof firstTab.vm.updateTab).toEqual('function');
        });

        it('has an attribute role=tab', () => {
          expect(firstTab.attributes('role')).toEqual('tab');
        });
      });

      describe('the second tab', () => {
        const tabProps = config.tabs.two;
        let secondTab;
        beforeEach(() => {
          secondTab = tabWrappers[1];
        });

        it('is not selected by default', () => {
          expect(secondTab.classes('bobcat_embed_tabs_selected')).toBe(false);
        });

        it('has the appropriate "last" class', () => {
          expect(secondTab.classes('bobcat_embed_tabs_last')).toBe(true);
        });

        it('does not have inner, first classes', () => {
          expect(secondTab.classes('bobcat_embed_tabs_inner')).toBe(false);
          expect(secondTab.classes('bobcat_embed_tabs_first')).toBe(false);
        });

        it('has a tab with the appropriate properties', () => {
          const vm = secondTab.vm;

          Object.keys(tabProps).forEach(prop => {
            expect(vm.tab[prop]).toEqual(tabProps[prop]);
          });
        });

        it('has an update-tab function', () => {
          expect(secondTab.vm.updateTab).toBeDefined();
          expect(typeof secondTab.vm.updateTab).toEqual('function');
        });

        it('has an attribute role=tab', () => {
          expect(secondTab.attributes('role')).toEqual('tab');
        });
      });
    });

    describe('when second tab selected', () => {
      beforeEach(() => {
        wrapper.setData({
          selectedTab: 'two',
        });
      });

      describe('the first tab', () => {
        let firstTab;
        beforeEach(() => {
          firstTab = tabWrappers[0];
        });

        it(`does not have the 'selected' class`, () => {
          expect(firstTab.classes('bobcat_embed_tabs_selected')).toBe(false);
        });
      });

      describe('the second tab', () => {
        let secondTab;
        beforeEach(() => {
          secondTab = tabWrappers[1];
        });

        it(`has the 'selected' class`, () => {
          expect(secondTab.classes('bobcat_embed_tabs_selected')).toBe(true);
        });
      });

      describe('links list', () => {
        it(`lists the second tab's advanced links`, () => {
          const linksWrapper = wrapper.find('.bobcat_embed_links');
          const links = linksWrapper.findAll('.bobcat_embed_links ul li a').wrappers;
          const expectedLinks = config.tabLinks.two;

          expect(links.length).toEqual(expectedLinks.length);

          links.forEach((link, idx) => {
            expect(link.attributes('href')).toEqual(expectedLinks[idx].href);
            expect(link.text()).toEqual(expectedLinks[idx].label);
            expect(link.attributes('target')).toEqual('_blank');
          });
        });
      });
    });
  });
});