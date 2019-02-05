import TabItem from '../../components/TabItem.vue';
import { shallowMount } from '@vue/test-utils';

const updateTabSpy = jasmine.createSpy('updateTab');
const tab = {
  title: 'title',
  alt: 'alt-text',
  open: {
    href: 'link.com',
    target: '_blank',
  },
};
describe(`TabItem`, () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TabItem, {
      propsData: {
        tab,
        updateTab: updateTabSpy,
      },
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe(`props`, () => {
    it(`should receive tab and updateTab properties`, () => {
      expect(wrapper.props().tab).toBe(tab);
      expect(wrapper.props().updateTab).toBe(updateTabSpy);
    });
  });

  describe(`click on tab link`, () => {
    afterEach(() => {
      updateTabSpy.calls.reset();
    });

    it(`should trigger updateTab`, () => {
      wrapper.find('a').trigger('click');
      expect(updateTabSpy).toHaveBeenCalled();
    });

    it(`should not trigger on click of outer element`, () => {
      wrapper.trigger('click');
      expect(updateTabSpy).not.toHaveBeenCalled();
    });
  });
});