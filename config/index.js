// This is not necessarily the optimal way to be setting up configuration.
// Originally BESS was designed to be general purpose reusable component that
// could potentially be used by non-programmers.  The configuration was done in
// a single large YAML file to make it easier for non-technical people to
// change.  We've since decided to maintain and support BESS for certain curated
// pages/websites only, so we are gradually switching to a more conventional
// approach to JS application configuration.  This simple config module is the
// first step.  It DRY'ed up some duplication in the YAML file and allowed us to
// reconfigure the link URLs based on the deployment environment, which became
// necessary after migrating to Primo VE, which put all deployment environments
// on the same domain, with environment differentiation done via the `vid` URL
// query param.
//
// The feature sets of the institutions have started to diverge, and BESS in
// general is becoming more complex.  It is likely that this module will be
// obsoleted by a new architecture that does not require centralization of all
// configuration in one place.  In the meantime, take note of the
// `makeNewConfig()` factory functions in this and all submodules, which exist
// solely to make testing easier.
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
