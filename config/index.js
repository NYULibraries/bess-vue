import shared from './shared.js';
import NYU from './institutions/nyu.js';
import NYUAD from './institutions/nyuad.js';
import NYUSH from './institutions/nyush.js';
import NYU_HOME from './institutions/nyu-home.js';

// This factory exists solely to allow the `vitest` to test both prod and non-prod
// builds in the same test run.  See file header for src/test/App.vue/App.vue.spec.js.
function makeNewConfig() {
    return {
        institutions: {
            NYU       : NYU.makeNewConfig(),
            NYUAD     : NYUAD.makeNewConfig(),
            NYUSH     : NYUSH.makeNewConfig(),
            'NYU_HOME': NYU_HOME.makeNewConfig(),
        },
    };
}

export default {
    DEPLOY_ENV_PROD: shared.DEPLOY_ENV_PROD,
    makeNewConfig,
};
