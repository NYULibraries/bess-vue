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
//   Snapshots  4 obsolete
//              ↳ src/test/App.vue/App.vue.spec.js
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU' > has the correct HTML 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYU_HOME' > has the correct HTML 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUAD' > has the correct HTML 1
//                · App [ VITE_DEPLOY_ENV: undefined ] > 'NYUSH' > has the correct HTML 1
//
import { beforeEach, describe, expect, it } from 'vitest';
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
    } );
} );
