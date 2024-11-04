import { createApp } from 'vue';
import App from './App.vue';
import bessConfig from '../config/index.js';

const config = bessConfig.makeNewConfig();

// source: http://2ality.com/2014/05/current-script.html
const currentScript = document.currentScript || ( function() {
    var scripts = document.getElementsByTagName( 'script' );
    return scripts[scripts.length - 1];
} )();

function parseConfigFromUrl( url ) {
    const searchParams =
        new URLSearchParams( new URL( url ).search );

    return {
        elementId  : searchParams.get( 'element_id' ),
        institution: searchParams.get( 'institution' ).toUpperCase(),
    };
}

const { elementId, institution } = parseConfigFromUrl( currentScript.src );

const app = createApp( App, { institution } );
// This has to be done before `app.mount`, otherwise `this.$config` will be
// undefined in components while they are mounting.
app.config.globalProperties.$config = Object.freeze( config.institutions[institution] );

app.mount( `#${ elementId }` );

