import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// File and directory paths
const ROOT_DIR =  path.join( path.dirname( import.meta.dirname ) );
const BROWSER_OVERRIDES_DIR = path.join( ROOT_DIR, 'browser-overrides' );
// These directories are identical except for the addition of the local app dist
// files added to the `USE_LOCAL_BESS_DIR` directory.
// Chrome local overrides doesn't currently support symlinks, so we have to make
// copies of everything.
const BROWSER_OVERRIDES_USE_DEV_BESS_DIR =
    path.join( BROWSER_OVERRIDES_DIR, 'use-dev-bess' );
const BROWSER_OVERRIDES_USE_LOCAL_BESS_DIR =
    path.join( BROWSER_OVERRIDES_DIR, 'use-local-bess' );

const APP_DIST_FILE = path.join( ROOT_DIR, 'dist', 'app.min.js' );
// Chrome uses hashed "longurl" filenames for URLs of the form
// `app.min.js?[QUERY STRING]`.
// The differently named `app.min.js-*` files are identical.  We only need the
// differently named copies for Chrome's override resolution to work.  Chrome
// local overrides doesn't currently support symlinks so we need to copy
// everything.
const BROWSER_OVERRIDES_APP_DIST_FILES_DIR =
    path.join(
        BROWSER_OVERRIDES_USE_LOCAL_BESS_DIR,
        'cdn-dev.library.nyu.edu',
    );
const STYLESHEET_DIST_FILE = path.join( ROOT_DIR, 'dist', 'bess.min.css' );

// Display this text prominently in the browser tab to warn user that they are
// not looking at the live page.
const BROWSER_TAB_LABEL = '[LOCAL OVERRIDE] ';

const DEV_BESS_STRING = 'https://cdn-dev.library.nyu.edu/bess-vue/';
const PROD_BESS_STRING = 'https://cdn.library.nyu.edu/bess-vue/';

const GLOBALHOME_BASE_URL = 'https://globalhome.nyu.edu';
const GLOBALHOME_WEB_PAGE_URL = `${ GLOBALHOME_BASE_URL }/services/search/libraries`;

const GLOBALHOME_DOMAIN = URL.parse( GLOBALHOME_BASE_URL ).hostname;
const GLOBALHOME_BROWSER_OVERRIDE_JS_DIR_RELATIVE_PATH = path.join( GLOBALHOME_DOMAIN, 'js' );

// Only update globalhome.nyu.edu if a session cookie is provided.
if ( process.env.SESSION_COOKIE ) {
    await updateGlobalHome( process.env.SESSION_COOKIE );
} else {
    console.log( 'WARNING: SESSION_COOKIE env var is not set, skipping update of globalhome.nyu.edu...' );
}

await updateSimpleSubstitutionWebPages();
await updateUseLocalBessDevCdnOverride();

async function deleteDirectoryContents( dirpath ) {
    await fs.rmSync( dirpath, { recursive: true } );
    await fs.mkdirSync( dirpath );
}

async function makeOverrideFiles( webPageUrl, sessionCookie ) {
    const html = await syncFetch( webPageUrl, sessionCookie );
    const overrideHtml = html.replaceAll( PROD_BESS_STRING, DEV_BESS_STRING )
        .replace( '<title>', `<title>${ BROWSER_TAB_LABEL }` );

    const url = URL.parse( webPageUrl );
    const relativeFilePath = path.join( url.hostname, url.pathname );

    fs.writeFileSync(
        path.join( BROWSER_OVERRIDES_USE_DEV_BESS_DIR, relativeFilePath ),
        overrideHtml,
        { encoding: 'utf8' },
    );

    fs.writeFileSync(
        path.join( BROWSER_OVERRIDES_USE_LOCAL_BESS_DIR, relativeFilePath ),
        overrideHtml,
        { encoding: 'utf8' },
    );
}

async function syncFetch( url, sessionCookie ) {
    const options = {};

    if ( sessionCookie ) {
        options.headers = {
            'Cookie': `SESSION=${ sessionCookie }`,
        };
    }

    const response = await fetch( url, options );

    return await response.text();
}

async function updateGlobalHome( sessionCookie ) {
    // Make the HTML page the same way we make the simple substitution HTML pages.
    // The only reason this one needs special handling is it's a private page
    // that requires a session cookie, otherwise it's handled exactly the same
    // way.
    makeOverrideFiles( GLOBALHOME_WEB_PAGE_URL, sessionCookie );

    // globalhome.nyu.edu does not use a <script> tag to load bess-vue.  It
    // uses JavaScript to inject it.  We need to find the JavaScript chunk file
    // which does the injection.  The filename is very volatile, so we have to
    // search for it each time.
    const html = await syncFetch( GLOBALHOME_WEB_PAGE_URL, sessionCookie );

    const chunkPathRegexp = '\\/js\\/chunk-[a-z0-9\\.]+\\.js';
    const chunkFilePaths =
        [ ...html.matchAll( new RegExp( chunkPathRegexp, 'g' ) ) ]
            .map( match => match[ 0 ] );

    for ( let i = 0; i < chunkFilePaths.length; i++ ) {
        const chunkFilePath = chunkFilePaths[ i ];
        const chunkFileUrl = path.join( GLOBALHOME_BASE_URL, chunkFilePath );
        const html = await syncFetch( chunkFileUrl );

        if ( html.match( PROD_BESS_STRING ) ) {
            const overrideHtml = html.replaceAll( PROD_BESS_STRING, DEV_BESS_STRING );

            const relativeFilePath = path.join(
                GLOBALHOME_BROWSER_OVERRIDE_JS_DIR_RELATIVE_PATH,
                path.basename( chunkFilePath ),
            );

            // Chances are high the chunk filename has changed, so delete the
            // old ones.
            await deleteDirectoryContents(
                path.join(
                    BROWSER_OVERRIDES_USE_DEV_BESS_DIR,
                    GLOBALHOME_BROWSER_OVERRIDE_JS_DIR_RELATIVE_PATH,
                ),
            );
            fs.writeFileSync(
                path.join( BROWSER_OVERRIDES_USE_DEV_BESS_DIR, relativeFilePath ),
                overrideHtml,
                { encoding: 'utf8' },
            );

            await deleteDirectoryContents(
                path.join(
                    BROWSER_OVERRIDES_USE_LOCAL_BESS_DIR,
                    GLOBALHOME_BROWSER_OVERRIDE_JS_DIR_RELATIVE_PATH,
                ),
            );
            fs.writeFileSync(
                path.join( BROWSER_OVERRIDES_USE_LOCAL_BESS_DIR, relativeFilePath ),
                overrideHtml,
                { encoding: 'utf8' },
            );
        }
    }
}

async function updateSimpleSubstitutionWebPages() {
    // These are easy, just replace prod BESS URLs with dev BESS URls.
    // Note that we there aren't necessarily dev instances for each web page.
    // We only include them here if we have access to them.
    const simpleSubstitutionWebPages = [
        'https://dev.library.nyu.edu/index.html',
        'https://guides.nyu.edu/nyu-reusable-templates-and-content/search-boxes/catalog',
        'https://guides.nyu.edu/nyushcscapstone/books',
        'https://library.nyu.edu/index.html',
        'https://nyuad.nyu.edu/en/library.html',
    ];

    for ( let i = 0; i < simpleSubstitutionWebPages.length; i++ ) {
        await makeOverrideFiles( simpleSubstitutionWebPages[ i ] );
    }
}

async function updateUseLocalBessDevCdnOverride() {
    const appMinJsFiles = [
        // For https://cdn-dev.library.nyu.edu/bess-vue/app.min.js?institution=NYU&element_id=primo_explore_search_embed_container_nyu
        'app.min.js-12eef0d3.js',
        // For https://cdn-dev.library.nyu.edu/bess-vue/app.min.js?institution=NYU_HOME&element_id=primo_explore_search_embed_container_nyu
        'app.min.js-3225a601.js',
        // For https://cdn-dev.library.nyu.edu/bess-vue/app.min.js?institution=NYU&element_id=primo_explore_search_embed_container
        'app.min.js-36f26a1a.js',
        // For https://cdn-dev.library.nyu.edu/bess-vue/app.min.js?institution=NYUSH&element_id=primo_explore_search_embed_container_nyush
        'app.min.js-385d950c.js',
        // For https://cdn-dev.library.nyu.edu/bess-vue/app.min.js?institution=NYUAD&element_id=primo_explore_search_embed_container_nyuad
        'app.min.js-efa2d0c.js',
    ];

    appMinJsFiles.forEach( appMinJsFile => {
        fs.copyFileSync( APP_DIST_FILE, path.join(
            BROWSER_OVERRIDES_APP_DIST_FILES_DIR,
            'longurls',
            appMinJsFile,
        ) );
    } );

    // CSS stylesheet
    fs.copyFileSync( STYLESHEET_DIST_FILE, path.join(
        BROWSER_OVERRIDES_APP_DIST_FILES_DIR,
        'bess-vue',
        path.basename( STYLESHEET_DIST_FILE ),
    ) );
}
