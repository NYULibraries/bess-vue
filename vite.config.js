import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig( {
    build: {
        rollupOptions: {
            output: [
                {
                    entryFileNames: 'app.min.js',
                    format        : 'iife',
                },
                {
                    assetFileNames: 'primo_explore_search_embed.min.css',
                },
            ],
        },
    },
    //
    // Vite uses charset UTF-8 by default, which can cause problems with this CSS
    // rule:
    //
    // .bobcat_embed .bobcat_embed_searchbox ul li:before {
    //     content : "\BB\20\20\20"
    // }
    //
    // ...in HTML where the charset has not been set to UTF-8.  This is the case
    // for index-all-institutions.html, for example.  This problem could be
    // fixed in the HTML using a <meta> tag, but since we don't always have
    // control over the HTML where bess-vue could be deployed, this is safer.
    // Vite team also seems to acknowledge that this is safer, but chose to
    // default to UTF-8 because rollup favors this internally, and also because
    // users were complaining of increasing bundle sizes for non-ASCII language
    // code:
    //
    //     "feat!: set esbuild default charset to utf8 #10753"
    //     https://github.com/vitejs/vite/pull/10753
    //
    // The Vite ticket where the above was discussed and the workaround suggested:
    //
    //     "vite auto convert unicode string #12676"
    //     https://github.com/vitejs/vite/issues/12676
    //
    esbuild: {
        charset: 'ascii',
    },
    plugins: [ vue() ],
    resolve: {
        alias: {
            '@': fileURLToPath( new URL( './src', import.meta.url ) ),
        },
    },
} );
