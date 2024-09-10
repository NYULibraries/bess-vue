/* global process */

// `appConfig` and the rendered HTML for App is different when
// `import.meta.env.VITE_DEPLOY_ENV` is not set to "prod", so we have separate
// tests for prod and non-prod deploy environments.
//
// There are various methods for setting the value of `import.meta.env.VITE_DEPLOY_ENV`
// in the config code at runtime.  The methods that involve changing it in test
// code will not serve our purpose because apparently `import appConfig` caches
// the config module, so subsequent attempts to change `import.meta.env.VITE_DEPLOY_ENV`
// in the configuration after initial import all fail.  We work around this
// problem by doing separate runs of this test file for VITE_DEPLOY_ENV=prod and
// VITE_DEPLOY_PROD_ENV left undefined, which is the value of the environment
// variable when in test mode.
//
// Note that a different set of snapshots is produced/checked for each
// VITE_DEPLOY_ENV, so for each test run there will be spurious warnings of
// obsolete snapshots (i.e. those for VITE_DEPLOY_ENV values other than the
// one being tested).
// Example -- for the VITE_DEPLOY_ENV=prod test run, there will be warnings
// for the snapshots for VITE_DEPLOY_ENV=undefined, which will appear to
// vitest to be obsolete:
//
// Snapshots  16 obsolete
//              ↳ src/test/App.vue/App.vue.spec.js
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU' > engine search > should call `window.open` with correct URL > for all-whitespace search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU' > engine search > should call `window.open` with correct URL > for empty search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU' > engine search > should call `window.open` with correct URL > for non-empty search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU' > has the correct HTML 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU_HOME' > engine search > should call `window.open` with correct URL > for all-whitespace search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU_HOME' > engine search > should call `window.open` with correct URL > for empty search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU_HOME' > engine search > should call `window.open` with correct URL > for non-empty search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU_HOME' > has the correct HTML 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUAD' > engine search > should call `window.open` with correct URL > for all-whitespace search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUAD' > engine search > should call `window.open` with correct URL > for empty search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUAD' > engine search > should call `window.open` with correct URL > for non-empty search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUAD' > has the correct HTML 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUSH' > engine search > should call `window.open` with correct URL > for all-whitespace search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUSH' > engine search > should call `window.open` with correct URL > for empty search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUSH' > engine search > should call `window.open` with correct URL > for non-empty search 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUSH' > has the correct HTML 1
//
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { config, mount } from '@vue/test-utils';
import App from '../../App.vue';
import appConfig from '../../../config/';

describe( `App [ VITE_DEPLOY_ENV: ${ process.env.VITE_DEPLOY_ENV } ]`, () => {
    let wrapper;

    describe.each(
        Object.keys( appConfig.institutions ).map(
            function ( institution ) {
                return { institution };
            },
        ) )( '$institution', ( { institution } ) => {
        beforeEach( () => {
            config.global.mocks = {
                $config: appConfig.institutions[ institution ],
            };

            wrapper = mount( App );
        } );

        test( 'has the correct HTML', () => {
            expect( wrapper.html() ).toMatchSnapshot();
        } );

        // This test suite assumes that the default tab is the engine search tab.
        describe( 'engine search', () => {
            // A single TAB followed by three spaces
            const ALL_WHITESPACE_SEARCH = '    ';
            const EMPTY_SEARCH = '';
            const NON_EMPTY_SEARCH = 'art';

            const testState = {
                target: undefined,
                reset() {
                    this.target = undefined;
                },
            };

            // This is used for the `describe.runIf` test conditions below.
            // Originally tried to do something like this:
            //
            //    describe.runIf( appConfig.institutions[ institution ][ 0 ].ui?.searchScopeDropdown )( ...
            //        describe.each( [...appConfig.institutions[ institution ][ 0 ].ui.searchScopeDropdown.options.map( option => { searchScopeDropdownValue: option } )( ...
            //
            // ...but it looks like the `describe.each` test is evaluated whether
            // the `describe.runIf` condition is truthy or not, leading to errors
            // when trying to read the `searchScopeDropdown` property of an
            // undefined `appConfig.institutions[ institution ][ 0 ].ui`.
            let currentConfig = appConfig.institutions[ institution ];
            let searchScopeDropdownOptionValues = currentConfig[ 0 ].ui?.searchScopeDropdown.options ?
                Object.keys( currentConfig[ 0 ].ui?.searchScopeDropdown.options ) :
                [];

            beforeEach( () => {
                // Suppress error "Error: Not implemented: window.open", which doesn't
                // cause the test to fail but does make test output harder to read.
                vi.stubGlobal( 'open', vi.fn( ( location ) => {
                    testState.called = true;
                    testState.target = location;
                } ) );

                config.global.mocks = {
                    $config: appConfig.institutions[ institution ],
                };

                wrapper = mount( App );

                testState.reset();
            } );

            describe.runIf( searchScopeDropdownOptionValues.length === 0 )( 'should call `window.open` with correct URL', () => {
                test.each(
                    [
                        { title: 'empty search', inputValue: EMPTY_SEARCH },
                        { title: 'all-whitespace search', inputValue: ALL_WHITESPACE_SEARCH },
                        { title: 'non-empty search', inputValue: NON_EMPTY_SEARCH },
                    ] )( '$title: $inputValue', async ( { inputValue } ) => {
                    expect( testState.target ).toBeUndefined();

                    const form = wrapper.find( 'form' )
                    const input = form.find( 'input' );
                    await input.setValue( inputValue );
                    form.trigger( 'submit' );

                    expect( testState.target ).toMatchSnapshot();
                } )
            } );

            describe.runIf( searchScopeDropdownOptionValues.length > 0 )( 'should call `window.open` with correct URL', () => {
                describe.each(
                    [
                        ...searchScopeDropdownOptionValues.map( function ( option ) {
                            return { 'searchScopeDropdownValue': option }
                        } ),
                    ],
                )(
                    'for search scope dropdown value: $searchScopeDropdownValue', ( { searchScopeDropdownValue } ) => {
                        test.each(
                            [
                                { title: 'empty search', inputValue: EMPTY_SEARCH },
                                { title: 'all-whitespace search', inputValue: ALL_WHITESPACE_SEARCH },
                                { title: 'non-empty search', inputValue: NON_EMPTY_SEARCH },
                            ] )( '$title: $inputValue', async ( { inputValue } ) => {
                            expect( testState.target ).toBeUndefined();

                            const form = wrapper.find( 'form' )
                            const searchScopeDropdown = form.find( 'select' );
                            const input = form.find( 'input' );
                            await searchScopeDropdown.setValue( searchScopeDropdownValue );
                            await input.setValue( inputValue );
                            form.trigger( 'submit' );

                            expect( testState.target ).toMatchSnapshot();
                        } )
                    },
                );
            } );
        } );
    } );
} );
