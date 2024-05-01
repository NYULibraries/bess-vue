import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TabItem from '../../components/TabItem.vue';

const updateTabSpy = vi.fn( () => 0 );
const tab = {
    title: 'title',
    open : {
        href  : 'link.com',
        target: '_blank',
    },
};
describe( 'TabItem', () => {
    let wrapper;
    beforeEach( () => {
        wrapper = shallowMount( TabItem, {
            props: {
                tab,
                updateTab: updateTabSpy,
            },
        } );
    } );

    it( 'is a Vue instance', () => {
        expect( wrapper ).toBeTruthy();
    } );

    it( 'has the correct HTML', () => {
        expect( wrapper.html() ).toMatchSnapshot();
    } );

    describe( 'props', () => {
        it( 'should receive tab and updateTab properties', () => {
            expect( wrapper.props().tab ).toEqual( tab );
            expect( wrapper.props().updateTab ).toEqual( updateTabSpy );
        } );
    } );

    describe( 'click on tab link', () => {
        afterEach( () => {
            vi.resetAllMocks();
        } );

        it( 'should trigger updateTab', () => {
            wrapper.find( 'a' ).trigger( 'click' );
            expect( updateTabSpy ).toHaveBeenCalled();
        } );

        it( 'should not trigger on click of outer element', () => {
            wrapper.trigger( 'click' );
            expect( updateTabSpy ).not.toHaveBeenCalled();
        } );
    } );
} );
