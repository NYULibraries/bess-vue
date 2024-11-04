/* global process */

// The App component HTML differs depending on whether `import.meta.env.VITE_DEPLOY_ENV`
// is set to `shared.DEPLOY_ENV_PROD` or not, so we have to test both prod and
// non-prod deployment environments.
//
// Originally the `config` module self-configured itself on import based on
// `import.meta.env.VITE_DEPLOY_ENV` and exported a ready-made configuration
// for use in the application build and these test suites.  However, because
// it is apparently the case that `import` caches modules, it wasn't possible
// to get two difference configurations by doing something like this:
//
//     vi.stubEnv( 'import.meta.env.VITE_DEPLOY_ENV', shared.DEPLOY_ENV_PROD );
//     import appConfigDeployEnvProd from '../../../config/';
//
//     vi.stubEnv(  'import.meta.env.VITE_DEPLOY_ENV', undefined );
//     import appConfigDeployEnvUndefined from '../../../config/';
//
// ...because the second import just seemed to get the module cached from the
// first import.  This was confirmed both by the resulting modules which both
// use prod `vid` values, and also by line debugging with a breakpoint in the
// config module -- it is only ever hit once, during the first import.
//
// This being the case, it was not at that time possible to test both deploy
// environment builds in the same test run.  Unfortunately, running `vitest`
// with the `update` flag automatically deleted what `vitest` considered to be
// obsolete snapshots.  Since only one deployment environment build could be tested
// in a single test run, this led to all the snapshots for the other deploy
// environment to be deleted (and there were lots of obsolete snapshot warnings
// when the `update` flag was not set).
// This undesirable behavior prevented us from having a `test:update-snapshots`
// npm script as we were forced to update the snapshots file manually by doing
// separate test runs for each deployment environment and using `git add --patch`
// to only commit the relevant changes and not the spurious "obsolete" snapshot
// deletions.
// To remedy this, the config module was refactored to require an explicit call
// to a new factory function which would return a configuration freshly
// constructed with the values appropriate to the current value of
// `import.meta.env.VITE_DEPLOY_ENV`.  This factory function is only needed for
// testing.  The application itself would never need to change its configuration
// after it has already been built and deployed.
//
// For the explanation of why we have configuration set up the way we have, see
// the file header for the config module's index.js.
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { config, mount } from '@vue/test-utils';
import App from '@/App.vue';
import bessConfig from '../../../config/';

const envTestCases = [
    {
        envValue: bessConfig.DEPLOY_ENV_PROD,
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
