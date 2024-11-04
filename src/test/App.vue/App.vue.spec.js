/* global process */

// `appConfig` and the App component HTML derived from it differ depending on
// whether `import.meta.env.VITE_DEPLOY_ENV` is set to "prod" or not, so we have
// tests for both prod and non-prod deploy environments.
//
// Switching between prod and non-prod modes in the same test run is a little
// tricky because the way the _config/_ module is written now, the creation of
// the configuration happens immediately on `import`, and there is no way to
// change it after that.  This is desirable in the actual deployed app but
// inconvenient for tests.
//
// It is also apparently the case that `import` caches modules, so it's not
// possible to get two difference configurations by doing something like this:
//
//     vi.stubEnv( 'import.meta.env.VITE_DEPLOY_ENV', shared.DEPLOY_ENV_PROD );
//     import appConfigDeployEnvProd from '../../../config/';
//
//     vi.stubEnv(  'import.meta.env.VITE_DEPLOY_ENV', undefined );
//     import appConfigDeployEnvUndefined from '../../../config/';
//
// ...because the second import just seems to get the module cached from the
// first import.  This is confirmed both by the resulting modules which both
// use prod `vid` values, and also by line debugging with a breakpoint in the
// the config module -- it is only ever hit once, during the first import.
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
// Note that we do not currently have an `update-snapshots` npm script because
// vitest automatically deletes any snapshots it determines are obsolete, and
// currently this results in the aforementioned snapshots that are not truly
// obsolete but only circumstantially obsolete for a single test run
// referenced above to be deleted when the `--update` flag is set.
// For now, the only way to update snapshots is to run the test suite two
// separate times for `VITE_DEPLOY_ENV=prod` and `VITE_DEPLOY_ENV` not defined.
// After each run, use `git add --patch` to only commit the snapshot changes for
// the `VITE_DEPLOY_ENV` group being tested, and to not commit the deletions of
// the not-really-obsolete complementary group of snapshots that weren't used.
//
// Later we will figure out a way to make it possible to run the test suite
// for both `VITE_DEPLOY_ENV` states in the same test run.
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { config, mount } from '@vue/test-utils';
import App from '@/App.vue';
import bessConfig from '../../../config/';

const envTestCases = [
    {
        envValue: 'prod',
    },
    {
        envValue: undefined,
    },
];

describe.each( envTestCases )(
    'App builds correctly for VITE_DEPLOY_ENV=$envValue', ( { envValue } ) => {
        vi.stubEnv( 'VITE_DEPLOY_ENV', envValue );
        const appConfig = bessConfig.makeNewConfig();

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
            describe( 'engine search should call `window.open` with correct URL', () => {
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
                    currentConfig[ 0 ].ui?.searchScopeDropdown.options :
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

                // Test URLs
                describe.runIf( searchScopeDropdownOptionValues.length > 0 )( 'with user-selected search scope', () => {
                    describe.each(
                        [
                            ...searchScopeDropdownOptionValues.map( function ( option ) {
                                return { 'searchScopeDropdownValue': option.value }
                            } ),
                        ],
                    )(
                        '$searchScopeDropdownValue', ( { searchScopeDropdownValue } ) => {
                            test.each(
                                [
                                    {
                                        title     : 'empty search',
                                        inputValue: EMPTY_SEARCH,
                                    },
                                    {
                                        title     : 'all-whitespace search',
                                        inputValue: ALL_WHITESPACE_SEARCH,
                                    },
                                    {
                                        title     : 'non-empty search',
                                        inputValue: NON_EMPTY_SEARCH,
                                    },
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

                describe.runIf( searchScopeDropdownOptionValues.length === 0 )( `with hardcoded scope: ${ currentConfig[ 0 ].engine.scope }`, () => {
                    test.each(
                        [
                            {
                                title     : 'empty search',
                                inputValue: EMPTY_SEARCH,
                            },
                            {
                                title     : 'all-whitespace search',
                                inputValue: ALL_WHITESPACE_SEARCH,
                            },
                            {
                                title     : 'non-empty search',
                                inputValue: NON_EMPTY_SEARCH,
                            },
                        ] )( '$title: $inputValue', async ( { inputValue } ) => {
                        expect( testState.target ).toBeUndefined();

                        const form = wrapper.find( 'form' )
                        const input = form.find( 'input' );
                        await input.setValue( inputValue );
                        form.trigger( 'submit' );

                        expect( testState.target ).toMatchSnapshot();
                    } )
                } );
            } )
        } )
    } );
