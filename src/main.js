import { createApp } from 'vue';
import App from './App.vue';
import bessConfig from '../config/index.js';

const config = bessConfig.makeNewConfig();

function parseConfigFromUrl( url ) {
    const searchParams =
        new URLSearchParams( new URL( url ).search );

    return {
        elementId  : searchParams.get( 'element_id' ),
        institution: searchParams.get( 'institution' ).toUpperCase(),
    };
}

const { elementId, institution } =
    parseConfigFromUrl( document.currentScript.src );

const app = createApp( App, { institution } );
// This has to be done before `app.mount`, otherwise `this.$config` will be
// undefined in components while they are mounting.
app.config.globalProperties.$config = Object.freeze( config.institutions[ institution ] );

app.mount( `#${ elementId }` );

