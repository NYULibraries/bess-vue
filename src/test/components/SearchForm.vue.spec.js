// Note on disabled tests:
//
// `shallowMount()` is supposed to stub out child components, but there appears
// to be a bug which causes the read child components to be used when
// `NODE_ENV=production` is set.  We are now running tests in production mode
// by default, both because it makes sense for this project and  Node team
// strongly recommends it:
//    https://nodejs.org/en/learn/getting-started/nodejs-the-difference-between-development-and-production
// TODO: Determine if this is a bug or not, and if so, report it or submit a PR,
//       and/or work around this issue.

import { beforeEach, describe, expect, test } from 'vitest';
import { guidesSearch, primoSearch } from '../../utils/searchRedirects';

import SearchForm from '../../components/SearchForm.vue';
import { shallowMount } from '@vue/test-utils';

import appConfig from '../../../config';

describe( 'SearchForm', () => {
    let currentFormConfig;
    let currentProps;
    let wrapper;

    describe.each(
        Object.keys( appConfig.institutions ).map(
            function ( institution ) {
                return { institution };
            },
        ) )( '$institution', ( { institution } ) => {
        beforeEach( () => {
            currentFormConfig = appConfig.institutions[ institution ][ 0 ];

            currentProps = {
                searchKey: 1,
                engine   : currentFormConfig.engine,
                ui       : currentFormConfig.ui || {},
            };

            wrapper = shallowMount( SearchForm, {
                props: currentProps,
            } );
        } );

        test( 'is a Vue instance', () => {
            expect( wrapper ).toBeTruthy();
        } );

        // See "Note on disabled tests" at the top of this file.
        // The snapshots show the `SearchRedirectForm` child component being
        // rendered instead of stubbed.  The snapshot presumably has the correct
        // HTML, but once the presumed bug is fixed, this test will fail since
        // the `SearchRedirectForm` child component will once again be stubbed.
        // test( 'has the correct HTML', () => {
        //     expect( wrapper.html() ).toMatchSnapshot();
        // } );

        describe( 'props', () => {
            test( 'includes searchKey and engine', () => {
                expect( Object.keys( wrapper.props() ).length ).toEqual( 3 );
                expect( wrapper.props().searchKey ).toEqual( currentProps.searchKey );
                expect( wrapper.props().engine ).toEqual( currentProps.engine );
            } );
        } );

        describe( 'computed', () => {
            describe( 'engineType', () => {
                test( 'evaluates engine type', () => {
                    expect( wrapper.vm.engineType ).toBe( currentProps.engine.type );
                } );

                test( 'is undefined if engine is undefined', async () => {
                    await wrapper.setProps( { engine: undefined } );
                    expect( wrapper.vm.engineType ).toBe( undefined );
                } );
            } );

            describe( 'searchFunction', () => {
                test( 'is properly mapped to engines', async () => {
                    expect( wrapper.vm.searchFunction ).toBe( primoSearch );
                    await wrapper.setProps( { engine: { type: 'guides', scopesMap: {}, scope: '' } } );
                    expect( wrapper.vm.searchFunction ).toBe( guidesSearch );
                    await wrapper.setProps( { engine: { type: 'unknown' } } );
                    expect( wrapper.vm.searchFunction ).toBeUndefined();
                } );
            } );

            describe( 'inputAriaLabel', () => {
                test( 'has appropriate label for \'primo\' engine', () => {
                    expect( wrapper.vm.inputAriaLabel ).toBe( 'Search Bobcat' );
                } );
                test( 'has appropriate label for \'guides\' engine', async () => {
                    await wrapper.setProps( { engine: { type: 'guides', scopesMap: {}, scope: '' } } );
                    expect( wrapper.vm.inputAriaLabel ).toBe( 'Search for research guides' );
                } );
                test( 'is empty for an unknown engine', async () => {
                    await wrapper.setProps( { engine: { type: 'unknown' } } );
                    expect( wrapper.vm.inputAriaLabel ).toBeUndefined();
                } );
            } );

            describe( 'ui.searchScopeDropdown', () => {
                test( 'returns the `ui.searchScopeDropdown` from the config', () => {
                    expect( wrapper.vm.ui.searchScopeDropdown ).toEqual( currentProps.ui.searchScopeDropdown );
                } );

                test( 'is `undefined` if `ui.searchScopeDropdown` is not defined', async () => {
                    await wrapper.setProps( { ui: {} } );
                    expect( wrapper.vm.ui.searchScopeDropdown ).toBeUndefined();
                } );
            } );

            // See "Note on disabled tests" at the top of this file.
            // describe( 'shallow render', () => {
            //     test( 'renders <search-redirect-form> if primo or guides engine', async () => {
            //         expect( wrapper.find( 'search-redirect-form-stub' ).exists() ).toBeTruthy();
            //         await wrapper.setProps( { engine: { type: 'guides' } } );
            //         expect( wrapper.find( 'search-redirect-form-stub' ).exists() ).toBeTruthy();
            //         expect( wrapper.find( 'getit-search-form-stub' ).exists() ).toBeFalsy();
            //     } );
            // } );
        } );
    } );
} );
