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
import { beforeEach, describe, expect, it, vi } from 'vitest';
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

        it( 'has the correct HTML', () => {
            expect( wrapper.html() ).toMatchSnapshot();
        } );

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

            describe( 'should call `window.open` with correct URL', () => {
                it( 'for empty search', async () => {
                    expect( testState.target ).toBeUndefined();

                    const form = wrapper.find( 'form' )
                    const input = form.find( 'input' );
                    await input.setValue( EMPTY_SEARCH );
                    form.trigger( 'submit' );

                    expect( testState.target ).toMatchSnapshot();
                } );

                it( 'for all-whitespace search', async () => {
                    expect( testState.target ).toBeUndefined();

                    const form = wrapper.find( 'form' )
                    const input = form.find( 'input' );
                    await input.setValue( ALL_WHITESPACE_SEARCH );
                    form.trigger( 'submit' );

                    expect( testState.target ).toMatchSnapshot();
                } );

                it( 'for non-empty search', async () => {
                    expect( testState.target ).toBeUndefined();

                    const form = wrapper.find( 'form' )
                    const input = form.find( 'input' );
                    await input.setValue( NON_EMPTY_SEARCH );
                    form.trigger( 'submit' );

                    expect( testState.target ).toMatchSnapshot();
                } );
            } );
        } );
    } );
} );
