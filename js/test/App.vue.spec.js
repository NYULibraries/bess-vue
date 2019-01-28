import { shallowMount } from '@vue/test-utils';
import App from '../App.vue';

const config = Object.freeze({
  tabsList: [
    'one',
    'two'
  ],
  tabs: {
    one: {
      label: 'external link',
      title: 'this is tab one title',
      alt: 'this is tab one alt',
      href: 'http://example.external.com',
      target: '_blank'
    },
    two: {
      label: 'search tab',
      title: 'this is tab two title',
      alt: 'this is tab two alt',
      engine: 'elastic',
    },
    three: {
      label: 'search tab',
      title: 'this is tab three title',
      alt: 'this is tab three alt',
      engine: 'bobcat',
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
});

const defaultProps = {
  propsData: {
    institution: 'UNI'
  },
  mocks: {
    $config: config
  },
  attachToDocument: false
};

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App, defaultProps);
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe('computed', () => {
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

    describe('engine', () => {
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
  });

  describe('methods', () => {
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

  describe('data', () => {
    describe('selectedTab', () => {
      it('exists', () => {
        expect(wrapper.vm.selectedTab).toBeDefined();
      });

      it('defaults to first tab', () => {
        expect(wrapper.vm.selectedTab).toEqual(config.tabsList[0]);
      });
    });

    describe('tabs', () => {
      it('exists', () => {
        expect(wrapper.vm.tabs).toBeDefined();
      });
      it(`has tabs mapped from config's tabsList`, () => {
        expect(wrapper.vm.tabs).toEqual([{
            key: 'one',
            ...config.tabs.one
          },
          {
            key: 'two',
            ...config.tabs.two
          },
        ]);
      });
    });
  });

  describe('shallow render', () => {
    let tabWrappers;

    beforeEach(() => {
      tabWrappers = wrapper.findAll('div.bobcat_embed_tabs ul tab-item-stub').wrappers;
    })

    it('has a list of tabs', () => {
      expect(wrapper.contains('div.bobcat_embed_tabs ul'));
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

        it('has a selected attribute', () => {
          expect(firstTab.vm.selected).toBeDefined();
        });

        it('is selected by default', () => {
          expect(firstTab.vm.selected).toBe(true);
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

        it('has a selected attribute', () => {
          expect(secondTab.vm.selected).toBeDefined();
        });

        it('is selected by default', () => {
          expect(secondTab.vm.selected).toBe(false);
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

        it('selected attribute is false', () => {
          expect(firstTab.vm.selected).toBe(false);
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

        it('selected attribute is true', () => {
          expect(secondTab.vm.selected).toBe(true);
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