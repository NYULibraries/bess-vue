import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import appConfig from '../../../config';
import TabItem from '@/components/TabItem.vue';

const updateTabSpy = vi.fn( () => 0 );

describe( 'TabItem', () => {
    let currentProps;
    let wrapper;

    describe.each(
        Object.keys( appConfig.institutions ).map(
            function ( institution ) {
                return { institution };
            },
        ) )( '$institution', ( { institution } ) => {
        describe.each(
            appConfig.institutions[ institution ].map(
                function ( tabConfig ) {
                    return { tabConfig };
                },
            ) )( '$tabConfig', ( { tabConfig } ) => {
            beforeEach( () => {
                currentProps = {
                    tab: {
                        title: tabConfig.title,
                        open : tabConfig.open,
                    },
                    updateTab: updateTabSpy,
                };

                wrapper = shallowMount( TabItem, {
                    props: currentProps,
                } );
            } );

            test( 'is a Vue instance', () => {
                expect( wrapper ).toBeTruthy();
            } );

            test( 'has the correct HTML', () => {
                expect( wrapper.html() ).toMatchSnapshot();
            } );

            describe( 'props', () => {
                test( 'should receive tab and updateTab properties', () => {
                    expect( wrapper.props().tab ).toEqual( currentProps.tab );
                    expect( wrapper.props().updateTab ).toEqual( updateTabSpy );
                } );
            } );

            describe( 'click on tab link', () => {
                afterEach( () => {
                    vi.resetAllMocks();
                } );

                test( 'should trigger updateTab', () => {
                    wrapper.find( 'a' ).trigger( 'click' );
                    expect( updateTabSpy ).toHaveBeenCalled();
                } );

                test( 'should not trigger on click of outer element', () => {
                    wrapper.trigger( 'click' );
                    expect( updateTabSpy ).not.toHaveBeenCalled();
                } );
            } );
        } );
    } );
} );
