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

import { beforeEach, describe, expect, it } from 'vitest';
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

        it( 'is a Vue instance', () => {
            expect( wrapper ).toBeTruthy();
        } );

        // See "Note on disabled tests" at the top of this file.
        // The snapshots show the `SearchRedirectForm` child component being
        // rendered instead of stubbed.  The snapshot presumably has the correct
        // HTML, but once the presumed bug is fixed, this test will fail since
        // the `SearchRedirectForm` child component will once again be stubbed.
        // it( 'has the correct HTML', () => {
        //     expect( wrapper.html() ).toMatchSnapshot();
        // } );

        describe( 'props', () => {
            it( 'includes searchKey and engine', () => {
                expect( Object.keys( wrapper.props() ).length ).toEqual( 3 );
                expect( wrapper.props().searchKey ).toEqual( currentProps.searchKey );
                expect( wrapper.props().engine ).toEqual( currentProps.engine );
            } );
        } );

        describe( 'computed', () => {
            describe( 'engineType', () => {
                it( 'evaluates engine type', () => {
                    expect( wrapper.vm.engineType ).toBe( currentProps.engine.type );
                } );

                it( 'is undefined if engine is undefined', async () => {
                    await wrapper.setProps( { engine: undefined } );
                    expect( wrapper.vm.engineType ).toBe( undefined );
                } );
            } );

            describe( 'searchFunction', () => {
                it( 'is properly mapped to engines', async () => {
                    expect( wrapper.vm.searchFunction ).toBe( primoSearch );
                    await wrapper.setProps( { engine: { type: 'guides', scopesMap: {}, scope: '' } } );
                    expect( wrapper.vm.searchFunction ).toBe( guidesSearch );
                    await wrapper.setProps( { engine: { type: 'unknown' } } );
                    expect( wrapper.vm.searchFunction ).toBeUndefined();
                } );
            } );

            describe( 'inputAriaLabel', () => {
                it( 'has appropriate label for \'primo\' engine', () => {
                    expect( wrapper.vm.inputAriaLabel ).toBe( 'Search Bobcat' );
                } );
                it( 'has appropriate label for \'guides\' engine', async () => {
                    await wrapper.setProps( { engine: { type: 'guides', scopesMap: {}, scope: '' } } );
                    expect( wrapper.vm.inputAriaLabel ).toBe( 'Search for research guides' );
                } );
                it( 'is empty for an unknown engine', async () => {
                    await wrapper.setProps( { engine: { type: 'unknown' } } );
                    expect( wrapper.vm.inputAriaLabel ).toBeUndefined();
                } );
            } );

            describe( 'ui.searchScopeDropdown', () => {
                it( 'returns the `ui.searchScopeDropdown` from the config', () => {
                    expect( wrapper.vm.ui.searchScopeDropdown ).toEqual( currentProps.ui.searchScopeDropdown );
                } );

                it( 'is `undefined` if `ui.searchScopeDropdown` is not defined', async () => {
                    await wrapper.setProps( { ui: {} } );
                    expect( wrapper.vm.ui.searchScopeDropdown ).toBeUndefined();
                } );
            } );

            // See "Note on disabled tests" at the top of this file.
            // describe( 'shallow render', () => {
            //     it( 'renders <search-redirect-form> if primo or guides engine', async () => {
            //         expect( wrapper.find( 'search-redirect-form-stub' ).exists() ).toBeTruthy();
            //         await wrapper.setProps( { engine: { type: 'guides' } } );
            //         expect( wrapper.find( 'search-redirect-form-stub' ).exists() ).toBeTruthy();
            //         expect( wrapper.find( 'getit-search-form-stub' ).exists() ).toBeFalsy();
            //     } );
            // } );
        } );
    } );
} );
