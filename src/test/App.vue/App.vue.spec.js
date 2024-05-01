/* global process */

// `appConfig` and the rendered HTML for App is different when
// `import.meta.env.PROD` is true vs. false, so we run this test suite twice to
// test both conditions.
//
// There are many methods for setting the `import.meta.env.PROD` in the config
// code to `false` at runtime.  The methods that involve changing it using test
// code will not serve our purpose because apparently `import appConfig` caches
// the config module, so subsequent attempts to change `import.meta.env.PROD` in
// the configuration after initial import all fail.  We work around this problem
// by doing separate runs of this test file for NODE_ENV values "production"
// and "test" (vitest default).  We could also use PROD=true or PROD=1, but
// use NODE_ENV because it is universal and more familiar.
//
// Note that a different set of snapshots is produced/checked for each NODE_ENV,
// so for each test run there will be spurious warnings of obsolete snapshots
// (i.e. those for NODE_ENV values other than the one being tested).
// Example -- for the NODE_ENV="production" test run, there will be warnings
// for the snapshots for NODE_ENV="test", which will appear to vitest to be
// obsolete:
//
//   Snapshots  4 obsolete
//              ↳ src/test/App.vue/App.vue.spec.js
//                · App [ NODE_ENV: test ] > 'NYU' > has the correct HTML 1
//                · App [ NODE_ENV: test ] > 'NYU_HOME' > has the correct HTML 1
//                · App [ NODE_ENV: test ] > 'NYUAD' > has the correct HTML 1
//                · App [ NODE_ENV: test ] > 'NYUSH' > has the correct HTML 1
//
import { beforeEach, describe, expect, it } from 'vitest';
import { config, mount } from '@vue/test-utils';
import App from '../../App.vue';
import appConfig from '../../../config/';

describe( `App [ NODE_ENV: ${ process.env.NODE_ENV } ]`, () => {
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
